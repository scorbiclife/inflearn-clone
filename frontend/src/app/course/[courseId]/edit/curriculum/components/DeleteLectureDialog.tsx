"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteLecture } from "@/lib/api";
import { Lecture } from "@/generated/openapi-ts/types.gen";

interface DeleteLectureDialogProps {
  lecture: Lecture;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteLectureDialog({
  lecture,
  open,
  onOpenChange,
}: DeleteLectureDialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteLectureMutation = useMutation({
    mutationFn: async () => {
      const response = await deleteLecture({
        id: lecture.id,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("강의가 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["course", lecture.courseId] });
      router.refresh();
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "강의 삭제에 실패했습니다."
      );
    },
  });

  const handleDelete = () => {
    deleteLectureMutation.mutate();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>강의를 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            이 작업은 되돌릴 수 없습니다. 강의 &quot;{lecture.title}&quot;가
            영구적으로 삭제됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteLectureMutation.isPending}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteLectureMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteLectureMutation.isPending ? "삭제 중..." : "삭제"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
