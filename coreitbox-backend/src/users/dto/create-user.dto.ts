import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsString,
} from 'class-validator';

import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({
    example: 'admin1',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'admin@coreitbox.local',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Administrator',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    example: 'Admin@123',
  })
  @IsString()
  password: string;

  @ApiProperty({
    enum: ['SYSADMIN', 'ADMIN', 'TEKNISI'],
    example: 'ADMIN',
  })
  @IsEnum(UserRole)
  role: UserRole;
}