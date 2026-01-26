import { Injectable } from '@nestjs/common';
import { CourseRepository } from '../../course/course.repository';
import { SectionRepository } from '../../section/section.repository';
import { LectureRepository } from '../../lecture/lecture.repository';

@Injectable()
export class CourseAuthorizationService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly sectionRepository: SectionRepository,
    private readonly lectureRepository: LectureRepository,
  ) {}

  async canModifyCourseFromUser(
    courseId: string,
    userId: string,
  ): Promise<boolean> {
    const course = await this.courseRepository.findUniqueWithInstructorId(courseId);
    return course?.instructorId === userId;
  }

  async canCreateSectionFromUser(
    courseId: string,
    userId: string,
  ): Promise<boolean> {
    return await this.canModifyCourseFromUser(courseId, userId);
  }

  async canModifySectionFromUser(
    sectionId: string,
    userId: string,
  ): Promise<boolean> {
    const section = await this.sectionRepository.findUniqueWithCourseId(sectionId);
    return section && section.courseId
      ? await this.canModifyCourseFromUser(section.courseId, userId)
      : false;
  }

  async canCreateLectureFromUser({
    sectionId,
    userId,
  }: {
    sectionId: string;
    userId: string;
  }): Promise<boolean> {
    return await this.canModifySectionFromUser(sectionId, userId);
  }

  async canModifyLectureFromUser({
    lectureId,
    userId,
  }: {
    lectureId: string;
    userId: string;
  }): Promise<boolean> {
    const lecture = await this.lectureRepository.findUniqueWithSectionId(lectureId);
    return lecture && lecture.sectionId
      ? await this.canModifySectionFromUser(lecture.sectionId, userId)
      : false;
  }
}
