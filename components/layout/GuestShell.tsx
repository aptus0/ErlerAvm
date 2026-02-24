import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";

export function GuestShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Navbar />
      <main className="container flex-1 py-8">{children}</main>
      <Footer />
    </div>
  );
}
