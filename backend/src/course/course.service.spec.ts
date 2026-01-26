import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { CourseRepository } from './course.repository';
import { FakeCourseRepository } from './fake-course.repository';

describe('CourseService', () => {
  let service: CourseService;
  let courseRepository: FakeCourseRepository;

  beforeEach(async () => {
    courseRepository = new FakeCourseRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        { provide: CourseRepository, useValue: courseRepository },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
  });

  afterEach(() => {
    courseRepository.clear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a course with slug', async () => {
      const result = await service.create(
        {
          title: 'My Course',
          categoryIds: [],
        },
        'user-1',
      );

      expect(result.title).toBe('My Course');
      expect(result.slug).toMatch(/^my-course-[a-z0-9]+$/);
      expect(result.instructorId).toBe('user-1');
    });
  });

  describe('findAll', () => {
    it('should return all courses', async () => {
      await service.create({ title: 'Course 1', categoryIds: [] }, 'user-1');
      await service.create({ title: 'Course 2', categoryIds: [] }, 'user-1');

      const result = await service.findAll({ take: 10 });

      expect(result).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('should return a course by id', async () => {
      const created = await service.create(
        { title: 'Find Me', categoryIds: [] },
        'user-1',
      );

      const result = await service.findOne(created.id);

      expect(result).toBeDefined();
      expect(result?.title).toBe('Find Me');
    });

    it('should return null for non-existent course', async () => {
      const result = await service.findOne('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a course', async () => {
      const created = await service.create(
        { title: 'Original', categoryIds: [] },
        'user-1',
      );

      const result = await service.update(created.id, { title: 'Updated' });

      expect(result?.title).toBe('Updated');
    });
  });

  describe('remove', () => {
    it('should delete a course', async () => {
      const created = await service.create(
        { title: 'Delete Me', categoryIds: [] },
        'user-1',
      );

      await service.remove(created.id);

      const result = await service.findOne(created.id);
      expect(result).toBeNull();
    });
  });
});
