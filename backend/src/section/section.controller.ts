import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import {
  SectionCreationGuard,
  SectionModificationGuard,
} from './section.guard';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Section } from '../generated/prisma-class/section';
import * as prismaClient from '@prisma/client';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@Controller()
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post('/courses/:courseId/sections')
  @UseGuards(AccessTokenGuard, SectionCreationGuard)
  @ApiBearerAuth('access-token')
  async create(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Body() createSectionDto: CreateSectionDto,
  ) {
    return await this.sectionService.create(createSectionDto, courseId);
  }

  @Get('/section/:id')
  @ApiOkResponse({
    description: 'Section retrieved successfully',
    type: Section,
  })
  @ApiNotFoundResponse({ description: 'Section not found' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<prismaClient.Section> {
    const section = await this.sectionService.findOne(id);
    if (!section) {
      throw new NotFoundException('Section not found');
    }
    return section;
  }

  @Patch('/section/:id')
  @UseGuards(AccessTokenGuard, SectionModificationGuard)
  @ApiBearerAuth('access-token')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSectionDto: UpdateSectionDto,
  ) {
    return await this.sectionService.update(id, updateSectionDto);
  }

  @Delete('/section/:id')
  @UseGuards(AccessTokenGuard, SectionModificationGuard)
  @ApiBearerAuth('access-token')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.sectionService.remove(id);
  }
}
