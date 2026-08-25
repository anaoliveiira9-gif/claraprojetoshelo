import type { ReactNode } from "react";
import { OrbitSidebar, OrbitMobileNav } from "@/components/labs/004/sidebar";
import { OrbitTopbar } from "@/components/labs/004/topbar";

export default function OrbitAppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <OrbitSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <OrbitTopbar />
        <OrbitMobileNav />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
