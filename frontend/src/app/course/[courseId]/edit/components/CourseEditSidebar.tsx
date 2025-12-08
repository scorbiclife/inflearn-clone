"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { isActiveRoute, formatCourseEditRoute } from "@/lib/route-utils";

type StepItem = {
  id: string;
  label: string;
  href: string;
  completed?: boolean;
};

type CourseEditSidebarProps = {
  courseId: string;
  completedSteps?: string[];
};

const stepItems: Omit<StepItem, "href">[] = [
  {
    id: "course-info",
    label: "강의 정보",
  },
  {
    id: "curriculum",
    label: "커리큘럼",
  },
  {
    id: "detail",
    label: "상세소개",
  },
  {
    id: "cover-image",
    label: "커버 이미지",
  },
];

function StepItem({ item, isActive, isCompleted }: {
  item: StepItem;
  isActive: boolean;
  isCompleted: boolean;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className={cn(
          "w-full justify-start",
          isActive &&
            "font-medium bg-gray-200 text-gray-900 hover:bg-gray-300"
        )}>
        <Link
          href={item.href}
          className="flex items-center gap-2">
          {(isActive || isCompleted) && (
            <CheckIcon className="size-4 text-green-600" />
          )}
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function CourseEditSidebar({
  courseId,
  completedSteps = [],
}: CourseEditSidebarProps) {
  const pathname = usePathname();

  const items: StepItem[] = stepItems.map((item) => ({
    ...item,
    href: formatCourseEditRoute(courseId, item.id),
  }));

  return (
    <Sidebar
      variant="sidebar"
      className="static flex-stretch h-full">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = isActiveRoute({ pathname, href: item.href });
                const isCompleted = completedSteps.includes(item.id) || isActive;

                return (
                  <StepItem
                    key={item.id}
                    item={item}
                    isActive={isActive}
                    isCompleted={isCompleted}
                  />
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

