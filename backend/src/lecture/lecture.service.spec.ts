import { Test, TestingModule } from '@nestjs/testing';
import { LectureService } from './lecture.service';
import { PrismaService } from '../prisma/prisma.service';
import { TestPrismaService } from '../prisma/test-prisma/test-prisma.service';

describe('LectureService', () => {
  let module: TestingModule;
  let service: LectureService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        LectureService,
        { provide: PrismaService, useClass: TestPrismaService },
      ],
    }).compile();

    await module.init();

    service = module.get<LectureService>(LectureService);
  }, 60000);

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
