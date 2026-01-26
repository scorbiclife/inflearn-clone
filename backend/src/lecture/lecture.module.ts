import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { LectureRepository } from './lecture.repository';
import { PrismaLectureRepository } from './prisma-lecture.repository';
import { SectionModule } from '../section/section.module';

@Module({
  controllers: [LectureController],
  providers: [
    LectureService,
    { provide: LectureRepository, useClass: PrismaLectureRepository },
  ],
  imports: [SectionModule],
  exports: [LectureRepository],
})
export class LectureModule {}
