import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { TicketCommentsService } from './ticket-comments.service';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketCommentsController {
  constructor(
    private readonly service: TicketCommentsService,
  ) {}

  @Post(':id/comments')
  create(
    @Param('id') ticketId: string,
    @Body() dto: CreateCommentDto,
    @CurrentUser() user: any,
  ) {
    return this.service.create(
      ticketId,
      user.sub,
      dto.message,
    );
  }

  @Get(':id/comments')
  findAll(
    @Param('id') ticketId: string,
  ) {
    return this.service.findAll(
      ticketId,
    );
  }

  @Delete('/comments/:id')
  delete(
    @Param('id') id: string,
  ) {
    return this.service.delete(id);
  }
}