import { ApiProperty } from '@nestjs/swagger';

import {
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty({
    example:
      'Roller Printer Epson',
  })
  @IsString()
  materialName: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 'pcs',
  })
  @IsString()
  unit: string;

  @ApiProperty({
    example:
      'Penggantian roller aus',
    required: false,
  })
  @IsOptional()
  @IsString()
  note?: string;
}