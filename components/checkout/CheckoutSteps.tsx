interface CheckoutStepsProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  { id: 1, title: "Teslimat", subtitle: "Adres ve kargo" },
  { id: 2, title: "Odeme", subtitle: "Yontem ve fatura" },
  { id: 3, title: "Onay", subtitle: "Son kontrol" },
] as const;

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-4 shadow-[0_12px_25px_rgba(15,23,42,0.05)]">
      <div className="mb-3 flex items-center justify-between rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] px-3 py-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
          Satın Alma Adımları
        </p>
        <p className="text-sm font-bold text-[color:var(--color-primary)]">{currentStep}/3</p>
      </div>
      <ol className="grid gap-2 md:grid-cols-3">
        {steps.map((step) => {
          const completed = step.id < currentStep;
          const active = step.id === currentStep;

          return (
            <li
              key={step.id}
              className={[
                "rounded-2xl border p-3",
                active
                  ? "border-[color:var(--color-primary)] bg-[#fff3f4]"
                  : completed
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-[color:var(--color-border)] bg-white",
              ].join(" ")}
            >
              <div className="flex items-center gap-2">
                <span
                  className={[
                    "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                    active
                      ? "bg-[color:var(--color-primary)] text-white"
                      : completed
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-200 text-zinc-700",
                  ].join(" ")}
                >
                  {step.id}
                </span>
                <p className="font-semibold">{step.title}</p>
              </div>
              <p className="mt-1 text-xs text-[color:var(--color-muted)]">{step.subtitle}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
