import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { FakeCategoryRepository } from './fake-category.repository';

describe('CategoryController', () => {
  let controller: CategoryController;
  let categoryRepository: FakeCategoryRepository;

  beforeEach(async () => {
    categoryRepository = new FakeCategoryRepository();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        CategoryService,
        { provide: CategoryRepository, useValue: categoryRepository },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  afterEach(() => {
    categoryRepository.clear();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
