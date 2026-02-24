import { ShieldCheckIcon } from "@heroicons/react/24/outline";

import { Input } from "@/components/ui/Input";
import { ACCOUNT_USER } from "@/lib/account";

export default function AccountProfilePage() {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
        <h2 className="text-2xl font-bold">Hesap Bilgilerim</h2>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">Kisisel bilgilerinizi buradan guncelleyebilirsiniz.</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Input id="fullName" label="Ad Soyad" defaultValue={ACCOUNT_USER.fullName} />
          <Input id="email" label="E-Posta" defaultValue={ACCOUNT_USER.email} />
          <Input id="phone" label="Telefon" defaultValue={ACCOUNT_USER.phone} />
          <Input id="memberSince" label="Uyelik Baslangici" defaultValue={ACCOUNT_USER.memberSince} disabled />
        </div>

        <button
          type="button"
          className="mt-4 rounded-xl bg-[color:var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--color-primary-strong)]"
        >
          Bilgileri Kaydet
        </button>
      </section>

      <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
        <h3 className="text-lg font-bold">Guvenlik</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Input id="password" label="Yeni Sifre" type="password" placeholder="••••••••" />
          <Input id="passwordAgain" label="Sifre Tekrar" type="password" placeholder="••••••••" />
        </div>

        <div className="mt-4 rounded-xl border border-[color:var(--color-border)] bg-[#fffafa] p-3">
          <p className="inline-flex items-center gap-2 text-sm font-semibold">
            <ShieldCheckIcon className="size-5 text-[color:var(--color-primary)]" />
            Iki adimli dogrulama (2FA)
          </p>
          <p className="mt-1 text-xs text-[color:var(--color-muted)]">
            Yakinda aktif olacak. Hesap guvenligini bir ust seviyeye cikarir.
          </p>
        </div>
      </section>
    </div>
  );
}
