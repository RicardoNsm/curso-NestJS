import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { CreateUserDTO, UpdateUserDTO, UserFullDTO, UserListemDTO } from './users.dto'
import { UsersService } from './users.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth/jwt-auth.guard'

@Controller({
  version: '1',
  path: 'users',
})
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiResponse({ type: [UserListemDTO] })
  findAll() {
    return this.userService.findAll()
  }

  @Get(':userId')
  @ApiResponse({ type: UserFullDTO })
  async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    const user = await this.userService.findById(userId)

    if (!user) {
      throw new NotFoundException('User Not Found')
    }
    return user
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data)
  }

  @Put(':userId')
  async update(@Param('userId', ParseUUIDPipe) userId: string, @Body() data: UpdateUserDTO) {
    return this.userService.update(userId, data)
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.userService.remove(userId)
  }
}
