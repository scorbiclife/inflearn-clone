import { Test, TestingModule } from '@nestjs/testing';
import { SectionService } from './section.service';
import { PrismaService } from '../prisma/prisma.service';
import { TestPrismaService } from '../prisma/test-prisma/test-prisma.service';

describe('SectionService', () => {
  let module: TestingModule;
  let service: SectionService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        SectionService,
        { provide: PrismaService, useClass: TestPrismaService },
      ],
    }).compile();

    await module.init();

    service = module.get<SectionService>(SectionService);
  }, 60000);

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
