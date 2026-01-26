import { Injectable } from '@nestjs/common';
import { Lecture } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  LectureRepository,
  LectureCreateInput,
  LectureUpdateInput,
} from './lecture.repository';

@Injectable()
export class PrismaLectureRepository extends LectureRepository {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async create(data: LectureCreateInput): Promise<Lecture> {
    return this.prismaService.prisma.lecture.create({
      data,
    });
  }

  async findUnique(id: string): Promise<Lecture | null> {
    return this.prismaService.prisma.lecture.findUnique({ where: { id } });
  }

  async findUniqueWithSectionId(
    id: string,
  ): Promise<{ id: string; sectionId: string | null } | null> {
    return this.prismaService.prisma.lecture.findUnique({
      where: { id },
      select: { id: true, sectionId: true },
    });
  }

  async countBySection(sectionId: string): Promise<number> {
    return this.prismaService.prisma.lecture.count({
      where: { sectionId },
    });
  }

  async update(id: string, data: LectureUpdateInput): Promise<Lecture> {
    return this.prismaService.prisma.lecture.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.prisma.lecture.delete({ where: { id } });
  }
}
