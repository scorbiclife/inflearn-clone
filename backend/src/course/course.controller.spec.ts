import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseRepository } from './course.repository';
import { FakeCourseRepository } from './fake-course.repository';
import { CourseGuard } from './course.guard';

describe('CourseController', () => {
  let controller: CourseController;
  let courseRepository: FakeCourseRepository;

  beforeEach(async () => {
    courseRepository = new FakeCourseRepository();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        CourseService,
        { provide: CourseRepository, useValue: courseRepository },
      ],
    })
      .overrideGuard(CourseGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<CourseController>(CourseController);
  });

  afterEach(() => {
    courseRepository.clear();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
