"use client";

import { usePathname } from "next/navigation";

type HeaderWrapperProps = {
  children: React.ReactNode;
};

export default function HeaderWrapper({ children }: HeaderWrapperProps) {
  const pathname = usePathname();
  const isCourseEditPage =
    pathname.includes("/course/") && pathname.includes("/edit");

  if (isCourseEditPage) {
    return null;
  }

  return <>{children}</>;
}

