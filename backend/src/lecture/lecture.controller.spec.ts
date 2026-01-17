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

describe('LectureController with TestPrismaService', () => {
  let controller: LectureController;
  let testPrismaService: TestPrismaService;

  beforeEach(async () => {
    testPrismaService = new TestPrismaService();
    await testPrismaService.onModuleInit();
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [LectureController],
      providers: [
        LectureService,
        { provide: PrismaService, useValue: testPrismaService },
      ],
    })
      .overrideGuard(LectureCreationGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(LectureModificationGuard)
      .useValue({ canActivate: () => true })
      .compile();
    controller = moduleRef.get<LectureController>(LectureController);
  }, 60000);

  afterEach(async () => {
    await testPrismaService.onModuleDestroy();
  });

  it(
    'should run a test container',
    async () => {
      // 1. Insert data into the database
      const created = await testPrismaService.prisma.test.create({
        data: {},
      });
      expect(created.id).toBeDefined();

      // 2. Verify the data exists
      const found = await testPrismaService.prisma.test.findUnique({
        where: { id: created.id },
      });
      expect(found).not.toBeNull();
      expect(found?.id).toBe(created.id);

      // 3. Reset the database
      await testPrismaService.reset();

      // 4. Verify the data is gone after reset
      const afterReset = await testPrismaService.prisma.test.findMany();
      expect(afterReset).toEqual([]);
    },
    60000,
  );
});
