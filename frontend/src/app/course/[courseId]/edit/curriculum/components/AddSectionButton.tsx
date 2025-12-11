"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddSectionDialog } from "./AddSectionDialog";

interface AddSectionButtonProps {
  courseId: string;
}

export function AddSectionButton({ courseId }: AddSectionButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="w-full border-dashed"
        onClick={() => setIsDialogOpen(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        섹션 추가
      </Button>

      <AddSectionDialog
        courseId={courseId}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
