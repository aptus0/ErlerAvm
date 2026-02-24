import type { ReactNode } from "react";

interface SectionsProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function Sections({ title, description, children }: SectionsProps) {
  return (
    <section className="mt-10">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-[color:var(--color-muted)]">{description}</p>
      </div>
      {children}
    </section>
  );
}
