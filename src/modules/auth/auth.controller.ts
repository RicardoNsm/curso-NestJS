import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { SingUpDTO } from './auth.dto';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ){}

  @Post()
  singUp(@Body() data: SingUpDTO){
    return this.authService.singUp(data)
  }
}
