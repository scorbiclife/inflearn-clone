import { findCourseById } from "@/lib/api";
import { toast } from "sonner";
import CourseEditComponent from "./CourseEditComponent";

export default async function EditCourseInfoPage(
  pageParamsPromise: Promise<{ params: { courseId: string } }>
) {
  const {
    params: { courseId },
  } = await pageParamsPromise;
  const response = await findCourseById({ id: courseId });

  if (!response || !response.data) {
    const errorMessage =
      response?.error instanceof Error
        ? response.error.message
        : "Unknown error";
    toast.error(errorMessage);
    return <h1>Something went wrong!</h1>
  }

  const course = response.data;

  return <CourseEditComponent course={course} />
}
