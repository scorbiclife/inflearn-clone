import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma/prisma.service';
import { TestPrismaService } from '../prisma/test-prisma/test-prisma.service';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: PrismaService, useClass: TestPrismaService },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  }, 60000);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
