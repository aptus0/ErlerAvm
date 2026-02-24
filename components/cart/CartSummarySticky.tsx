import Link from "next/link";

import {
  CheckBadgeIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

import type { CartTotals } from "@/lib/commerce";
import { formatTry } from "@/lib/commerce";

import { CouponBox } from "@/components/cart/CouponBox";

interface CartSummaryStickyProps {
  totals: CartTotals;
  appliedCoupon?: string;
  onApplyCoupon: (code: string) => { ok: boolean; message: string };
}

export function CartSummarySticky({ totals, onApplyCoupon, appliedCoupon }: CartSummaryStickyProps) {
  return (
    <aside className="space-y-3 lg:sticky lg:top-24">
      <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_18px_35px_rgba(15,23,42,0.08)]">
        <h2 className="text-xl font-bold">Siparis Ozeti</h2>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center justify-between text-[color:var(--color-muted)]">
            <p>Ara toplam</p>
            <p>{formatTry(totals.subtotal)}</p>
          </div>
          <div className="flex items-center justify-between text-[color:var(--color-muted)]">
            <p>Indirim</p>
            <p>-{formatTry(totals.discount)}</p>
          </div>
          <div className="flex items-center justify-between text-[color:var(--color-muted)]">
            <p>Kargo</p>
            <p>{totals.shipping === 0 ? "Ucretsiz" : formatTry(totals.shipping)}</p>
          </div>
          <div className="mt-2 border-t border-[color:var(--color-border)] pt-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Toplam</p>
              <p className="text-2xl font-bold text-[color:var(--color-primary)]">{formatTry(totals.total)}</p>
            </div>
          </div>
        </div>

        <Link
          href="/checkout"
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[color:var(--color-primary)] px-4 py-3 text-base font-bold text-white transition hover:bg-[color:var(--color-primary-strong)]"
        >
          Odemeye Gec
        </Link>

        <div className="mt-4 grid gap-2 text-xs text-[color:var(--color-muted)]">
          <p className="inline-flex items-center gap-2">
            <LockClosedIcon className="size-4 text-emerald-700" /> Guvenli odeme
          </p>
          <p className="inline-flex items-center gap-2">
            <CheckBadgeIcon className="size-4 text-emerald-700" /> 14 gun iade
          </p>
          <p className="inline-flex items-center gap-2">
            <CheckBadgeIcon className="size-4 text-emerald-700" /> Orijinal urun garantisi
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-[color:var(--color-border)] pt-3 text-[color:var(--color-muted)]">
          <CreditCardIcon className="size-4" />
          <span className="rounded-md border border-[color:var(--color-border)] bg-[#fffafa] px-2 py-1 text-[10px] font-bold">VISA</span>
          <span className="rounded-md border border-[color:var(--color-border)] bg-[#fffafa] px-2 py-1 text-[10px] font-bold">MC</span>
          <span className="rounded-md border border-[color:var(--color-border)] bg-[#fffafa] px-2 py-1 text-[10px] font-bold">TROY</span>
        </div>
      </section>

      <CouponBox onApply={onApplyCoupon} appliedCode={appliedCoupon} />
    </aside>
  );
}
