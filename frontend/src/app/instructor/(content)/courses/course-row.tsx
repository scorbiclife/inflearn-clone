"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { Course } from "@/generated/openapi-ts";

type CourseRowProps = {
  course: Course;
};

function formatPrice(price?: number, discountPrice?: number): string {
  if (!price || price === 0) return "무료";
  if (discountPrice && discountPrice < price) {
    return `${discountPrice.toLocaleString()}원`;
  }
  return `${price.toLocaleString()}원`;
}

function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    DRAFT: "임시저장",
    PUBLISHED: "게시됨",
    PENDING: "대기중",
  };
  return statusMap[status] || status;
}

function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    DRAFT: "bg-black text-white",
    PUBLISHED: "bg-green-600 text-white",
    PENDING: "bg-yellow-500 text-white",
  };
  return colorMap[status] || "bg-gray-500 text-white";
}

function calculateAverageRating(reviews: Array<{ rating: number }>): string {
  if (!reviews || reviews.length === 0) return "-";
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  const avg = sum / reviews.length;
  return avg.toFixed(1);
}

function countUnansweredQuestions(
  questions: Array<{ comments: Array<unknown> }>
): number {
  if (!questions) return 0;
  return questions.filter((q) => !q.comments || q.comments.length === 0).length;
}

export function CourseRow({ course }: CourseRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded flex items-center justify-center shrink-0">
            {course.thumbnailUrl ? (
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <span className="text-white font-semibold text-xs">???</span>
            )}
          </div>
          <span className="text-sm">{course.title}</span>
        </div>
      </TableCell>
      <TableCell>{course.enrollments?.length || 0}명</TableCell>
      <TableCell>{calculateAverageRating(course.reviews || [])}</TableCell>
      <TableCell>{countUnansweredQuestions(course.question || [])}개</TableCell>
      <TableCell>{formatPrice(course.price, course.discountPrice)}</TableCell>
      <TableCell>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
            course.status
          )}`}>
          {formatStatus(course.status)}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="justify-start h-4 text-xs">
            <Pencil className="size-3 mr-1" />
            수정
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start h-4 text-xs text-red-600 hover:text-red-700 hover:bg-red-50">
            <Trash2 className="size-3 mr-1" />
            삭제
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
