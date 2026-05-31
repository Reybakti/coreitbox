import {
  Injectable,
} from '@nestjs/common';

import {
  PrismaService,
} from '../prisma/prisma.service';

import {
  WebsocketGateway,
} from '../websocket/websocket.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly websocket: WebsocketGateway,
  ) {}

  async findAll(
    userId: string,
  ) {
    const yesterday =
      new Date(
        Date.now() -
          24 *
            60 *
            60 *
            1000,
      );

    return this.prisma.notification.findMany(
      {
        where: {
          userId,

          OR: [
            {
              isRead: false,
            },

            {
              isRead: true,

              createdAt: {
                gte: yesterday,
              },
            },
          ],
        },

        orderBy: {
          createdAt: 'desc',
        },

        take: 20,
      },
    );
  }

  async findUnread(
    userId: string,
  ) {
    return this.prisma.notification.findMany(
      {
        where: {
          userId,
          isRead: false,
        },

        orderBy: {
          createdAt: 'desc',
        },
      },
    );
  }

  async markAsRead(
    id: string,
    userId: string,
  ) {
    return this.prisma.notification.updateMany(
      {
        where: {
          id,
          userId,
        },

        data: {
          isRead: true,
          readAt: new Date(),
        },
      },
    );
  }

  async markAllAsRead(
    userId: string,
  ) {
    return this.prisma.notification.updateMany(
      {
        where: {
          userId,
          isRead: false,
        },

        data: {
          isRead: true,
          readAt: new Date(),
        },
      },
    );
  }

  async create(
    userId: string,
    title: string,
    message: string,
    type:
      | 'INFO'
      | 'SUCCESS'
      | 'WARNING'
      | 'ERROR' = 'INFO',
  ) {
    const notification =
      await this.prisma.notification.create(
        {
          data: {
            userId,
            title,
            message,
            type,
          },
        },
      );

    this.websocket.emitNotification(
      userId,
      notification,
    );

    return notification;
  }

  async countUnread(
    userId: string,
  ) {
    return this.prisma.notification.count(
      {
        where: {
          userId,
          isRead: false,
        },
      },
    );
  }

  async deleteOldReadNotifications() {
    const limitDate =
      new Date(
        Date.now() -
          30 *
            24 *
            60 *
            60 *
            1000,
      );

    return this.prisma.notification.deleteMany(
      {
        where: {
          isRead: true,

          readAt: {
            lt: limitDate,
          },
        },
      },
    );
  }
}