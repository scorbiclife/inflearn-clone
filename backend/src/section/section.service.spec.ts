import { Test, TestingModule } from '@nestjs/testing';
import { SectionService } from './section.service';
import { PrismaService } from '../prisma/prisma.service';
import { TestPrismaService } from '../prisma/test-prisma/test-prisma.service';

describe('SectionService', () => {
  let service: SectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionService,
        { provide: PrismaService, useClass: TestPrismaService },
      ],
    }).compile();

    service = module.get<SectionService>(SectionService);
  }, 60000);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
