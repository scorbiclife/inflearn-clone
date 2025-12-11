"use client";

import { Lecture } from "@/generated/openapi-ts/types.gen";
import { LectureCard } from "./LectureCard";

interface LectureListProps {
  lectures: Lecture[];
  sectionId: string;
}

export function LectureList({ lectures, sectionId }: LectureListProps) {
  if (lectures.length === 0) {
    return (
      <div className="mt-4 p-3 border border-dashed rounded-lg text-center text-sm text-muted-foreground">
        강의가 없습니다. 수업 추가 버튼을 클릭하여 강의를 추가하세요.
      </div>
    );
  }

  const sortedLectures = [...lectures].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-2 mt-4">
      {sortedLectures.map((lecture, index) => (
        <LectureCard
          key={lecture.id}
          lecture={lecture}
          lectureNumber={index + 1}
          sectionId={sectionId}
        />
      ))}
    </div>
  );
}
