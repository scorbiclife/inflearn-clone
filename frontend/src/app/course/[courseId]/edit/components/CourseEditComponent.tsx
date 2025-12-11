"use client";

import { useState, type ChangeEvent, type ReactNode } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CourseCategory,
  type Course,
  type UpdateCourseDto,
} from "@/generated/openapi-ts";
import { findAllCategories, updateCourse } from "@/lib/api";
import { ROUTE_INSTRUCTOR_COURSES } from "@/config/routes";
import CourseEditHeader from "./CourseEditHeader";

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
  title: string;
  shortDescription: string;
  thumbnailUrl: string;
  price: number;
  discountPrice: number;
  level: string;
  categoryIds: string[];
};

export default function CourseEditComponent({ course }: { course: Course }) {
  const router = useRouter();

  const [formState, setFormState] = useState<FormState>({
    title: course.title ?? "",
    shortDescription: course.shortDescription ?? "",
    thumbnailUrl: course.thumbnailUrl ?? "",
    price: course.price ?? 0,
    discountPrice: course.discountPrice ?? 0,
    level: course.level ?? "BEGINNER",
    categoryIds: course.categories?.map((category) => category.id) ?? [],
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const result = await findAllCategories();
      return handleApiResult<CourseCategory[]>(
        result,
        "Could not load categories",
        []
      );
    },
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

  const handleTextChange =
    (field: keyof Omit<FormState, "price" | "discountPrice">) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setFormState((prev) => ({ ...prev, [field]: value }));
    };

  const handleNumberChange =
    (field: "price" | "discountPrice") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const numValue = value === "" ? 0 : Number(value);
      if (!isNaN(numValue)) {
        setFormState((prev) => ({ ...prev, [field]: numValue }));
      }
    };

  const handleCategoryToggle = (categoryId: string) => {
    setFormState((prev) => {
      const isSelected = prev.categoryIds.includes(categoryId);
      return {
        ...prev,
        categoryIds: isSelected
          ? prev.categoryIds.filter((id) => id !== categoryId)
          : [...prev.categoryIds, categoryId],
      };
    });
  };

  function buildPayload(): UpdateCourseDto {
    const payload: UpdateCourseDto = {
      title: formState.title,
      shortDescription: formState.shortDescription,
      description: course.description ?? undefined,
      thumbnailUrl: formState.thumbnailUrl ?? null,
      price: formState.price,
      discountPrice: formState.discountPrice,
      level: formState.level,
      status: course.status,
      categoryIds: formState.categoryIds,
    };

    return payload;
  }

  async function handleSave() {
    try {
      const payload = buildPayload();
      await mutation.mutateAsync(payload);
    } catch (error) {
      toast.error("강의 정보를 저장하는 데 실패했어요.");
      return;
    }
    toast.success("강의 정보를 저장했어요.");
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
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="강의 제목" htmlFor="title">
            <Input
              id="title"
              value={formState.title}
              onChange={handleTextChange("title")}
              placeholder="예) 한 번에 끝내는 타입스크립트"
              required
            />
          </Field>

          <Field label="레벨" htmlFor="level">
            <Select
              value={formState.level}
              onValueChange={(value) =>
                setFormState((prev) => ({ ...prev, level: value }))
              }>
              <SelectTrigger id="level" className="w-full">
                <SelectValue placeholder="레벨을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BEGINNER">초급</SelectItem>
                <SelectItem value="INTERMEDIATE">중급</SelectItem>
                <SelectItem value="ADVANCED">고급</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="썸네일 URL" htmlFor="thumbnailUrl">
            <Input
              id="thumbnailUrl"
              value={formState.thumbnailUrl}
              onChange={handleTextChange("thumbnailUrl")}
              placeholder="https://..."
              type="url"
            />
          </Field>

          <Field label="정가" htmlFor="price">
            <Input
              id="price"
              value={formState.price}
              onChange={handleNumberChange("price")}
              placeholder="예) 132000"
              inputMode="numeric"
              type="number"
            />
          </Field>

          <Field label="할인가" htmlFor="discountPrice">
            <Input
              id="discountPrice"
              value={formState.discountPrice}
              onChange={handleNumberChange("discountPrice")}
              placeholder="예) 99000"
              inputMode="numeric"
              type="number"
            />
          </Field>
        </div>

        <Field label="강의 요약" htmlFor="shortDescription">
          <Textarea
            id="shortDescription"
            value={formState.shortDescription}
            onChange={handleTextChange("shortDescription")}
            placeholder="1-2줄 정도의 짧은 설명이면 충분해요!"
            className="min-h-24"
          />
        </Field>

        <div className="space-y-2">
          <Label>카테고리</Label>
          <p className="text-sm text-muted-foreground">
            강의와 연결할 카테고리를 선택하세요.
          </p>
          <div className="rounded-md border">
            <ScrollArea className="h-48 p-4">
              {isLoadingCategories && (
                <p className="text-sm text-muted-foreground">
                  카테고리를 불러오는 중입니다...
                </p>
              )}
              {!isLoadingCategories && categories.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  사용할 수 있는 카테고리가 없어요.
                </p>
              )}
              {!isLoadingCategories && categories.length > 0 && (
                <div className="flex flex-col gap-3">
                  {categories.map((category) => {
                    const checked = formState.categoryIds.includes(category.id);
                    return (
                      <label
                        key={category.id}
                        className="flex items-center gap-3 text-sm">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() =>
                            handleCategoryToggle(category.id)
                          }
                        />
                        <span>{category.name}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
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
