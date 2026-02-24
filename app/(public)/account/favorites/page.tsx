import Link from "next/link";

import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

import { FAVORITE_ITEMS, formatTry } from "@/lib/account";

export default function AccountFavoritesPage() {
  return (
    <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
      <h2 className="text-2xl font-bold">Favorilerim</h2>
      <p className="mt-1 text-sm text-[color:var(--color-muted)]">Begendiginiz urunleri kaydedin, stok ve fiyat degisimlerini takip edin.</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {FAVORITE_ITEMS.map((item) => (
          <article key={item.id} className="rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">{item.category}</p>
                <h3 className="mt-1 font-semibold">{item.name}</h3>
              </div>

              {item.inStock ? (
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                  Stokta
                </span>
              ) : (
                <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">Stok Bitti</span>
              )}
            </div>

            <p className="mt-3 text-lg font-bold text-[color:var(--color-primary)]">{formatTry(item.price)}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--color-primary)] px-3 py-2 text-sm font-semibold text-white hover:bg-[color:var(--color-primary-strong)]"
              >
                <ShoppingCartIcon className="size-4" /> Sepete Ekle
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm font-semibold hover:border-[color:var(--color-primary)]"
              >
                <HeartIcon className="size-4" /> Kaldir
              </button>
              <Link
                href={`/products/${item.slug}`}
                className="inline-flex items-center rounded-xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm font-semibold hover:border-[color:var(--color-primary)]"
              >
                Urune Git
              </Link>
            </div>

            {!item.inStock ? (
              <p className="mt-3 text-xs font-semibold text-red-600">Bu urun su an stokta yok. Stok gelince bildirim acabilirsiniz.</p>
            ) : (
              <p className="mt-3 text-xs text-[color:var(--color-muted)]">Kalan stok: {item.stockLeft}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
