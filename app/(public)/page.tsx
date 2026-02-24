import { Banner } from "@/components/home/Banner";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ProductShowcase3D } from "@/components/home/ProductShowcase3D";
import { type Product, PRODUCTS } from "@/lib/constants";

const SECTION_LIMIT = 6;

function fillSectionProducts(primary: Product[], fallbackPool: Product[] = PRODUCTS): Product[] {
  const merged = [
    ...primary,
    ...fallbackPool.filter((candidate) => !primary.some((item) => item.id === candidate.id)),
  ];

  if (!merged.length) {
    return [];
  }

  if (merged.length >= SECTION_LIMIT) {
    return merged.slice(0, SECTION_LIMIT);
  }

  return Array.from({ length: SECTION_LIMIT }, (_, index) => merged[index % merged.length]);
}

export default function HomePage() {
  const featuredProducts = fillSectionProducts(PRODUCTS.filter((product) => product.isFeatured));
  const newProducts = fillSectionProducts(PRODUCTS.filter((product) => product.isNew));
  const campaignProducts = fillSectionProducts(PRODUCTS.filter((product) => product.isCampaign));
  const productsWith3dPrimary = PRODUCTS.filter((product) => product.has3d);
  const productsWith3d = fillSectionProducts(productsWith3dPrimary, productsWith3dPrimary);

  return (
    <div>
      <Banner />
      <FeaturedProducts
        title="One Cikanlar"
        description="Vitrinde yer alan secili urunler. Masaustu gorunumde 6'li profesyonel grid kullanilir."
        products={featuredProducts}
      />
      <FeaturedProducts
        title="Yeni Gelenler"
        description="Bu hafta kataloga eklenen urunler."
        products={newProducts}
      />
      <FeaturedProducts
        title="Kampanyalar"
        description="Fiyat avantaji sunan secili urunler."
        products={campaignProducts}
      />
      <ProductShowcase3D products={productsWith3d} />
    </div>
  );
}
