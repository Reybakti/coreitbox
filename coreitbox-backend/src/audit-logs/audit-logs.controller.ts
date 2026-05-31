import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';

import { AuditLogsService }
from './audit-logs.service';

import { JwtAuthGuard }
from '../common/guards/jwt-auth.guard';

@Controller('audit-logs')
@UseGuards(JwtAuthGuard)
export class AuditLogsController {
  constructor(
    private readonly auditLogsService:
      AuditLogsService,
  ) {}

  @Get()
  findAll() {
    return this.auditLogsService.findAll();
  }

  @Get('module/:module')
  findByModule(
    @Param('module')
    module: string,
  ) {
    return this.auditLogsService.findByModule(
      module,
    );
  }
}