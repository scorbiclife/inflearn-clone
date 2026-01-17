import { PrismaService } from '@/src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseAuthorizationService {
  constructor(private readonly prismaService: PrismaService) {}

  async canModifyCourseFromUser(
    courseId: string,
    userId: string,
  ): Promise<boolean> {
    const course = await this.prismaService.prisma.course.findUnique({
      where: { id: courseId },
      select: { instructorId: true },
    });
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
    const section = await this.prismaService.prisma.section.findUnique({
      where: { id: sectionId },
      select: { courseId: true },
    });
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
    const lecture = await this.prismaService.prisma.lecture.findUnique({
      where: { id: lectureId },
      select: { sectionId: true },
    });
    return lecture && lecture.sectionId
      ? await this.canModifySectionFromUser(lecture.sectionId, userId)
      : false;
  }
}
