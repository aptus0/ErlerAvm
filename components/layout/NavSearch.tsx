"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

import { PRODUCTS } from "@/lib/constants";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

interface NavSearchProps {
  className?: string;
}

export function NavSearch({ className = "" }: NavSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return [];
    }

    return PRODUCTS.filter((product) => {
      return (
        product.name.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized)
      );
    }).slice(0, 6);
  }, [query]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div ref={wrapperRef} className={["relative", className].filter(Boolean).join(" ")}>
      <div className="flex h-11 items-center rounded-2xl border border-[color:var(--color-border)] bg-white pl-3 pr-2 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
        <MagnifyingGlassIcon className="size-5 text-[color:var(--color-muted)]" />
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) {
              setOpen(true);
            }
          }}
          placeholder="Ürün, kategori ara..."
          className="h-full w-full bg-transparent px-2 text-sm outline-none"
        />
      </div>

      {open && query.trim() ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-[120] overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-white shadow-[0_20px_36px_rgba(15,23,42,0.12)]">
          {results.length ? (
            <div className="max-h-[340px] overflow-y-auto">
              {results.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 border-b border-[color:var(--color-border)] p-3 last:border-b-0"
                >
                  <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[#fffafa]">
                    <Image src={product.image} alt={product.name} fill sizes="56px" className="object-cover" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={() => setOpen(false)}
                      className="line-clamp-1 text-sm font-semibold hover:text-[color:var(--color-primary)]"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-[color:var(--color-muted)]">{product.category}</p>
                    <p className="text-sm font-bold text-[color:var(--color-primary)]">
                      {formatCurrency(product.price)}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg border border-[color:var(--color-border)] bg-[#fff8f8] px-2.5 py-1.5 text-xs font-semibold text-[color:var(--color-primary)] hover:border-[color:var(--color-primary)]"
                  >
                    <ShoppingCartIcon className="size-4" />
                    Sepet
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="p-4 text-sm text-[color:var(--color-muted)]">Sonuç bulunamadı.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
