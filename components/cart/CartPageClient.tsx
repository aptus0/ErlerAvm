"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";

import {
  type CartItem,
  applyCoupon,
  calculateCartTotals,
  formatTry,
  getInitialCartItems,
} from "@/lib/commerce";

import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummarySticky } from "@/components/cart/CartSummarySticky";
import { FreeShippingProgress } from "@/components/cart/FreeShippingProgress";

export function CartPageClient() {
  const [items, setItems] = useState<CartItem[]>(getInitialCartItems());
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  const activeItems = items.filter((item) => !item.savedForLater);
  const savedItems = items.filter((item) => item.savedForLater);

  const totals = useMemo(() => {
    return calculateCartTotals(activeItems, couponDiscount, "standard", couponCode);
  }, [activeItems, couponCode, couponDiscount]);

  const handleCouponApply = (code: string) => {
    const result = applyCoupon(code, totals.subtotal);

    if (result.valid) {
      setCouponCode(code.trim().toUpperCase());
      setCouponDiscount(result.amount);
      return {
        ok: true,
        message: result.message,
      };
    }

    setCouponCode("");
    setCouponDiscount(0);

    return {
      ok: false,
      message: result.message,
    };
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const safeQuantity = Math.min(Math.max(quantity, 1), Math.max(item.stockLeft, 1));
        return {
          ...item,
          quantity: safeQuantity,
        };
      }),
    );
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const saveForLater = (id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              savedForLater: true,
            }
          : item,
      ),
    );
  };

  const moveBackToCart = (id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              savedForLater: false,
            }
          : item,
      ),
    );
  };

  if (!activeItems.length) {
    return (
      <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-10 text-center shadow-[0_14px_30px_rgba(15,23,42,0.06)]">
        <ShoppingBagIcon className="mx-auto size-10 text-[color:var(--color-primary)]" />
        <h1 className="mt-3 text-3xl font-bold">Sepetiniz bos</h1>
        <p className="mt-2 text-sm text-[color:var(--color-muted)]">Sepetinize urun ekleyerek alisverise devam edebilirsiniz.</p>
        <Link
          href="/products"
          className="mt-5 inline-flex rounded-xl bg-[color:var(--color-primary)] px-4 py-2 text-sm font-semibold text-white"
        >
          Urunlere Git
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-6 pb-24 lg:grid-cols-[1fr_360px] lg:pb-0">
      <section className="space-y-4">
        <header>
          <h1 className="text-3xl font-bold">Sepetim</h1>
          <p className="mt-1 text-sm text-[color:var(--color-muted)]">Urunleri duzenleyin, kupon uygulayin ve guvenli odemeye gecin.</p>
        </header>

        <FreeShippingProgress subtotal={totals.subtotal} />

        <div className="space-y-3">
          {activeItems.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onQuantityChange={updateQuantity}
              onRemove={removeItem}
              onSaveForLater={saveForLater}
            />
          ))}
        </div>

        {savedItems.length ? (
          <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-4 shadow-[0_12px_25px_rgba(15,23,42,0.05)]">
            <h2 className="text-lg font-bold">Daha Sonra Al</h2>
            <div className="mt-3 grid gap-2">
              {savedItems.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[color:var(--color-border)] bg-[#fffafa] p-3"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-[color:var(--color-muted)]">{item.variant}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="font-bold text-[color:var(--color-primary)]">{formatTry(item.unitPrice)}</p>
                    <button
                      type="button"
                      onClick={() => moveBackToCart(item.id)}
                      className="rounded-lg border border-[color:var(--color-border)] px-2 py-1 text-xs font-semibold hover:border-[color:var(--color-primary)]"
                    >
                      Sepete geri al
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </section>

      <div className="hidden lg:block">
        <CartSummarySticky totals={totals} onApplyCoupon={handleCouponApply} appliedCoupon={couponCode} />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--color-border)] bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-[color:var(--color-muted)]">Toplam</p>
            <p className="text-lg font-bold text-[color:var(--color-primary)]">{formatTry(totals.total)}</p>
          </div>
          <Link
            href="/checkout"
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-[color:var(--color-primary)] px-4 py-3 text-sm font-semibold text-white"
          >
            Odemeye Gec
          </Link>
        </div>
      </div>
    </div>
  );
}
