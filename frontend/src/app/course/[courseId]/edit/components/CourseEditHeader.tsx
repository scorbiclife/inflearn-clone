"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCourseRoute, ROUTE_INSTRUCTOR_COURSES } from "@/config/routes";
import type { Course } from "@/generated/openapi-ts";

function formatStatus(status: Course["status"]): string {
  switch (status) {
    case "DRAFT":
      return "임시저장";
    case "PUBLISHED":
      return "게시됨";
    case "PENDING":
      return "대기중";
    default:
      return "알 수 없는 상태";
  }
}

type CourseEditHeaderProps = {
  course: Course;
  onSave: () => Promise<void>;
  onSubmit: () => Promise<void>;
  isSaving: boolean;
  isSubmitting: boolean;
};

export default function CourseEditHeader({
  course,
  onSave,
  onSubmit,
  isSaving,
  isSubmitting,
}: CourseEditHeaderProps) {
  const router = useRouter();

  const handleClose = () => {
    router.push(ROUTE_INSTRUCTOR_COURSES);
  };

  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Left: Course title and status */}
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-gray-900">
              {course.title || "제목 없음"}
            </h1>
            <span className="text-sm text-gray-500">
              {formatStatus(course.status)}
            </span>
          </div>

          {/* Right: Action buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <Link href={formatCourseRoute(course.id)}>
                강의 페이지 보기
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onSave}
              disabled={isSaving || isSubmitting}
            >
              저장
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onSubmit}
              disabled={isSaving || isSubmitting}
            >
              제출
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              aria-label="닫기"
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

