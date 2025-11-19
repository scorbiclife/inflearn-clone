import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  ParseUUIDPipe,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import type { Request } from 'express';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { CourseGuard } from './course.guard';
import { CourseFindAllQueryDto } from './course.controller.dto';
import * as prismaClient from '@prisma/client';
import { Course } from '../generated/prisma-class/course';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'Course created successfully.',
    type: Course,
  })
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @Req() request: Request,
  ): Promise<prismaClient.Course> {
    return await this.courseService.create(createCourseDto, request.user!.sub);
  }

  @Get()
  @ApiOkResponse({
    description: 'List of courses retrieved successfully.',
    type: [Course],
  })
  async findAll(
    @Query() query: CourseFindAllQueryDto,
  ): Promise<prismaClient.Course[]> {
    const { title, level, categoryId, take, skip } = query;
    const MAX_RECORDS_TO_TAKE = 100;
    const recordsToTake = take
      ? Math.min(take, MAX_RECORDS_TO_TAKE)
      : MAX_RECORDS_TO_TAKE;
    const where = {
      title: title ? { contains: title } : undefined,
      level: level ? { contains: level } : undefined,
      category: categoryId ? { some: { id: categoryId } } : undefined,
    };
    return await this.courseService.findAll({
      take: recordsToTake,
      skip,
      where,
    });
  }

  @Get(':id')
  @ApiQuery({ name: 'include', required: false, type: String })
  @ApiOkResponse({
    description: 'Course retrieved successfully.',
    type: Course,
  })
  @ApiNotFoundResponse({ description: 'Course not found.' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('include') includeFields?: string,
  ): Promise<prismaClient.Course | null> {
    const includeTerm = Object.fromEntries(
      includeFields?.split(',').map((field) => [field, true]) || [],
    );
    const course = await this.courseService.findOne(id, includeTerm);
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return course;
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard, CourseGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'Course updated successfully.',
    type: Course,
  })
  @ApiNotFoundResponse({ description: 'Course not found.' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<prismaClient.Course> {
    const course = await this.courseService.update(id, updateCourseDto);
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return course;
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard, CourseGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'Course deleted successfully.',
  })
  @ApiNotFoundResponse({ description: 'Course not found.' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.courseService.remove(id);
  }
}
