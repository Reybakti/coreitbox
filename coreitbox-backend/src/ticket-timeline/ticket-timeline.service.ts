import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TicketTimelineService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findTimeline(
    ticketId: string,
  ) {
    return this.prisma.ticketActivity.findMany({
      where: {
        ticketId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}