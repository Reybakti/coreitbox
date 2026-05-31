import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TicketCommentsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    ticketId: string,
    userId: string,
    message: string,
  ) {
    const ticket =
      await this.prisma.ticket.findUnique({
        where: {
          id: ticketId,
        },
      });

    if (!ticket) {
      throw new NotFoundException(
        'Ticket tidak ditemukan',
      );
    }

    const comment =
      await this.prisma.ticketComment.create({
        data: {
          ticketId,
          userId,
          message,
        },
      });

    await this.prisma.ticketActivity.create({
      data: {
        ticketId,
        userId,
        activityType: 'COMMENT',
        description: message,
      },
    });

    return comment;
  }

  async findAll(ticketId: string) {
    return this.prisma.ticketComment.findMany({
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

  async delete(id: string) {
    return this.prisma.ticketComment.delete({
      where: {
        id,
      },
    });
  }
}