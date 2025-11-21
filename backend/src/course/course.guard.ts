import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { CourseAuthorizationService } from '../auth/services/course-authorization.service';

@Injectable()
export class CourseGuard implements CanActivate {
  constructor(
    private readonly courseAuthorizationService: CourseAuthorizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const courseId = request.params['id'];
    const userId = request.user!.sub;
    return await this.courseAuthorizationService.canModifyCourseFromUser(
      courseId,
      userId,
    );
  }
}
