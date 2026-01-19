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
  let module: TestingModule;
  let controller: SectionController;

  beforeEach(async () => {
    module = await Test.createTestingModule({
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

    await module.init();

    controller = module.get<SectionController>(SectionController);
  }, 60000);

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
