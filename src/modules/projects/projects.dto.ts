import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class ProjectRequestDTO {
  @ApiProperty({ description: 'project name' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'project description', required: false })
  @IsString()
  description: string
}

export class ProjectListItemDTO {
  @ApiProperty() id: string
  @ApiProperty() name: string
  @ApiProperty() description: string
  @ApiProperty({ format: 'date-time' }) createdAT: string
  @ApiProperty({ format: 'date-time' }) updatedAT: string
}
