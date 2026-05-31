import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TicketCategoriesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  findAll() {
    return this.prisma.ticketCategory.findMany({
      include: {
        _count: {
          select: {
            tickets: true,
          },
        },
      },

      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const category =
      await this.prisma.ticketCategory.findUnique({
        where: { id },

        include: {
          _count: {
            select: {
              tickets: true,
            },
          },
        },
      });

    if (!category) {
      throw new NotFoundException(
        'Category tidak ditemukan',
      );
    }

    return category;
  }

  create(data: any) {
    return this.prisma.ticketCategory.create({
      data,
    });
  }

  async update(
    id: string,
    data: any,
  ) {
    await this.findOne(id);

    return this.prisma.ticketCategory.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const category =
      await this.findOne(id);

    const ticketCount =
      await this.prisma.ticket.count({
        where: {
          categoryId: id,
        },
      });

    if (ticketCount > 0) {
      throw new BadRequestException(
        `Category masih digunakan oleh ${ticketCount} ticket`,
      );
    }

    await this.prisma.ticketCategory.delete({
      where: { id },
    });

    return {
      success: true,
      message:
        'Category berhasil dihapus',
    };
  }
}