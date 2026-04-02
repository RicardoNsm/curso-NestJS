import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from '../../prisma.service';
import { Reflector } from '@nestjs/core';
import { VALIDATE_RESOURCES_IDS_KEY } from '../../consts';

@Injectable()
export class ValidateResourcesIdsInterceptor implements NestInterceptor {

  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService
  ) {}


  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<Request>> {

    // Validar se o endpoint tem o decorator @ValidateResourcesIds()

    const shouldValidate = this.reflector.get<boolean>(VALIDATE_RESOURCES_IDS_KEY, context.getHandler())

    if(!shouldValidate){
      return next.handle();
    }

    // validar o projectId da url
    const request = context.switchToHttp().getRequest();
    const projectId = request.params.projectId

    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId
      }
    })

    if(!project){
      throw new NotFoundException('project not found')
    }

    // validar o taskId da url, caso exista

    const taskId = request.params.taskID

    if(taskId) {
      const task = await this.prisma.task.findFirst({
        where: {
          projectId: projectId,
          id: taskId
        }
      })

      if(!task){
        throw new NotFoundException('task not found')
      }
    }

    return next.handle();
  }
}
