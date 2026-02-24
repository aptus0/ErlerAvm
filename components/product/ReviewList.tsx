"use client";

import { CheckBadgeIcon, PhotoIcon, StarIcon } from "@heroicons/react/24/solid";
import { useMemo, useState } from "react";

import type { ProductReview } from "@/lib/constants";

interface ReviewListProps {
  reviews: ProductReview[];
}

type ReviewSort = "helpful" | "recent";

export function ReviewList({ reviews }: ReviewListProps) {
  const [sortMode, setSortMode] = useState<ReviewSort>("helpful");
  const [photoOnly, setPhotoOnly] = useState(false);

  const filtered = useMemo(() => {
    const filteredReviews = photoOnly ? reviews.filter((review) => review.withPhoto) : reviews;

    return [...filteredReviews].sort((a, b) => {
      if (sortMode === "helpful") {
        return b.helpful - a.helpful;
      }

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [photoOnly, reviews, sortMode]);

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setSortMode("helpful")}
          className={[
            "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
            sortMode === "helpful"
              ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)] text-white"
              : "border-[color:var(--color-border)] bg-white text-[color:var(--color-muted)]",
          ].join(" ")}
        >
          En faydali
        </button>
        <button
          type="button"
          onClick={() => setSortMode("recent")}
          className={[
            "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
            sortMode === "recent"
              ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)] text-white"
              : "border-[color:var(--color-border)] bg-white text-[color:var(--color-muted)]",
          ].join(" ")}
        >
          En yeni
        </button>
        <button
          type="button"
          onClick={() => setPhotoOnly((current) => !current)}
          className={[
            "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
            photoOnly
              ? "border-[color:var(--color-primary)] bg-[#fff0f2] text-[color:var(--color-primary)]"
              : "border-[color:var(--color-border)] bg-white text-[color:var(--color-muted)]",
          ].join(" ")}
        >
          <PhotoIcon className="size-4" />
          Sadece fotograflilar
        </button>
      </div>

      <div className="grid gap-3">
        {filtered.map((review) => (
          <article key={review.id} className="rounded-2xl border border-[color:var(--color-border)] bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold">{review.author}</p>
                <p className="text-xs text-[color:var(--color-muted)]">{review.date}</p>
              </div>
              {review.verified ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#ecfdf3] px-2 py-1 text-xs font-semibold text-emerald-700">
                  <CheckBadgeIcon className="size-4" />
                  Dogrulanmis satin alma
                </span>
              ) : null}
            </div>

            <div className="mt-3 flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={`${review.id}-star-${index}`} className={["size-4", index < review.rating ? "" : "text-zinc-200"].join(" ")} />
              ))}
            </div>

            <p className="mt-2 font-semibold">{review.title}</p>
            <p className="mt-1 text-sm leading-6 text-[color:var(--color-muted)]">{review.comment}</p>

            {review.withPhoto ? (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`${review.id}-photo-${index}`}
                    className="h-16 rounded-lg border border-[color:var(--color-border)] bg-[linear-gradient(140deg,_#fff1f2,_#fee2e2)]"
                  />
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
