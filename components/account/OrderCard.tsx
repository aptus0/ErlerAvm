import Link from "next/link";

import { ArrowRightIcon, TruckIcon } from "@heroicons/react/24/outline";

import type { AccountOrder } from "@/lib/account";
import { formatTry, getOrderStatusMeta } from "@/lib/account";

import { StatusBadge } from "@/components/account/StatusBadge";

interface OrderCardProps {
  order: AccountOrder;
}

export function OrderCard({ order }: OrderCardProps) {
  const statusMeta = getOrderStatusMeta(order.status);
  const previewItems = order.items.slice(0, 3);
  const hiddenCount = Math.max(order.items.length - 3, 0);
  const showTracking = order.status === "shipped" || order.status === "delivered";

  return (
    <article className="rounded-2xl border border-[color:var(--color-border)] bg-white p-4 shadow-[0_12px_24px_rgba(15,23,42,0.05)]">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-center">
        <div>
          <p className="font-semibold">Siparis No: {order.id}</p>
          <p className="text-xs text-[color:var(--color-muted)]">Tarih: {order.date}</p>
        </div>

        <div className="flex items-center gap-2">
          {previewItems.map((item) => (
            <div
              key={item.id}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--color-border)] bg-[linear-gradient(145deg,_#fff1f2,_#fee2e2)] text-xs font-bold text-[color:var(--color-primary)]"
              title={item.name}
            >
              {item.name.slice(0, 2).toUpperCase()}
            </div>
          ))}
          {hiddenCount > 0 ? (
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--color-border)] bg-[#fffafa] text-xs font-bold text-[color:var(--color-muted)]">
              +{hiddenCount}
            </div>
          ) : null}
        </div>

        <div className="md:text-right">
          <p className="text-lg font-bold text-[color:var(--color-primary)]">{formatTry(order.total)}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 md:justify-end">
            <StatusBadge tone={statusMeta.tone}>{statusMeta.label}</StatusBadge>
            <Link
              href={`/account/orders/${order.id}`}
              className="inline-flex items-center gap-1 rounded-lg border border-[color:var(--color-border)] px-2.5 py-1 text-xs font-semibold hover:border-[color:var(--color-primary)]"
            >
              Detay <ArrowRightIcon className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-3 border-t border-[color:var(--color-border)] pt-3">
        {showTracking ? (
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--color-primary)] hover:underline"
          >
            <TruckIcon className="size-4" /> Kargo takip ({order.shippingCarrier})
          </button>
        ) : (
          <p className="text-xs text-[color:var(--color-muted)]">Kargo bilgisi hazir oldugunda burada gorunecek.</p>
        )}
      </div>
    </article>
  );
}
