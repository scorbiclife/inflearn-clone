import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll() {
    return await this.prismaService.prisma.courseCategory.findMany();
  }
}
