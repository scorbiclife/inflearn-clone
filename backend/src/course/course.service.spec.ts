import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';
import { TestPrismaService } from '../prisma/test-prisma/test-prisma.service';

describe('CourseService', () => {
  let module: TestingModule;
  let service: CourseService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        CourseService,
        { provide: PrismaService, useClass: TestPrismaService },
      ],
    }).compile();

    await module.init();

    service = module.get<CourseService>(CourseService);
  }, 60000);

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
