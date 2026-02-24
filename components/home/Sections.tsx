import type { ReactNode } from "react";

interface SectionsProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function Sections({ title, description, children }: SectionsProps) {
  return (
    <section className="mt-8 rounded-[1.75rem] border border-[color:var(--color-border)] bg-[linear-gradient(150deg,_#fff7f8,_#ffffff)] p-3.5 shadow-[0_18px_34px_rgba(15,23,42,0.05)] [content-visibility:auto] [contain-intrinsic-size:1px_780px] sm:mt-12 sm:p-6">
      <div className="mb-4 grid gap-2 md:mb-5 md:grid-cols-[auto_1fr] md:items-end md:gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-primary)]">
            Section
          </p>
          <h2 className="text-xl font-black tracking-tight sm:text-2xl">{title}</h2>
        </div>
        <p className="max-w-3xl text-xs text-[color:var(--color-muted)] sm:text-sm">{description}</p>
      </div>
      {children}
    </section>
  );
}
