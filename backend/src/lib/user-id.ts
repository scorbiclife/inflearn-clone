import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export function getUserIdFromRequest(ctx: ExecutionContext): string | null {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request?.user?.sub ?? null;
}

export const UserId = createParamDecorator((data, ctx) =>
  getUserIdFromRequest(ctx),
);
