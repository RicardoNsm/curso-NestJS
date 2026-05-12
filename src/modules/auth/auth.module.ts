import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Module({
  providers: [AuthService, PrismaService,JwtService,UsersService],
  controllers: [AuthController]
})
export class AuthModule {}
