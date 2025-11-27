"use client";

import { useState } from "react";
import { formatCourseEditRoute } from "@/config/routes";
import { useMutation } from "@tanstack/react-query";
import { createCourse } from "@/lib/api";
import { RedirectType, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateCoursePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");

  const mutation = useMutation({
    mutationFn: (options: { title: string }) => {
      return createCourse({ title });
    },
    onSuccess: (result) => {
      if (result?.data?.id) {
        const courseId = result.data.id;
        const courseEditRoute = formatCourseEditRoute(courseId);
        toast.success(`Created course ${courseId}`);
        router.push(courseEditRoute);
        return;
      }
      toast.error(result.error?.toString() ?? "Unknown Error");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutateAsync({ title });
  }

  function handleTitleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>강의 제목을 입력해 주세요!</h1>
      <p>너무 고민하지 마세요. 제목은 언제든 수정할 수 있어요.</p>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleTitleInput}
        placeholder="강의 제목을 입력해주세요."
      />
      <div>
        <button
          type="submit"
          className="px-2 py-2 rounded-md bg-green-500 text-white">
          만들기
        </button>
      </div>
    </form>
  );
}
