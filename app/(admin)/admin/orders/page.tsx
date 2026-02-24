const mockOrders = [
  { id: "ORD-1021", customer: "Ayse Demir", total: "6.399 TL", status: "Hazirlaniyor" },
  { id: "ORD-1020", customer: "Mehmet Kaya", total: "1.999 TL", status: "Kargoda" },
  { id: "ORD-1019", customer: "Sude Acar", total: "45.999 TL", status: "Teslim Edildi" },
];

export default function AdminOrdersPage() {
  return (
    <section className="card p-6">
      <h1 className="text-2xl font-bold">Siparisler</h1>
      <p className="mt-2 text-sm text-[color:var(--color-muted)]">
        Sprint 3te odeme ve durum gecisleriyle tam siparis yonetimi eklenecek.
      </p>

      <div className="mt-6 grid gap-3">
        {mockOrders.map((order) => (
          <article key={order.id} className="rounded-xl border border-[color:var(--color-border)] p-4">
            <p className="font-semibold">{order.id}</p>
            <p className="text-sm text-[color:var(--color-muted)]">Musteri: {order.customer}</p>
            <p className="text-sm text-[color:var(--color-muted)]">Tutar: {order.total}</p>
            <p className="mt-1 inline-flex rounded-full bg-[color:var(--color-background)] px-2 py-1 text-xs font-semibold text-[color:var(--color-primary)]">
              {order.status}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
