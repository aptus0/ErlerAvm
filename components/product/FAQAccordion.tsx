"use client";

import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import type { ProductFaq } from "@/lib/constants";

interface FAQAccordionProps {
  items: ProductFaq[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
      <h2 className="text-2xl font-bold">Sikca Sorulan Sorular</h2>
      <div className="mt-4 divide-y divide-[color:var(--color-border)]">
        {items.map((item, index) => {
          const open = index === openIndex;

          return (
            <article key={item.question} className="py-2">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-3 text-left"
                onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
              >
                <span className="text-sm font-semibold">{item.question}</span>
                {open ? <MinusSmallIcon className="size-5" /> : <PlusSmallIcon className="size-5" />}
              </button>

              {open ? <p className="pb-3 text-sm leading-6 text-[color:var(--color-muted)]">{item.answer}</p> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
