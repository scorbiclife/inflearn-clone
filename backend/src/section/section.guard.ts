import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CourseAuthorizationService } from '../auth/services/course-authorization.service';
import type { Request } from 'express';

@Injectable()
export class SectionCreationGuard implements CanActivate {
  constructor(
    private readonly courseAuthorizationService: CourseAuthorizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = request?.user?.sub;
    if (!userId) {
      return false;
    }
    const courseId = request.params['courseId'];
    return await this.courseAuthorizationService.canCreateSectionFromUser(
      courseId,
      userId,
    );
  }
}

@Injectable()
export class SectionModificationGuard implements CanActivate {
  constructor(
    private readonly courseAuthorizationService: CourseAuthorizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = request?.user?.sub;
    if (!userId) {
      return false;
    }
    const sectionId = request.params['id'];
    if (!sectionId) {
      return false;
    }
    return await this.courseAuthorizationService.canModifySectionFromUser(
      sectionId,
      userId,
    );
  }
}
