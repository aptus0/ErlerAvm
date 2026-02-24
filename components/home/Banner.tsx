import Link from "next/link";

import { SparklesIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/Button";
import { NAV_MENU } from "@/lib/constants";

export function Banner() {
  const megaColumns =
    NAV_MENU.find((item) => item.id === "products" && item.type === "mega")?.mega?.columns ?? [];

  return (
    <section className="relative overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] bg-white p-6 shadow-[0_20px_34px_rgba(15,23,42,0.09)] md:p-8">
      <div className="pointer-events-none absolute -right-12 top-8 h-40 w-40 rounded-full bg-[#ffe5e8] blur-2xl" />
      <div className="pointer-events-none absolute -left-12 -top-10 h-36 w-36 rounded-full bg-[#fff1f2] blur-2xl" />

      <div className="relative grid gap-6 xl:grid-cols-[1.25fr_0.95fr] xl:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-primary)]">
            Erkur AVM V1
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-[color:var(--color-foreground)] md:text-5xl">
            Kırmızı-Beyaz temada modern e-ticaret altyapısı
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-[color:var(--color-muted)] md:text-base">
            Banner, ürün bölümleri, menü mimarisi ve admin panel route grupları hazır. Sprint 2 için
            ürün-kategori-sepet akışına geçilebilir.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/products">
              <Button className="h-11 px-6 text-white">Ürünlere Git</Button>
            </Link>
            <Link href="/products?campaign=flash">
              <Button variant="secondary" className="h-11 px-6">
                Kampanyaları Gör
              </Button>
            </Link>
          </div>
        </div>

        <aside className="rounded-2xl border border-[color:var(--color-border)] bg-[linear-gradient(150deg,_#fff7f8,_#ffffff)] p-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
          <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-primary)]">
            <SparklesIcon className="size-4" /> Mega Menü Hızlı Erişim
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
            {megaColumns.map((column) => (
              <div key={column.title} className="rounded-xl border border-[color:var(--color-border)] bg-white p-3">
                <p className="text-xs font-bold uppercase tracking-wide text-[color:var(--color-muted)]">
                  {column.title}
                </p>
                <div className="mt-2 grid gap-1">
                  {column.links.map((link, linkIndex) => (
                    <Link
                      key={`${column.title}-${link.title}-${linkIndex}`}
                      href={link.href}
                      className="rounded-lg px-2 py-1 text-sm font-medium hover:bg-[#fff1f2] hover:text-[color:var(--color-primary)]"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
