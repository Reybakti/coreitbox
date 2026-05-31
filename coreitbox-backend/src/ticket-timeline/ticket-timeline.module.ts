import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { TicketTimelineController } from './ticket-timeline.controller';
import { TicketTimelineService } from './ticket-timeline.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    TicketTimelineController,
  ],
  providers: [
    TicketTimelineService,
  ],
})
export class TicketTimelineModule {}