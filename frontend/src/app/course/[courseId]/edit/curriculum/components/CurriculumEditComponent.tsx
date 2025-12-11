"use client";

import { Course } from "@/generated/openapi-ts/types.gen";
import { SectionList } from "./SectionList";
import { AddSectionButton } from "./AddSectionButton";

interface CurriculumEditComponentProps {
  course: Course;
}

export default function CurriculumEditComponent({
  course,
}: CurriculumEditComponentProps) {
  const sections = course.sections || [];

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">커리큘럼</h1>
        <p className="text-muted-foreground">
          강의의 섹션을 구성하고 관리하세요.
        </p>
      </div>

      <SectionList sections={sections} courseId={course.id} />

      <div className="mt-6">
        <AddSectionButton courseId={course.id} />
      </div>
    </div>
  );
}
