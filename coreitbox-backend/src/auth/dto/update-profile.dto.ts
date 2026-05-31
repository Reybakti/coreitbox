import {
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @MinLength(3)
  fullName: string;

  @IsEmail()
  email: string;
}