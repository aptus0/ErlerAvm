import Link from "next/link";

import { CubeIcon, HeartIcon, RectangleStackIcon } from "@heroicons/react/24/outline";

import { StatusBadge } from "@/components/account/StatusBadge";
import {
  getAccountSummary,
  getLatestOrder,
  getOrderStatusMeta,
  formatTry,
} from "@/lib/account";

export default function AccountDashboardPage() {
  const summary = getAccountSummary();
  const latestOrder = getLatestOrder();
  const latestOrderMeta = latestOrder ? getOrderStatusMeta(latestOrder.status) : null;

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
        <h2 className="text-xl font-bold">Dashboard Ozeti</h2>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">
          Hesabinizi tek yerden yonetin, siparis ve iade surecini kolayca takip edin.
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <article className="rounded-2xl border border-[color:var(--color-border)] bg-[#fff9f9] p-4">
            <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">Toplam Siparis</p>
            <p className="mt-2 text-3xl font-bold text-[color:var(--color-primary)]">{summary.totalOrders}</p>
          </article>

          <article className="rounded-2xl border border-[color:var(--color-border)] bg-[#fff9f9] p-4">
            <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">Aktif Siparis</p>
            <p className="mt-2 text-3xl font-bold text-[color:var(--color-primary)]">{summary.activeOrders}</p>
          </article>

          <article className="rounded-2xl border border-[color:var(--color-border)] bg-[#fff9f9] p-4">
            <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">Favoriler</p>
            <p className="mt-2 text-3xl font-bold text-[color:var(--color-primary)]">{summary.favorites}</p>
          </article>
        </div>
      </section>

      <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
        <h2 className="text-xl font-bold">Son Siparis</h2>

        {latestOrder && latestOrderMeta ? (
          <article className="mt-4 rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{latestOrder.id}</p>
                <p className="text-xs text-[color:var(--color-muted)]">{latestOrder.date}</p>
              </div>
              <StatusBadge tone={latestOrderMeta.tone}>{latestOrderMeta.label}</StatusBadge>
            </div>

            <p className="mt-3 text-lg font-bold text-[color:var(--color-primary)]">
              {formatTry(latestOrder.total)}
            </p>

            <Link
              href={`/account/orders/${latestOrder.id}`}
              className="mt-4 inline-flex rounded-xl border border-[color:var(--color-primary)] px-3 py-2 text-sm font-semibold text-[color:var(--color-primary)] transition hover:bg-[color:var(--color-primary)] hover:text-white"
            >
              Siparis detayi
            </Link>
          </article>
        ) : (
          <p className="mt-4 text-sm text-[color:var(--color-muted)]">Siparis bulunamadi.</p>
        )}
      </section>

      <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
        <h2 className="text-xl font-bold">Hizli Islemler</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--color-primary-strong)]"
          >
            <RectangleStackIcon className="size-4" /> Siparislerime Git
          </Link>
          <Link
            href="/account/addresses"
            className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold hover:border-[color:var(--color-primary)]"
          >
            <CubeIcon className="size-4" /> Adres Ekle
          </Link>
          <Link
            href="/account/favorites"
            className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold hover:border-[color:var(--color-primary)]"
          >
            <HeartIcon className="size-4" /> Favorilere Git
          </Link>
        </div>
      </section>
    </div>
  );
}
