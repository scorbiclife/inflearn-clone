import { Test, TestingModule } from '@nestjs/testing';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { SectionRepository } from './section.repository';
import { FakeSectionRepository } from './fake-section.repository';
import {
  SectionCreationGuard,
  SectionModificationGuard,
} from './section.guard';

describe('SectionController', () => {
  let controller: SectionController;
  let sectionRepository: FakeSectionRepository;

  beforeEach(async () => {
    sectionRepository = new FakeSectionRepository();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionController],
      providers: [
        SectionService,
        { provide: SectionRepository, useValue: sectionRepository },
      ],
    })
      .overrideGuard(SectionCreationGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(SectionModificationGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<SectionController>(SectionController);
  });

  afterEach(() => {
    sectionRepository.clear();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
