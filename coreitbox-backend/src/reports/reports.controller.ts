import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { ReportsService } from './reports.service';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(
    private readonly reportsService:
      ReportsService,
  ) {}

  @Get('tickets/summary')
  ticketSummary() {
    return this.reportsService.ticketSummary();
  }

  @Get('tickets/priority')
  ticketPriority() {
    return this.reportsService.ticketPriority();
  }

  @Get('tickets/category')
  ticketCategory() {
    return this.reportsService.ticketByCategory();
  }

  @Get('technicians')
  technicianPerformance() {
    return this.reportsService.technicianPerformance();
  }

  @Get('audit-summary')
  auditSummary() {
    return this.reportsService.auditSummary();
  }
}