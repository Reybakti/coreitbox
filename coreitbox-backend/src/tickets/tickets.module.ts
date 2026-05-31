import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { AuditLogsModule }
from '../audit-logs/audit-logs.module';

@Module({
  imports: [
    PrismaModule,
    NotificationsModule,
    WebsocketModule,
    AuditLogsModule,
  ],
  controllers: [
    TicketsController,
  ],
  providers: [
    TicketsService,
  ],
})
export class TicketsModule {}
