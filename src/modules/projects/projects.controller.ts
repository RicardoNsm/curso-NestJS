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
import { ApiResponse } from '@nestjs/swagger'
import { ValidateResourcesIds } from '../../common/decorators/validate-resources-ids.decorator'
import { ValidateResourcesIdsInterceptor } from '../../common/interceptors/validate-resources-ids.interceptor'
import { ProjectFullDTO, ProjectListItemDTO, ProjectRequestDTO } from './projects.dto'
import { ProjectsService } from './projects.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth/jwt-auth.guard'

@Controller({
  version: '1',
  path: 'projects',
})
@UseInterceptors(ValidateResourcesIdsInterceptor)
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiResponse({
    type: [ProjectListItemDTO],
  })
  findAll() {
    return this.projectsService.findAll()
  }

  @Get(':projectId')
  @ApiResponse({
    type: ProjectFullDTO,
  })
  @ValidateResourcesIds()
  async findOne(@Param('projectId', ParseUUIDPipe) projectId: string) {
    const project = await this.projectsService.findById(projectId)

    return project
  }

  @Post()
  @ApiResponse({
    type: ProjectListItemDTO,
  })
  create(@Body() data: ProjectRequestDTO) {
    return this.projectsService.create(data)
  }

  @Put(':projectId')
  @ApiResponse({
    type: ProjectListItemDTO,
  })
  @ValidateResourcesIds()
  async update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() data: ProjectRequestDTO,
  ) {
    return this.projectsService.update(projectId, data)
  }

  @Delete(':projectId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ValidateResourcesIds()
  async remove(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return this.projectsService.remove(projectId)
  }
}
