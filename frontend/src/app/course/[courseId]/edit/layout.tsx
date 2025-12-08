import { SidebarProvider } from "@/components/ui/sidebar";
import { CourseEditSidebar } from "./components/CourseEditSidebar";

export default async function CourseEditLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}>) {
  const { courseId } = await params;

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <SidebarProvider>
        <div className="flex flex-1">
          <CourseEditSidebar courseId={courseId} />
          <main className="flex-1">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
