import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { CourseModule } from '../course/course.module';
import { SectionRepository } from './section.repository';
import { PrismaSectionRepository } from './prisma-section.repository';

@Module({
  controllers: [SectionController],
  providers: [
    SectionService,
    { provide: SectionRepository, useClass: PrismaSectionRepository },
  ],
  imports: [CourseModule],
})
export class SectionModule {}
