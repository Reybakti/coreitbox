import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { TicketCommentsController } from './ticket-comments.controller';
import { TicketCommentsService } from './ticket-comments.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    TicketCommentsController,
  ],
  providers: [
    TicketCommentsService,
  ],
})
export class TicketCommentsModule {}