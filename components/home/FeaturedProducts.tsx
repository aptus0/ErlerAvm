import Image from "next/image";
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
          <article
            key={product.id}
            className="rounded-2xl border border-[color:var(--color-border)] bg-white p-4 shadow-[0_12px_24px_rgba(15,23,42,0.06)]"
          >
            <div className="relative h-48 overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[#fff7f8]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-[color:var(--color-primary)]">
                {product.category}
              </span>
            </div>

            <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
            <p className="mt-1 text-sm text-[color:var(--color-muted)]">{product.shortDescription}</p>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-base font-bold text-[color:var(--color-primary)]">{formatCurrency(product.price)}</p>
              <p className="text-xs text-[color:var(--color-muted)]">Stok: {product.has3d ? "3D" : "Standart"}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                className="rounded-xl bg-[color:var(--color-primary)] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[color:var(--color-primary-strong)]"
              >
                Satin Al
              </button>
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex items-center justify-center rounded-xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm font-semibold transition hover:border-[color:var(--color-primary)]"
              >
                Urune Goz At
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Sections>
  );
}
