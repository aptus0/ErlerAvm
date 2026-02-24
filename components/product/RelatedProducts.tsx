import Link from "next/link";

import type { Product } from "@/lib/constants";

interface RelatedProductsProps {
  title: string;
  products: Product[];
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

export function RelatedProducts({ title, products }: RelatedProductsProps) {
  if (!products.length) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="mt-4 space-y-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="block rounded-xl border border-[color:var(--color-border)] bg-[#fffafa] p-3 transition hover:border-[color:var(--color-primary)]/55"
          >
            <p className="font-semibold">{product.name}</p>
            <p className="mt-1 text-xs text-[color:var(--color-muted)]">{product.category}</p>
            <p className="mt-2 text-sm font-bold text-[color:var(--color-primary)]">{formatCurrency(product.price)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
