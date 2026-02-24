import { NAV_MENU, PRODUCTS } from "@/lib/constants";

export default function AdminDashboardPage() {
  const cards = [
    { label: "Toplam Urun", value: PRODUCTS.length.toString() },
    {
      label: "Aktif Menu Ogeleri",
      value: NAV_MENU.filter((item) => item.isActive).length.toString(),
    },
    {
      label: "3D Hazir Urun",
      value: PRODUCTS.filter((item) => item.has3d).length.toString(),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-sm text-[color:var(--color-muted)]">
        Sprint 1 durum ozetleri ve yonetsel metrik kartlari.
      </p>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.label} className="card p-5">
            <p className="text-sm text-[color:var(--color-muted)]">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-[color:var(--color-primary)]">{card.value}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
