import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { randomUUID } from 'crypto';

import { PrismaService } from '../prisma/prisma.service';

import { LoginDto } from './dto/login.dto';

import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    dto: LoginDto,
  ) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          username: dto.username,
        },
      });

    if (!user) {
      throw new UnauthorizedException(
        'Username atau password salah',
      );
    }

    const isMatch =
      await bcrypt.compare(
        dto.password,
        user.password,
      );

    if (!isMatch) {
      throw new UnauthorizedException(
        'Username atau password salah',
      );
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    const accessToken =
      await this.jwtService.signAsync(
        payload,
      );

    const refreshToken =
      randomUUID();

    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,

        userId: user.id,

        expiresAt: new Date(
          Date.now() +
            7 *
              24 *
              60 *
              60 *
              1000,
        ),
      },
    });

    await this.prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        lastLoginAt:
          new Date(),
      },
    });

    return {
      user: {
        id: user.id,

        username:
          user.username,

        email:
          user.email,

        fullName:
          user.fullName,

        role:
          user.role,
      },

      accessToken,

      refreshToken,
    };
  }

  async refreshToken(
    refreshToken: string,
  ) {
    const token =
      await this.prisma.refreshToken.findUnique({
        where: {
          token:
            refreshToken,
        },

        include: {
          user: true,
        },
      });

    if (!token) {
      throw new UnauthorizedException(
        'Refresh token invalid',
      );
    }

    if (
      token.expiresAt <
      new Date()
    ) {
      throw new UnauthorizedException(
        'Refresh token expired',
      );
    }

    const payload = {
      sub:
        token.user.id,

      username:
        token.user.username,

      role:
        token.user.role,
    };

    const accessToken =
      await this.jwtService.signAsync(
        payload,
      );

    return {
      accessToken,
    };
  }

  async logout(
    refreshToken: string,
  ) {
    await this.prisma.refreshToken.deleteMany({
      where: {
        token:
          refreshToken,
      },
    });

    return {
      message:
        'Logout berhasil',
    };
  }

  async me(
    userId: string,
  ) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },

      select: {
        id: true,

        username: true,

        email: true,

        fullName: true,

        role: true,

        status: true,

        lastLoginAt: true,

        createdAt: true,
      },
    });
  }

  async updateProfile(
    userId: string,
    dto: UpdateProfileDto,
  ) {
    const existing =
      await this.prisma.user.findFirst({
        where: {
          email:
            dto.email,

          NOT: {
            id: userId,
          },
        },
      });

    if (existing) {
      throw new BadRequestException(
        'Email sudah digunakan',
      );
    }

    return this.prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        fullName:
          dto.fullName,

        email:
          dto.email,
      },

      select: {
        id: true,

        username: true,

        email: true,

        fullName: true,

        role: true,

        status: true,

        lastLoginAt: true,

        createdAt: true,
      },
    });
  }

  async changePassword(
    userId: string,
    dto: ChangePasswordDto,
  ) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (!user) {
      throw new UnauthorizedException(
        'User tidak ditemukan',
      );
    }

    const valid =
      await bcrypt.compare(
        dto.currentPassword,
        user.password,
      );

    if (!valid) {
      throw new BadRequestException(
        'Password lama salah',
      );
    }

    const hash =
      await bcrypt.hash(
        dto.newPassword,
        10,
      );

    await this.prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        password: hash,
      },
    });

    return {
      message:
        'Password berhasil diubah',
    };
  }
}