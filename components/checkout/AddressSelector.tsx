import { CheckCircleIcon, PlusIcon } from "@heroicons/react/24/outline";

import { ADDRESS_ITEMS } from "@/lib/account";

interface AddressSelectorProps {
  selectedAddressId: string;
  onSelectAddress: (id: string) => void;
  note: string;
  onNoteChange: (value: string) => void;
}

export function AddressSelector({ selectedAddressId, onSelectAddress, note, onNoteChange }: AddressSelectorProps) {
  return (
    <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_25px_rgba(15,23,42,0.05)]">
      <h2 className="text-xl font-bold">1. Teslimat Bilgileri</h2>
      <p className="mt-1 text-sm text-[color:var(--color-muted)]">
        Kayitli adreslerinizden birini secin veya yeni adres ekleyin.
      </p>

      <div className="mt-4 grid gap-3">
        {ADDRESS_ITEMS.map((address) => {
          const selected = selectedAddressId === address.id;

          return (
            <button
              key={address.id}
              type="button"
              onClick={() => onSelectAddress(address.id)}
              className={[
                "rounded-2xl border p-4 text-left transition",
                selected
                  ? "border-[color:var(--color-primary)] bg-[#fff2f3]"
                  : "border-[color:var(--color-border)] bg-white hover:border-[color:var(--color-primary)]/50",
              ].join(" ")}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{address.title}</p>
                  {address.isDefault ? (
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">Varsayılan</span>
                  ) : null}
                </div>

                {selected ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--color-primary)]/10 px-2 py-1 text-xs font-semibold text-[color:var(--color-primary)]">
                    <CheckCircleIcon className="size-4" />
                    Seçili
                  </span>
                ) : null}
              </div>

              <p className="mt-2 text-sm">{address.fullName}</p>
              <p className="text-sm text-[color:var(--color-muted)]">{address.phone}</p>
              <p className="mt-1 text-sm text-[color:var(--color-muted)]">
                {address.district} / {address.city}
              </p>
              <p className="text-xs text-[color:var(--color-muted)]">{address.line1}</p>
            </button>
          );
        })}

        <button
          type="button"
          className="flex items-center gap-2 rounded-2xl border border-dashed border-[color:var(--color-border)] bg-[#fffafa] px-4 py-4 text-left text-sm font-semibold text-[color:var(--color-muted)] transition hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-white">
            <PlusIcon className="size-4" />
          </span>
          Yeni adres ekle
        </button>
      </div>

      <label className="mt-4 block text-sm font-medium text-[color:var(--color-foreground)]">
        Teslimat notu (opsiyonel)
        <textarea
          value={note}
          onChange={(event) => onNoteChange(event.target.value)}
          rows={3}
          placeholder="Kurye daireye biraksin, 18:00 sonrasi teslim uygundur..."
          className="mt-2 w-full rounded-xl border border-[color:var(--color-border)] bg-white p-3 text-sm outline-none focus:border-[color:var(--color-primary)]"
        />
      </label>
    </section>
  );
}
