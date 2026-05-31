import { Injectable } from '@nestjs/common';

import {
  TicketPriority,
  TicketStatus,
  UserRole,
} from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async ticketSummary() {
    return {
      totalTickets:
        await this.prisma.ticket.count(),

      openTickets:
        await this.prisma.ticket.count({
          where: {
            status: TicketStatus.OPEN,
          },
        }),

      assignedTickets:
        await this.prisma.ticket.count({
          where: {
            status:
              TicketStatus.ASSIGNED,
          },
        }),

      inProgressTickets:
        await this.prisma.ticket.count({
          where: {
            status:
              TicketStatus.IN_PROGRESS,
          },
        }),

      resolvedTickets:
        await this.prisma.ticket.count({
          where: {
            status:
              TicketStatus.RESOLVED,
          },
        }),

      closedTickets:
        await this.prisma.ticket.count({
          where: {
            status:
              TicketStatus.CLOSED,
          },
        }),
    };
  }

  async ticketPriority() {
    return {
      low:
        await this.prisma.ticket.count({
          where: {
            priority:
              TicketPriority.LOW,
          },
        }),

      medium:
        await this.prisma.ticket.count({
          where: {
            priority:
              TicketPriority.MEDIUM,
          },
        }),

      high:
        await this.prisma.ticket.count({
          where: {
            priority:
              TicketPriority.HIGH,
          },
        }),

      critical:
        await this.prisma.ticket.count({
          where: {
            priority:
              TicketPriority.CRITICAL,
          },
        }),
    };
  }

  async ticketByCategory() {
    const categories =
      await this.prisma.ticketCategory.findMany({
        include: {
          _count: {
            select: {
              tickets: true,
            },
          },
        },
      });

    return categories.map(
      (category) => ({
        id: category.id,
        category:
          category.name,
        total:
          category._count.tickets,
      }),
    );
  }

  async technicianPerformance() {
    const technicians =
      await this.prisma.user.findMany({
        where: {
          role:
            UserRole.TEKNISI,
        },
        include: {
          assignedTickets: true,
        },
      });

    return technicians.map(
      (tech) => ({
        id: tech.id,
        username:
          tech.username,
        fullName:
          tech.fullName,
        assigned:
          tech.assignedTickets.length,

        resolved:
          tech.assignedTickets.filter(
            (t) =>
              t.status ===
              TicketStatus.RESOLVED,
          ).length,

        closed:
          tech.assignedTickets.filter(
            (t) =>
              t.status ===
              TicketStatus.CLOSED,
          ).length,
      }),
    );
  }

  async auditSummary() {
    const totalLogs =
      await this.prisma.auditLog.count();

    const ticketLogs =
      await this.prisma.auditLog.count({
        where: {
          module:
            'TICKETS',
        },
      });

    const userLogs =
      await this.prisma.auditLog.count({
        where: {
          module:
            'USERS',
        },
      });

    return {
      totalLogs,
      ticketLogs,
      userLogs,
    };
  }
}