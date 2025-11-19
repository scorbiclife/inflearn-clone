import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async isAuthorizedToUser(courseId: string, userId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { instructorId: true },
    });
    return course?.instructorId === userId;
  }

  async create(createCourseDto: CreateCourseDto, userId: string) {
    const { categoryIds, ...rest } = createCourseDto;
    const prismaCreateCourseDto = {
      ...rest,
      categories: {
        connect: categoryIds.map((id) => ({ id })),
      },
      instructorId: userId,
    };
    return await this.prisma.course.create({
      data: prismaCreateCourseDto,
    });
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
