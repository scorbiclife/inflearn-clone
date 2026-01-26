import { Injectable } from '@nestjs/common';
import { CourseCategory } from '@prisma/client';
import { CategoryRepository } from './category.repository';

@Injectable()
export class FakeCategoryRepository extends CategoryRepository {
  private categories: CourseCategory[] = [];

  seed(categories: CourseCategory[]): void {
    this.categories = [...categories];
  }

  clear(): void {
    this.categories = [];
  }

  getAll(): CourseCategory[] {
    return [...this.categories];
  }

  async findAll(): Promise<CourseCategory[]> {
    return [...this.categories];
  }
}
