import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseRepository } from './course.repository';
import { PrismaCourseRepository } from './prisma-course.repository';

@Module({
  controllers: [CourseController],
  providers: [
    CourseService,
    { provide: CourseRepository, useClass: PrismaCourseRepository },
  ],
  exports: [CourseRepository],
})
export class CourseModule {}
