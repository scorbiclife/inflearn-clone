import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { CourseAuthorizationService } from '../auth/services/course-authorization.service';
import { UserIdService } from '../auth/services/user-id.service';

@Injectable()
export class LectureCreationGuard implements CanActivate {
  constructor(
    private readonly courseAuthorizationService: CourseAuthorizationService,
    private readonly userIdService: UserIdService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = this.userIdService.getUserIdFromRequest(request);
    if (!userId) {
      return false;
    }
    return this.courseAuthorizationService.canCreateLectureFromUser({
      sectionId: request.params.sectionId,
      userId,
    });
  }
}

@Injectable()
export class LectureModificationGuard implements CanActivate {
  constructor(
    private readonly courseAuthorizationService: CourseAuthorizationService,
    private readonly userIdService: UserIdService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = this.userIdService.getUserIdFromRequest(request);
    if (!userId) {
      return false;
    }
    return this.courseAuthorizationService.canModifyLectureFromUser({
      lectureId: request.params.lectureId,
      userId,
    });
  }
}
