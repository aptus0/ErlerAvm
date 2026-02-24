import { SparklesIcon, TruckIcon } from "@heroicons/react/24/outline";

import { FREE_SHIPPING_THRESHOLD, amountForFreeShipping, formatTry } from "@/lib/commerce";

interface FreeShippingProgressProps {
  subtotal: number;
}

export function FreeShippingProgress({ subtotal }: FreeShippingProgressProps) {
  const remaining = amountForFreeShipping(subtotal);
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <section className="rounded-2xl border border-[color:var(--color-border)] bg-white p-4 shadow-[0_12px_26px_rgba(15,23,42,0.05)]">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <TruckIcon className="size-5 text-[color:var(--color-primary)]" />
        {remaining > 0 ? (
          <p>
            Kargo ucretsiz icin <span className="text-[color:var(--color-primary)]">{formatTry(remaining)}</span> kaldi
          </p>
        ) : (
          <p className="inline-flex items-center gap-1 text-emerald-700">
            <SparklesIcon className="size-4" /> Ucretsiz kargo aktif
          </p>
        )}
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#f3d9dc]">
        <div
          className="h-2 rounded-full bg-[color:var(--color-primary)] transition-all duration-300"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </section>
  );
}
