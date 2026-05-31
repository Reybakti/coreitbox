import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { SettingType } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateSettingDto,
  ) {
    const existing =
      await this.prisma.setting.findUnique({
        where: {
          key: dto.key,
        },
      });

    if (existing) {
      throw new BadRequestException(
        'Key setting sudah ada',
      );
    }

    return this.prisma.setting.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.setting.findMany({
      orderBy: {
        key: 'asc',
      },
    });
  }

  async findByKey(
    key: string,
  ) {
    return this.prisma.setting.findUnique({
      where: { key },
    });
  }

  async findByType(
    type: SettingType,
  ) {
    return this.prisma.setting.findMany({
      where: { type },
      orderBy: {
        key: 'asc',
      },
    });
  }

  async update(
    id: string,
    dto: UpdateSettingDto,
  ) {
    return this.prisma.setting.update({
      where: { id },
      data: dto,
    });
  }

  async remove(
    id: string,
  ) {
    return this.prisma.setting.delete({
      where: { id },
    });
  }
}