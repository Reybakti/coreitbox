import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Throttle } from '@nestjs/throttler';

import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @Throttle({
    default: {
      limit: 5,
      ttl: 60000,
    },
  })
  login(
    @Body()
    dto: LoginDto,
  ) {
    return this.authService.login(
      dto,
    );
  }

  @Post('refresh')
  @ApiOperation({
    summary:
      'Refresh Access Token',
  })
  refresh(
    @Body()
    dto: RefreshTokenDto,
  ) {
    return this.authService.refreshToken(
      dto.refreshToken,
    );
  }

  @Post('logout')
  @ApiOperation({
    summary:
      'Logout User',
  })
  logout(
    @Body()
    dto: RefreshTokenDto,
  ) {
    return this.authService.logout(
      dto.refreshToken,
    );
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Current User Profile',
  })
  profile(
    @Req() req: any,
  ) {
    return this.authService.me(
      req.user.sub,
    );
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Current User',
  })
  me(
    @Req() req: any,
  ) {
    return this.authService.me(
      req.user.sub,
    );
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Update Profile',
  })
  updateProfile(
    @Req() req: any,

    @Body()
    dto: UpdateProfileDto,
  ) {
    return this.authService.updateProfile(
      req.user.sub,
      dto,
    );
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Change Password',
  })
  changePassword(
    @Req() req: any,

    @Body()
    dto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(
      req.user.sub,
      dto,
    );
  }
}