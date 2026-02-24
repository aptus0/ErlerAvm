export type MenuItemType = "link" | "mega" | "dropdown" | "corporate";

export interface MenuLink {
  title: string;
  href: string;
}

export interface MegaMenuColumn {
  title: string;
  links: MenuLink[];
}

export interface MenuItem {
  id: string;
  title: string;
  href: string;
  type: MenuItemType;
  order: number;
  isActive: boolean;
  children?: MenuLink[];
  mega?: {
    columns: MegaMenuColumn[];
  };
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  shortDescription: string;
  image: string;
  isFeatured: boolean;
  isNew: boolean;
  isCampaign: boolean;
  has3d: boolean;
}

export type ProductMediaType = "image" | "video";

export interface ProductMediaItem {
  id: string;
  type: ProductMediaType;
  title: string;
  subtitle: string;
  duration?: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface ProductVariantGroup {
  name: string;
  options: string[];
  defaultOption?: string;
}

export type ProductBenefitIcon = "spark" | "shield" | "rocket" | "wrench" | "bolt";

export interface ProductBenefit {
  icon: ProductBenefitIcon;
  title: string;
  description: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductComparisonRow {
  label: string;
  thisProduct: string;
  alternative: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  withPhoto: boolean;
  helpful: number;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface ProductStory {
  title: string;
  description: string;
  paragraphs: string[];
  bullets: string[];
}

export interface ProductDetail {
  brand: string;
  rating: number;
  reviewCount: number;
  soldCount: number;
  oldPrice?: number;
  installmentText: string;
  paymentText: string;
  stockStatus: "in_stock" | "low_stock";
  stockLeft: number;
  shippingCutoff: string;
  media: ProductMediaItem[];
  variantGroups: ProductVariantGroup[];
  benefits: ProductBenefit[];
  story: ProductStory;
  specs: ProductSpec[];
  comparison: ProductComparisonRow[];
  reviews: ProductReview[];
  faqs: ProductFaq[];
  togetherBought: string[];
  similarProducts: string[];
  recentlyViewed: string[];
}

export interface CorporatePageContent {
  title: string;
  content: string;
  updatedAt: string;
}

export const NAV_MENU: MenuItem[] = [
  {
    id: "home",
    title: "Anasayfa",
    href: "/",
    type: "link",
    order: 1,
    isActive: true,
  },
  {
    id: "products",
    title: "Ürünler",
    href: "/products",
    type: "mega",
    order: 2,
    isActive: true,
    mega: {
      columns: [
        {
          title: "Elektronik",
          links: [
            { title: "Laptop", href: "/products?category=Elektronik" },
            { title: "Aksesuar", href: "/products?category=Elektronik" },
          ],
        },
        {
          title: "Ev",
          links: [
            { title: "Mutfak", href: "/products?category=Ev" },
            { title: "Temizlik", href: "/products?category=Ev" },
          ],
        },
        {
          title: "Yaşam",
          links: [
            { title: "Spor", href: "/products?category=Yasam" },
            { title: "Ofis", href: "/products?category=Yasam" },
          ],
        },
      ],
    },
  },
  {
    id: "campaigns",
    title: "Kampanyalar",
    href: "/products",
    type: "dropdown",
    order: 3,
    isActive: true,
    children: [
      { title: "Haftanın Fırsatları", href: "/products?campaign=weekly" },
      { title: "Yüzde 40'a Varan", href: "/products?campaign=flash" },
      { title: "Sepette Ek İndirim", href: "/products?campaign=cart" },
    ],
  },
  {
    id: "corporate",
    title: "Kurumsal",
    href: "/corporate/hakkimizda",
    type: "corporate",
    order: 4,
    isActive: true,
    children: [
      { title: "Hakkımızda", href: "/corporate/hakkimizda" },
      { title: "KVKK", href: "/corporate/kvkk" },
      { title: "İade Politikası", href: "/corporate/iade-politikasi" },
      { title: "Kargo ve Teslimat", href: "/corporate/kargo-ve-teslimat" },
    ],
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "p-001",
    slug: "atlas-pro-laptop",
    name: "Atlas Pro Laptop",
    price: 45999,
    category: "Elektronik",
    shortDescription: "14 inç, ince kasa, günlük iş ve oyun dengesi.",
    image: "/products/atlas-pro.svg",
    isFeatured: true,
    isNew: true,
    isCampaign: false,
    has3d: true,
  },
  {
    id: "p-002",
    slug: "nova-ses-sistemi",
    name: "Nova Ses Sistemi",
    price: 8699,
    category: "Elektronik",
    shortDescription: "Kablosuz bağlantı ve surround destekli set.",
    image: "/products/nova-audio.svg",
    isFeatured: true,
    isNew: false,
    isCampaign: true,
    has3d: false,
  },
  {
    id: "p-003",
    slug: "vera-kahve-makinesi",
    name: "Vera Kahve Makinesi",
    price: 4299,
    category: "Ev",
    shortDescription: "Tek tuş ile espresso ve filtre kahve hazırlar.",
    image: "/products/vera-coffee.svg",
    isFeatured: false,
    isNew: true,
    isCampaign: true,
    has3d: true,
  },
  {
    id: "p-004",
    slug: "modo-ofis-koltugu",
    name: "Modo Ofis Koltuğu",
    price: 6399,
    category: "Yasam",
    shortDescription: "Bel desteği ve file sırtlık ile uzun çalışma konforu.",
    image: "/products/modo-chair.svg",
    isFeatured: true,
    isNew: false,
    isCampaign: false,
    has3d: true,
  },
  {
    id: "p-005",
    slug: "aero-blender-set",
    name: "Aero Blender Set",
    price: 1999,
    category: "Ev",
    shortDescription: "Cam hazne, buz kırma modu ve kolay temizlik.",
    image: "/products/aero-blender.svg",
    isFeatured: false,
    isNew: true,
    isCampaign: false,
    has3d: false,
  },
  {
    id: "p-006",
    slug: "stride-kosu-bandi",
    name: "Stride Koşu Bandı",
    price: 17999,
    category: "Yasam",
    shortDescription: "Katlanabilir gövde, sessiz motor, mobil uygulama desteği.",
    image: "/products/stride-runner.svg",
    isFeatured: false,
    isNew: false,
    isCampaign: true,
    has3d: true,
  },
];

export const CORPORATE_PAGES: Record<string, CorporatePageContent> = {
  hakkimizda: {
    title: "Hakkimizda",
    content:
      "Erkur AVM, teknoloji ve yasam urunlerini tek cati altinda bulusturmak icin kuruldu. Hizli teslimat, guvenilir stok ve yalnizca dogrulanmis saticilarla calisiyoruz.",
    updatedAt: "2026-02-24",
  },
  kvkk: {
    title: "KVKK",
    content:
      "Kisisel verileriniz 6698 sayili kanuna uygun olarak islenir, sadece siparis ve iletisim sureclerini yonetmek icin kullanilir. Ucuncu taraflarla acik riza olmadan paylasilmaz.",
    updatedAt: "2026-02-24",
  },
  "iade-politikasi": {
    title: "Iade Politikasi",
    content:
      "Teslimattan itibaren 14 gun icinde iade talebi olusturabilirsiniz. Kullanilmis ve kutusu hasarli urunler iade kapsaminda degerlendirilmeyebilir.",
    updatedAt: "2026-02-24",
  },
  "kargo-ve-teslimat": {
    title: "Kargo ve Teslimat",
    content:
      "Hafta ici 15:00'a kadar verilen siparisler ayni gun icinde kargoya verilir. Buyuk hacimli urunlerde teslimat suresi sehre gore degisebilir.",
    updatedAt: "2026-02-24",
  },
};

export function getActiveMenuItems(): MenuItem[] {
  return NAV_MENU.filter((item) => item.isActive).sort((a, b) => a.order - b.order);
}

const PRODUCT_MEDIA_PALETTE: Record<string, { from: string; to: string }> = {
  Elektronik: { from: "#fef2f2", to: "#fee2e2" },
  Ev: { from: "#fff7ed", to: "#ffedd5" },
  Yasam: { from: "#fdf4ff", to: "#fce7f3" },
};

const DEFAULT_BENEFITS: ProductBenefit[] = [
  {
    icon: "spark",
    title: "Yuksek performans",
    description: "Guc ve verim dengesini korur, gunluk kullanimda yavaslamaz.",
  },
  {
    icon: "shield",
    title: "Guvenli kullanim",
    description: "Orijinal urun ve dogrulanmis tedarik zinciri ile gelir.",
  },
  {
    icon: "rocket",
    title: "Hizli kurulum",
    description: "Kutusundan cikar cikmaz kullanima baslayabilirsiniz.",
  },
  {
    icon: "wrench",
    title: "Servis destegi",
    description: "Yetkili servis ve yedek parca erisimi uzun sure devam eder.",
  },
  {
    icon: "bolt",
    title: "Uzun omurlu",
    description: "Saglam malzeme yapisi ile uzun donem kullanim odaklidir.",
  },
];

function createMockReviews(product: Product): ProductReview[] {
  return [
    {
      id: `${product.id}-r1`,
      author: "Merve K.",
      rating: 5,
      title: "Bekledigimden iyi",
      comment:
        `${product.name} gunluk kullanimda cok akici. Paketleme duzenliydi ve ayni gun kargoya verildi.`,
      date: "2026-02-18",
      verified: true,
      withPhoto: true,
      helpful: 41,
    },
    {
      id: `${product.id}-r2`,
      author: "Can A.",
      rating: 4,
      title: "Fiyat performans dengeli",
      comment:
        "Kurulumu kolaydi. Ses ve malzeme kalitesi fiyatina gore basarili. Kargo sureci hizli ilerledi.",
      date: "2026-02-14",
      verified: true,
      withPhoto: false,
      helpful: 19,
    },
    {
      id: `${product.id}-r3`,
      author: "Derya T.",
      rating: 5,
      title: "Tavsiye ederim",
      comment:
        "Uzun sure arastirdiktan sonra aldim. Hem tasarimi hem performansi memnun etti.",
      date: "2026-02-11",
      verified: true,
      withPhoto: true,
      helpful: 33,
    },
    {
      id: `${product.id}-r4`,
      author: "Ali Y.",
      rating: 4,
      title: "Genel olarak iyi",
      comment:
        "Beklentimi karsiladi. Teslimat zamaninda geldi. Ilk haftada herhangi bir sorun yasamadim.",
      date: "2026-02-08",
      verified: true,
      withPhoto: false,
      helpful: 12,
    },
    {
      id: `${product.id}-r5`,
      author: "Sena B.",
      rating: 5,
      title: "Kaliteli hissettiriyor",
      comment:
        "Malzeme kalitesi ve kullanim hissi premium. Ozellikle detay isciligi cok iyi.",
      date: "2026-02-05",
      verified: true,
      withPhoto: true,
      helpful: 28,
    },
    {
      id: `${product.id}-r6`,
      author: "Hakan U.",
      rating: 3,
      title: "Iyi ama beklentiye gore degisir",
      comment:
        "Temel ihtiyaclari iyi karsiliyor. Daha ileri seviye kullanim icin ust model dusunulebilir.",
      date: "2026-02-02",
      verified: true,
      withPhoto: false,
      helpful: 7,
    },
  ];
}

function createDefaultVariants(category: string): ProductVariantGroup[] {
  if (category === "Elektronik") {
    return [
      {
        name: "Renk",
        options: ["Uzay Grisi", "Buz Beyazi", "Gece Siyahi"],
        defaultOption: "Uzay Grisi",
      },
      {
        name: "Hafiza",
        options: ["256 GB", "512 GB", "1 TB"],
        defaultOption: "512 GB",
      },
    ];
  }

  if (category === "Ev") {
    return [
      {
        name: "Renk",
        options: ["Krem", "Kirmizi", "Inox"],
        defaultOption: "Krem",
      },
      {
        name: "Kapasite",
        options: ["Standart", "XL"],
        defaultOption: "Standart",
      },
    ];
  }

  return [
    {
      name: "Renk",
      options: ["Bordo", "Antrasit", "Bej"],
      defaultOption: "Antrasit",
    },
    {
      name: "Olcu",
      options: ["S", "M", "L"],
      defaultOption: "M",
    },
  ];
}

function createDefaultMedia(product: Product): ProductMediaItem[] {
  const palette = PRODUCT_MEDIA_PALETTE[product.category] ?? {
    from: "#f8fafc",
    to: "#e2e8f0",
  };

  return [
    {
      id: `${product.id}-m1`,
      type: "image",
      title: "On Gorunum",
      subtitle: "Detayli urun acisi",
      gradientFrom: palette.from,
      gradientTo: palette.to,
    },
    {
      id: `${product.id}-m2`,
      type: "image",
      title: "Yakin Plan",
      subtitle: "Malzeme ve iscilik odagi",
      gradientFrom: palette.to,
      gradientTo: "#ffffff",
    },
    {
      id: `${product.id}-m3`,
      type: "video",
      title: "Gercek Kullanim Videosu",
      subtitle: "Urunun elde kullanim demosu",
      duration: "00:24",
      gradientFrom: "#111827",
      gradientTo: "#374151",
    },
    {
      id: `${product.id}-m4`,
      type: "image",
      title: "Yasam Alani",
      subtitle: "Mekan icinde olcek gosterimi",
      gradientFrom: "#fff1f2",
      gradientTo: "#fee2e2",
    },
    {
      id: `${product.id}-m5`,
      type: "image",
      title: "Aksesuarlar",
      subtitle: "Kutu icerigi ve aparatlar",
      gradientFrom: "#fef9c3",
      gradientTo: "#fde68a",
    },
  ];
}

function buildFallbackProductDetail(product: Product): ProductDetail {
  const reviews = createMockReviews(product);
  const rating =
    Math.round(
      (reviews.reduce((total, review) => total + review.rating, 0) / Math.max(reviews.length, 1)) * 10,
    ) / 10;
  const isCampaign = product.isCampaign;
  const oldPrice = isCampaign ? Math.round(product.price * 1.2) : Math.round(product.price * 1.08);

  return {
    brand: "Erkur Select",
    rating,
    reviewCount: 248 + reviews.length,
    soldCount: 1200 + product.price % 300,
    oldPrice,
    installmentText: "12 aya varan taksit, pesin fiyata 3 taksit.",
    paymentText: "Kapida odeme ve guvenli kart altyapisi aktif.",
    stockStatus: product.isNew ? "in_stock" : "low_stock",
    stockLeft: product.isNew ? 18 : 7,
    shippingCutoff: "16:00",
    media: createDefaultMedia(product),
    variantGroups: createDefaultVariants(product.category),
    benefits: DEFAULT_BENEFITS,
    story: {
      title: `${product.name} kimler icin uygun?`,
      description:
        "Gunluk kullanimda hiz, konfor ve dayaniklilik arayan kullanicilar icin dengeli bir tercih.",
      paragraphs: [
        `${product.name}, yogun tempoda pratik kullanim isteyenler icin tasarlandi. Kurulum suresi kisadir ve ilk kullanimdan itibaren stabil performans verir.`,
        "Tasarim dili sade ama premium hissettirir. Malzeme secimi uzun kullanim hedefiyle yapildigi icin hem ev hem ofis senaryolarina uyum saglar.",
      ],
      bullets: [
        "Gun icindeki tekrar eden gorevleri hizlandirir.",
        "Bakim ve temizlik surecini kolaylastirir.",
        "Gundelik kullanimda enerji verimliligini korur.",
      ],
    },
    specs: [
      { label: "Model", value: product.name },
      { label: "Kategori", value: product.category },
      { label: "Garanti", value: "24 Ay Resmi Distribütor" },
      { label: "Kutu Icerigi", value: "Ana urun, hizli baslangic kilavuzu, aksesuar seti" },
      { label: "Servis", value: "Turkiye geneli yetkili servis agi" },
      { label: "Urun Kodu", value: product.id.toUpperCase() },
    ],
    comparison: [
      {
        label: "Performans",
        thisProduct: "Yuksek",
        alternative: "Orta",
      },
      {
        label: "Garanti",
        thisProduct: "24 Ay",
        alternative: "12 Ay",
      },
      {
        label: "Servis Agi",
        thisProduct: "Ulke geneli",
        alternative: "Sinirli",
      },
    ],
    reviews,
    faqs: [
      {
        question: "Iade ve degisim sureci nasil isliyor?",
        answer:
          "Teslimattan sonra 14 gun icinde iade talebi olusturabilirsiniz. Uygunluk kontrolunden sonra iade islemi hizla tamamlanir.",
      },
      {
        question: "Kargo suresi ne kadar?",
        answer:
          "Hafta ici 16:00 oncesi siparisler ayni gun kargoya verilir. Buyuk sehirlerde genellikle 1-2 is gununde teslim edilir.",
      },
      {
        question: "Garanti kapsami nedir?",
        answer:
          "Urun 24 ay resmi distribütor garantisi altindadir. Ariza durumunda yetkili servis agi devreye girer.",
      },
      {
        question: "Varyant secimi nasil yapilmali?",
        answer:
          "Kullanim alani ve ihtiyac yogunluguna gore renk ve olcu secimi yapabilirsiniz. Kararsizsaniz destek ekibimiz yardimci olur.",
      },
    ],
    togetherBought: PRODUCTS.slice(0, 3).map((item) => item.slug),
    similarProducts: PRODUCTS.slice(2, 5).map((item) => item.slug),
    recentlyViewed: PRODUCTS.slice(3, 6).map((item) => item.slug),
  };
}

const PRODUCT_DETAIL_OVERRIDES: Partial<Record<string, ProductDetail>> = {
  "atlas-pro-laptop": {
    brand: "Atlas Tech",
    rating: 4.8,
    reviewCount: 1284,
    soldCount: 4630,
    oldPrice: 51999,
    installmentText: "9 aya varan taksit secenegi, pesin fiyatina 3 taksit.",
    paymentText: "Kapida odeme, havale indirimi ve guvenli 3D Secure odeme.",
    stockStatus: "low_stock",
    stockLeft: 7,
    shippingCutoff: "15:30",
    media: [
      {
        id: "atlas-1",
        type: "image",
        title: "Studio Cekim",
        subtitle: "Ince kasa premium gorunum",
        gradientFrom: "#fff1f2",
        gradientTo: "#fecdd3",
      },
      {
        id: "atlas-2",
        type: "image",
        title: "Klavye ve Ekran",
        subtitle: "Yakin plan detaylar",
        gradientFrom: "#fef3c7",
        gradientTo: "#fde68a",
      },
      {
        id: "atlas-3",
        type: "video",
        title: "Gercek Kullanim",
        subtitle: "Toplanti ve tasarim senaryosu",
        duration: "00:28",
        gradientFrom: "#1f2937",
        gradientTo: "#111827",
      },
      {
        id: "atlas-4",
        type: "image",
        title: "Port Baglantilari",
        subtitle: "Tum baglanti secenekleri",
        gradientFrom: "#ede9fe",
        gradientTo: "#ddd6fe",
      },
      {
        id: "atlas-5",
        type: "image",
        title: "Calisma Masasi",
        subtitle: "Gercek mekan olcegi",
        gradientFrom: "#f0f9ff",
        gradientTo: "#dbeafe",
      },
    ],
    variantGroups: [
      {
        name: "Renk",
        options: ["Uzay Grisi", "Bulut Gumusu", "Mat Siyah"],
        defaultOption: "Uzay Grisi",
      },
      {
        name: "RAM",
        options: ["16 GB", "32 GB"],
        defaultOption: "16 GB",
      },
      {
        name: "Depolama",
        options: ["512 GB SSD", "1 TB SSD"],
        defaultOption: "512 GB SSD",
      },
    ],
    benefits: [
      {
        icon: "spark",
        title: "Profesyonel hiz",
        description: "Coklu gorevlerde akici deneyim ve dusuk gecikme saglar.",
      },
      {
        icon: "rocket",
        title: "Hizli acilis",
        description: "SSD altyapisi ile dakikalar degil saniyeler icinde hazir olur.",
      },
      {
        icon: "shield",
        title: "Termal denge",
        description: "Uzun sureli kullanimda performansini stabil korur.",
      },
      {
        icon: "wrench",
        title: "Kolay servis",
        description: "Parca ve servis erisimi sayesinde uzun omurlu kullanim sunar.",
      },
      {
        icon: "bolt",
        title: "Hafif tasarim",
        description: "Gun boyu tasinabilirlik icin dengeli agirlik dagilimi vardir.",
      },
    ],
    story: {
      title: "Atlas Pro Laptop kimler icin?",
      description:
        "Hem is hem yaratici uretim tarafinda ayni cihazla yuksek performans isteyen kullanicilar.",
      paragraphs: [
        "Atlas Pro, toplantidan tasarim isine kadar gun boyu degisen ihtiyaclar icin dengeli bir guc sunar. Ince kasasi tasinabilirligi korurken performanstan odun vermez.",
        "Islemci ve sogutma mimarisi birlikte calistigi icin yuk altinda stabil kalir. Bu sayede uzun sureli kullanimda hem sessiz hem verimli bir deneyim verir.",
      ],
      bullets: [
        "Render ve ofis isleri arasinda hizli gecis yaparsiniz.",
        "Toplanti, seyahat ve ofis dongusunde tek cihaz yeterli olur.",
        "Uzun pil omru ile priz arama stresi azalir.",
      ],
    },
    specs: [
      { label: "Islemci", value: "12 cekirdekli performans mimarisi" },
      { label: "Bellek", value: "16 GB / 32 GB LPDDR5" },
      { label: "Depolama", value: "512 GB / 1 TB NVMe SSD" },
      { label: "Ekran", value: "14 inç IPS, 120 Hz, 500 nit" },
      { label: "Pil", value: "76 Wh, hizli sarj destegi" },
      { label: "Agirlik", value: "1.34 kg" },
    ],
    comparison: [
      {
        label: "Pil Omru",
        thisProduct: "18 saat",
        alternative: "11 saat",
      },
      {
        label: "Ekran Parlakligi",
        thisProduct: "500 nit",
        alternative: "300 nit",
      },
      {
        label: "Kasa Agirligi",
        thisProduct: "1.34 kg",
        alternative: "1.62 kg",
      },
    ],
    reviews: [
      {
        id: "atlas-r1",
        author: "Ceren G.",
        rating: 5,
        title: "Yuk altinda bile sessiz",
        comment:
          "Video duzenleme ve toplanti tarafinda ayni gun icinde cok kez kullandim. Fan sesi rahatsiz etmiyor, performans stabil.",
        date: "2026-02-19",
        verified: true,
        withPhoto: true,
        helpful: 86,
      },
      {
        id: "atlas-r2",
        author: "Tolga M.",
        rating: 5,
        title: "Ekran kalitesi cok iyi",
        comment:
          "Parlaklik seviyesi yuksek, dis mekanda da rahat kullaniliyor. Renkler tutarli.",
        date: "2026-02-15",
        verified: true,
        withPhoto: true,
        helpful: 44,
      },
      {
        id: "atlas-r3",
        author: "Pinar A.",
        rating: 4,
        title: "Tasarim + performans dengesi",
        comment:
          "Hafif oldugu icin tasimasi kolay. Klavye hissi de guzel. Fiyat yuksek ama karsilik veriyor.",
        date: "2026-02-12",
        verified: true,
        withPhoto: false,
        helpful: 33,
      },
      {
        id: "atlas-r4",
        author: "Burak T.",
        rating: 5,
        title: "Is icin tam nokta",
        comment:
          "Sunum, kod ve tasarim araclarini ayni anda aciyorum. Donma yasamadim.",
        date: "2026-02-10",
        verified: true,
        withPhoto: true,
        helpful: 57,
      },
      {
        id: "atlas-r5",
        author: "Aylin S.",
        rating: 4,
        title: "Genel memnuniyet",
        comment:
          "Gunluk kullanimda hizli. Pil suresi benim senaryomda bir gunu cikartiyor.",
        date: "2026-02-06",
        verified: true,
        withPhoto: false,
        helpful: 21,
      },
      {
        id: "atlas-r6",
        author: "Mert D.",
        rating: 5,
        title: "Kalite hissi yuksek",
        comment:
          "Malzeme kalitesi net premium. Ekran mentecesi ve govde yapisi guven veriyor.",
        date: "2026-02-03",
        verified: true,
        withPhoto: true,
        helpful: 38,
      },
    ],
    faqs: [
      {
        question: "Ayni gun kargo hangi saate kadar gecerli?",
        answer:
          "Hafta ici 15:30 oncesi verilen siparisler ayni gun depodan cikis yapar.",
      },
      {
        question: "RAM ve depolama sonradan arttirilabilir mi?",
        answer:
          "Depolama varyanta gore degisir. Siparis oncesinde ihtiyaca uygun secimi yapmanizi oneririz.",
      },
      {
        question: "Iade ve degisim kosullari nedir?",
        answer:
          "14 gun icinde iade talebi olusturabilirsiniz. Kutu icerigi tam ve urun fiziksel olarak hasarsiz olmalidir.",
      },
      {
        question: "Uluslararasi klavye secenegi var mi?",
        answer:
          "Su an stokta TR klavye secenegi bulunuyor. Diger dizilimler talep toplandikca acilir.",
      },
    ],
    togetherBought: ["atlas-pro-laptop", "nova-ses-sistemi", "modo-ofis-koltugu"],
    similarProducts: ["atlas-pro-laptop", "stride-kosu-bandi", "nova-ses-sistemi"],
    recentlyViewed: ["vera-kahve-makinesi", "aero-blender-set", "modo-ofis-koltugu"],
  },
};

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((item) => item.slug === slug);
}

export function getProductDetailBySlug(slug: string): ProductDetail | undefined {
  const baseProduct = getProductBySlug(slug);

  if (!baseProduct) {
    return undefined;
  }

  const override = PRODUCT_DETAIL_OVERRIDES[slug];
  if (override) {
    return override;
  }

  return buildFallbackProductDetail(baseProduct);
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is Product => Boolean(product));
}
