import type { ReactNode } from "react";

import { GuestShell } from "@/components/layout/GuestShell";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <GuestShell>{children}</GuestShell>;
}
