import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";

import type { OrderTimelineStep } from "@/lib/account";

interface OrderTimelineProps {
  steps: OrderTimelineStep[];
}

export function OrderTimeline({ steps }: OrderTimelineProps) {
  return (
    <ol className="grid gap-3 md:grid-cols-4">
      {steps.map((step) => {
        const isCompleted = step.state === "completed";
        const isCurrent = step.state === "current";

        return (
          <li
            key={step.title}
            className={[
              "rounded-xl border p-3",
              isCompleted
                ? "border-emerald-200 bg-emerald-50"
                : isCurrent
                  ? "border-amber-200 bg-amber-50"
                  : "border-[color:var(--color-border)] bg-white",
            ].join(" ")}
          >
            <div className="flex items-center gap-2">
              {isCompleted ? (
                <CheckCircleIcon className="size-4 text-emerald-600" />
              ) : (
                <ClockIcon className="size-4 text-amber-600" />
              )}
              <p className="text-sm font-semibold">{step.title}</p>
            </div>
            <p className="mt-1 text-xs text-[color:var(--color-muted)]">{step.date}</p>
          </li>
        );
      })}
    </ol>
  );
}
