import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  SettingType,
} from '@prisma/client';

export class UpdateSettingDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  key?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  value?: string;

  @ApiPropertyOptional({
    enum: SettingType,
  })
  @IsOptional()
  @IsEnum(SettingType)
  type?: SettingType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;
}