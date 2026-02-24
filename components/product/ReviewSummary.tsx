import { StarIcon } from "@heroicons/react/24/solid";

import type { ProductReview } from "@/lib/constants";

interface ReviewSummaryProps {
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
}

export function ReviewSummary({ rating, reviewCount, reviews }: ReviewSummaryProps) {
  const total = reviews.length || 1;

  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((review) => Math.round(review.rating) === star).length;
    const percent = Math.round((count / total) * 100);

    return {
      star,
      percent,
    };
  });

  return (
    <section className="grid gap-5 rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] p-5 md:grid-cols-[0.7fr_1.3fr]">
      <div>
        <p className="text-4xl font-bold text-[color:var(--color-primary)]">{rating.toFixed(1)}</p>
        <div className="mt-2 flex items-center gap-1 text-amber-500">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon key={`summary-star-${index}`} className={["size-5", index < Math.round(rating) ? "" : "text-zinc-200"].join(" ")} />
          ))}
        </div>
        <p className="mt-2 text-sm text-[color:var(--color-muted)]">{reviewCount} toplam degerlendirme</p>
      </div>

      <div className="space-y-2">
        {distribution.map((item) => (
          <div key={`distribution-${item.star}`} className="flex items-center gap-3">
            <p className="w-7 text-sm font-semibold">{item.star}</p>
            <div className="h-2 flex-1 rounded-full bg-[#f3e2e3]">
              <div
                className="h-2 rounded-full bg-[color:var(--color-primary)]"
                style={{
                  width: `${item.percent}%`,
                }}
              />
            </div>
            <p className="w-10 text-right text-xs text-[color:var(--color-muted)]">%{item.percent}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
