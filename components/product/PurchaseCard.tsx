"use client";

import {
  BanknotesIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  StarIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import type { Product, ProductDetail } from "@/lib/constants";
import { formatTry } from "@/lib/format";

interface PurchaseCardProps {
  product: Product;
  detail: ProductDetail;
}

const CITY_DISTRICT_MAP = {
  Istanbul: ["Kadikoy", "Sisli", "Besiktas"],
  Ankara: ["Cankaya", "Yenimahalle", "Kecioren"],
  Izmir: ["Konak", "Bornova", "Karsiyaka"],
} as const;

type DeliveryCity = keyof typeof CITY_DISTRICT_MAP;

function estimateDelivery(city: DeliveryCity): string {
  if (city === "Istanbul") {
    return "Tahmini teslim: 1 gun";
  }

  if (city === "Ankara") {
    return "Tahmini teslim: 1-2 gun";
  }

  return "Tahmini teslim: 2-3 gun";
}

export function PurchaseCard({ product, detail }: PurchaseCardProps) {
  const initialSelections = useMemo(() => {
    return detail.variantGroups.reduce<Record<string, string>>((accumulator, group) => {
      accumulator[group.name] = group.defaultOption ?? group.options[0] ?? "";
      return accumulator;
    }, {});
  }, [detail.variantGroups]);

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(initialSelections);
  const [city, setCity] = useState<DeliveryCity>("Istanbul");
  const [district, setDistrict] = useState<(typeof CITY_DISTRICT_MAP)[DeliveryCity][number]>("Kadikoy");

  const discountRate =
    detail.oldPrice && detail.oldPrice > product.price
      ? Math.round(((detail.oldPrice - product.price) / detail.oldPrice) * 100)
      : 0;

  return (
    <aside className="rounded-[1.35rem] border border-[color:var(--color-border)] bg-white p-6 shadow-[0_16px_35px_rgba(15,23,42,0.07)]">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">{detail.brand}</p>
      <h1 className="mt-3 text-[30px] leading-tight font-bold text-[color:var(--color-foreground)]">{product.name}</h1>
      <p className="mt-2 text-sm text-[color:var(--color-muted)]">{product.shortDescription}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <div className="flex items-center gap-1 text-amber-500">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon key={`rating-star-${index}`} className={["size-4", index < Math.round(detail.rating) ? "" : "text-zinc-200"].join(" ")} />
          ))}
        </div>
        <p className="font-semibold">{detail.rating.toFixed(1)}</p>
        <p className="text-[color:var(--color-muted)]">({detail.reviewCount} yorum)</p>
        <p className="rounded-full bg-[color:var(--color-background)] px-2 py-1 text-xs font-semibold text-[color:var(--color-primary)]">
          {detail.soldCount}+ satici puani
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-[color:var(--color-border)] bg-[#fff9f9] p-4">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-4xl font-bold text-[color:var(--color-primary)]">{formatTry(product.price)}</p>
          {detail.oldPrice ? (
            <p className="text-sm text-[color:var(--color-muted)] line-through">{formatTry(detail.oldPrice)}</p>
          ) : null}
          {discountRate > 0 ? (
            <span className="rounded-full bg-[color:var(--color-primary)] px-2 py-1 text-xs font-bold text-white">
              %{discountRate} indirim
            </span>
          ) : null}
        </div>
        <p className="mt-2 flex items-center gap-2 text-sm text-[color:var(--color-muted)]">
          <BanknotesIcon className="size-4 text-[color:var(--color-primary)]" />
          {detail.installmentText}
        </p>
        <p className="mt-1 text-xs text-[color:var(--color-muted)]">{detail.paymentText}</p>
      </div>

      <div className="mt-5 space-y-4">
        {detail.variantGroups.map((group) => (
          <div key={group.name}>
            <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-muted)]">{group.name}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {group.options.map((option) => {
                const selected = selectedVariants[group.name] === option;
                return (
                  <button
                    key={`${group.name}-${option}`}
                    type="button"
                    onClick={() => setSelectedVariants((current) => ({ ...current, [group.name]: option }))}
                    className={[
                      "rounded-full border px-3 py-1.5 text-sm font-medium transition",
                      selected
                        ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)] text-white"
                        : "border-[color:var(--color-border)] bg-white text-[color:var(--color-foreground)] hover:border-[color:var(--color-primary)]",
                    ].join(" ")}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-[color:var(--color-border)] px-3 py-2">
        {detail.stockStatus === "in_stock" ? (
          <p className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
            <CheckCircleIcon className="size-5" />
            Stokta, hemen kargoya hazir
          </p>
        ) : (
          <p className="flex items-center gap-2 text-sm font-semibold text-amber-600">
            <ExclamationCircleIcon className="size-5" />
            Az kaldi - Son {detail.stockLeft} adet
          </p>
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button type="button" className="h-12 text-base">
          Sepete Ekle
        </Button>
        <Button type="button" variant="secondary" className="h-12 text-base">
          Hemen Al
        </Button>
      </div>

      <div className="mt-5 grid gap-2 text-sm text-[color:var(--color-muted)]">
        <p className="inline-flex items-center gap-2">
          <CheckBadgeIcon className="size-4 text-emerald-600" /> 14 gun iade
        </p>
        <p className="inline-flex items-center gap-2">
          <CheckBadgeIcon className="size-4 text-emerald-600" /> Guvenli odeme
        </p>
        <p className="inline-flex items-center gap-2">
          <ClockIcon className="size-4 text-[color:var(--color-primary)]" />
          Ayni gun kargo icin son saat: {detail.shippingCutoff}
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] p-4">
        <h2 className="text-sm font-semibold">Teslimat Hesaplayici</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <label className="grid gap-1 text-xs text-[color:var(--color-muted)]">
            Il
            <select
              value={city}
              onChange={(event) => {
                const nextCity = event.target.value as DeliveryCity;
                setCity(nextCity);
                setDistrict(CITY_DISTRICT_MAP[nextCity][0]);
              }}
              className="h-10 rounded-lg border border-[color:var(--color-border)] bg-white px-3 text-sm text-[color:var(--color-foreground)] outline-none"
            >
              {Object.keys(CITY_DISTRICT_MAP).map((cityName) => (
                <option key={cityName} value={cityName}>
                  {cityName}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1 text-xs text-[color:var(--color-muted)]">
            Ilce
            <select
              value={district}
              onChange={(event) => setDistrict(event.target.value as (typeof CITY_DISTRICT_MAP)[DeliveryCity][number])}
              className="h-10 rounded-lg border border-[color:var(--color-border)] bg-white px-3 text-sm text-[color:var(--color-foreground)] outline-none"
            >
              {CITY_DISTRICT_MAP[city].map((districtName) => (
                <option key={districtName} value={districtName}>
                  {districtName}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-[color:var(--color-primary)]">
          <TruckIcon className="size-4" />
          {estimateDelivery(city)} - {district}
        </p>
      </div>
    </aside>
  );
}
