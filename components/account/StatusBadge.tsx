import type { ReactNode } from "react";

type BadgeTone = "blue" | "amber" | "green" | "red" | "gray";

interface StatusBadgeProps {
  tone: BadgeTone;
  children: ReactNode;
}

const toneClasses: Record<BadgeTone, string> = {
  blue: "bg-sky-100 text-sky-700 border-sky-200",
  amber: "bg-amber-100 text-amber-700 border-amber-200",
  green: "bg-emerald-100 text-emerald-700 border-emerald-200",
  red: "bg-red-100 text-red-700 border-red-200",
  gray: "bg-zinc-100 text-zinc-700 border-zinc-200",
};

export function StatusBadge({ tone, children }: StatusBadgeProps) {
  return (
    <span className={["inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold", toneClasses[tone]].join(" ")}>
      {children}
    </span>
  );
}
