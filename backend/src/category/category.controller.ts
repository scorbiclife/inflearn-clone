import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CourseCategory } from '../generated/prisma-class/course_category';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOkResponse({
    description: 'Fetch all course categories',
    type: [CourseCategory],
  })
  async findAll() {
    return this.categoryService.findAll();
  }
}
