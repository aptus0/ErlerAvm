export interface AccountUser {
  id: string;
  firstName: string;
  fullName: string;
  email: string;
  phone: string;
  memberSince: string;
}

export type OrderStatus = "received" | "preparing" | "shipped" | "delivered";

export interface AccountOrderItem {
  id: string;
  slug: string;
  name: string;
  quantity: number;
  price: number;
}

export interface AccountOrder {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  trackingCode: string;
  shippingCarrier: string;
  invoiceUrl: string;
  canReturn: boolean;
  items: AccountOrderItem[];
}

export interface FavoriteItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  stockLeft: number;
}

export interface AddressItem {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  line1: string;
  district: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  cardBrand: string;
  maskedNumber: string;
  expire: string;
  isDefault: boolean;
}

export type CouponStatus = "active" | "used" | "expired";

export interface CouponItem {
  id: string;
  code: string;
  title: string;
  discountText: string;
  expiresAt: string;
  status: CouponStatus;
}

export type RequestStatus = "new" | "in_review" | "resolved";

export interface SupportRequest {
  id: string;
  type: "return" | "support";
  status: RequestStatus;
  subject: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderTimelineStep {
  title: string;
  date: string;
  state: "completed" | "current" | "upcoming";
}

export const ACCOUNT_USER: AccountUser = {
  id: "u-001",
  firstName: "Ahmet",
  fullName: "Ahmet Yilmaz",
  email: "ahmet.yilmaz@example.com",
  phone: "+90 555 123 45 67",
  memberSince: "2024-08-15",
};

export const ACCOUNT_ORDERS: AccountOrder[] = [
  {
    id: "ERK-240224-1041",
    date: "2026-02-24",
    total: 10296,
    status: "preparing",
    trackingCode: "YK42919384TR",
    shippingCarrier: "Yurtici Kargo",
    invoiceUrl: "/documents/invoice-1041.pdf",
    canReturn: true,
    items: [
      {
        id: "it-001",
        slug: "nova-ses-sistemi",
        name: "Nova Ses Sistemi",
        quantity: 1,
        price: 8699,
      },
      {
        id: "it-002",
        slug: "atlas-pro-laptop",
        name: "Ses Bar Aparati",
        quantity: 1,
        price: 899,
      },
      {
        id: "it-006",
        slug: "aero-blender-set",
        name: "HDMI Kablo",
        quantity: 1,
        price: 299,
      },
      {
        id: "it-007",
        slug: "modo-ofis-koltugu",
        name: "Enerji Koruma Prizi",
        quantity: 1,
        price: 399,
      },
    ],
  },
  {
    id: "ERK-240221-1027",
    date: "2026-02-21",
    total: 6399,
    status: "shipped",
    trackingCode: "AR28742109TR",
    shippingCarrier: "Aras Kargo",
    invoiceUrl: "/documents/invoice-1027.pdf",
    canReturn: true,
    items: [
      {
        id: "it-003",
        slug: "modo-ofis-koltugu",
        name: "Modo Ofis Koltugu",
        quantity: 1,
        price: 6399,
      },
    ],
  },
  {
    id: "ERK-240214-0975",
    date: "2026-02-14",
    total: 4299,
    status: "delivered",
    trackingCode: "YK82571203TR",
    shippingCarrier: "Yurtici Kargo",
    invoiceUrl: "/documents/invoice-0975.pdf",
    canReturn: true,
    items: [
      {
        id: "it-004",
        slug: "vera-kahve-makinesi",
        name: "Vera Kahve Makinesi",
        quantity: 1,
        price: 4299,
      },
    ],
  },
  {
    id: "ERK-240203-0910",
    date: "2026-02-03",
    total: 1999,
    status: "received",
    trackingCode: "MN90281736TR",
    shippingCarrier: "MNG Kargo",
    invoiceUrl: "/documents/invoice-0910.pdf",
    canReturn: false,
    items: [
      {
        id: "it-005",
        slug: "aero-blender-set",
        name: "Aero Blender Set",
        quantity: 1,
        price: 1999,
      },
    ],
  },
];

export const FAVORITE_ITEMS: FavoriteItem[] = [
  {
    id: "fav-001",
    slug: "atlas-pro-laptop",
    name: "Atlas Pro Laptop",
    category: "Elektronik",
    price: 45999,
    inStock: true,
    stockLeft: 7,
  },
  {
    id: "fav-002",
    slug: "stride-kosu-bandi",
    name: "Stride Kosu Bandi",
    category: "Yasam",
    price: 17999,
    inStock: true,
    stockLeft: 4,
  },
  {
    id: "fav-003",
    slug: "aero-blender-set",
    name: "Aero Blender Set",
    category: "Ev",
    price: 1999,
    inStock: false,
    stockLeft: 0,
  },
  {
    id: "fav-004",
    slug: "nova-ses-sistemi",
    name: "Nova Ses Sistemi",
    category: "Elektronik",
    price: 8699,
    inStock: true,
    stockLeft: 12,
  },
];

export const ADDRESS_ITEMS: AddressItem[] = [
  {
    id: "adr-001",
    title: "Ev",
    fullName: "Ahmet Yilmaz",
    phone: "+90 555 123 45 67",
    line1: "Moda Mah. Caferaga Sok. No:14 D:7",
    district: "Kadikoy",
    city: "Istanbul",
    postalCode: "34710",
    isDefault: true,
  },
  {
    id: "adr-002",
    title: "Ofis",
    fullName: "Ahmet Yilmaz",
    phone: "+90 555 123 45 67",
    line1: "Nisbetiye Cad. No:40 Kat:3",
    district: "Besiktas",
    city: "Istanbul",
    postalCode: "34340",
    isDefault: false,
  },
  {
    id: "adr-003",
    title: "Aile Evi",
    fullName: "Mehmet Yilmaz",
    phone: "+90 532 987 44 10",
    line1: "Kurtulus Mah. 1253 Sok. No:11",
    district: "Konak",
    city: "Izmir",
    postalCode: "35240",
    isDefault: false,
  },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm-001",
    cardBrand: "Visa",
    maskedNumber: "**** **** **** 2718",
    expire: "09/28",
    isDefault: true,
  },
  {
    id: "pm-002",
    cardBrand: "Mastercard",
    maskedNumber: "**** **** **** 9934",
    expire: "11/27",
    isDefault: false,
  },
];

export const COUPON_ITEMS: CouponItem[] = [
  {
    id: "cp-001",
    code: "HOSGELDIN200",
    title: "Yeni uyeye ozel indirim",
    discountText: "200 TL indirim",
    expiresAt: "2026-03-31",
    status: "active",
  },
  {
    id: "cp-002",
    code: "MARTKARGO",
    title: "Ucretsiz kargo kuponu",
    discountText: "Kargo bedava",
    expiresAt: "2026-03-15",
    status: "active",
  },
  {
    id: "cp-003",
    code: "SEPET10",
    title: "Sepette ekstra indirim",
    discountText: "%10 indirim",
    expiresAt: "2026-01-10",
    status: "expired",
  },
];

export const SUPPORT_REQUESTS: SupportRequest[] = [
  {
    id: "TK-3112",
    type: "return",
    status: "in_review",
    subject: "Nova Ses Sistemi iade talebi",
    createdAt: "2026-02-22",
    updatedAt: "2026-02-23",
  },
  {
    id: "TK-3087",
    type: "support",
    status: "resolved",
    subject: "Garanti belgesi talebi",
    createdAt: "2026-02-11",
    updatedAt: "2026-02-12",
  },
  {
    id: "TK-3004",
    type: "support",
    status: "new",
    subject: "Adres degisikligi yardimi",
    createdAt: "2026-02-24",
    updatedAt: "2026-02-24",
  },
];

const ORDER_STATUS_META: Record<OrderStatus, { label: string; tone: "blue" | "amber" | "green" }> = {
  received: {
    label: "Siparis alindi",
    tone: "blue",
  },
  preparing: {
    label: "Hazirlaniyor",
    tone: "amber",
  },
  shipped: {
    label: "Kargoda",
    tone: "blue",
  },
  delivered: {
    label: "Teslim edildi",
    tone: "green",
  },
};

const COUPON_STATUS_META: Record<
  CouponStatus,
  { label: string; tone: "green" | "gray" }
> = {
  active: {
    label: "Aktif",
    tone: "green",
  },
  used: {
    label: "Kullanildi",
    tone: "gray",
  },
  expired: {
    label: "Suresi doldu",
    tone: "gray",
  },
};

const REQUEST_STATUS_META: Record<
  RequestStatus,
  { label: string; tone: "blue" | "amber" | "green" }
> = {
  new: {
    label: "Yeni",
    tone: "blue",
  },
  in_review: {
    label: "Incelemede",
    tone: "amber",
  },
  resolved: {
    label: "Sonuclandi",
    tone: "green",
  },
};

export function formatTry(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getOrderStatusMeta(status: OrderStatus) {
  return ORDER_STATUS_META[status];
}

export function getCouponStatusMeta(status: CouponStatus) {
  return COUPON_STATUS_META[status];
}

export function getRequestStatusMeta(status: RequestStatus) {
  return REQUEST_STATUS_META[status];
}

export function getAccountSummary() {
  const activeStatuses: OrderStatus[] = ["received", "preparing", "shipped"];

  return {
    totalOrders: ACCOUNT_ORDERS.length,
    activeOrders: ACCOUNT_ORDERS.filter((order) => activeStatuses.includes(order.status)).length,
    favorites: FAVORITE_ITEMS.length,
  };
}

export function getLatestOrder(): AccountOrder | undefined {
  return ACCOUNT_ORDERS[0];
}

export function getOrderById(orderId: string): AccountOrder | undefined {
  return ACCOUNT_ORDERS.find((order) => order.id === orderId);
}

export function getOrderTimeline(status: OrderStatus, orderDate: string): OrderTimelineStep[] {
  const steps = [
    { key: "received", title: "Siparis alindi" },
    { key: "preparing", title: "Hazirlandi" },
    { key: "shipped", title: "Kargoya verildi" },
    { key: "delivered", title: "Teslim edildi" },
  ] as const;

  const currentIndex = steps.findIndex((step) => step.key === status);

  return steps.map((step, index) => {
    if (index < currentIndex) {
      return {
        title: step.title,
        date: orderDate,
        state: "completed" as const,
      };
    }

    if (index === currentIndex) {
      return {
        title: step.title,
        date: orderDate,
        state: "current" as const,
      };
    }

    return {
      title: step.title,
      date: "Bekliyor",
      state: "upcoming" as const,
    };
  });
}
