import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Section } from '@prisma/client';

@Injectable()
export class SectionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createSectionDto: CreateSectionDto,
    courseId: string,
  ): Promise<Section> {
    const order = await this.prisma.section.count({
      where: { courseId },
    });
    return await this.prisma.section.create({
      data: {
        title: createSectionDto.title,
        description: createSectionDto.description ?? '',
        courseId,
        order,
      },
    });
  }

  async findOne(id: string): Promise<Section | null> {
    return (await this.prisma.section.findUnique({ where: { id } })) || null;
  }

  async update(
    id: string,
    updateSectionDto: UpdateSectionDto,
  ): Promise<Section | null> {
    return await this.prisma.section.update({
      where: { id },
      data: updateSectionDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.section.delete({ where: { id } });
  }
}
