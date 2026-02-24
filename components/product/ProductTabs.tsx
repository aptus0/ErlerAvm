"use client";

import { useState } from "react";

import type { ProductDetail } from "@/lib/constants";

import { ReviewList } from "@/components/product/ReviewList";
import { ReviewSummary } from "@/components/product/ReviewSummary";

interface ProductTabsProps {
  detail: ProductDetail;
}

type ProductTab = "description" | "specs" | "reviews";

const tabItems: Array<{ id: ProductTab; label: string }> = [
  { id: "description", label: "Aciklama" },
  { id: "specs", label: "Teknik Ozellikler" },
  { id: "reviews", label: "Yorumlar" },
];

export function ProductTabs({ detail }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<ProductTab>("description");

  return (
    <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
      <div className="mb-5 flex flex-wrap gap-2 border-b border-[color:var(--color-border)] pb-4">
        {tabItems.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={[
              "rounded-full border px-4 py-2 text-sm font-semibold transition",
              activeTab === tab.id
                ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)] text-white"
                : "border-[color:var(--color-border)] bg-white text-[color:var(--color-muted)] hover:border-[color:var(--color-primary)]/50",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "description" ? (
        <div className="space-y-4 text-sm leading-7 text-[color:var(--color-muted)]">
          {detail.story.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}

      {activeTab === "specs" ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">Teknik Ozellikler</h3>
            <div className="mt-3 overflow-hidden rounded-xl border border-[color:var(--color-border)]">
              <table className="min-w-full border-collapse text-left text-sm">
                <tbody>
                  {detail.specs.map((spec) => (
                    <tr key={spec.label} className="border-b border-[color:var(--color-border)] last:border-b-0">
                      <th className="w-1/2 bg-[#fff9f9] px-3 py-2 font-semibold text-[color:var(--color-foreground)]">
                        {spec.label}
                      </th>
                      <td className="px-3 py-2 text-[color:var(--color-muted)]">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Muadil Karsilastirma</h3>
            <div className="mt-3 overflow-hidden rounded-xl border border-[color:var(--color-border)]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[color:var(--color-border)] bg-[#fff9f9]">
                    <th className="px-3 py-2">Kriter</th>
                    <th className="px-3 py-2">Bu urun</th>
                    <th className="px-3 py-2">Muadil</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.comparison.map((item) => (
                    <tr key={item.label} className="border-b border-[color:var(--color-border)] last:border-b-0">
                      <td className="px-3 py-2 font-semibold">{item.label}</td>
                      <td className="px-3 py-2 text-emerald-700">{item.thisProduct}</td>
                      <td className="px-3 py-2 text-[color:var(--color-muted)]">{item.alternative}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}

      {activeTab === "reviews" ? (
        <div className="space-y-4">
          <ReviewSummary rating={detail.rating} reviewCount={detail.reviewCount} reviews={detail.reviews} />
          <ReviewList reviews={detail.reviews} />
        </div>
      ) : null}
    </section>
  );
}
