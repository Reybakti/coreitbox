import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TicketsModule } from './tickets/tickets.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ReportsModule } from './reports/reports.module';
import { SettingsModule } from './settings/settings.module';
import { WebsocketModule } from './websocket/websocket.module';
import { TicketCategoriesModule } from './ticket-categories/ticket-categories.module';
import { TicketCommentsModule } from './ticket-comments/ticket-comments.module';
import { TicketDocumentationsModule } from './ticket-documentations/ticket-documentations.module';
import { TicketMaterialsModule } from './ticket-materials/ticket-materials.module';
import { TicketTimelineModule } from './ticket-timeline/ticket-timeline.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import {
  ThrottlerModule,
} from '@nestjs/throttler';

@Module({
  imports: [ThrottlerModule.forRoot([
  {
    ttl: 60000,
    limit: 5,
  },
]),
ConfigModule.forRoot({
  isGlobal: true,

  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid(
        'development',
        'production',
      )
      .default('development'),

    PORT: Joi.number()
      .default(3100),

    DATABASE_URL:
      Joi.string().required(),

    JWT_SECRET:
      Joi.string().required(),

    JWT_REFRESH_SECRET:
      Joi.string().required(),

    MINIO_ENDPOINT:
      Joi.string().required(),

    MINIO_PORT:
      Joi.number().required(),

    MINIO_ACCESS_KEY:
      Joi.string().required(),

    MINIO_SECRET_KEY:
      Joi.string().required(),

    MINIO_BUCKET:
      Joi.string().required(),
  }),
}),PrismaModule, AuthModule, UsersModule, DashboardModule, TicketsModule, NotificationsModule, ReportsModule, SettingsModule, WebsocketModule, TicketCategoriesModule, TicketCommentsModule, TicketDocumentationsModule, TicketMaterialsModule, TicketTimelineModule, AttachmentsModule, AuditLogsModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
