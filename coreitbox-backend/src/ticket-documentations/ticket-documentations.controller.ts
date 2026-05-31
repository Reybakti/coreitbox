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

import { TicketDocumentationsService } from './ticket-documentations.service';

import { CreateDocumentationDto } from './dto/create-documentation.dto';

@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketDocumentationsController {
  constructor(
    private readonly service: TicketDocumentationsService,
  ) {}

  @Post(':id/documentations')
  create(
    @Param('id') ticketId: string,
    @Body() dto: CreateDocumentationDto,
    @CurrentUser() user: any,
  ) {
    return this.service.create(
      ticketId,
      user.sub,
      dto.description,
    );
  }

  @Get(':id/documentations')
  findAll(
    @Param('id') ticketId: string,
  ) {
    return this.service.findAll(
      ticketId,
    );
  }

  @Delete('/documentations/:id')
  delete(
    @Param('id') id: string,
  ) {
    return this.service.delete(id);
  }
}