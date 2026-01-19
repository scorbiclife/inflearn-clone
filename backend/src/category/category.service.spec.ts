import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { FakeCategoryRepository } from './fake-category.repository';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: FakeCategoryRepository;

  beforeEach(async () => {
    categoryRepository = new FakeCategoryRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: CategoryRepository, useValue: categoryRepository },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  afterEach(() => {
    categoryRepository.clear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all categories', async () => {
      const now = new Date();
      categoryRepository.seed([
        {
          id: 'cat-1',
          name: 'Web Development',
          slug: 'web-development',
          description: 'Web dev courses',
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'cat-2',
          name: 'Mobile Development',
          slug: 'mobile-development',
          description: 'Mobile dev courses',
          createdAt: now,
          updatedAt: now,
        },
      ]);

      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Web Development');
      expect(result[1].name).toBe('Mobile Development');
    });

    it('should return empty array when no categories exist', async () => {
      const result = await service.findAll();

      expect(result).toHaveLength(0);
    });
  });
});
