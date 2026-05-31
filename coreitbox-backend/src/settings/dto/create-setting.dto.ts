import { ApiProperty } from '@nestjs/swagger';

import {
  IsEnum,
  IsString,
} from 'class-validator';

import {
  SettingType,
} from '@prisma/client';

export class CreateSettingDto {
  @ApiProperty({
    example:
      'company_name',
  })
  @IsString()
  key: string;

  @ApiProperty({
    example:
      'CoreITBox',
  })
  @IsString()
  value: string;

  @ApiProperty({
    enum: SettingType,
  })
  @IsEnum(SettingType)
  type: SettingType;

  @ApiProperty({
    example:
      'Nama perusahaan',
  })
  @IsString()
  description: string;
}