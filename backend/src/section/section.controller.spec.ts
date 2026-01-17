import { Test, TestingModule } from '@nestjs/testing';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { PrismaService } from '../prisma/prisma.service';
import { TestPrismaService } from '../prisma/test-prisma/test-prisma.service';
import {
  SectionCreationGuard,
  SectionModificationGuard,
} from './section.guard';

describe('SectionController', () => {
  let controller: SectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionController],
      providers: [
        SectionService,
        { provide: PrismaService, useClass: TestPrismaService },
      ],
    })
      .overrideGuard(SectionCreationGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(SectionModificationGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<SectionController>(SectionController);
  }, 60000);

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
