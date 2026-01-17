import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';
import { TestPrismaService } from '../prisma/test-prisma/test-prisma.service';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        { provide: PrismaService, useClass: TestPrismaService },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
  }, 60000);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
