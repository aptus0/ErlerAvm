import { GiftIcon } from "@heroicons/react/24/outline";

import { StatusBadge } from "@/components/account/StatusBadge";
import { COUPON_ITEMS, getCouponStatusMeta } from "@/lib/account";

export default function AccountCouponsPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
        <h2 className="text-2xl font-bold">Kuponlarim ve Puanlarim</h2>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">Aktif kuponlarinizi gorun, suresi dolmadan kullanin.</p>

        <div className="mt-4 rounded-2xl border border-[color:var(--color-border)] bg-[#fff9f9] p-4">
          <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">Sadakat Puani</p>
          <p className="mt-2 text-3xl font-bold text-[color:var(--color-primary)]">1.280 puan</p>
          <p className="mt-1 text-xs text-[color:var(--color-muted)]">2.000 puanda 250 TL kupon tanimlanir.</p>
        </div>
      </section>

      <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
        <div className="grid gap-3">
          {COUPON_ITEMS.map((coupon) => {
            const statusMeta = getCouponStatusMeta(coupon.status);

            return (
              <article key={coupon.id} className="rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{coupon.title}</p>
                    <p className="text-xs text-[color:var(--color-muted)]">Kod: {coupon.code}</p>
                  </div>
                  <StatusBadge tone={statusMeta.tone}>{statusMeta.label}</StatusBadge>
                </div>

                <p className="mt-3 text-lg font-bold text-[color:var(--color-primary)]">{coupon.discountText}</p>
                <p className="mt-1 text-xs text-[color:var(--color-muted)]">Son kullanim: {coupon.expiresAt}</p>

                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm font-semibold hover:border-[color:var(--color-primary)]"
                >
                  <GiftIcon className="size-4" /> Kullan
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
