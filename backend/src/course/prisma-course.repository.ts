import { Injectable } from '@nestjs/common';
import { Course } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CourseRepository,
  CourseCreateInput,
  CourseUpdateInput,
  CourseFindManyInput,
  CourseWithSections,
} from './course.repository';

@Injectable()
export class PrismaCourseRepository extends CourseRepository {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async create(data: CourseCreateInput): Promise<Course> {
    const { categoryIds, ...rest } = data;
    return this.prismaService.prisma.course.create({
      data: {
        ...rest,
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
      },
    });
  }

  async findMany(params: CourseFindManyInput): Promise<Course[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.prisma.course.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findUnique(id: string): Promise<Course | null> {
    return this.prismaService.prisma.course.findUnique({ where: { id } });
  }

  async findUniqueWithSections(id: string): Promise<CourseWithSections | null> {
    return this.prismaService.prisma.course.findUnique({
      where: { id },
      include: {
        sections: {
          include: {
            lectures: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });
  }

  async findUniqueWithInstructorId(
    id: string,
  ): Promise<{ id: string; instructorId: string } | null> {
    return this.prismaService.prisma.course.findUnique({
      where: { id },
      select: { id: true, instructorId: true },
    });
  }

  async update(id: string, data: CourseUpdateInput): Promise<Course> {
    const { categoryIds, ...courseUpdateData } = data;
    const updateData: Parameters<
      typeof this.prismaService.prisma.course.update
    >[0]['data'] = {
      ...courseUpdateData,
    };

    if (categoryIds !== undefined) {
      updateData.categories = {
        set: categoryIds.map((id) => ({ id })),
      };
    }

    return this.prismaService.prisma.course.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.prisma.course.delete({ where: { id } });
  }
}
