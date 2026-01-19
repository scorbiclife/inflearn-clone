import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma/prisma.service';
import { TestPrismaService } from '../prisma/test-prisma/test-prisma.service';

describe('CategoryService', () => {
  let module: TestingModule;
  let service: CategoryService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: PrismaService, useClass: TestPrismaService },
      ],
    }).compile();

    await module.init();

    service = module.get<CategoryService>(CategoryService);
  }, 60000);

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
