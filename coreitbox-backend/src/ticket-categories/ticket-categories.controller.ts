import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { TicketCategoriesService } from './ticket-categories.service';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('ticket-categories')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
export class TicketCategoriesController {
  constructor(
    private readonly service: TicketCategoriesService,
  ) {}

  @Get()
  @Roles(
    'SYSADMIN',
    'ADMIN',
    'TEKNISI',
  )
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles(
    'SYSADMIN',
    'ADMIN',
    'TEKNISI',
  )
  findOne(
    @Param('id') id: string,
  ) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SYSADMIN')
  create(
    @Body() body: any,
  ) {
    return this.service.create(body);
  }

  @Patch(':id')
  @Roles('SYSADMIN')
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.service.update(
      id,
      body,
    );
  }

  @Delete(':id')
  @Roles('SYSADMIN')
  remove(
    @Param('id') id: string,
  ) {
    return this.service.remove(id);
  }
}