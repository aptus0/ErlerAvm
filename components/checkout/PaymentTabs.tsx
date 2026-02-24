import { CheckBadgeIcon, CreditCardIcon, LockClosedIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

import { PAYMENT_METHODS } from "@/lib/account";
import {
  CHECKOUT_PAYMENT_TABS,
  type InvoiceType,
  type PaymentMethodType,
  getDefaultCardId,
} from "@/lib/commerce";

interface PaymentTabsProps {
  activeTab: PaymentMethodType;
  onTabChange: (tab: PaymentMethodType) => void;
  invoiceType: InvoiceType;
  onInvoiceTypeChange: (type: InvoiceType) => void;
  cardId: string;
  onCardChange: (id: string) => void;
  corporateTaxId: string;
  onCorporateTaxIdChange: (value: string) => void;
}

const TRUST_ITEMS = [
  { label: "SSL Guvenligi", icon: LockClosedIcon },
  { label: "3D Secure", icon: ShieldCheckIcon },
  { label: "Guvenli Odeme", icon: CheckBadgeIcon },
  { label: "Kolay Iade", icon: CreditCardIcon },
] as const;

const CARD_BRANDS = ["VISA", "Mastercard", "TROY"] as const;

export function PaymentTabs({
  activeTab,
  onTabChange,
  invoiceType,
  onInvoiceTypeChange,
  cardId,
  onCardChange,
  corporateTaxId,
  onCorporateTaxIdChange,
}: PaymentTabsProps) {
  const safeCardId = cardId || getDefaultCardId();

  return (
    <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_25px_rgba(15,23,42,0.05)]">
      <h2 className="text-xl font-bold">2. Odeme</h2>
      <p className="mt-1 text-sm text-[color:var(--color-muted)]">Guvenli odeme seceneginizi belirleyin.</p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {TRUST_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <p
              key={item.label}
              className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-[#fffafa] px-3 py-2 text-xs font-semibold text-[color:var(--color-muted)]"
            >
              <Icon className="size-4 text-[color:var(--color-primary)]" />
              {item.label}
            </p>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {CHECKOUT_PAYMENT_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={[
              "rounded-xl border px-3 py-2 text-sm font-semibold transition",
              activeTab === tab.id
                ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)] !text-white"
                : "border-[color:var(--color-border)] bg-white text-[color:var(--color-muted)] hover:border-[color:var(--color-primary)]/40",
            ].join(" ")}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <p className="mt-2 text-xs text-[color:var(--color-muted)]">
        {CHECKOUT_PAYMENT_TABS.find((tab) => tab.id === activeTab)?.description}
      </p>

      {activeTab === "card" ? (
        <div className="mt-4 space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            {PAYMENT_METHODS.map((card) => (
              <label
                key={card.id}
                className={[
                  "rounded-xl border p-3 text-sm",
                  safeCardId === card.id
                    ? "border-[color:var(--color-primary)] bg-[#fff2f3]"
                    : "border-[color:var(--color-border)] bg-white",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{card.cardBrand}</p>
                  <input
                    type="radio"
                    name="savedCard"
                    checked={safeCardId === card.id}
                    onChange={() => onCardChange(card.id)}
                  />
                </div>
                <p className="mt-1 text-xs text-[color:var(--color-muted)]">{card.maskedNumber}</p>
              </label>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-[#fffafa] px-3 py-2">
            {CARD_BRANDS.map((brand) => (
              <span
                key={brand}
                className="rounded-md border border-[color:var(--color-border)] bg-white px-2 py-1 text-[11px] font-semibold text-[color:var(--color-muted)]"
              >
                {brand}
              </span>
            ))}
            <p className="text-xs text-[color:var(--color-muted)]">Guvenilir odeme altyapisi</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <input
              placeholder="Kart numarasi"
              inputMode="numeric"
              className="h-11 rounded-xl border border-[color:var(--color-border)] px-3 text-sm outline-none focus:border-[color:var(--color-primary)]"
            />
            <input
              placeholder="Kart uzeri isim"
              className="h-11 rounded-xl border border-[color:var(--color-border)] px-3 text-sm outline-none focus:border-[color:var(--color-primary)]"
            />
            <input
              placeholder="Son kullanma (AA/YY)"
              inputMode="numeric"
              className="h-11 rounded-xl border border-[color:var(--color-border)] px-3 text-sm outline-none focus:border-[color:var(--color-primary)]"
            />
            <input
              placeholder="CVV"
              inputMode="numeric"
              className="h-11 rounded-xl border border-[color:var(--color-border)] px-3 text-sm outline-none focus:border-[color:var(--color-primary)]"
            />
          </div>

          <p className="inline-flex items-center gap-1 text-xs text-emerald-700">
            <ShieldCheckIcon className="size-4" /> 3D Secure ile odeme guvencesi aktif
          </p>
        </div>
      ) : null}

      {activeTab === "cod" ? (
        <div className="mt-4 rounded-xl border border-[color:var(--color-border)] bg-[#fffafa] p-3 text-sm text-[color:var(--color-muted)]">
          Kapida odemede siparis tutarina ek hizmet bedeli uygulanabilir. Detay siparis onayinda gosterilir.
        </div>
      ) : null}

      {activeTab === "eft" ? (
        <div className="mt-4 rounded-xl border border-[color:var(--color-border)] bg-[#fffafa] p-3 text-sm text-[color:var(--color-muted)]">
          Havale/EFT secildiginde banka bilgileri siparis olustuktan sonra gonderilir.
        </div>
      ) : null}

      <div className="mt-5 rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] p-4">
        <p className="text-sm font-semibold">Fatura Tipi</p>
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => onInvoiceTypeChange("individual")}
            className={[
              "rounded-lg border px-3 py-1.5 text-sm",
              invoiceType === "individual"
                ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)] !text-white"
                : "border-[color:var(--color-border)] bg-white text-[color:var(--color-muted)]",
            ].join(" ")}
          >
            Bireysel
          </button>
          <button
            type="button"
            onClick={() => onInvoiceTypeChange("corporate")}
            className={[
              "rounded-lg border px-3 py-1.5 text-sm",
              invoiceType === "corporate"
                ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)] !text-white"
                : "border-[color:var(--color-border)] bg-white text-[color:var(--color-muted)]",
            ].join(" ")}
          >
            Kurumsal
          </button>
        </div>

        {invoiceType === "corporate" ? (
          <input
            value={corporateTaxId}
            onChange={(event) => onCorporateTaxIdChange(event.target.value)}
            placeholder="Vergi kimlik no"
            className="mt-3 h-10 w-full rounded-xl border border-[color:var(--color-border)] bg-white px-3 text-sm outline-none focus:border-[color:var(--color-primary)]"
          />
        ) : null}
      </div>
    </section>
  );
}
