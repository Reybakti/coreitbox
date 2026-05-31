import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

import { AttachmentsService } from './attachments.service';

@Controller()
@UseGuards(JwtAuthGuard)
export class AttachmentsController {
  constructor(
    private readonly service: AttachmentsService,
  ) {}

  @Post(
    'tickets/:id/attachments',
  )
  @UseInterceptors(
    FileInterceptor('file'),
  )
  upload(
    @Param('id')
    ticketId: string,

    @UploadedFile()
    file: Express.Multer.File,

    @CurrentUser()
    user: any,
  ) {
    return this.service.upload(
      ticketId,
      file,
      user.sub,
    );
  }

  @Get(
    'tickets/:id/attachments',
  )
  findAll(
    @Param('id')
    ticketId: string,
  ) {
    return this.service.findAll(
      ticketId,
    );
  }

  @Get(
    'attachments/:id/url',
  )
  getUrl(
    @Param('id')
    id: string,
  ) {
    return this.service.getFileUrl(
      id,
    );
  }

  @Delete(
    'attachments/:id',
  )
  remove(
    @Param('id')
    id: string,
  ) {
    return this.service.remove(id);
  }
}