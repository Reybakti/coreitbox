import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

import { TicketMaterialsService } from './ticket-materials.service';

import { CreateMaterialDto } from './dto/create-material.dto';

@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketMaterialsController {
  constructor(
    private readonly service: TicketMaterialsService,
  ) {}

  @Post(':id/materials')
  create(
    @Param('id') ticketId: string,
    @Body() dto: CreateMaterialDto,
    @CurrentUser() user: any,
  ) {
    return this.service.create(
      ticketId,
      user.sub,
      dto,
    );
  }

  @Get(':id/materials')
  findAll(
    @Param('id') ticketId: string,
  ) {
    return this.service.findAll(
      ticketId,
    );
  }

  @Delete('/materials/:id')
  delete(
    @Param('id') id: string,
  ) {
    return this.service.delete(id);
  }
}