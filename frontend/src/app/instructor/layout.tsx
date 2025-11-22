import { authUser } from "@/auth";
import { InstructorSidebar } from "@/components/instructor/InstructorSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { use, useContext } from "react";

export default async function InstructorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await authUser();
  if (!user) {
    return <h1>로그인하셔야 지식공유자 페이지를 볼 수 있습니다. 로그인해주세요!</h1>;
  }
  return (
    <div className="flex flex-col w-full">
      <SidebarProvider>
        <InstructorSidebar />
        {children}
      </SidebarProvider>
    </div>
  );
}
