import { PRODUCTS } from "@/lib/constants";

export default function AdminCategoriesPage() {
  const categories = Array.from(new Set(PRODUCTS.map((product) => product.category)));

  return (
    <section className="card p-6">
      <h1 className="text-2xl font-bold">Kategoriler</h1>
      <p className="mt-2 text-sm text-[color:var(--color-muted)]">
        Sprint 2 ile kategori CRUD ve urun iliskileri bu ekran uzerinden yonetilecek.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <article key={category} className="rounded-xl border border-[color:var(--color-border)] p-4">
            <p className="text-lg font-semibold">{category}</p>
            <p className="mt-1 text-sm text-[color:var(--color-muted)]">Yonetim modu: taslak</p>
          </article>
        ))}
      </div>
    </section>
  );
}
