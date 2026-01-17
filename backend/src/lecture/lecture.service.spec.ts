import { Test, TestingModule } from '@nestjs/testing';
import { LectureService } from './lecture.service';
import { PrismaService } from '../prisma/prisma.service';
import { TestPrismaService } from '../prisma/test-prisma/test-prisma.service';

describe('LectureService', () => {
  let service: LectureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LectureService,
        { provide: PrismaService, useClass: TestPrismaService },
      ],
    }).compile();

    service = module.get<LectureService>(LectureService);
  }, 60000);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
