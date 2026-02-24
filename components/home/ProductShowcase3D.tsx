import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/constants";
import { formatTry } from "@/lib/format";

import { Sections } from "@/components/home/Sections";

interface ProductShowcase3DProps {
  products: Product[];
}

export function ProductShowcase3D({ products }: ProductShowcase3DProps) {
  return (
    <Sections
      title="3D Ürünler"
      description="Urun detayinda 360 / 3D modal aktif. @react-three/fiber sahnesine bagli premium vitrin kartlari."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {products.map((product, index) => (
          <article
            key={`p3d-${product.id}-${index}`}
            className="group rounded-2xl border border-[color:var(--color-border)] bg-white p-3 shadow-[0_12px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-[#ef9da6] hover:shadow-[0_18px_30px_rgba(15,23,42,0.1)]"
          >
            <div className="relative h-36 overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[#fff8f8]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 16vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-[color:var(--color-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                3D Hazir
              </span>
            </div>

            <h3 className="mt-3 line-clamp-1 text-sm font-semibold">{product.name}</h3>
            <p className="text-xs text-[color:var(--color-muted)]">Model: {product.slug}</p>
            <p className="mt-2 text-sm font-bold text-[color:var(--color-primary)]">{formatTry(product.price)}</p>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                className="rounded-lg bg-[color:var(--color-primary)] px-2 py-2 text-xs font-semibold text-white transition hover:bg-[color:var(--color-primary-strong)]"
              >
                3D Ac
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
