"use client";

import { useState, useEffect } from "react";
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
import { updateLecture } from "@/lib/api";
import { Lecture, UpdateLectureDto } from "@/generated/openapi-ts/types.gen";

interface EditLectureDialogProps {
  lecture: Lecture;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditLectureDialog({
  lecture,
  open,
  onOpenChange,
}: EditLectureDialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(lecture.title);

  useEffect(() => {
    if (open) {
      setTitle(lecture.title);
    }
  }, [open, lecture]);

  const updateLectureMutation = useMutation({
    mutationFn: async (data: UpdateLectureDto) => {
      const response = await updateLecture({
        id: lecture.id,
        body: data,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("강의가 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["course", lecture.courseId] });
      router.refresh();
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "강의 수정에 실패했습니다."
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("강의 제목을 입력해주세요.");
      return;
    }
    updateLectureMutation.mutate({ title });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>강의 수정</DialogTitle>
            <DialogDescription>
              강의 정보를 수정합니다. 강의 제목은 필수입니다.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-lecture-title">강의 제목 *</Label>
              <Input
                id="edit-lecture-title"
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
              disabled={updateLectureMutation.isPending}
            >
              취소
            </Button>
            <Button type="submit" disabled={updateLectureMutation.isPending}>
              {updateLectureMutation.isPending ? "수정 중..." : "수정"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
