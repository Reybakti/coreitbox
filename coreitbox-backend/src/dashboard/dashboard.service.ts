import { Injectable } from '@nestjs/common';

import {
  TicketPriority,
  TicketStatus,
  UserRole,
} from '@prisma/client';

import { PrismaService }
from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async summary() {
    const [
      totalTickets,
      openTickets,
      assignedTickets,
      inProgressTickets,
      resolvedTickets,
      closedTickets,

      totalUsers,
      totalTechnicians,

      highPriorityTickets,
      criticalPriorityTickets,
    ] = await Promise.all([
      this.prisma.ticket.count(),

      this.prisma.ticket.count({
        where: {
          status: TicketStatus.OPEN,
        },
      }),

      this.prisma.ticket.count({
        where: {
          status:
            TicketStatus.ASSIGNED,
        },
      }),

      this.prisma.ticket.count({
        where: {
          status:
            TicketStatus.IN_PROGRESS,
        },
      }),

      this.prisma.ticket.count({
        where: {
          status:
            TicketStatus.RESOLVED,
        },
      }),

      this.prisma.ticket.count({
        where: {
          status:
            TicketStatus.CLOSED,
        },
      }),

      this.prisma.user.count(),

      this.prisma.user.count({
        where: {
          role:
            UserRole.TEKNISI,
        },
      }),

      this.prisma.ticket.count({
        where: {
          priority:
            TicketPriority.HIGH,
        },
      }),

      this.prisma.ticket.count({
        where: {
          priority:
            TicketPriority.CRITICAL,
        },
      }),
    ]);

    return {
      totalTickets,
      openTickets,
      assignedTickets,
      inProgressTickets,
      resolvedTickets,
      closedTickets,

      totalUsers,
      totalTechnicians,

      highPriorityTickets,
      criticalPriorityTickets,
    };
  }
}