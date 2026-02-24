import { NAV_MENU } from "@/lib/constants";

export default function AdminMenusPage() {
  return (
    <section className="card p-6">
      <h1 className="text-2xl font-bold">Menuler</h1>
      <p className="mt-2 text-sm text-[color:var(--color-muted)]">
        Mega menu, dropdown ve kurumsal linkler burada siralanacak. Drag-drop Sprint 2.
      </p>

      <div className="mt-6 grid gap-3">
        {NAV_MENU.sort((a, b) => a.order - b.order).map((menu) => (
          <article key={menu.id} className="rounded-xl border border-[color:var(--color-border)] p-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold">{menu.title}</p>
              <span className="rounded-full bg-[color:var(--color-background)] px-2 py-1 text-xs font-semibold text-[color:var(--color-primary)]">
                {menu.type}
              </span>
              <span className="rounded-full bg-white px-2 py-1 text-xs text-[color:var(--color-muted)]">
                order: {menu.order}
              </span>
            </div>
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">{menu.href}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
