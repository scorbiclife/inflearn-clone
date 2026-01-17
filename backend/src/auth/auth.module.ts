import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { CourseAuthorizationService } from './services/course-authorization.service';

@Global()
@Module({
  providers: [AccessTokenStrategy, CourseAuthorizationService],
  imports: [PassportModule, JwtModule.register({})],
  exports: [CourseAuthorizationService],
})
export class AuthModule {}
