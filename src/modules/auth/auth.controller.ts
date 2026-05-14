import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { SingInDTO, SingUpDTO } from './auth.dto'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'
import { AuthenticatedUser } from '../../common/decorators/authenticated-user.decorator'
import type { User } from '@prisma/client'

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('singup')
  async singUp(@Body() data: SingUpDTO) {
    return await this.authService.singup(data)
  }

  @Post('singin')
  @HttpCode(HttpStatus.OK)
  async singin(@Body() data: SingInDTO) {
    return await this.authService.signin(data)
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protected(@AuthenticatedUser() user: User){
    return {
      message: `Authenticated! ${user.email}`,
    }
  }
}

