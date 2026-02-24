import { MapPinIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

import { ADDRESS_ITEMS } from "@/lib/account";

export default function AccountAddressesPage() {
  return (
    <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold">Adreslerim</h2>
          <p className="mt-1 text-sm text-[color:var(--color-muted)]">Kayitli adreslerinizi yonetin, varsayilan teslimat adresinizi secin.</p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--color-primary)] px-3 py-2 text-sm font-semibold text-white hover:bg-[color:var(--color-primary-strong)]"
        >
          <PlusIcon className="size-4" /> Yeni Adres Ekle
        </button>
      </div>

      <div className="mt-4 grid gap-3">
        {ADDRESS_ITEMS.map((address) => (
          <article key={address.id} className="rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <p className="font-semibold">{address.title}</p>
                {address.isDefault ? (
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">Varsayilan</span>
                ) : null}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg border border-[color:var(--color-border)] bg-white px-2 py-1 text-xs font-semibold hover:border-[color:var(--color-primary)]"
                >
                  <PencilSquareIcon className="size-4" /> Duzenle
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg border border-[color:var(--color-border)] bg-white px-2 py-1 text-xs font-semibold hover:border-red-500 hover:text-red-600"
                >
                  <TrashIcon className="size-4" /> Sil
                </button>
              </div>
            </div>

            <p className="mt-3 text-sm">{address.fullName}</p>
            <p className="text-sm text-[color:var(--color-muted)]">{address.phone}</p>
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">
              {address.line1}, {address.district} / {address.city} {address.postalCode}
            </p>

            <div className="mt-3 rounded-xl border border-[color:var(--color-border)] bg-white p-3">
              <p className="mb-2 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--color-muted)]">
                <MapPinIcon className="size-4" /> Mini Konum Onizleme
              </p>
              <div className="h-24 rounded-lg bg-[radial-gradient(circle_at_top_right,_#fee2e2,_#fff1f2,_#ffffff)]" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
