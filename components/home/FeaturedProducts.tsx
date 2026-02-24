import Link from "next/link";

import type { Product } from "@/lib/constants";

import { Sections } from "@/components/home/Sections";

interface FeaturedProductsProps {
  title: string;
  description: string;
  products: Product[];
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

export function FeaturedProducts({ title, description, products }: FeaturedProductsProps) {
  return (
    <Sections title={title} description={description}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="card p-4">
            <div className="flex min-h-28 items-center justify-center rounded-xl bg-[color:var(--color-background)] text-xs font-semibold uppercase text-[color:var(--color-muted)]">
              {product.category}
            </div>
            <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
            <p className="mt-1 text-sm text-[color:var(--color-muted)]">{product.shortDescription}</p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-base font-bold text-[color:var(--color-primary)]">{formatCurrency(product.price)}</p>
              <Link href={`/products/${product.slug}`} className="text-sm font-semibold hover:underline">
                Incele
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Sections>
  );
}
