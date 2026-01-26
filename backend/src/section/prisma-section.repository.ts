import { Injectable } from '@nestjs/common';
import { Section } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  SectionRepository,
  SectionCreateInput,
  SectionUpdateInput,
} from './section.repository';

@Injectable()
export class PrismaSectionRepository extends SectionRepository {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async create(data: SectionCreateInput): Promise<Section> {
    const order = await this.prismaService.prisma.section.count({
      where: { courseId: data.courseId },
    });
    return this.prismaService.prisma.section.create({
      data: {
        ...data,
        order,
      },
    });
  }

  async findUnique(id: string): Promise<Section | null> {
    return this.prismaService.prisma.section.findUnique({ where: { id } });
  }

  async findUniqueWithCourseId(
    id: string,
  ): Promise<{ id: string; courseId: string | null } | null> {
    return this.prismaService.prisma.section.findUnique({
      where: { id },
      select: { id: true, courseId: true },
    });
  }

  async update(id: string, data: SectionUpdateInput): Promise<Section> {
    return this.prismaService.prisma.section.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.prisma.section.delete({ where: { id } });
  }
}
