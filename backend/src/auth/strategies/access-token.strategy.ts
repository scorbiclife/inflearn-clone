import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

type JwtPayload = {
  sub: string;
  email?: string;
  name?: string;
  iat?: number;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  JwtStrategy,
  'jwt-access-token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET!,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
