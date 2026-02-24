import { ADDRESS_ITEMS, PAYMENT_METHODS } from "@/lib/account";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  variant: string;
  unitPrice: number;
  quantity: number;
  stockLeft: number;
  savedForLater: boolean;
}

export type ShippingMethod = "standard" | "fast";

export type PaymentMethodType = "card" | "cod" | "eft";

export type InvoiceType = "individual" | "corporate";

export interface CouponResult {
  valid: boolean;
  amount: number;
  message: string;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export const FREE_SHIPPING_THRESHOLD = 60000;
export const DEFAULT_SHIPPING_FEE = 89;

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: "ci-001",
    slug: "atlas-pro-laptop",
    name: "Atlas Pro Laptop",
    variant: "Uzay Grisi / 16 GB / 512 GB",
    unitPrice: 45999,
    quantity: 1,
    stockLeft: 7,
    savedForLater: false,
  },
  {
    id: "ci-002",
    slug: "nova-ses-sistemi",
    name: "Nova Ses Sistemi",
    variant: "Antrasit / Standart Paket",
    unitPrice: 8699,
    quantity: 1,
    stockLeft: 3,
    savedForLater: false,
  },
  {
    id: "ci-003",
    slug: "aero-blender-set",
    name: "Aero Blender Set",
    variant: "Krem / XL",
    unitPrice: 1999,
    quantity: 1,
    stockLeft: 18,
    savedForLater: false,
  },
];

export const CHECKOUT_SHIPPING_METHODS: Array<{
  id: ShippingMethod;
  title: string;
  description: string;
  fee: number;
}> = [
  {
    id: "standard",
    title: "Standart Teslimat",
    description: "1-3 is gunu",
    fee: 0,
  },
  {
    id: "fast",
    title: "Hizli Teslimat",
    description: "Ayni gun cikis / ertesi gun teslim",
    fee: 79,
  },
];

export const CHECKOUT_PAYMENT_TABS: Array<{
  id: PaymentMethodType;
  title: string;
  description: string;
}> = [
  {
    id: "card",
    title: "Kredi Karti",
    description: "3D Secure ile guvenli odeme",
  },
  {
    id: "cod",
    title: "Kapida Odeme",
    description: "Teslimatta nakit veya kart",
  },
  {
    id: "eft",
    title: "Havale / EFT",
    description: "24 saat icinde odeme onayi",
  },
];

export function formatTry(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getInitialCartItems(): CartItem[] {
  return INITIAL_CART_ITEMS.map((item) => ({ ...item }));
}

export function applyCoupon(code: string, subtotal: number): CouponResult {
  const normalized = code.trim().toUpperCase();

  if (!normalized) {
    return {
      valid: false,
      amount: 0,
      message: "Kupon kodu bos olamaz.",
    };
  }

  if (normalized === "HOSGELDIN200") {
    return {
      valid: true,
      amount: Math.min(200, subtotal),
      message: "Kupon uygulandi: 200 TL indirim.",
    };
  }

  if (normalized === "SEPET10") {
    return {
      valid: true,
      amount: Math.min(Math.round(subtotal * 0.1), 1000),
      message: "Kupon uygulandi: %10 indirim.",
    };
  }

  if (normalized === "MARTKARGO") {
    return {
      valid: true,
      amount: 0,
      message: "Kupon uygulandi: Kargo ucretsiz.",
    };
  }

  return {
    valid: false,
    amount: 0,
    message: "Kupon gecersiz veya suresi dolmus.",
  };
}

export function calculateShipping(subtotal: number, method: ShippingMethod, couponCode?: string): number {
  const normalized = couponCode?.trim().toUpperCase() ?? "";

  if (subtotal >= FREE_SHIPPING_THRESHOLD || normalized === "MARTKARGO") {
    return 0;
  }

  if (method === "fast") {
    return DEFAULT_SHIPPING_FEE + 79;
  }

  return DEFAULT_SHIPPING_FEE;
}

export function calculateCartTotals(
  items: CartItem[],
  discount: number,
  method: ShippingMethod,
  couponCode?: string,
): CartTotals {
  const subtotal = items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  const shipping = calculateShipping(subtotal, method, couponCode);
  const total = Math.max(subtotal - discount + shipping, 0);

  return {
    subtotal,
    discount,
    shipping,
    total,
  };
}

export function amountForFreeShipping(subtotal: number): number {
  return Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
}

export function getDefaultAddressId(): string {
  return ADDRESS_ITEMS.find((address) => address.isDefault)?.id ?? ADDRESS_ITEMS[0]?.id ?? "";
}

export function getDefaultCardId(): string {
  return PAYMENT_METHODS.find((card) => card.isDefault)?.id ?? PAYMENT_METHODS[0]?.id ?? "";
}

export function createMockOrderNumber(): string {
  const date = new Date();
  const y = date.getFullYear().toString().slice(-2);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const random = String(Math.floor(1000 + Math.random() * 9000));

  return `ERK-${y}${m}${d}-${random}`;
}
