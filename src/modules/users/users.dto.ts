import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateUserDTO {
  @ApiProperty({ description: 'User name' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'User email' , uniqueItems: true})
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ description: 'User password' , minLength: 6})
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty({
    description: 'User role',
    enum: Role,
    default: Role.ADMIN,
    required: false
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role = Role.ADMIN
}


export class UpdateUserDTO {
  @ApiProperty({ description: "User name"})
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({
    description: 'User role',
    enum: Role,
    default: Role.ADMIN,
    required: false
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role
}

export class UserListemDTO {
  @ApiProperty() id: string
  @ApiProperty() name: string
  @ApiProperty() email: string
  @ApiProperty() avata: string
  @ApiProperty() role: string
  @ApiProperty() createdAt: string
  @ApiProperty() updatedAt: string
}

class USerProjectDTO {
  @ApiProperty() id: string
  @ApiProperty() name: string
  @ApiProperty({nullable: true, required: false}) description: string
}
export class UserFullDTO extends UserListemDTO {
  @ApiProperty({type: [USerProjectDTO] })
  createdProjects: USerProjectDTO[]
}
