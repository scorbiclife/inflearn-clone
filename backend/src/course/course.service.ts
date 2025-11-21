import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto, userId: string) {
    const { categoryIds, title, ...rest } = createCourseDto;
    const prismaCreateCourseDto = {
      ...rest,
      title,
      slug: this.slugify(title),
      categories: {
        connect: categoryIds.map((id) => ({ id })),
      },
      instructorId: userId,
    };
    return await this.prisma.course.create({
      data: prismaCreateCourseDto,
    });
  }

  slugify(title: string): string {
    const slugBase = title
      .toLocaleLowerCase('en-US')
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const slugCollisionPreventionSuffix = Math.random()
      .toString(36)
      .substring(2, 8);
    return `${slugBase}-${slugCollisionPreventionSuffix}`;
  }

  async findAll({
    skip,
    take,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    take: number;
    cursor?: Prisma.CourseWhereUniqueInput;
    where?: Prisma.CourseWhereInput;
    orderBy?: Prisma.CourseOrderByWithRelationInput;
  }) {
    return await this.prisma.course.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(id: string, include?: Prisma.CourseInclude) {
    return await this.prisma.course.findUnique({
      where: { id },
      include,
    });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    return await this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.course.delete({
      where: { id },
    });
  }
}
