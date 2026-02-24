import { ShieldCheckIcon } from "@heroicons/react/24/outline";

import type { CartTotals } from "@/lib/commerce";
import { formatTry } from "@/lib/commerce";

interface OrderSummaryStickyProps {
  totals: CartTotals;
}

export function OrderSummarySticky({ totals }: OrderSummaryStickyProps) {
  return (
    <aside className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_18px_35px_rgba(15,23,42,0.08)] lg:sticky lg:top-24">
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
      </div>

      <div className="mt-4 border-t border-[color:var(--color-border)] pt-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Toplam</p>
          <p className="text-2xl font-bold text-[color:var(--color-primary)]">{formatTry(totals.total)}</p>
        </div>
      </div>

      <p className="mt-4 inline-flex items-center gap-1 text-xs text-emerald-700">
        <ShieldCheckIcon className="size-4" /> Bu adimda odeme alinmaz, son adimda siparis tamamlanir.
      </p>
    </aside>
  );
}
