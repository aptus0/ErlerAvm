"use client";

import Link from "next/link";

import {
  BookmarkIcon,
  GiftIcon,
  HeartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";

import type { CartItem } from "@/lib/commerce";
import { formatTry } from "@/lib/commerce";

import { QuantityStepper } from "@/components/cart/QuantityStepper";

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onSaveForLater: (id: string) => void;
}

export function CartItemRow({ item, onQuantityChange, onRemove, onSaveForLater }: CartItemRowProps) {
  const lineTotal = useMemo(() => item.quantity * item.unitPrice, [item.quantity, item.unitPrice]);
  const [pricePulse, setPricePulse] = useState(false);

  const handleQuantityChange = (next: number) => {
    setPricePulse(true);
    window.setTimeout(() => setPricePulse(false), 260);
    onQuantityChange(item.id, next);
  };

  return (
    <article className="rounded-3xl border border-[color:var(--color-border)] bg-white p-4 shadow-[0_12px_25px_rgba(15,23,42,0.05)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="h-28 w-28 shrink-0 rounded-2xl border border-[color:var(--color-border)] bg-[linear-gradient(150deg,_#fff1f2,_#fee2e2,_#ffffff)] p-2">
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-[color:var(--color-primary)]/30 text-sm font-bold text-[color:var(--color-primary)]">
            {item.name.slice(0, 2).toUpperCase()}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <Link href={`/products/${item.slug}`} className="line-clamp-1 text-lg font-semibold hover:text-[color:var(--color-primary)]">
            {item.name}
          </Link>
          <p className="mt-1 text-sm text-[color:var(--color-muted)]">{item.variant}</p>

          {item.stockLeft <= 5 ? (
            <span className="mt-2 inline-flex rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
              Stokta son {item.stockLeft}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <p
            className={[
              "text-xl font-bold text-[color:var(--color-primary)] transition-transform duration-200",
              pricePulse ? "scale-[1.06]" : "scale-100",
            ].join(" ")}
          >
            {formatTry(lineTotal)}
          </p>

          <div className="flex items-center gap-3">
            <QuantityStepper
              quantity={item.quantity}
              min={1}
              max={Math.max(item.stockLeft, 1)}
              onChange={handleQuantityChange}
            />
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--color-border)] text-[color:var(--color-muted)] transition hover:border-red-400 hover:text-red-600"
              aria-label="Urunu kaldir"
            >
              <TrashIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[color:var(--color-border)] pt-3 text-xs">
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-lg border border-[color:var(--color-border)] bg-[#fffafa] px-2.5 py-1.5 font-semibold text-[color:var(--color-muted)] transition hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
        >
          <HeartIcon className="size-4" /> Favorilere ekle
        </button>

        <button
          type="button"
          onClick={() => onSaveForLater(item.id)}
          className="inline-flex items-center gap-1 rounded-lg border border-[color:var(--color-border)] bg-[#fffafa] px-2.5 py-1.5 font-semibold text-[color:var(--color-muted)] transition hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
        >
          <BookmarkIcon className="size-4" /> Daha sonra al
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-lg border border-[color:var(--color-border)] bg-[#fffafa] px-2.5 py-1.5 font-semibold text-[color:var(--color-muted)] transition hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
        >
          <GiftIcon className="size-4" /> Hediye paketi ekle
        </button>
      </div>
    </article>
  );
}
