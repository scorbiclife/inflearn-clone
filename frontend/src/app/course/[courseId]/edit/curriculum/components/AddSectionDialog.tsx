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
import { Textarea } from "@/components/ui/textarea";
import { createSection } from "@/lib/api";
import { CreateSectionDto } from "@/generated/openapi-ts/types.gen";

interface AddSectionDialogProps {
  courseId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddSectionDialog({
  courseId,
  open,
  onOpenChange,
}: AddSectionDialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createSectionMutation = useMutation({
    mutationFn: async (data: CreateSectionDto) => {
      const response = await createSection({
        courseId,
        body: data,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("섹션이 추가되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      router.refresh();
      setTitle("");
      setDescription("");
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "섹션 추가에 실패했습니다."
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("섹션 제목을 입력해주세요.");
      return;
    }
    createSectionMutation.mutate({ title, description });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>섹션 추가</DialogTitle>
            <DialogDescription>
              새로운 섹션을 추가합니다. 섹션 제목은 필수입니다.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">섹션 제목 *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 섹션 1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">섹션 설명</Label>
              <Textarea
                id="description"
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
              disabled={createSectionMutation.isPending}
            >
              취소
            </Button>
            <Button type="submit" disabled={createSectionMutation.isPending}>
              {createSectionMutation.isPending ? "추가 중..." : "추가"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
