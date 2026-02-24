import Link from "next/link";

import { ArrowPathIcon } from "@heroicons/react/24/outline";

import type { AccountOrderItem } from "@/lib/account";
import { formatTry } from "@/lib/account";

interface OrderDetailItemsProps {
  items: AccountOrderItem[];
}

export function OrderDetailItems({ items }: OrderDetailItemsProps) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <article
          key={item.id}
          className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[color:var(--color-border)] bg-[#fffafa] p-3"
        >
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-xs text-[color:var(--color-muted)]">Adet: {item.quantity}</p>
          </div>

          <div className="flex items-center gap-2">
            <p className="font-semibold text-[color:var(--color-primary)]">{formatTry(item.price)}</p>
            <Link
              href={`/products/${item.slug}`}
              className="inline-flex items-center gap-1 rounded-lg border border-[color:var(--color-border)] bg-white px-2 py-1 text-xs font-semibold hover:border-[color:var(--color-primary)]"
            >
              <ArrowPathIcon className="size-3.5" /> Tekrar satin al
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
