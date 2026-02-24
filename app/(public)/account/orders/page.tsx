import { OrderCard } from "@/components/account/OrderCard";
import { ACCOUNT_ORDERS } from "@/lib/account";

export default function AccountOrdersPage() {
  return (
    <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
      <h2 className="text-2xl font-bold">Siparislerim</h2>
      <p className="mt-1 text-sm text-[color:var(--color-muted)]">
        Tum siparislerinizi durumlariyla birlikte buradan takip edebilirsiniz.
      </p>

      <div className="mt-4 grid gap-3">
        {ACCOUNT_ORDERS.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
}
