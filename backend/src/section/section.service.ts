import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { SectionRepository } from './section.repository';
import { Section } from '@prisma/client';

@Injectable()
export class SectionService {
  constructor(private readonly sectionRepository: SectionRepository) {}

  async create(
    createSectionDto: CreateSectionDto,
    courseId: string,
  ): Promise<Section> {
    return await this.sectionRepository.create({
      title: createSectionDto.title,
      description: createSectionDto.description ?? '',
      courseId,
    });
  }

  async findOne(id: string): Promise<Section | null> {
    return await this.sectionRepository.findUnique(id);
  }

  async update(
    id: string,
    updateSectionDto: UpdateSectionDto,
  ): Promise<Section | null> {
    return await this.sectionRepository.update(id, updateSectionDto);
  }

  async remove(id: string): Promise<void> {
    await this.sectionRepository.delete(id);
  }
}
