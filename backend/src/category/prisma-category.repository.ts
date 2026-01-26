import { Injectable } from '@nestjs/common';
import { CourseCategory } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryRepository } from './category.repository';

@Injectable()
export class PrismaCategoryRepository extends CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async findAll(): Promise<CourseCategory[]> {
    return this.prismaService.prisma.courseCategory.findMany();
  }
}
