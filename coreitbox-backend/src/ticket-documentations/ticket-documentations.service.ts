import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TicketDocumentationsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    ticketId: string,
    userId: string,
    description: string,
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

    const documentation =
      await this.prisma.ticketDocumentation.create({
        data: {
          ticketId,
          userId,
          description,
        },
      });

    await this.prisma.ticketActivity.create({
      data: {
        ticketId,
        userId,
        activityType:
          'DOCUMENTATION_CREATE',
        description:
          'Menambahkan dokumentasi pekerjaan',
      },
    });

    return documentation;
  }

  async findAll(ticketId: string) {
    return this.prisma.ticketDocumentation.findMany({
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
    return this.prisma.ticketDocumentation.delete({
      where: {
        id,
      },
    });
  }
}