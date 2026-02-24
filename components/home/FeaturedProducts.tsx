import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/constants";
import { formatTry } from "@/lib/format";

import { Sections } from "@/components/home/Sections";

interface FeaturedProductsProps {
  title: string;
  description: string;
  products: Product[];
}

export function FeaturedProducts({ title, description, products }: FeaturedProductsProps) {
  return (
    <Sections title={title} description={description}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {products.map((product, index) => (
          <article
            key={`${title}-${product.id}-${index}`}
            className="group rounded-2xl border border-[color:var(--color-border)] bg-white p-3 shadow-[0_12px_20px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-[#ef9da6] hover:shadow-[0_18px_28px_rgba(15,23,42,0.1)]"
          >
            <div className="relative h-36 overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[#fff7f8]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 16vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold text-[color:var(--color-primary)]">
                {product.category}
              </span>
              {product.has3d ? (
                <span className="absolute right-2 top-2 rounded-full bg-[color:var(--color-primary)] px-2 py-1 text-[10px] font-semibold text-white">
                  3D Hazir
                </span>
              ) : null}
            </div>

            <h3 className="mt-3 line-clamp-1 text-sm font-semibold">{product.name}</h3>
            <p className="mt-1 line-clamp-2 min-h-9 text-xs text-[color:var(--color-muted)]">{product.shortDescription}</p>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-bold text-[color:var(--color-primary)]">{formatTry(product.price)}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[color:var(--color-muted)]">
                {product.has3d ? "3D Hazir" : "Standart"}
              </p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                className="rounded-lg bg-[color:var(--color-primary)] px-2 py-2 text-xs font-semibold text-white transition hover:bg-[color:var(--color-primary-strong)]"
              >
                Satin Al
              </button>
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex items-center justify-center rounded-lg border border-[color:var(--color-border)] bg-white px-2 py-2 text-xs font-semibold transition hover:border-[color:var(--color-primary)]"
              >
                Incele
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Sections>
  );
}
