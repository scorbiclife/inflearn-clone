import { Injectable } from '@nestjs/common';
import { Section } from '@prisma/client';
import {
  SectionRepository,
  SectionCreateInput,
  SectionUpdateInput,
} from './section.repository';

@Injectable()
export class FakeSectionRepository extends SectionRepository {
  private sections: Section[] = [];
  private idCounter = 1;

  seed(sections: Section[]): void {
    this.sections = [...sections];
  }

  clear(): void {
    this.sections = [];
    this.idCounter = 1;
  }

  getAll(): Section[] {
    return [...this.sections];
  }

  async create(data: SectionCreateInput): Promise<Section> {
    const order = this.sections.filter(
      (s) => s.courseId === data.courseId,
    ).length;
    const now = new Date();
    const section: Section = {
      id: `section-${this.idCounter++}`,
      title: data.title,
      description: data.description,
      courseId: data.courseId,
      order,
      createdAt: now,
      updatedAt: now,
    };
    this.sections.push(section);
    return section;
  }

  async findUnique(id: string): Promise<Section | null> {
    return this.sections.find((s) => s.id === id) ?? null;
  }

  async findUniqueWithCourseId(
    id: string,
  ): Promise<{ id: string; courseId: string | null } | null> {
    const section = this.sections.find((s) => s.id === id);
    return section ? { id: section.id, courseId: section.courseId } : null;
  }

  async update(id: string, data: SectionUpdateInput): Promise<Section> {
    const index = this.sections.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error(`Section not found: ${id}`);
    }
    this.sections[index] = {
      ...this.sections[index],
      ...data,
      updatedAt: new Date(),
    };
    return this.sections[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.sections.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error(`Section not found: ${id}`);
    }
    this.sections.splice(index, 1);
  }
}
