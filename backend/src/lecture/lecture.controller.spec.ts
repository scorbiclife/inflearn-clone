import { Test, TestingModule } from '@nestjs/testing';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { LectureRepository } from './lecture.repository';
import { FakeLectureRepository } from './fake-lecture.repository';
import { SectionRepository } from '../section/section.repository';
import { FakeSectionRepository } from '../section/fake-section.repository';
import {
  LectureCreationGuard,
  LectureModificationGuard,
} from './lecture.guard';

describe('LectureController', () => {
  let controller: LectureController;
  let lectureRepository: FakeLectureRepository;
  let sectionRepository: FakeSectionRepository;

  beforeEach(async () => {
    lectureRepository = new FakeLectureRepository();
    sectionRepository = new FakeSectionRepository();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LectureController],
      providers: [
        LectureService,
        { provide: LectureRepository, useValue: lectureRepository },
        { provide: SectionRepository, useValue: sectionRepository },
      ],
    })
      .overrideGuard(LectureCreationGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(LectureModificationGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<LectureController>(LectureController);
  });

  afterEach(() => {
    lectureRepository.clear();
    sectionRepository.clear();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
