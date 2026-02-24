"use client";

import {
  CreditCardIcon,
  HeartIcon,
  HomeIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  RectangleStackIcon,
  TicketIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";

type SidebarItem = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/account",
    icon: HomeIcon,
  },
  {
    label: "Siparislerim",
    href: "/account/orders",
    icon: RectangleStackIcon,
  },
  {
    label: "Favorilerim",
    href: "/account/favorites",
    icon: HeartIcon,
  },
  {
    label: "Adreslerim",
    href: "/account/addresses",
    icon: MapPinIcon,
  },
  {
    label: "Hesap Bilgilerim",
    href: "/account/profile",
    icon: UserCircleIcon,
  },
  {
    label: "Odeme Yontemlerim",
    href: "/account/payments",
    icon: CreditCardIcon,
  },
  {
    label: "Kuponlarim",
    href: "/account/coupons",
    icon: TicketIcon,
  },
  {
    label: "Iade ve Talepler",
    href: "/account/returns",
    icon: QuestionMarkCircleIcon,
  },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/account") {
    return pathname === "/account";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-3xl border border-[color:var(--color-border)] bg-white p-4 shadow-[0_14px_30px_rgba(15,23,42,0.05)]">
      <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">Hesabim</p>
      <nav className="grid gap-1">
        {sidebarItems.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                active
                  ? "bg-[color:var(--color-primary)] text-white shadow-[0_8px_18px_rgba(217,15,35,0.24)]"
                  : "text-[color:var(--color-foreground)] hover:bg-[color:var(--color-background)] hover:text-[color:var(--color-primary)]",
              ].join(" ")}
            >
              <Icon className="size-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 rounded-2xl border border-[color:var(--color-border)] bg-[#fff8f8] p-3 text-xs text-[color:var(--color-muted)]">
        Siparisleriniz ve kisisel bilgileriniz guvenli altyapida saklanir.
      </div>
    </aside>
  );
}
