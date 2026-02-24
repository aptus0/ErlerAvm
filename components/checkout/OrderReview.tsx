import { ADDRESS_ITEMS } from "@/lib/account";
import { type CartItem, formatTry } from "@/lib/commerce";

interface OrderReviewProps {
  items: CartItem[];
  selectedAddressId: string;
  agreementChecked: boolean;
  onAgreementChange: (checked: boolean) => void;
}

export function OrderReview({ items, selectedAddressId, agreementChecked, onAgreementChange }: OrderReviewProps) {
  const selectedAddress = ADDRESS_ITEMS.find((address) => address.id === selectedAddressId);

  return (
    <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_25px_rgba(15,23,42,0.05)]">
      <h2 className="text-xl font-bold">3. Onay</h2>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] p-4">
          <p className="text-sm font-semibold">Teslimat Adresi</p>
          {selectedAddress ? (
            <>
              <p className="mt-2 text-sm">{selectedAddress.fullName}</p>
              <p className="text-sm text-[color:var(--color-muted)]">{selectedAddress.phone}</p>
              <p className="text-sm text-[color:var(--color-muted)]">
                {selectedAddress.line1}, {selectedAddress.district} / {selectedAddress.city}
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">Adres secilmedi.</p>
          )}
        </div>

        <div className="rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] p-4">
          <p className="text-sm font-semibold">Mini Siparis Listesi</p>
          <div className="mt-2 space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-2 text-sm">
                <p className="line-clamp-1">{item.name} x {item.quantity}</p>
                <p className="font-semibold text-[color:var(--color-primary)]">{formatTry(item.unitPrice * item.quantity)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <label className="mt-4 inline-flex items-start gap-2 text-sm text-[color:var(--color-muted)]">
        <input
          type="checkbox"
          checked={agreementChecked}
          onChange={(event) => onAgreementChange(event.target.checked)}
          className="mt-0.5"
        />
        <span>
          Mesafeli satis sozlesmesini okudum ve kabul ediyorum.
        </span>
      </label>
    </section>
  );
}
