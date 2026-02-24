import { PRODUCTS } from "@/lib/constants";

export default function AdminProductsPage() {
  return (
    <section className="card p-6">
      <h1 className="text-2xl font-bold">Urunler</h1>
      <p className="mt-2 text-sm text-[color:var(--color-muted)]">
        Sprint 2de CRUD islemleri bu ekran uzerinden aktif edilecek.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[color:var(--color-border)] text-[color:var(--color-muted)]">
              <th className="py-2 pr-4">Urun</th>
              <th className="py-2 pr-4">Kategori</th>
              <th className="py-2 pr-4">Durum</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((product) => (
              <tr key={product.id} className="border-b border-[color:var(--color-border)]/70">
                <td className="py-3 pr-4 font-medium">{product.name}</td>
                <td className="py-3 pr-4">{product.category}</td>
                <td className="py-3 pr-4 text-[color:var(--color-muted)]">
                  {product.isFeatured ? "One Cikan" : "Standart"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
