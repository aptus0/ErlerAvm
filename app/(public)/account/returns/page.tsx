import { ChatBubbleOvalLeftEllipsisIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

import { StatusBadge } from "@/components/account/StatusBadge";
import { SUPPORT_REQUESTS, getRequestStatusMeta } from "@/lib/account";

export default function AccountReturnsPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
        <h2 className="text-2xl font-bold">Iade ve Talepler</h2>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">Iade baslatabilir veya destek taleplerinizin durumunu takip edebilirsiniz.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--color-primary-strong)]"
          >
            <ArrowUturnLeftIcon className="size-4" /> Iade Olustur
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold hover:border-[color:var(--color-primary)]"
          >
            <ChatBubbleOvalLeftEllipsisIcon className="size-4" /> Destek Talebi Ac
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
        <h3 className="text-lg font-bold">Taleplerim</h3>

        <div className="mt-4 grid gap-3">
          {SUPPORT_REQUESTS.map((request) => {
            const statusMeta = getRequestStatusMeta(request.status);

            return (
              <article key={request.id} className="rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{request.id}</p>
                    <p className="text-xs text-[color:var(--color-muted)]">{request.subject}</p>
                  </div>
                  <StatusBadge tone={statusMeta.tone}>{statusMeta.label}</StatusBadge>
                </div>

                <p className="mt-3 text-xs text-[color:var(--color-muted)]">Acilis: {request.createdAt} - Son guncelleme: {request.updatedAt}</p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
