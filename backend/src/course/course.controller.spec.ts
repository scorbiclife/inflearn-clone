import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TestPrismaService } from '../prisma/test-prisma/test-prisma.service';
import { PrismaService } from '../prisma/prisma.service';
import { CourseGuard } from './course.guard';

describe('CourseController', () => {
  let controller: CourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        CourseService,
        { provide: PrismaService, useClass: TestPrismaService },
      ],
    })
      .overrideGuard(CourseGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<CourseController>(CourseController);
  }, 60000);

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
