import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LectureService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    sectionId,
    dto: createLectureDto,
  }: {
    sectionId: string;
    dto: CreateLectureDto;
  }) {
    const order = await this.prisma.lecture.count({
      where: { sectionId },
    });
    return await this.prisma.lecture.create({
      data: { ...createLectureDto, sectionId, order, description: '' },
    });
  }

  async findOne(id: string) {
    return await this.prisma.lecture.findUnique({ where: { id } });
  }

  async update(id: string, updateLectureDto: UpdateLectureDto) {
    return await this.prisma.lecture.update({
      where: { id },
      data: updateLectureDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.lecture.delete({ where: { id } });
  }
}
