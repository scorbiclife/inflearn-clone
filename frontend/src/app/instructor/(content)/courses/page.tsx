import { findAllCourses } from "@/lib/api";
import { CoursesTable } from "./courses-table";

export default async function CoursesPageContent() {
  const { data: courses, error } = await findAllCourses();

  if (error) {
    return (
      <div className="p-6 w-full">
        <h1 className="text-2xl font-semibold mb-4">강의 관리</h1>
        <div className="text-red-600">
          강의를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 w-full">
      <h1 className="text-2xl font-semibold">강의 관리</h1>
      <CoursesTable courses={courses || []} />
    </div>
  );
}
