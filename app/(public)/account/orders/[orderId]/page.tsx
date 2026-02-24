import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ArrowUturnLeftIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

import { OrderDetailItems } from "@/components/account/OrderDetailItems";
import { OrderTimeline } from "@/components/account/OrderTimeline";
import { StatusBadge } from "@/components/account/StatusBadge";
import {
  formatTry,
  getOrderById,
  getOrderStatusMeta,
  getOrderTimeline,
} from "@/lib/account";

type OrderDetailPageProps = {
  params: Promise<{
    orderId: string;
  }>;
};

export default async function AccountOrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderId } = await params;
  const order = getOrderById(orderId);

  if (!order) {
    notFound();
  }

  const statusMeta = getOrderStatusMeta(order.status);
  const timeline = getOrderTimeline(order.status, order.date);

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">Siparis Detayi</p>
            <h2 className="text-2xl font-bold">{order.id}</h2>
            <p className="text-sm text-[color:var(--color-muted)]">Tarih: {order.date}</p>
          </div>
          <StatusBadge tone={statusMeta.tone}>{statusMeta.label}</StatusBadge>
        </div>

        <div className="mt-4">
          <OrderTimeline steps={timeline} />
        </div>
      </section>

      <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
        <h3 className="text-lg font-bold">Urun Listesi</h3>
        <div className="mt-3">
          <OrderDetailItems items={order.items} />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-[color:var(--color-muted)]">Toplam</p>
          <p className="text-xl font-bold text-[color:var(--color-primary)]">{formatTry(order.total)}</p>
        </div>
      </section>

      <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
        <h3 className="text-lg font-bold">Islemler</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--color-primary-strong)]"
          >
            <TruckIcon className="size-4" /> Kargo Takip
          </button>

          <Link
            href={order.invoiceUrl}
            className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold hover:border-[color:var(--color-primary)]"
          >
            <ArrowDownTrayIcon className="size-4" /> Fatura Indir
          </Link>

          {order.status === "delivered" && order.canReturn ? (
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold hover:border-[color:var(--color-primary)]"
            >
              <ArrowUturnLeftIcon className="size-4" /> Iade Talebi Olustur
            </button>
          ) : null}

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold hover:border-[color:var(--color-primary)]"
          >
            <ArrowPathIcon className="size-4" /> Tumunu tekrar satin al
          </button>
        </div>

        <p className="mt-3 text-xs text-[color:var(--color-muted)]">
          Kargo firmasi: {order.shippingCarrier} - Takip kodu: {order.trackingCode}
        </p>
      </section>
    </div>
  );
}
