import { CHECKOUT_SHIPPING_METHODS, type ShippingMethod, formatTry } from "@/lib/commerce";

interface ShippingMethodSelectorProps {
  selectedMethod: ShippingMethod;
  onChange: (method: ShippingMethod) => void;
}

export function ShippingMethodSelector({ selectedMethod, onChange }: ShippingMethodSelectorProps) {
  return (
    <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_25px_rgba(15,23,42,0.05)]">
      <h2 className="text-xl font-bold">Kargo Secimi</h2>
      <div className="mt-3 grid gap-2">
        {CHECKOUT_SHIPPING_METHODS.map((method) => (
          <label
            key={method.id}
            className={[
              "flex cursor-pointer items-center justify-between rounded-2xl border p-3",
              selectedMethod === method.id
                ? "border-[color:var(--color-primary)] bg-[#fff2f3]"
                : "border-[color:var(--color-border)] bg-white",
            ].join(" ")}
          >
            <div>
              <p className="font-semibold">{method.title}</p>
              <p className="text-xs text-[color:var(--color-muted)]">{method.description}</p>
            </div>

            <div className="text-right">
              <p className="text-sm font-bold text-[color:var(--color-primary)]">
                {method.fee === 0 ? "Ucretsiz" : formatTry(method.fee)}
              </p>
              <input
                type="radio"
                name="shippingMethod"
                checked={selectedMethod === method.id}
                onChange={() => onChange(method.id)}
                className="mt-2"
              />
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}
