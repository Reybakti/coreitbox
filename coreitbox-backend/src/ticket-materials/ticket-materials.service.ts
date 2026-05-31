import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TicketMaterialsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    ticketId: string,
    userId: string,
    dto: any,
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

    const material =
      await this.prisma.ticketMaterial.create({
        data: {
          ticketId,
          userId,

          materialName:
            dto.materialName,

          quantity:
            dto.quantity,

          unit:
            dto.unit,

          note:
            dto.note,
        },
      });

    await this.prisma.ticketActivity.create({
      data: {
        ticketId,
        userId,

        activityType:
          'MATERIAL_CREATE',

        description:
          `Menambahkan material ${dto.materialName}`,
      },
    });

    return material;
  }

  async findAll(ticketId: string) {
    return this.prisma.ticketMaterial.findMany({
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
    return this.prisma.ticketMaterial.delete({
      where: {
        id,
      },
    });
  }
}