import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { CourseService } from './course.service';

@Injectable()
export class CourseGuard implements CanActivate {
  constructor(private readonly courseService: CourseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const courseId = request.params['id'];
    const userId = request.user!.sub;
    return await this.courseService.isAuthorizedToUser(courseId, userId);
  }
}
