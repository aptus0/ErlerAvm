import type { ReactNode } from "react";

interface SectionsProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function Sections({ title, description, children }: SectionsProps) {
  return (
    <section className="mt-12 rounded-[1.75rem] border border-[color:var(--color-border)] bg-[linear-gradient(150deg,_#fff7f8,_#ffffff)] p-4 shadow-[0_18px_34px_rgba(15,23,42,0.05)] sm:p-6">
      <div className="mb-5 grid gap-2 md:grid-cols-[auto_1fr] md:items-end md:gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-primary)]">
            Section
          </p>
          <h2 className="text-2xl font-black tracking-tight">{title}</h2>
        </div>
        <p className="max-w-3xl text-sm text-[color:var(--color-muted)]">{description}</p>
      </div>
      {children}
    </section>
  );
}
