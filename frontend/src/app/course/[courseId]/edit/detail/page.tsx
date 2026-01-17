import { findCourseById } from "@/lib/api";
import { toast } from "sonner";
import CourseDetailEditComponent from "./components/CourseDetailEditComponent";

export default async function EditCourseDetailPage(pageOptions: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await pageOptions.params;
  const response = await findCourseById({ id: courseId, includeCategories: true });

  if (!response || !response.data) {
    const errorMessage =
      response?.error instanceof Error
        ? response.error.message
        : "Unknown error";
    toast.error(errorMessage);
    return <h1>Something went wrong!</h1>;
  }

  const course = response.data;

  return <CourseDetailEditComponent course={course} />;
}
