"use client";

import { useState, type ChangeEvent, type ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type Course, type UpdateCourseDto } from "@/generated/openapi-ts";
import { updateCourse } from "@/lib/api";
import { ROUTE_INSTRUCTOR_COURSES } from "@/config/routes";
import CourseEditHeader from "../../components/CourseEditHeader";

function handleApiResult<T>(
  result: { error?: unknown; data?: T },
  defaultErrorMessage: string,
  defaultValue?: T
): T {
  if (result.error) {
    throw new Error(
      result.error instanceof Error ? result.error.message : defaultErrorMessage
    );
  }
  return result.data ?? (defaultValue as T);
}

type FormState = {
  description: string;
};

export default function CourseDetailEditComponent({
  course,
}: {
  course: Course;
}) {
  const router = useRouter();

  const [formState, setFormState] = useState<FormState>({
    description: course.description ?? "",
  });

  const mutation = useMutation({
    mutationFn: async (payload: UpdateCourseDto) => {
      const result = await updateCourse({
        id: course.id,
        body: payload,
      });
      return handleApiResult(result, "Could not update course");
    },
  });

  const handleTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setFormState({ description: value });
  };

  function buildPayload(): UpdateCourseDto {
    const payload: UpdateCourseDto = {
      title: course.title,
      shortDescription: course.shortDescription ?? undefined,
      description: formState.description,
      thumbnailUrl: course.thumbnailUrl ?? undefined,
      price: course.price,
      discountPrice: course.discountPrice ?? undefined,
      level: course.level,
      status: course.status,
      categoryIds: course.categories?.map((category) => category.id) ?? [],
    };

    return payload;
  }

  async function handleSave() {
    try {
      const payload = buildPayload();
      await mutation.mutateAsync(payload);
    } catch (error) {
      toast.error("상세 설명을 저장하는 데 실패했어요.");
      return;
    }
    toast.success("상세 설명을 저장했어요.");
    router.refresh();
  }

  async function handlePublish() {
    try {
      const payload = buildPayload();
      payload.status = "PUBLISHED";
      await mutation.mutateAsync(payload);
    } catch (error) {
      toast.error("강의 제출에 실패했어요.");
      return;
    }
    toast.success("강의가 게시되었어요.");
    router.push(ROUTE_INSTRUCTOR_COURSES);
  }

  return (
    <div className="space-y-6">
      <CourseEditHeader
        course={course}
        onSave={handleSave}
        onSubmit={handlePublish}
        isSaving={mutation.isPending}
        isSubmitting={mutation.isPending}
      />
      <form
        onSubmit={handleSave}
        className="flex flex-col gap-6 rounded-lg border border-border bg-card p-6">
        <Field label="상세 설명" htmlFor="description">
          <Textarea
            id="description"
            value={formState.description}
            onChange={handleTextChange}
            placeholder="커리큘럼, 학습 목표 등을 자세히 적어 주세요."
            className="min-h-40"
          />
        </Field>
      </form>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
