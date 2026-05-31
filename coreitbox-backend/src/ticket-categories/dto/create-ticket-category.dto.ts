import { ApiProperty } from '@nestjs/swagger';

import {
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTicketCategoryDto {
  @ApiProperty({
    example: 'Email',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example:
      'Email dan akun',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}