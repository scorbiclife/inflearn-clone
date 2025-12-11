"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createLecture } from "@/lib/api";
import { CreateLectureDto } from "@/generated/openapi-ts/types.gen";

interface AddLectureDialogProps {
  sectionId: string;
  courseId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddLectureDialog({
  sectionId,
  courseId,
  open,
  onOpenChange,
}: AddLectureDialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  const createLectureMutation = useMutation({
    mutationFn: async (data: CreateLectureDto) => {
      const response = await createLecture({
        sectionId,
        body: data,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("강의가 추가되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      router.refresh();
      setTitle("");
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "강의 추가에 실패했습니다."
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("강의 제목을 입력해주세요.");
      return;
    }
    createLectureMutation.mutate({ title });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>강의 추가</DialogTitle>
            <DialogDescription>
              새로운 강의를 추가합니다. 강의 제목은 필수입니다.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="lecture-title">강의 제목 *</Label>
              <Input
                id="lecture-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 강의 소개"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createLectureMutation.isPending}
            >
              취소
            </Button>
            <Button type="submit" disabled={createLectureMutation.isPending}>
              {createLectureMutation.isPending ? "추가 중..." : "추가"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
