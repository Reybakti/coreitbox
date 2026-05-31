import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import {
  AssignmentRequestStatus,
  TicketStatus,
} from '@prisma/client';

import { CreateTicketDto } from './dto/create-ticket.dto';

import { NotificationsService } from '../notifications/notifications.service';
import { WebsocketGateway } from '../websocket/websocket.gateway';

import { AuditLogsService } from '../audit-logs/audit-logs.service';

@Injectable()
export class TicketsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
    private readonly websocket: WebsocketGateway,
    private readonly auditLogsService: AuditLogsService,
  ) {}

  private async notifyAdmins(
    title: string,
    message: string,
    type:
      | 'INFO'
      | 'SUCCESS'
      | 'WARNING'
      | 'ERROR' = 'INFO',
  ) {
    const admins =
      await this.prisma.user.findMany({
        where: {
          role: {
            in: [
              'SYSADMIN',
              'ADMIN',
            ],
          },
        },
      });
    await Promise.all(
      admins.map((admin) =>
        this.notificationsService.create(
          admin.id,
          title,
          message,
          type,
        ),
      ),
    );
  }

  async create(
    dto: CreateTicketDto,
    userId: string,
  ) {
    const count =
      await this.prisma.ticket.count();

    const ticketNumber =
      `TCK-${new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, '')}-${String(
        count + 1,
      ).padStart(5, '0')}`;

    const ticket =
      await this.prisma.ticket.create({
        data: {
          ticketNumber,
          title: dto.title,
          description: dto.description,
          priority: dto.priority,
          status: TicketStatus.OPEN,
          categoryId: dto.categoryId,
          creatorId: userId,
        },
      });

    await this.prisma.ticketActivity.create({
      data: {
        ticketId: ticket.id,
        userId,
        activityType: 'CREATE_TICKET',
        description: `Ticket ${ticket.ticketNumber} dibuat`,
      },
    });

    await this.auditLogsService.create(
      userId,
      'CREATE_TICKET',
      'TICKETS',
      `Ticket ${ticket.ticketNumber} dibuat`,
    );

    // Notifikasi ke semua SYSADMIN + ADMIN + emit realtime
    await this.notifyAdmins(
      'Ticket Baru',
      `Ticket ${ticket.ticketNumber} dibuat`,
      'INFO',
    );

    this.websocket.emitTicketUpdate(
      ticket.id,
      {
        status: 'OPEN',
      },
    );

    return ticket;
  }

  async findAll() {
    return this.prisma.ticket.findMany({
      include: {
        creator: true,
        assignee: true,
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.ticket.findUnique({
      where: {
        id,
      },
      include: {
        creator: true,
        assignee: true,
        category: true,
      },
    });
  }

  async requestAssignment(
    ticketId: string,
    user: any,
    note?: string,
  ) {
    if (user.role !== 'TEKNISI') {
      throw new ForbiddenException(
        'Hanya teknisi yang dapat request assignment',
      );
    }

    const ticket =
      await this.prisma.ticket.findUnique({
        where: { id: ticketId },
      });

    if (!ticket) {
      throw new BadRequestException(
        'Ticket tidak ditemukan',
      );
    }

    if (ticket.status !== TicketStatus.OPEN) {
      throw new BadRequestException(
        'Ticket tidak dapat direquest',
      );
    }

    const request =
      await this.prisma.ticketAssignmentRequest.create({
        data: {
          ticketId,
          technicianId: user.sub,
          note,
          status:
            AssignmentRequestStatus.PENDING,
        },
      });

    await this.prisma.ticket.update({
      where: { id: ticketId },
      data: {
        status:
          TicketStatus.ASSIGNMENT_REQUEST,
      },
    });

    await this.prisma.ticketActivity.create({
      data: {
        ticketId,
        userId: user.sub,
        activityType: 'REQUEST_ASSIGNMENT',
        description:
          'Mengajukan assignment ticket',
      },
    });

    await this.auditLogsService.create(
      user.sub,
      'REQUEST_ASSIGNMENT',
      'TICKETS',
      `Request assignment ticket ${ticket.ticketNumber}`,
    );

    await this.notifyAdmins(
      'Request Assignment',
      `${user.username} meminta assignment ticket ${ticket.ticketNumber}`,
      'INFO',
    );

    this.websocket.emitTicketUpdate(
      ticket.id,
      {
        status: 'ASSIGNMENT_REQUEST',
      },
    );

    return request;
  }

  async approveAssignment(
    ticketId: string,
    requestId: string,
    user: any,
  ) {
    const request =
      await this.prisma.ticketAssignmentRequest.findUnique({
        where: {
          id: requestId,
        },
      });

    if (!request) {
      throw new BadRequestException(
        'Assignment request tidak ditemukan',
      );
    }

    const ticket =
      await this.prisma.ticket.update({
        where: {
          id: ticketId,
        },
        data: {
          status: TicketStatus.ASSIGNED,
          assigneeId: request.technicianId,
          assignedAt: new Date(),
        },
      });

    await this.prisma.ticketAssignmentRequest.update({
      where: {
        id: requestId,
      },
      data: {
        status:
          AssignmentRequestStatus.APPROVED,
        approvedAt: new Date(),
      },
    });

    await this.prisma.ticketActivity.create({
      data: {
        ticketId,
        userId: user.sub,
        activityType: 'APPROVE_ASSIGNMENT',
        description:
          'Assignment request disetujui',
      },
    });

    await this.notificationsService.create(
      request.technicianId,
      'Assignment Approved',
      `Ticket ${ticket.ticketNumber} telah diassign kepada Anda`,
      'SUCCESS',
    );

    this.websocket.emitTicketUpdate(
      ticket.id,
      {
        status: 'ASSIGNED',
      },
    );

    await this.auditLogsService.create(
      user.sub,
      'APPROVE_ASSIGNMENT',
      'TICKETS',
      `Assignment ticket ${ticket.ticketNumber} disetujui`,
    );

    return ticket;
  }

  async rejectAssignment(
    ticketId: string,
    requestId: string,
    user: any,
  ) {
    const request =
      await this.prisma.ticketAssignmentRequest.findUnique({
        where: {
          id: requestId,
        },
      });

    if (!request) {
      throw new BadRequestException(
        'Assignment request tidak ditemukan',
      );
    }

    const ticket =
      await this.prisma.ticket.update({
        where: {
          id: ticketId,
        },
        data: {
          status: TicketStatus.OPEN,
        },
      });

    await this.prisma.ticketAssignmentRequest.update({
      where: {
        id: requestId,
      },
      data: {
        status:
          AssignmentRequestStatus.REJECTED,
        rejectedAt: new Date(),
      },
    });

    await this.prisma.ticketActivity.create({
      data: {
        ticketId,
        userId: user.sub,
        activityType: 'REJECT_ASSIGNMENT',
        description: 'Assignment request ditolak',
      },
    });

    await this.notificationsService.create(
      request.technicianId,
      'Assignment Rejected',
      `Assignment request ticket ${ticket.ticketNumber} ditolak`,
      'WARNING',
    );

    this.websocket.emitTicketUpdate(
      ticket.id,
      {
        status: 'OPEN',
      },
    );

    await this.auditLogsService.create(
      user.sub,
      'REJECT_ASSIGNMENT',
      'TICKETS',
      `Assignment ticket ${ticket.ticketNumber} ditolak`,
    );

    return ticket;
  }

  async findAssignmentRequests(ticketId: string) {
    return this.prisma.ticketAssignmentRequest.findMany({
      where: {
        ticketId,
      },
      include: {
        technician: {
          select: {
            id: true,
            username: true,
            fullName: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async startTicket(
    ticketId: string,
    user: any,
  ) {
    const ticket =
      await this.prisma.ticket.findUnique({
        where: {
          id: ticketId,
        },
      });

    if (!ticket) {
      throw new BadRequestException(
        'Ticket tidak ditemukan',
      );
    }

    const updated =
      await this.prisma.ticket.update({
        where: {
          id: ticketId,
        },
        data: {
          status: TicketStatus.IN_PROGRESS,
          inProgressAt: new Date(),
        },
      });

    await this.prisma.ticketActivity.create({
      data: {
        ticketId,
        userId: user.sub,
        activityType: 'START_PROGRESS',
        description: 'Ticket mulai dikerjakan',
      },
    });

    await this.notifyAdmins(
      'Ticket In Progress',
      `Ticket ${ticket.ticketNumber} sedang dikerjakan`,
      'INFO',
    );

    if (ticket.creatorId) {
      await this.notificationsService.create(
        ticket.creatorId,
        'Ticket In Progress',
        `Ticket ${ticket.ticketNumber} sedang dikerjakan`,
        'INFO',
      );
    }

    this.websocket.emitTicketUpdate(
      updated.id,
      {
        status: 'IN_PROGRESS',
      },
    );

    await this.auditLogsService.create(
      user.sub,
      'START_TICKET',
      'TICKETS',
      `Ticket ${ticket.ticketNumber} mulai dikerjakan`,
    );

    return updated;
  }

  async resolveTicket(
    ticketId: string,
    user: any,
  ) {
    const ticket =
      await this.prisma.ticket.findUnique({
        where: {
          id: ticketId,
        },
      });

    if (!ticket) {
      throw new BadRequestException(
        'Ticket tidak ditemukan',
      );
    }

    const updated =
      await this.prisma.ticket.update({
        where: {
          id: ticketId,
        },
        data: {
          status: TicketStatus.RESOLVED,
          resolvedAt: new Date(),
        },
      });

    await this.prisma.ticketActivity.create({
      data: {
        ticketId,
        userId: user.sub,
        activityType: 'RESOLVE_TICKET',
        description: 'Ticket selesai dikerjakan',
      },
    });

    await this.notifyAdmins(
      'Ticket Resolved',
      `Ticket ${ticket.ticketNumber} telah diselesaikan`,
      'SUCCESS',
    );

    if (ticket.creatorId) {
      await this.notificationsService.create(
        ticket.creatorId,
        'Ticket Resolved',
        `Ticket ${ticket.ticketNumber} telah diselesaikan`,
        'SUCCESS',
      );
    }

    this.websocket.emitTicketUpdate(
      updated.id,
      {
        status: 'RESOLVED',
      },
    );

    await this.auditLogsService.create(
      user.sub,
      'RESOLVE_TICKET',
      'TICKETS',
      `Ticket ${ticket.ticketNumber} selesai`,
    );

    return updated;
  }

  async closeTicket(
    ticketId: string,
    user: any,
  ) {
    const ticket =
      await this.prisma.ticket.findUnique({
        where: {
          id: ticketId,
        },
      });

    if (!ticket) {
      throw new BadRequestException(
        'Ticket tidak ditemukan',
      );
    }

    const updated =
      await this.prisma.ticket.update({
        where: {
          id: ticketId,
        },
        data: {
          status: TicketStatus.CLOSED,
          closedAt: new Date(),
        },
      });

    await this.prisma.ticketActivity.create({
      data: {
        ticketId,
        userId: user.sub,
        activityType: 'CLOSE_TICKET',
        description: 'Ticket ditutup',
      },
    });

    await this.notifyAdmins(
      'Ticket Closed',
      `Ticket ${ticket.ticketNumber} telah ditutup`,
      'INFO',
    );

    if (ticket.creatorId) {
      await this.notificationsService.create(
        ticket.creatorId,
        'Ticket Closed',
        `Ticket ${ticket.ticketNumber} telah ditutup`,
        'INFO',
      );
    }

    if (ticket.assigneeId) {
      await this.notificationsService.create(
        ticket.assigneeId,
        'Ticket Closed',
        `Ticket ${ticket.ticketNumber} telah ditutup`,
        'INFO',
      );
    }

    this.websocket.emitTicketUpdate(
      updated.id,
      {
        status: 'CLOSED',
      },
    );

    await this.auditLogsService.create(
      user.sub,
      'CLOSE_TICKET',
      'TICKETS',
      `Ticket ${ticket.ticketNumber} ditutup`,
    );

    return updated;
  }
}