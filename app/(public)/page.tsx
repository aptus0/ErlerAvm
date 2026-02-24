import { Banner } from "@/components/home/Banner";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ProductShowcase3D } from "@/components/home/ProductShowcase3D";
import { PRODUCTS } from "@/lib/constants";

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter((product) => product.isFeatured);
  const newProducts = PRODUCTS.filter((product) => product.isNew);
  const campaignProducts = PRODUCTS.filter((product) => product.isCampaign);
  const productsWith3d = PRODUCTS.filter((product) => product.has3d).slice(0, 3);

  return (
    <div>
      <Banner />
      <FeaturedProducts
        title="Öne Çıkanlar"
        description="Anasayfada vitrine çıkan ürünler."
        products={featuredProducts}
      />
      <FeaturedProducts
        title="Yeni Gelenler"
        description="Bu hafta kataloğa eklenen ürünler."
        products={newProducts}
      />
      <FeaturedProducts
        title="Kampanyalar"
        description="Fiyat avantajı sunan seçili ürünler."
        products={campaignProducts}
      />
      <ProductShowcase3D products={productsWith3d} />
    </div>
  );
}
