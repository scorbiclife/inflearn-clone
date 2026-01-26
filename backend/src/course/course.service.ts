import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseRepository, CourseFindManyInput } from './course.repository';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async create(createCourseDto: CreateCourseDto, userId: string) {
    const { categoryIds, title, ...rest } = createCourseDto;
    return await this.courseRepository.create({
      ...rest,
      title,
      slug: this.slugify(title),
      categoryIds,
      instructorId: userId,
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

  async findAll(params: CourseFindManyInput) {
    return await this.courseRepository.findMany(params);
  }

  async findOne(id: string, include?: { sections?: boolean }) {
    if (include?.sections) {
      return await this.courseRepository.findUniqueWithSections(id);
    }
    return await this.courseRepository.findUnique(id);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    return await this.courseRepository.update(id, updateCourseDto);
  }

  async remove(id: string) {
    return await this.courseRepository.delete(id);
  }
}
