import Link from "next/link";

import { Button } from "@/components/ui/Button";

export function Banner() {
  return (
    <section className="card relative overflow-hidden border-none bg-[color:var(--color-primary)] p-8 text-white md:p-12">
      <div className="pointer-events-none absolute -right-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-white/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-black/15 blur-3xl" />

      <div className="relative max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Erkur AVM V1</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
          Kirmizi-Beyaz temada modern e-ticaret altyapisi
        </h1>
        <p className="mt-4 text-sm text-white/90 md:text-base">
          Banner, urun sectionlari, menu mimarisi ve admin panel route gruplari hazir. Sprint 2 icin
          urun-kategori-sepet akisina gecilebilir.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/products">
            <Button className="border border-white/40 bg-white text-[color:var(--color-primary)] hover:bg-white/90">
              Urunlere Git
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="ghost" className="border border-white/30 text-white hover:bg-white/10">
              Admin Panel
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
