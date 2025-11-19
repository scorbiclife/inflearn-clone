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
  ParseIntPipe,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import type { Request } from 'express';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { CourseGuard } from './course.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  create(@Body() createCourseDto: CreateCourseDto, @Req() request: Request) {
    return this.courseService.create(createCourseDto, request.user!.sub);
  }

  @Get()
  @ApiQuery({ name: 'title', required: false, type: String })
  @ApiQuery({ name: 'level', required: false, type: String })
  @ApiQuery({ name: 'categoryId', required: false, type: String })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  findAll(
    @Query('title') title?: string,
    @Query('level') level?: string,
    @Query('categoryId') categoryId?: string,
    @Query('take', ParseIntPipe) take?: number,
    @Query('skip', ParseIntPipe) skip?: number,
  ) {
    const MAX_RECORDS_TO_TAKE = 100;
    const recordsToTake = take
      ? Math.min(take, MAX_RECORDS_TO_TAKE)
      : MAX_RECORDS_TO_TAKE;
    const where = {
      title: title ? { contains: title } : undefined,
      level: level ? { contains: level } : undefined,
      category: categoryId ? { some: { id: categoryId } } : undefined,
    };
    return this.courseService.findAll({ take: recordsToTake, skip, where });
  }

  @Get(':id')
  @ApiQuery({ name: 'include', required: false, type: String })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('include') includeFields?: string,
  ) {
    const includeTerm = Object.fromEntries(
      includeFields?.split(',').map((field) => [field, true]) || [],
    );
    return this.courseService.findOne(id, includeTerm);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard, CourseGuard)
  @ApiBearerAuth('access-token')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard, CourseGuard)
  @ApiBearerAuth('access-token')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.courseService.remove(id);
  }
}
