import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { TicketsService } from './tickets.service';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { RequestAssignmentDto } from './dto/request-assignment.dto';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateTicketDto,
    @CurrentUser() user: any,
  ) {
    return this.ticketsService.create(
      dto,
      user.sub,
    );
  }

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.ticketsService.findOne(
      id,
    );
  }

  @Post(':id/request-assignment')
  requestAssignment(
    @Param('id') id: string,
    @Body() dto: RequestAssignmentDto,
    @CurrentUser() user: any,
  ) {
    return this.ticketsService.requestAssignment(
      id,
      user,
      dto.note,
    );
  }

  @Post(
    ':ticketId/approve-assignment/:requestId',
  )
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    'SYSADMIN',
    'ADMIN',
  )
  approveAssignment(
    @Param('ticketId')
    ticketId: string,

    @Param('requestId')
    requestId: string,

    @CurrentUser()
    user: any,
  ) {
    return this.ticketsService.approveAssignment(
      ticketId,
      requestId,
      user,
    );
  }

  @Post(
    ':ticketId/reject-assignment/:requestId',
  )
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    'SYSADMIN',
    'ADMIN',
  )
  rejectAssignment(
    @Param('ticketId')
    ticketId: string,

    @Param('requestId')
    requestId: string,

    @CurrentUser()
    user: any,
  ) {
    return this.ticketsService.rejectAssignment(
      ticketId,
      requestId,
      user,
    );
  }

  @Get(':id/assignment-requests')
  @ApiOperation({
    summary:
      'Get Assignment Requests',
  })
  findAssignmentRequests(
    @Param('id')
    id: string,
  ) {
    return this.ticketsService.findAssignmentRequests(
      id,
    );
  }

  @Post(':id/start')
  startTicket(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    return this.ticketsService.startTicket(
      id,
      user,
    );
  }

  @Post(':id/resolve')
  resolveTicket(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    return this.ticketsService.resolveTicket(
      id,
      user,
    );
  }

  @Post(':id/close')
  closeTicket(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    return this.ticketsService.closeTicket(
      id,
      user,
    );
  }
}