import { Test, TestingModule } from '@nestjs/testing';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { PrismaService } from '../prisma/prisma.service';
import { TestPrismaService } from '../prisma/test-prisma/test-prisma.service';
import {
  LectureCreationGuard,
  LectureModificationGuard,
} from './lecture.guard';

describe('LectureController', () => {
  let controller: LectureController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [LectureController],
      providers: [
        LectureService,
        { provide: PrismaService, useClass: TestPrismaService },
      ],
    })
      .overrideGuard(LectureCreationGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(LectureModificationGuard)
      .useValue({ canActivate: () => true })
      .compile();
    controller = moduleRef.get<LectureController>(LectureController);
  }, 60000);

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
