"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

interface QuantityStepperProps {
  quantity: number;
  min?: number;
  max?: number;
  onChange: (next: number) => void;
}

export function QuantityStepper({ quantity, min = 1, max = 99, onChange }: QuantityStepperProps) {
  const decreaseDisabled = quantity <= min;
  const increaseDisabled = quantity >= max;

  return (
    <div className="inline-flex items-center rounded-xl border border-[color:var(--color-border)] bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(quantity - 1, min))}
        disabled={decreaseDisabled}
        className="inline-flex h-9 w-9 items-center justify-center text-[color:var(--color-muted)] transition hover:text-[color:var(--color-primary)] disabled:opacity-35"
        aria-label="Adet azalt"
      >
        <MinusIcon className="size-4" />
      </button>

      <p className="w-8 text-center text-sm font-semibold">{quantity}</p>

      <button
        type="button"
        onClick={() => onChange(Math.min(quantity + 1, max))}
        disabled={increaseDisabled}
        className="inline-flex h-9 w-9 items-center justify-center text-[color:var(--color-muted)] transition hover:text-[color:var(--color-primary)] disabled:opacity-35"
        aria-label="Adet artir"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
}
