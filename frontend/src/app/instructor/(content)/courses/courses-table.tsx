"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Course } from "@/generated/openapi-ts";
import { CourseRow } from "./course-row";

type CoursesTableProps = {
  courses: Course[];
};

export function CoursesTable({ courses }: CoursesTableProps) {
  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>강의명</TableHead>
              <TableHead>수강생</TableHead>
              <TableHead>평점</TableHead>
              <TableHead>미답변</TableHead>
              <TableHead>가격</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground">
                  강의가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              courses.map((course) => (
                <CourseRow key={course.id} course={course} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
