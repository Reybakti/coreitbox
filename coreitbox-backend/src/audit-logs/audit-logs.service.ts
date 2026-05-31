import { Injectable } from '@nestjs/common';

import { PrismaService }
from '../prisma/prisma.service';

@Injectable()
export class AuditLogsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    action: string,
    module: string,
    description: string,
    ipAddress?: string,
    userAgent?: string,
  ) {
    return this.prisma.auditLog.create({
      data: {
        userId,
        action,
        module,
        description,
        ipAddress,
        userAgent,
      },
    });
  }

  async findAll() {
    return this.prisma.auditLog.findMany({
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
        createdAt: 'desc',
      },
    });
  }

  async findByModule(
    module: string,
  ) {
    return this.prisma.auditLog.findMany({
      where: {
        module,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}