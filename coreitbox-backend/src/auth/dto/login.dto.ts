import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'sysadmin',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'Admin@123',
  })
  @IsString()
  password: string;
}