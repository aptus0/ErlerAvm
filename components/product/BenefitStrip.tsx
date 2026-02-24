import {
  BoltIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

import type { ProductBenefit, ProductBenefitIcon } from "@/lib/constants";

interface BenefitStripProps {
  items: ProductBenefit[];
}

const iconMap: Record<ProductBenefitIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  spark: SparklesIcon,
  shield: ShieldCheckIcon,
  rocket: RocketLaunchIcon,
  wrench: WrenchScrewdriverIcon,
  bolt: BoltIcon,
};

export function BenefitStrip({ items }: BenefitStripProps) {
  return (
    <section className="grid gap-3 rounded-3xl border border-[color:var(--color-border)] bg-white p-4 shadow-[0_10px_25px_rgba(15,23,42,0.05)] sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => {
        const Icon = iconMap[item.icon];

        return (
          <article key={item.title} className="rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] p-4">
            <Icon className="size-6 text-[color:var(--color-primary)]" />
            <h3 className="mt-3 text-sm font-semibold">{item.title}</h3>
            <p className="mt-1 text-xs leading-5 text-[color:var(--color-muted)]">{item.description}</p>
          </article>
        );
      })}
    </section>
  );
}
