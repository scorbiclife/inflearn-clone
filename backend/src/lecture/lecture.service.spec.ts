import { Test, TestingModule } from '@nestjs/testing';
import { LectureService } from './lecture.service';
import { LectureRepository } from './lecture.repository';
import { FakeLectureRepository } from './fake-lecture.repository';
import { SectionRepository } from '../section/section.repository';
import { FakeSectionRepository } from '../section/fake-section.repository';

describe('LectureService', () => {
  let service: LectureService;
  let lectureRepository: FakeLectureRepository;
  let sectionRepository: FakeSectionRepository;

  beforeEach(async () => {
    lectureRepository = new FakeLectureRepository();
    sectionRepository = new FakeSectionRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LectureService,
        { provide: LectureRepository, useValue: lectureRepository },
        { provide: SectionRepository, useValue: sectionRepository },
      ],
    }).compile();

    service = module.get<LectureService>(LectureService);
  });

  afterEach(() => {
    lectureRepository.clear();
    sectionRepository.clear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a lecture with order 0 for first lecture', async () => {
      // Create a section first
      const section = await sectionRepository.create({
        title: 'Section 1',
        description: 'First section',
        courseId: 'course-1',
      });

      const result = await service.create({
        sectionId: section.id,
        dto: { title: 'Lecture 1' },
      });

      expect(result.title).toBe('Lecture 1');
      expect(result.sectionId).toBe(section.id);
      expect(result.courseId).toBe('course-1');
      expect(result.order).toBe(0);
    });

    it('should auto-increment order for subsequent lectures', async () => {
      const section = await sectionRepository.create({
        title: 'Section 1',
        description: 'First section',
        courseId: 'course-1',
      });

      await service.create({ sectionId: section.id, dto: { title: 'Lecture 1' } });
      await service.create({ sectionId: section.id, dto: { title: 'Lecture 2' } });
      const result = await service.create({
        sectionId: section.id,
        dto: { title: 'Lecture 3' },
      });

      expect(result.order).toBe(2);
    });
  });

  describe('findOne', () => {
    it('should return a lecture by id', async () => {
      const section = await sectionRepository.create({
        title: 'Section 1',
        description: 'First section',
        courseId: 'course-1',
      });

      const created = await service.create({
        sectionId: section.id,
        dto: { title: 'Find Me' },
      });

      const result = await service.findOne(created.id);

      expect(result).toBeDefined();
      expect(result?.title).toBe('Find Me');
    });

    it('should return null for non-existent lecture', async () => {
      const result = await service.findOne('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a lecture', async () => {
      const section = await sectionRepository.create({
        title: 'Section 1',
        description: 'First section',
        courseId: 'course-1',
      });

      const created = await service.create({
        sectionId: section.id,
        dto: { title: 'Original' },
      });

      const result = await service.update(created.id, { title: 'Updated' });

      expect(result?.title).toBe('Updated');
    });
  });

  describe('remove', () => {
    it('should delete a lecture', async () => {
      const section = await sectionRepository.create({
        title: 'Section 1',
        description: 'First section',
        courseId: 'course-1',
      });

      const created = await service.create({
        sectionId: section.id,
        dto: { title: 'Delete Me' },
      });

      await service.remove(created.id);

      const result = await service.findOne(created.id);
      expect(result).toBeNull();
    });
  });
});
