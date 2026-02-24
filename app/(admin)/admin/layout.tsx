import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminTopbar } from "@/components/layout/AdminTopbar";
import { isAdminAuthenticatedFromCookieStore } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = await isAdminAuthenticatedFromCookieStore();

  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-[#fff8f8]">
      <AdminSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <AdminTopbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
