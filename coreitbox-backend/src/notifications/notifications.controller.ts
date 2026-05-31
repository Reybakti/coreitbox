import {
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { NotificationsService } from './notifications.service';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(
    private readonly service: NotificationsService,
  ) {}

  @Get()
  findAll(
    @CurrentUser() user: any,
  ) {
    return this.service.findAll(
      user.sub,
    );
  }

  @Get('unread')
  findUnread(
    @CurrentUser() user: any,
  ) {
    return this.service.findUnread(
      user.sub,
    );
  }

  @Patch(':id/read')
  markAsRead(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    return this.service.markAsRead(
      id,
      user.sub,
    );
  }

  @Patch('read-all')
  markAllAsRead(
    @CurrentUser() user: any,
  ) {
    return this.service.markAllAsRead(
      user.sub,
    );
  }
}