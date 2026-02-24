import type { ReactNode } from "react";

import { SparklesIcon } from "@heroicons/react/24/solid";

import { AccountSidebar } from "@/components/account/AccountSidebar";
import { ACCOUNT_USER } from "@/lib/account";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-6 shadow-[0_14px_30px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">Hesabim</p>
            <h1 className="mt-2 text-3xl font-bold">Merhaba, {ACCOUNT_USER.firstName}</h1>
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">
              Siparisleriniz guvende, iade sureciniz kolay ve tum bilgileriniz sizin kontrolunuzde.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[#fff4f4] px-4 py-2 text-sm font-semibold text-[color:var(--color-primary)]">
            <SparklesIcon className="size-5" />
            Profesyonel Hesap Paneli
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[280px_1fr] lg:items-start">
        <AccountSidebar />
        <div className="space-y-5">{children}</div>
      </div>
    </div>
  );
}
