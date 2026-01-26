import { Section } from '@prisma/client';

export interface SectionCreateInput {
  title: string;
  description: string;
  courseId: string;
}

export interface SectionUpdateInput {
  title?: string;
  description?: string;
  order?: number;
}

export abstract class SectionRepository {
  abstract create(data: SectionCreateInput): Promise<Section>;
  abstract findUnique(id: string): Promise<Section | null>;
  abstract findUniqueWithCourseId(
    id: string,
  ): Promise<{ id: string; courseId: string | null } | null>;
  abstract update(id: string, data: SectionUpdateInput): Promise<Section>;
  abstract delete(id: string): Promise<void>;
}
