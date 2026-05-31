import { ApiProperty } from '@nestjs/swagger';

import {
  IsEnum,
  IsString,
} from 'class-validator';

import {
  TicketPriority,
} from '@prisma/client';

export class CreateTicketDto {
  @ApiProperty({
    example:
      'Printer Epson tidak bisa mencetak',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'Muncul error paper jam',
  })
  @IsString()
  description: string;

  @ApiProperty({
    enum: TicketPriority,
  })
  @IsEnum(TicketPriority)
  priority: TicketPriority;

  @ApiProperty({
    example:
      '68a819c1-ec1e-4ab0-a2e5-e34c74af1ab1',
  })
  @IsString()
  categoryId: string;
}