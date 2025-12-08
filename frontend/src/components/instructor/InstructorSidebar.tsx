"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Target,
  Users,
  MessageSquare,
  Star,
  Newspaper,
  DollarSign,
  Ticket,
  HelpCircle,
  ExternalLink,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { isActiveRoute } from "@/lib/route-utils";
import {
  ROUTE_INSTRUCTOR,
  ROUTE_INSTRUCTOR_COURSES,
  ROUTE_INSTRUCTOR_SUBMISSIONS,
  ROUTE_INSTRUCTOR_MENTORINGS,
  ROUTE_INSTRUCTOR_QUESTIONS,
  ROUTE_INSTRUCTOR_REVIEWS,
  ROUTE_INSTRUCTOR_NEWS,
  ROUTE_INSTRUCTOR_INCOMES,
  ROUTE_INSTRUCTOR_COUPONS,
  ROUTE_INSTRUCTOR_INQUIRIES,
  ROUTE_INSTRUCTOR_CREATE_COURSE,
} from "@/config/routes";

type MenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

const menuItems: MenuItem[] = [
  {
    label: "대시보드",
    href: ROUTE_INSTRUCTOR,
    icon: LayoutDashboard,
  },
  {
    label: "강의 관리",
    href: ROUTE_INSTRUCTOR_COURSES,
    icon: BookOpen,
  },
  {
    label: "미션 관리",
    href: ROUTE_INSTRUCTOR_SUBMISSIONS,
    icon: Target,
  },
  {
    label: "멘토링 관리",
    href: ROUTE_INSTRUCTOR_MENTORINGS,
    icon: Users,
  },
  {
    label: "강의 질문 관리",
    href: ROUTE_INSTRUCTOR_QUESTIONS,
    icon: MessageSquare,
  },
  {
    label: "수강평 리스트",
    href: ROUTE_INSTRUCTOR_REVIEWS,
    icon: Star,
  },
  {
    label: "새소식 관리",
    href: ROUTE_INSTRUCTOR_NEWS,
    icon: Newspaper,
  },
  {
    label: "수익 확인",
    href: ROUTE_INSTRUCTOR_INCOMES,
    icon: DollarSign,
  },
  {
    label: "쿠폰 관리",
    href: ROUTE_INSTRUCTOR_COUPONS,
    icon: Ticket,
  },
  {
    label: "수강전 문의 관리",
    href: ROUTE_INSTRUCTOR_INQUIRIES,
    icon: HelpCircle,
  },
];

function SidebarItem({ item }: { item: MenuItem }) {
  const pathname = usePathname();
  const Icon = item.icon;

  const isActive = isActiveRoute(
    { pathname, href: item.href },
    { exactMatchOnly: item.href === ROUTE_INSTRUCTOR }
  );

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className={cn(
          "w-full justify-start",
          isActive &&
            "font-medium bg-green-50! text-green-700! hover:bg-green-100! hover:text-green-800!"
        )}>
        <Link
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          className="flex items-center gap-2">
          <Icon className="size-4" />
          <span>{item.label}</span>
          {item.external && (
            <ExternalLink className="size-3 ml-auto opacity-60" />
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function InstructorSidebar() {
  return (
    <Sidebar
      variant="sidebar"
      className="static flex-stretch h-full [&_[data-slot=sidebar-container]] [&_[data-slot=sidebar-container]] [&_[data-slot=sidebar-container]]">
      <SidebarHeader className="p-4">
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium"
          asChild>
          <Link href={ROUTE_INSTRUCTOR_CREATE_COURSE}>새 강의 만들기</Link>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarItem item={item} key={item.href}></SidebarItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
