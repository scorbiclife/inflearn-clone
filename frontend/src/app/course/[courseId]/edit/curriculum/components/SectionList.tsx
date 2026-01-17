"use client";

import { Section } from "@/generated/openapi-ts/types.gen";
import { SectionCard } from "./SectionCard";

interface SectionListProps {
  sections: Section[];
  courseId: string;
}

export function SectionList({ sections, courseId }: SectionListProps) {
  if (sections.length === 0) {
    return (
      <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center">
        <p className="text-muted-foreground">
          섹션을 추가해 주세요.
        </p>
      </div>
    );
  }

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      {sortedSections.map((section, index) => (
        <SectionCard
          key={section.id}
          section={section}
          sectionNumber={index + 1}
          courseId={courseId}
        />
      ))}
    </div>
  );
}
