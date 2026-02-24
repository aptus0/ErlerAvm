import Link from "next/link";

import {
  ArrowDownTrayIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";

import { PRODUCTS } from "@/lib/constants";
import { formatTry } from "@/lib/format";

type SuccessPageProps = {
  searchParams: Promise<{
    order?: string;
  }>;
};

const timeline = [
  "Siparis alindi",
  "Hazirlaniyor",
  "Kargoya verildi",
  "Teslim edildi",
];

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const orderNo = params.order ?? "ERK-260224-4021";
  const picks = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-8 text-center shadow-[0_18px_38px_rgba(15,23,42,0.08)]">
        <CheckCircleIcon className="mx-auto size-16 text-emerald-600" />
        <h1 className="mt-3 text-4xl font-bold">Siparisiniz alindi</h1>
        <p className="mt-2 text-sm text-[color:var(--color-muted)]">
          Siparis surecinizi hesabinizdan adim adim takip edebilirsiniz.
        </p>

        <div className="mx-auto mt-4 flex max-w-md items-center justify-between gap-2 rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] p-3">
          <div className="text-left">
            <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">Siparis No</p>
            <p className="text-lg font-bold text-[color:var(--color-primary)]">{orderNo}</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm font-semibold hover:border-[color:var(--color-primary)]"
          >
            <ClipboardDocumentIcon className="size-4" /> Kopyala
          </button>
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-4">
          {timeline.map((step, index) => (
            <article
              key={step}
              className={[
                "rounded-xl border p-3 text-left",
                index === 0 ? "border-emerald-200 bg-emerald-50" : "border-[color:var(--color-border)] bg-white",
              ].join(" ")}
            >
              <p className="text-sm font-semibold">{step}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/account/orders"
            className="rounded-xl bg-[color:var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--color-primary-strong)]"
          >
            Siparislerime Git
          </Link>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-xl border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold hover:border-[color:var(--color-primary)]"
          >
            <ArrowDownTrayIcon className="size-4" /> Fatura Indir
          </button>
          <Link
            href="/products"
            className="rounded-xl border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold hover:border-[color:var(--color-primary)]"
          >
            Alisverise Devam Et
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_25px_rgba(15,23,42,0.05)]">
        <h2 className="text-xl font-bold">Birlikte Iyi Gider</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {picks.map((item) => (
            <article key={item.id} className="rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] p-3">
              <div className="h-24 rounded-xl bg-[linear-gradient(140deg,_#fff1f2,_#fee2e2)]" />
              <p className="mt-2 font-semibold">{item.name}</p>
              <p className="text-xs text-[color:var(--color-muted)]">{item.category}</p>
              <p className="mt-2 text-sm font-bold text-[color:var(--color-primary)]">{formatTry(item.price)}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
