import Image from "next/image";

import type { Product } from "@/lib/constants";

import { Sections } from "@/components/home/Sections";

interface ProductShowcase3DProps {
  products: Product[];
}

export function ProductShowcase3D({ products }: ProductShowcase3DProps) {
  return (
    <Sections
      title="3D Ürünler"
      description="Sprint 2 için @react-three/fiber entegrasyonuna hazır, V1'de yer tutucu kartlarla geliyor."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="rounded-2xl border border-[color:var(--color-border)] bg-white p-4 shadow-[0_12px_24px_rgba(15,23,42,0.06)]"
          >
            <div className="relative min-h-44 overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[#fff8f8]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-[color:var(--color-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                3D Hazir
              </span>
            </div>
            <h3 className="mt-3 text-base font-semibold">{product.name}</h3>
            <p className="text-sm text-[color:var(--color-muted)]">Model: {product.slug}</p>
          </article>
        ))}
      </div>
    </Sections>
  );
}
