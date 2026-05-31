import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'Admin@123',
  })
  @IsString()
  password: string;
}