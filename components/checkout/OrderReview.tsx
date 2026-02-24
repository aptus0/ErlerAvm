import Link from "next/link";

import { ADDRESS_ITEMS } from "@/lib/account";
import { CHECKOUT_SHIPPING_METHODS, type CartItem, type ShippingMethod, formatTry } from "@/lib/commerce";

interface OrderReviewProps {
  items: CartItem[];
  selectedAddressId: string;
  shippingMethod: ShippingMethod;
  totalAmount: number;
  agreementChecked: boolean;
  onAgreementChange: (checked: boolean) => void;
}

export function OrderReview({
  items,
  selectedAddressId,
  shippingMethod,
  totalAmount,
  agreementChecked,
  onAgreementChange,
}: OrderReviewProps) {
  const selectedAddress = ADDRESS_ITEMS.find((address) => address.id === selectedAddressId);
  const selectedShipping = CHECKOUT_SHIPPING_METHODS.find((method) => method.id === shippingMethod);

  return (
    <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_25px_rgba(15,23,42,0.05)]">
      <h2 className="text-xl font-bold">3. Onay</h2>
      <p className="mt-1 text-sm text-[color:var(--color-muted)]">Siparisi tamamlamadan once son kontrollerinizi yapin.</p>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] p-4">
          <p className="text-sm font-semibold">Teslimat Adresi</p>
          {selectedAddress ? (
            <>
              <p className="mt-2 text-sm">{selectedAddress.fullName}</p>
              <p className="text-sm text-[color:var(--color-muted)]">{selectedAddress.phone}</p>
              <p className="text-sm text-[color:var(--color-muted)]">{selectedAddress.line1}</p>
              <p className="text-sm text-[color:var(--color-muted)]">
                {selectedAddress.district} / {selectedAddress.city}
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">Adres secilmedi.</p>
          )}
        </div>

        <div className="rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] p-4">
          <p className="text-sm font-semibold">Kargo Secimi</p>
          <p className="mt-2 text-sm font-medium">{selectedShipping?.title ?? "Kargo secimi yapilmadi"}</p>
          <p className="text-sm text-[color:var(--color-muted)]">{selectedShipping?.description}</p>
          <p className="mt-1 text-sm font-semibold text-[color:var(--color-primary)]">
            {selectedShipping?.fee ? formatTry(selectedShipping.fee) : "Ucretsiz"}
          </p>
        </div>

        <div className="rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] p-4">
          <p className="text-sm font-semibold">Mini Siparis Listesi</p>
          <div className="mt-2 space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-2 text-sm">
                <p className="line-clamp-1">
                  {item.name} x {item.quantity}
                </p>
                <p className="font-semibold text-[color:var(--color-primary)]">{formatTry(item.unitPrice * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 border-t border-[color:var(--color-border)] pt-2">
            <div className="flex items-center justify-between text-sm">
              <p className="font-semibold">Genel Toplam</p>
              <p className="text-lg font-bold text-[color:var(--color-primary)]">{formatTry(totalAmount)}</p>
            </div>
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
          <Link href="/corporate/mesafeli-satis-sozlesmesi" className="font-semibold text-[color:var(--color-primary)] underline">
            Mesafeli satis sozlesmesi
          </Link>{" "}
          ve{" "}
          <Link href="/corporate/gizlilik-politikasi" className="font-semibold text-[color:var(--color-primary)] underline">
            gizlilik politikasini
          </Link>{" "}
          okudum, kabul ediyorum.
        </span>
      </label>
    </section>
  );
}
