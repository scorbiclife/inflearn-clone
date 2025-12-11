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
import { deleteSection } from "@/lib/api";
import { Section } from "@/generated/openapi-ts/types.gen";

interface DeleteSectionDialogProps {
  section: Section;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteSectionDialog({
  section,
  open,
  onOpenChange,
}: DeleteSectionDialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteSectionMutation = useMutation({
    mutationFn: async () => {
      const response = await deleteSection({
        id: section.id,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("섹션이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["course", section.courseId] });
      router.refresh();
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "섹션 삭제에 실패했습니다."
      );
    },
  });

  const handleDelete = () => {
    deleteSectionMutation.mutate();
  };

  const lectureCount = section.lectures?.length || 0;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>섹션을 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            이 작업은 되돌릴 수 없습니다. 섹션 &quot;{section.title}&quot;
            {lectureCount > 0 && ` 및 포함된 ${lectureCount}개의 강의`}가
            영구적으로 삭제됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteSectionMutation.isPending}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteSectionMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteSectionMutation.isPending ? "삭제 중..." : "삭제"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
