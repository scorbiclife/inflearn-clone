import { Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LectureService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    sectionId,
    dto: createLectureDto,
  }: {
    sectionId: string;
    dto: CreateLectureDto;
  }) {
    // Get the section to find the courseId
    const section = await this.prismaService.prisma.section.findUnique({
      where: { id: sectionId },
      select: { courseId: true },
    });

    const order = await this.prismaService.prisma.lecture.count({
      where: { sectionId },
    });
    return await this.prismaService.prisma.lecture.create({
      data: {
        ...createLectureDto,
        sectionId,
        courseId: section?.courseId,
        order,
        description: '',
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.prisma.lecture.findUnique({ where: { id } });
  }

  async update(id: string, updateLectureDto: UpdateLectureDto) {
    return await this.prismaService.prisma.lecture.update({
      where: { id },
      data: updateLectureDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.prisma.lecture.delete({ where: { id } });
  }
}
