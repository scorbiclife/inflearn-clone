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
} from '@nestjs/common';
import { LectureService } from './lecture.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import {
  LectureCreationGuard,
  LectureModificationGuard,
} from './lecture.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Post('/section/:sectionId/lecture')
  @UseGuards(AccessTokenGuard, LectureCreationGuard)
  @ApiBearerAuth('access-token')
  create(
    @Param('sectionId', ParseUUIDPipe) sectionId: string,
    @Body() createLectureDto: CreateLectureDto,
  ) {
    return this.lectureService.create({
      sectionId: sectionId,
      dto: createLectureDto,
    });
  }

  @Get('/lecture/:lectureId')
  findOne(@Param('lectureId', ParseUUIDPipe) lectureId: string) {
    return this.lectureService.findOne(lectureId);
  }

  @Patch('/lecture/:lectureId')
  @UseGuards(AccessTokenGuard, LectureModificationGuard)
  @ApiBearerAuth('access-token')
  update(
    @Param('lectureId', ParseUUIDPipe) lectureId: string,
    @Body() updateLectureDto: UpdateLectureDto,
  ) {
    return this.lectureService.update(lectureId, updateLectureDto);
  }

  @Delete('/lecture/:lectureId')
  @UseGuards(AccessTokenGuard, LectureModificationGuard)
  @ApiBearerAuth('access-token')
  remove(@Param('lectureId', ParseUUIDPipe) lectureId: string) {
    return this.lectureService.remove(lectureId);
  }
}
