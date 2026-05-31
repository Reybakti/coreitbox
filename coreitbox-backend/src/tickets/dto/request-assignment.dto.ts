import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsOptional,
  IsString,
} from 'class-validator';

export class RequestAssignmentDto {
  @ApiPropertyOptional({
    example:
      'Saya siap menangani ticket ini',
  })
  @IsOptional()
  @IsString()
  note?: string;
}