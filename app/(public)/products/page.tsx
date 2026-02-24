import Image from "next/image";
import Link from "next/link";

import { PRODUCTS } from "@/lib/constants";

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string;
    campaign?: string;
  }>;
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const category = params.category?.toLowerCase();
  const hasCampaignFilter = Boolean(params.campaign);

  const filteredProducts = PRODUCTS.filter((product) => {
    const categoryMatches = category ? product.category.toLowerCase() === category : true;
    const campaignMatches = hasCampaignFilter ? product.isCampaign : true;
    return categoryMatches && campaignMatches;
  });

  return (
    <div>
      <section className="mb-8 rounded-3xl border border-[color:var(--color-border)] bg-white p-6 shadow-[0_14px_30px_rgba(15,23,42,0.06)]">
        <h1 className="text-3xl font-bold">Ürünler</h1>
        <p className="mt-2 text-sm text-[color:var(--color-muted)]">
          Kategoriye göre filtrelenebilir, satın almaya hazır ürün vitrini.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <article
            key={product.id}
            className="rounded-2xl border border-[color:var(--color-border)] bg-white p-4 shadow-[0_12px_24px_rgba(15,23,42,0.06)]"
          >
            <div className="relative h-52 overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[#fff6f7]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              <p className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-[color:var(--color-primary)]">
                {product.category}
              </p>
            </div>
            <h2 className="mt-3 text-lg font-semibold">{product.name}</h2>
            <p className="mt-1 text-sm text-[color:var(--color-muted)]">{product.shortDescription}</p>
            <p className="mt-3 font-bold text-[color:var(--color-primary)]">{formatCurrency(product.price)}</p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                className="rounded-xl bg-[color:var(--color-primary)] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[color:var(--color-primary-strong)]"
              >
                Satın Al
              </button>
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex items-center justify-center rounded-xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm font-semibold transition hover:border-[color:var(--color-primary)]"
              >
                Ürüne Göz At
              </Link>
            </div>
          </article>
        ))}

        {!filteredProducts.length ? (
          <article className="rounded-2xl border border-[color:var(--color-border)] bg-white p-6 text-sm text-[color:var(--color-muted)]">
            Filtreye uygun ürün bulunamadı.
          </article>
        ) : null}
      </section>
    </div>
  );
}
