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
import { Textarea } from "@/components/ui/textarea";
import { updateSection } from "@/lib/api";
import { Section, UpdateSectionDto } from "@/generated/openapi-ts/types.gen";

interface EditSectionDialogProps {
  section: Section;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditSectionDialog({
  section,
  open,
  onOpenChange,
}: EditSectionDialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(section.title);
  const [description, setDescription] = useState(section.description || "");

  useEffect(() => {
    if (open) {
      setTitle(section.title);
      setDescription(section.description || "");
    }
  }, [open, section]);

  const updateSectionMutation = useMutation({
    mutationFn: async (data: UpdateSectionDto) => {
      const response = await updateSection({
        id: section.id,
        body: data,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("섹션이 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["course", section.courseId] });
      router.refresh();
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "섹션 수정에 실패했습니다."
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("섹션 제목을 입력해주세요.");
      return;
    }
    updateSectionMutation.mutate({ title, description });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>섹션 수정</DialogTitle>
            <DialogDescription>
              섹션 정보를 수정합니다. 섹션 제목은 필수입니다.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">섹션 제목 *</Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 섹션 1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">섹션 설명</Label>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="섹션 제목을 작성해주세요. (최대 200자)"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={updateSectionMutation.isPending}
            >
              취소
            </Button>
            <Button type="submit" disabled={updateSectionMutation.isPending}>
              {updateSectionMutation.isPending ? "수정 중..." : "수정"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
