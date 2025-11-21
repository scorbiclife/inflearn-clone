import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { LectureService } from './lecture.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import {
  LectureCreationGuard,
  LectureModificationGuard,
} from './lecture.guard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Lecture } from '../generated/prisma-class/lecture';

@Controller()
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Post('/section/:sectionId/lecture')
  @UseGuards(AccessTokenGuard, LectureCreationGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'Lecture created successfully.',
    type: Lecture,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({
    description: 'Insufficient permissions to create lecture.',
  })
  async create(
    @Param('sectionId', ParseUUIDPipe) sectionId: string,
    @Body() createLectureDto: CreateLectureDto,
  ) {
    return await this.lectureService.create({
      sectionId: sectionId,
      dto: createLectureDto,
    });
  }

  @Get('/lecture/:lectureId')
  @ApiOkResponse({
    description: 'Lecture retrieved successfully.',
    type: Lecture,
  })
  @ApiNotFoundResponse({ description: 'Lecture not found.' })
  async findOne(@Param('lectureId', ParseUUIDPipe) lectureId: string) {
    const lecture = await this.lectureService.findOne(lectureId);
    if (!lecture) {
      throw new NotFoundException('Lecture not found.');
    }
    return lecture;
  }

  @Patch('/lecture/:lectureId')
  @UseGuards(AccessTokenGuard, LectureModificationGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'Lecture updated successfully.',
    type: Lecture,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({
    description: 'Insufficient permissions to modify lecture.',
  })
  @ApiNotFoundResponse({ description: 'Lecture not found.' })
  async update(
    @Param('lectureId', ParseUUIDPipe) lectureId: string,
    @Body() updateLectureDto: UpdateLectureDto,
  ) {
    const updatedLecture = await this.lectureService.update(
      lectureId,
      updateLectureDto,
    );
    if (!updatedLecture) {
      throw new NotFoundException('Lecture not found.');
    }
    return updatedLecture;
  }

  @Delete('/lecture/:lectureId')
  @UseGuards(AccessTokenGuard, LectureModificationGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'Lecture deleted successfully.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({
    description: 'Insufficient permissions to delete lecture.',
  })
  async remove(@Param('lectureId', ParseUUIDPipe) lectureId: string) {
    await this.lectureService.remove(lectureId);
  }
}
