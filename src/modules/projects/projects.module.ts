import { Module } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { ProjectsController } from './projects.controller'
import { ProjectsService } from './projects.service'
import { RequestContextService } from '../../common/services/request-context/request-context.service'

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService, RequestContextService],
})
export class ProjectsModule {}
