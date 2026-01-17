"use client";

import { Section } from "@/generated/openapi-ts/types.gen";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Pencil, Trash2, GripVertical, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { EditSectionDialog } from "./EditSectionDialog";
import { DeleteSectionDialog } from "./DeleteSectionDialog";
import { LectureList } from "./LectureList";
import { AddLectureDialog } from "./AddLectureDialog";
import { useState } from "react";

interface SectionCardProps {
  section: Section;
  sectionNumber: number;
  courseId: string;
}

export function SectionCard({ section, sectionNumber, courseId }: SectionCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddLectureOpen, setIsAddLectureOpen] = useState(false);

  const lectures = section.lectures || [];

  return (
    <>
      <Card className="border-l-4 border-l-green-500">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <button className="mt-1 cursor-grab text-muted-foreground hover:text-foreground">
              <GripVertical className="h-5 w-5" />
            </button>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-green-600">
                  섹션 {sectionNumber}
                </span>
              </div>
              <h3 className="font-medium text-base mb-3">{section.title}</h3>

              <div className="text-sm text-muted-foreground mb-4">
                {section.description || "..."}
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{lectures.length}</span>
                  <span>강의</span>
                </div>
              </div>

              <LectureList
                lectures={lectures}
                sectionId={section.id}
              />

              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-dashed"
                  onClick={() => setIsAddLectureOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  수업 추가
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Lock className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => setIsEditOpen(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => setIsDeleteOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <Switch checked={true} />

              <span className="text-sm font-medium text-muted-foreground">
                공개
              </span>
            </div>
          </div>
        </div>
      </Card>

      <EditSectionDialog
        section={section}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <DeleteSectionDialog
        section={section}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />

      <AddLectureDialog
        sectionId={section.id}
        courseId={courseId}
        open={isAddLectureOpen}
        onOpenChange={setIsAddLectureOpen}
      />
    </>
  );
}
