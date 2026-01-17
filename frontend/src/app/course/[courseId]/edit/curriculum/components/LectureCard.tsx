"use client";

import { Lecture } from "@/generated/openapi-ts/types.gen";
import { Button } from "@/components/ui/button";
import { Lock, Pencil, Trash2, GripVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { EditLectureDialog } from "./EditLectureDialog";
import { DeleteLectureDialog } from "./DeleteLectureDialog";
import { useState } from "react";

interface LectureCardProps {
  lecture: Lecture;
  lectureNumber: number;
  sectionId: string;
}

export function LectureCard({ lecture, lectureNumber, sectionId }: LectureCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-3 p-3 border rounded-lg bg-background hover:bg-muted/50 transition-colors">
        <button className="cursor-grab text-muted-foreground hover:text-foreground">
          <GripVertical className="h-4 w-4" />
        </button>

        <span className="text-sm font-medium text-muted-foreground min-w-[1.5rem]">
          {lectureNumber}
        </span>

        <span className="flex-1 text-sm">{lecture.title}</span>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
          >
            <Lock className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={() => setIsEditOpen(true)}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>

          <Switch checked={true} className="scale-90" />

          <span className="text-sm font-medium text-muted-foreground">
            공개
          </span>
        </div>
      </div>

      <EditLectureDialog
        lecture={lecture}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <DeleteLectureDialog
        lecture={lecture}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
    </>
  );
}
