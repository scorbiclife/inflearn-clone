import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { CourseModule } from '../course/course.module';

@Module({
  controllers: [SectionController],
  providers: [SectionService],
  imports: [CourseModule],
})
export class SectionModule {}
