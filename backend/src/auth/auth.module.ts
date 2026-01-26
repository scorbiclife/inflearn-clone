import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { CourseAuthorizationService } from './services/course-authorization.service';
import { CourseModule } from '../course/course.module';
import { SectionModule } from '../section/section.module';
import { LectureModule } from '../lecture/lecture.module';

@Global()
@Module({
  providers: [AccessTokenStrategy, CourseAuthorizationService],
  imports: [PassportModule, JwtModule.register({}), CourseModule, SectionModule, LectureModule],
  exports: [CourseAuthorizationService],
})
export class AuthModule {}
