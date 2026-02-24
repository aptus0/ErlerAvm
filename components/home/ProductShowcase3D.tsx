import type { Product } from "@/lib/constants";

import { Sections } from "@/components/home/Sections";

interface ProductShowcase3DProps {
  products: Product[];
}

export function ProductShowcase3D({ products }: ProductShowcase3DProps) {
  return (
    <Sections
      title="3D Urunler"
      description="Sprint 2 icin @react-three/fiber entegrasyonuna hazir, V1'de yer tutucu kartlarla geliyor."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="card p-4">
            <div className="relative flex min-h-36 items-center justify-center overflow-hidden rounded-xl bg-[radial-gradient(circle_at_center,_#ffffff_10%,_#f8d7dc_65%,_#f3c9ce_100%)]">
              <div className="h-16 w-16 rotate-12 rounded-2xl border-2 border-[color:var(--color-primary)] bg-white/70 shadow-[8px_8px_0_0_rgba(217,15,35,0.25)]" />
              <span className="absolute bottom-3 rounded-full bg-[color:var(--color-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
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
