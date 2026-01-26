import { CourseCategory } from '@prisma/client';

export abstract class CategoryRepository {
  abstract findAll(): Promise<CourseCategory[]>;
}
