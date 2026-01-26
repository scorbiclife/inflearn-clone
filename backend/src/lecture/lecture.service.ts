import { Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { LectureRepository } from './lecture.repository';
import { SectionRepository } from '../section/section.repository';

@Injectable()
export class LectureService {
  constructor(
    private readonly lectureRepository: LectureRepository,
    private readonly sectionRepository: SectionRepository,
  ) {}

  async create({
    sectionId,
    dto: createLectureDto,
  }: {
    sectionId: string;
    dto: CreateLectureDto;
  }) {
    // Get the section to find the courseId
    const section = await this.sectionRepository.findUniqueWithCourseId(sectionId);

    const order = await this.lectureRepository.countBySection(sectionId);
    return await this.lectureRepository.create({
      ...createLectureDto,
      sectionId,
      courseId: section?.courseId ?? null,
      order,
      description: '',
    });
  }

  async findOne(id: string) {
    return await this.lectureRepository.findUnique(id);
  }

  async update(id: string, updateLectureDto: UpdateLectureDto) {
    return await this.lectureRepository.update(id, updateLectureDto);
  }

  async remove(id: string) {
    return await this.lectureRepository.delete(id);
  }
}
