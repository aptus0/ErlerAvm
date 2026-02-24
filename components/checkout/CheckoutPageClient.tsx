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
  formatTry,
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

  const primaryLabel = step < 3 ? "Devam Et" : "Siparisi Tamamla";
  const primaryDisabled = step === 3 && !agreementChecked;

  const handlePrimaryAction = () => {
    if (step < 3) {
      goNext();
      return;
    }

    completeOrder();
  };

  return (
    <>
      <div className="grid gap-6 pb-[calc(env(safe-area-inset-bottom)+7.2rem)] lg:grid-cols-[1fr_360px] lg:pb-0">
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
              shippingMethod={shippingMethod}
              totalAmount={totals.total}
              agreementChecked={agreementChecked}
              onAgreementChange={setAgreementChecked}
            />
          ) : null}

          <section className="hidden rounded-3xl border border-[color:var(--color-border)] bg-white p-4 shadow-[0_12px_25px_rgba(15,23,42,0.05)] lg:block">
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

                <button
                  type="button"
                  onClick={handlePrimaryAction}
                  disabled={primaryDisabled}
                  className="rounded-xl bg-[color:var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--color-primary-strong)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {primaryLabel}
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="hidden lg:block">
          <OrderSummarySticky totals={totals} />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--color-border)] bg-white/95 backdrop-blur lg:hidden">
        <div className="container py-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-muted)]">Toplam</p>
              <p className="text-lg font-bold text-[color:var(--color-primary)]">{formatTry(totals.total)}</p>
            </div>

            <button
              type="button"
              onClick={handlePrimaryAction}
              disabled={primaryDisabled}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[color:var(--color-primary)] px-5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(217,15,35,0.25)] disabled:opacity-50"
            >
              {primaryLabel}
            </button>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-[color:var(--color-muted)]">
            <p>{step}/3 adim</p>
            {step > 1 ? (
              <button type="button" onClick={goBack} className="font-semibold text-[color:var(--color-primary)]">
                Geri
              </button>
            ) : (
              <span>Teslimat adimindan baslayin</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
