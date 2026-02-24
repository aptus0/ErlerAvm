"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { ADDRESS_ITEMS } from "@/lib/account";
import {
  type InvoiceType,
  type PaymentMethodType,
  type ShippingMethod,
  applyCoupon,
  calculateCartTotals,
  createMockOrderNumber,
  getDefaultAddressId,
  getDefaultCardId,
  getInitialCartItems,
} from "@/lib/commerce";

import { AddressSelector } from "@/components/checkout/AddressSelector";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { OrderReview } from "@/components/checkout/OrderReview";
import { OrderSummarySticky } from "@/components/checkout/OrderSummarySticky";
import { PaymentTabs } from "@/components/checkout/PaymentTabs";
import { ShippingMethodSelector } from "@/components/checkout/ShippingMethodSelector";

export function CheckoutPageClient() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(getDefaultAddressId());
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
  const [paymentTab, setPaymentTab] = useState<PaymentMethodType>("card");
  const [invoiceType, setInvoiceType] = useState<InvoiceType>("individual");
  const [cardId, setCardId] = useState<string>(getDefaultCardId());
  const [corporateTaxId, setCorporateTaxId] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");
  const [agreementChecked, setAgreementChecked] = useState(false);

  const items = useMemo(() => getInitialCartItems(), []);
  const coupon = useMemo(() => applyCoupon("HOSGELDIN200", items.reduce((t, i) => t + i.unitPrice * i.quantity, 0)), [items]);

  const totals = useMemo(() => {
    return calculateCartTotals(items, coupon.valid ? coupon.amount : 0, shippingMethod, "HOSGELDIN200");
  }, [coupon, items, shippingMethod]);

  const selectedAddress = ADDRESS_ITEMS.find((address) => address.id === selectedAddressId);

  const goNext = () => {
    setStep((current) => (current < 3 ? ((current + 1) as 1 | 2 | 3) : current));
  };

  const goBack = () => {
    setStep((current) => (current > 1 ? ((current - 1) as 1 | 2 | 3) : current));
  };

  const completeOrder = () => {
    if (!agreementChecked) {
      return;
    }

    const orderNo = createMockOrderNumber();
    router.push(`/checkout/success?order=${orderNo}`);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <header>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="mt-1 text-sm text-[color:var(--color-muted)]">
            Tek sayfada adim adim teslimat, odeme ve siparis onayi.
          </p>
        </header>

        <CheckoutSteps currentStep={step} />

        {step === 1 ? (
          <>
            <AddressSelector
              selectedAddressId={selectedAddressId}
              onSelectAddress={setSelectedAddressId}
              note={deliveryNote}
              onNoteChange={setDeliveryNote}
            />
            <ShippingMethodSelector selectedMethod={shippingMethod} onChange={setShippingMethod} />
          </>
        ) : null}

        {step === 2 ? (
          <PaymentTabs
            activeTab={paymentTab}
            onTabChange={setPaymentTab}
            invoiceType={invoiceType}
            onInvoiceTypeChange={setInvoiceType}
            cardId={cardId}
            onCardChange={setCardId}
            corporateTaxId={corporateTaxId}
            onCorporateTaxIdChange={setCorporateTaxId}
          />
        ) : null}

        {step === 3 ? (
          <OrderReview
            items={items}
            selectedAddressId={selectedAddressId}
            agreementChecked={agreementChecked}
            onAgreementChange={setAgreementChecked}
          />
        ) : null}

        <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-4 shadow-[0_12px_25px_rgba(15,23,42,0.05)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">Secili Adres</p>
              <p className="text-sm font-semibold">{selectedAddress ? `${selectedAddress.title} - ${selectedAddress.city}` : "Adres secin"}</p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1}
                className="rounded-xl border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold disabled:opacity-40"
              >
                Geri
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-xl bg-[color:var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--color-primary-strong)]"
                >
                  Sonraki adim
                </button>
              ) : (
                <button
                  type="button"
                  onClick={completeOrder}
                  disabled={!agreementChecked}
                  className="rounded-xl bg-[color:var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--color-primary-strong)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Siparisi Tamamla
                </button>
              )}
            </div>
          </div>
        </section>
      </div>

      <OrderSummarySticky totals={totals} />
    </div>
  );
}
