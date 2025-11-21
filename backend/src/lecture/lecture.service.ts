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

  findOne(id: string) {
    throw new InternalServerErrorException('Not implemented yet');
  }

  update(id: string, updateLectureDto: UpdateLectureDto) {
    throw new InternalServerErrorException('Not implemented yet');
  }

  remove(id: string) {
    throw new InternalServerErrorException('Not implemented yet');
  }
}
