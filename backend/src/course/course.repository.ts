import { Course, Lecture, Prisma, Section } from '@prisma/client';

export interface CourseCreateInput {
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  price?: number;
  categoryIds: string[];
  instructorId: string;
}

export interface CourseUpdateInput {
  title?: string;
  shortDescription?: string;
  description?: string;
  price?: number;
  categoryIds?: string[];
}

export interface CourseFindManyInput {
  skip?: number;
  take: number;
  cursor?: Prisma.CourseWhereUniqueInput;
  where?: Prisma.CourseWhereInput;
  orderBy?: Prisma.CourseOrderByWithRelationInput;
}

export interface SectionWithLectures extends Section {
  lectures: Lecture[];
}

export interface CourseWithSections extends Course {
  sections: SectionWithLectures[];
}

export abstract class CourseRepository {
  abstract create(data: CourseCreateInput): Promise<Course>;
  abstract findMany(params: CourseFindManyInput): Promise<Course[]>;
  abstract findUnique(id: string): Promise<Course | null>;
  abstract findUniqueWithSections(id: string): Promise<CourseWithSections | null>;
  abstract findUniqueWithInstructorId(
    id: string,
  ): Promise<{ id: string; instructorId: string } | null>;
  abstract update(id: string, data: CourseUpdateInput): Promise<Course>;
  abstract delete(id: string): Promise<void>;
}
