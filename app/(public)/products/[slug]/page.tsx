import Link from "next/link";
import { notFound } from "next/navigation";

import { BenefitStrip } from "@/components/product/BenefitStrip";
import { FAQAccordion } from "@/components/product/FAQAccordion";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductStory } from "@/components/product/ProductStory";
import { ProductTabs } from "@/components/product/ProductTabs";
import { PurchaseCard } from "@/components/product/PurchaseCard";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import {
  getProductBySlug,
  getProductDetailBySlug,
  getProductsBySlugs,
} from "@/lib/constants";

type ProductDetailProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const detail = getProductDetailBySlug(slug);

  if (!product || !detail) {
    notFound();
  }

  const togetherProducts = getProductsBySlugs(detail.togetherBought)
    .filter((item) => item.slug !== slug)
    .slice(0, 3);
  const similarProducts = getProductsBySlugs(detail.similarProducts)
    .filter((item) => item.slug !== slug)
    .slice(0, 3);
  const recentlyViewed = getProductsBySlugs(detail.recentlyViewed)
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  return (
    <div className="space-y-7">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-[color:var(--color-muted)]">
        <Link href="/" className="hover:text-[color:var(--color-primary)]">
          Anasayfa
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[color:var(--color-primary)]">
          Urunler
        </Link>
        <span>/</span>
        <p className="font-semibold text-[color:var(--color-foreground)]">{product.name}</p>
      </nav>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.85fr] xl:items-start">
        <ProductGallery productName={product.name} media={detail.media} has3d={product.has3d} />
        <PurchaseCard product={product} detail={detail} />
      </section>

      <BenefitStrip items={detail.benefits} />
      <ProductStory story={detail.story} />
      <ProductTabs detail={detail} />
      <FAQAccordion items={detail.faqs} />

      <section className="grid gap-5 lg:grid-cols-3">
        <RelatedProducts title="Birlikte Alinanlar" products={togetherProducts} />
        <RelatedProducts title="Benzer Urunler" products={similarProducts} />
        <RelatedProducts title="Son Baktiklariniz" products={recentlyViewed} />
      </section>
    </div>
  );
}
