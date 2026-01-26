import { Test, TestingModule } from '@nestjs/testing';
import { SectionService } from './section.service';
import { SectionRepository } from './section.repository';
import { FakeSectionRepository } from './fake-section.repository';

describe('SectionService', () => {
  let service: SectionService;
  let sectionRepository: FakeSectionRepository;

  beforeEach(async () => {
    sectionRepository = new FakeSectionRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionService,
        { provide: SectionRepository, useValue: sectionRepository },
      ],
    }).compile();

    service = module.get<SectionService>(SectionService);
  });

  afterEach(() => {
    sectionRepository.clear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a section with order 0 for first section', async () => {
      const result = await service.create(
        { title: 'Section 1', description: 'First section' },
        'course-1',
      );

      expect(result.title).toBe('Section 1');
      expect(result.description).toBe('First section');
      expect(result.courseId).toBe('course-1');
      expect(result.order).toBe(0);
    });

    it('should auto-increment order for subsequent sections', async () => {
      await service.create({ title: 'Section 1' }, 'course-1');
      await service.create({ title: 'Section 2' }, 'course-1');
      const result = await service.create({ title: 'Section 3' }, 'course-1');

      expect(result.order).toBe(2);
    });

    it('should use empty string for undefined description', async () => {
      const result = await service.create({ title: 'Section 1' }, 'course-1');

      expect(result.description).toBe('');
    });
  });

  describe('findOne', () => {
    it('should return a section by id', async () => {
      const created = await service.create({ title: 'Find Me' }, 'course-1');

      const result = await service.findOne(created.id);

      expect(result).toBeDefined();
      expect(result?.title).toBe('Find Me');
    });

    it('should return null for non-existent section', async () => {
      const result = await service.findOne('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a section', async () => {
      const created = await service.create(
        { title: 'Original', description: 'Original desc' },
        'course-1',
      );

      const result = await service.update(created.id, { title: 'Updated' });

      expect(result?.title).toBe('Updated');
      expect(result?.description).toBe('Original desc');
    });
  });

  describe('remove', () => {
    it('should delete a section', async () => {
      const created = await service.create({ title: 'Delete Me' }, 'course-1');

      await service.remove(created.id);

      const result = await service.findOne(created.id);
      expect(result).toBeNull();
    });
  });
});
