import { Lecture } from '@prisma/client';

export interface LectureCreateInput {
  title: string;
  description: string;
  sectionId: string;
  courseId: string | null;
  order: number;
}

export interface LectureUpdateInput {
  title?: string;
  description?: string;
  order?: number;
}

export abstract class LectureRepository {
  abstract create(data: LectureCreateInput): Promise<Lecture>;
  abstract findUnique(id: string): Promise<Lecture | null>;
  abstract findUniqueWithSectionId(
    id: string,
  ): Promise<{ id: string; sectionId: string | null } | null>;
  abstract countBySection(sectionId: string): Promise<number>;
  abstract update(id: string, data: LectureUpdateInput): Promise<Lecture>;
  abstract delete(id: string): Promise<void>;
}
