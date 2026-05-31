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

import { SettingType } from '@prisma/client';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

import { SettingsService } from './settings.service';

import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Controller('settings')
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
  ) {}

  @Get()
  findAll() {
    return this.settingsService.findAll();
  }

  @Get('company')
  company() {
    return this.settingsService.findByType(
      SettingType.COMPANY,
    );
  }

  @Get('ui')
  ui() {
    return this.settingsService.findByType(
      SettingType.UI,
    );
  }

  @Get('email')
  email() {
    return this.settingsService.findByType(
      SettingType.EMAIL,
    );
  }

  @Get('system')
  system() {
    return this.settingsService.findByType(
      SettingType.SYSTEM,
    );
  }

  @Get(':key')
  findOne(
    @Param('key')
    key: string,
  ) {
    return this.settingsService.findByKey(
      key,
    );
  }

  @Post()
  create(
    @Body()
    dto: CreateSettingDto,
  ) {
    return this.settingsService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    dto: UpdateSettingDto,
  ) {
    return this.settingsService.update(
      id,
      dto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.settingsService.remove(
      id,
    );
  }
}