import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

import { TicketTimelineService } from './ticket-timeline.service';

@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketTimelineController {
  constructor(
    private readonly service: TicketTimelineService,
  ) {}

  @Get(':id/timeline')
  findTimeline(
    @Param('id') ticketId: string,
  ) {
    return this.service.findTimeline(
      ticketId,
    );
  }
}