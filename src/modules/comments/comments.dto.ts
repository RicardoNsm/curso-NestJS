import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CommentRequestDTO {
  @ApiProperty({ description: 'Comment content' })
  @IsString()
  @IsNotEmpty()
  content: string
}

class CommentAuthorDTO {
  @ApiProperty() id: string
  @ApiProperty() name: string
  @ApiProperty() email: string
  @ApiProperty({ nullable: true }) avatar: string
}

export class CommentListenDTO {
  @ApiProperty() id: string
  @ApiProperty() content: string
  @ApiProperty() authorId: string
  @ApiProperty() taskId: string
  @ApiProperty({ format: 'date-time' }) createdAt: string
  @ApiProperty({ format: 'date-time' }) updatedAt: string

  @ApiProperty({ type: CommentAuthorDTO })
  author: CommentAuthorDTO
}

class CommentTaskDTO {
  @ApiProperty() id: string
  @ApiProperty() title: string
  @ApiProperty() projectId: string
}

export class CommentFullDTO extends CommentListenDTO {
  @ApiProperty({ type: CommentTaskDTO})
  task: CommentTaskDTO
}
