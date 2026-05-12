import { Injectable } from '@nestjs/common';
import { SingUpDTO } from './auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ){}
  async singUp(data: SingUpDTO){
    // criptografar senha

    const hash = await bcrypt.hash(data.password, 12)
    //salvar usuario no banco de dados
    const newUser = await this.userService.create({
      ...data,
      password: hash
    })
    //retornar o token jwt de acesso
  }
}
