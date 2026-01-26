import { Injectable } from '@nestjs/common';
import { Lecture } from '@prisma/client';
import {
  LectureRepository,
  LectureCreateInput,
  LectureUpdateInput,
} from './lecture.repository';

@Injectable()
export class FakeLectureRepository extends LectureRepository {
  private lectures: Lecture[] = [];
  private idCounter = 1;

  seed(lectures: Lecture[]): void {
    this.lectures = [...lectures];
  }

  clear(): void {
    this.lectures = [];
    this.idCounter = 1;
  }

  getAll(): Lecture[] {
    return [...this.lectures];
  }

  async create(data: LectureCreateInput): Promise<Lecture> {
    const now = new Date();
    const lecture: Lecture = {
      id: `lecture-${this.idCounter++}`,
      title: data.title,
      description: data.description,
      sectionId: data.sectionId,
      courseId: data.courseId,
      order: data.order,
      duration: null,
      isPreview: false,
      videoStorageInfo: null,
      createdAt: now,
      updatedAt: now,
    };
    this.lectures.push(lecture);
    return lecture;
  }

  async findUnique(id: string): Promise<Lecture | null> {
    return this.lectures.find((l) => l.id === id) ?? null;
  }

  async findUniqueWithSectionId(
    id: string,
  ): Promise<{ id: string; sectionId: string | null } | null> {
    const lecture = this.lectures.find((l) => l.id === id);
    return lecture ? { id: lecture.id, sectionId: lecture.sectionId } : null;
  }

  async countBySection(sectionId: string): Promise<number> {
    return this.lectures.filter((l) => l.sectionId === sectionId).length;
  }

  async update(id: string, data: LectureUpdateInput): Promise<Lecture> {
    const index = this.lectures.findIndex((l) => l.id === id);
    if (index === -1) {
      throw new Error(`Lecture not found: ${id}`);
    }
    this.lectures[index] = {
      ...this.lectures[index],
      ...data,
      updatedAt: new Date(),
    };
    return this.lectures[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.lectures.findIndex((l) => l.id === id);
    if (index === -1) {
      throw new Error(`Lecture not found: ${id}`);
    }
    this.lectures.splice(index, 1);
  }
}
