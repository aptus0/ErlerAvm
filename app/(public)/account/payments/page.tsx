import { CreditCardIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

import { PAYMENT_METHODS } from "@/lib/account";

export default function AccountPaymentsPage() {
  return (
    <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold">Odeme Yontemlerim</h2>
          <p className="mt-1 text-sm text-[color:var(--color-muted)]">Kayitli kartlarinizi yonetin. Kart bilgileriniz maskeli olarak saklanir.</p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--color-primary)] px-3 py-2 text-sm font-semibold text-white hover:bg-[color:var(--color-primary-strong)]"
        >
          <PlusIcon className="size-4" /> Yeni Kart Ekle
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {PAYMENT_METHODS.map((method) => (
          <article key={method.id} className="rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="inline-flex items-center gap-2 font-semibold">
                <CreditCardIcon className="size-5 text-[color:var(--color-primary)]" />
                {method.cardBrand}
              </p>
              {method.isDefault ? (
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">Varsayilan</span>
              ) : null}
            </div>

            <p className="mt-3 text-lg font-bold">{method.maskedNumber}</p>
            <p className="text-sm text-[color:var(--color-muted)]">SKT: {method.expire}</p>

            <button
              type="button"
              className="mt-3 inline-flex items-center gap-1 rounded-lg border border-[color:var(--color-border)] bg-white px-2 py-1 text-xs font-semibold hover:border-red-500 hover:text-red-600"
            >
              <TrashIcon className="size-4" /> Karti Sil
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
