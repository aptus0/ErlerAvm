import Link from "next/link";

import { PRODUCTS } from "@/lib/constants";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProductsPage() {
  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-bold">Urunler</h1>
        <p className="mt-2 text-sm text-[color:var(--color-muted)]">
          Sprint 2de API filtreleri ve kategori sayfasi ile genisletilecek listeleme.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <article key={product.id} className="card p-4">
            <p className="inline-flex rounded-full bg-[color:var(--color-background)] px-2 py-1 text-xs font-semibold text-[color:var(--color-primary)]">
              {product.category}
            </p>
            <h2 className="mt-3 text-lg font-semibold">{product.name}</h2>
            <p className="mt-1 text-sm text-[color:var(--color-muted)]">{product.shortDescription}</p>
            <div className="mt-4 flex items-center justify-between">
              <p className="font-bold text-[color:var(--color-primary)]">{formatCurrency(product.price)}</p>
              <Link href={`/products/${product.slug}`} className="text-sm font-semibold hover:underline">
                Detay
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
