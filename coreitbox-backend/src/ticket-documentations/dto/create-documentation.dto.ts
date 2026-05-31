import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDocumentationDto {
  @ApiProperty({
    example:
      'Membersihkan sensor paper feed',
  })
  @IsString()
  description: string;
}