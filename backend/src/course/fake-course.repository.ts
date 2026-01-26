import { Injectable } from '@nestjs/common';
import { Course, Lecture, Section } from '@prisma/client';
import {
  CourseRepository,
  CourseCreateInput,
  CourseUpdateInput,
  CourseFindManyInput,
  CourseWithSections,
  SectionWithLectures,
} from './course.repository';

@Injectable()
export class FakeCourseRepository extends CourseRepository {
  private courses: Course[] = [];
  private idCounter = 1;

  seed(courses: Course[]): void {
    this.courses = [...courses];
  }

  clear(): void {
    this.courses = [];
    this.idCounter = 1;
  }

  getAll(): Course[] {
    return [...this.courses];
  }

  async create(data: CourseCreateInput): Promise<Course> {
    const now = new Date();
    const course: Course = {
      id: `course-${this.idCounter++}`,
      title: data.title,
      slug: data.slug,
      shortDescription: data.shortDescription ?? null,
      description: data.description ?? null,
      thumbnailUrl: null,
      price: data.price ?? 0,
      discountPrice: null,
      level: 'BEGINNER',
      status: 'DRAFT',
      instructorId: data.instructorId,
      createdAt: now,
      updatedAt: now,
    };
    this.courses.push(course);
    return course;
  }

  async findMany(params: CourseFindManyInput): Promise<Course[]> {
    let result = [...this.courses];

    if (params.where) {
      // Simple filtering - only supports basic equality checks
      result = result.filter((course) => {
        for (const [key, value] of Object.entries(params.where!)) {
          if (course[key as keyof Course] !== value) {
            return false;
          }
        }
        return true;
      });
    }

    if (params.skip) {
      result = result.slice(params.skip);
    }

    if (params.take) {
      result = result.slice(0, params.take);
    }

    return result;
  }

  async findUnique(id: string): Promise<Course | null> {
    return this.courses.find((c) => c.id === id) ?? null;
  }

  async findUniqueWithSections(id: string): Promise<CourseWithSections | null> {
    const course = this.courses.find((c) => c.id === id);
    if (!course) return null;
    return {
      ...course,
      sections: [],
    };
  }

  async findUniqueWithInstructorId(
    id: string,
  ): Promise<{ id: string; instructorId: string } | null> {
    const course = this.courses.find((c) => c.id === id);
    return course ? { id: course.id, instructorId: course.instructorId } : null;
  }

  async update(id: string, data: CourseUpdateInput): Promise<Course> {
    const index = this.courses.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(`Course not found: ${id}`);
    }
    const { categoryIds, ...rest } = data;
    this.courses[index] = {
      ...this.courses[index],
      ...rest,
      updatedAt: new Date(),
    };
    return this.courses[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.courses.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(`Course not found: ${id}`);
    }
    this.courses.splice(index, 1);
  }
}
