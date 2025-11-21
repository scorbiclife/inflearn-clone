import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UserIdService {
  getUserIdFromRequest(request: Request): string | null {
    return request?.user?.sub || null;
  }
}
