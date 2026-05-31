import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('users')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles('SYSADMIN')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(
    @Body()
    dto: CreateUserDto,
  ) {
    return this.usersService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    dto: UpdateUserDto,
  ) {
    return this.usersService.update(
      id,
      dto,
    );
  }

  @Patch(':id/activate')
  activate(
    @Param('id') id: string,
  ) {
    return this.usersService.activate(id);
  }

  @Patch(':id/deactivate')
  deactivate(
    @Param('id') id: string,
  ) {
    return this.usersService.deactivate(
      id,
    );
  }

  @Patch(':id/reset-password')
  resetPassword(
    @Param('id') id: string,
    @Body()
    body: {
      password: string;
    },
  ) {
    return this.usersService.resetPassword(
      id,
      body.password,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.usersService.remove(id);
  }
}