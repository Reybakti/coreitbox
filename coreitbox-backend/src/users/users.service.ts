import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import {
  UserStatus,
} from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateUserDto,
  ) {
    const exists =
      await this.prisma.user.findFirst({
        where: {
          OR: [
            {
              username: dto.username,
            },
            {
              email: dto.email,
            },
          ],
        },
      });

    if (exists) {
      throw new ConflictException(
        'User already exists',
      );
    }

    const password =
      await bcrypt.hash(
        dto.password,
        10,
      );

    return this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        fullName: dto.fullName,
        password,
        role: dto.role,
      },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        role: true,
        status: true,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        role: true,
        status: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(
    id: string,
    dto: UpdateUserDto,
  ) {
    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  async activate(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        status: UserStatus.ACTIVE,
      },
    });
  }

  async deactivate(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        status: UserStatus.INACTIVE,
      },
    });
  }

  async resetPassword(
    id: string,
    password: string,
  ) {
    const hashed =
      await bcrypt.hash(
        password,
        10,
      );

    return this.prisma.user.update({
      where: { id },
      data: {
        password: hashed,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}