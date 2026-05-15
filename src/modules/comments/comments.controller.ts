import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger'
import { ValidateResourcesIds } from '../../common/decorators/validate-resources-ids.decorator'
import { ValidateResourcesIdsInterceptor } from '../../common/interceptors/validate-resources-ids.interceptor'
import { CommentFullDTO, CommentListenDTO, CommentRequestDTO } from './comments.dto'
import { CommentsService } from './comments.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth/jwt-auth.guard'

@Controller({
  version: '1',
  path: 'projects/:projectId/tasks/:taskId/comments',
})
@UseInterceptors(ValidateResourcesIdsInterceptor)
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ValidateResourcesIds()
  @ApiOkResponse({ type: [CommentListenDTO], description: 'GET all comments by task' })
  findAll(@Param('taskId', ParseUUIDPipe) taskId: string) {
    return this.commentsService.findAllByTask(taskId)
  }

  @Get('commentId')
  @ValidateResourcesIds()
  @ApiOkResponse({ type: CommentFullDTO, description: 'GET comment by id' })
  findOne(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ) {
    this.commentsService.findById(taskId, commentId)
  }

  @Post()
  @ValidateResourcesIds()
  @ApiCreatedResponse({ type: CommentListenDTO, description: 'create a new comment' })
  @HttpCode(HttpStatus.CREATED)
  create(@Param('taskId', ParseUUIDPipe) taskId: string, @Body() data: CommentRequestDTO) {
    return this.commentsService.create(taskId, data)
  }

  @Put(':commentID')
  @ValidateResourcesIds()
  @ApiOkResponse({ type: CommentListenDTO, description: 'Update a comment' })
  @HttpCode(HttpStatus.OK)
  update(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Body() data: CommentRequestDTO,
  ) {
    return this.commentsService.update(taskId, commentId, data)
  }

  @Delete(':commentId')
  @ValidateResourcesIds()
  @ApiNoContentResponse({ description: 'Delete a comment'})
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('taskId', ParseUUIDPipe) taskId: string,
@Param('commentId', ParseUUIDPipe) commentId: string){
  return this.commentsService.remove(taskId, commentId)
}
}
