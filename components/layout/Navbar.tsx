"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ComponentType, SVGProps } from "react";

import {
  Bars3Icon,
  BuildingOffice2Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  FireIcon,
  HomeIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { type MenuItem, getActiveMenuItems } from "@/lib/constants";

import { NavSearch } from "@/components/layout/NavSearch";

type MenuIcon = ComponentType<SVGProps<SVGSVGElement>>;

const menuIconMap: Record<string, MenuIcon> = {
  home: HomeIcon,
  products: Squares2X2Icon,
  campaigns: FireIcon,
  corporate: BuildingOffice2Icon,
};

function hasSubmenu(item: MenuItem): boolean {
  if (item.type === "mega") {
    return Boolean(item.mega?.columns.length);
  }

  if (item.type === "dropdown" || item.type === "corporate") {
    return Boolean(item.children?.length);
  }

  return false;
}

function isCurrentPath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const compactNav = scrolled;

  const items = useMemo(
    () => getActiveMenuItems().filter((item) => item.id !== "account"),
    [],
  );

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={[
        "sticky top-0 z-50 transition-all duration-300",
        isHome && !compactNav
          ? "border-b border-transparent bg-white/75 backdrop-blur-md"
          : "border-b border-[color:var(--color-border)] bg-white/96 shadow-[0_8px_18px_rgba(15,23,42,0.08)] backdrop-blur-md",
      ].join(" ")}
    >
      <div className={["container transition-all duration-300", compactNav ? "py-2" : "py-3"].join(" ")}>
        <div className="flex items-center gap-2">
          <Link href="/" className="inline-flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-[#fff4f4]">
            <Image
              src="/logo/erler-logo.png"
              alt="ERLER AVM logo"
              width={42}
              height={42}
              className="h-11 w-11 object-contain"
            />
            <div className="hidden sm:block">
              <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">ERLER AVM</p>
              <p className="text-sm font-bold text-[color:var(--color-primary)]">Kırmızı-Beyaz Alışveriş</p>
            </div>
          </Link>

          <NavSearch className="ml-1 hidden flex-1 lg:block" />

          <div className="ml-auto flex items-center gap-1">
            <Link
              href="/account"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-10 items-center gap-1 rounded-xl border border-[color:var(--color-border)] bg-white px-3 text-sm font-semibold hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
            >
              <UserCircleIcon className="size-5" />
              <span className="hidden sm:inline">Hesabım</span>
            </Link>

            <Link
              href="/cart"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-10 items-center gap-1 rounded-xl bg-[color:var(--color-primary)] px-3 text-sm font-semibold text-white hover:bg-[color:var(--color-primary-strong)]"
            >
              <ShoppingBagIcon className="size-5" />
              <span className="hidden sm:inline">Sepet</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--color-border)] text-[color:var(--color-muted)] md:hidden"
              aria-label="Mobil menüyü aç"
            >
              {mobileOpen ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
            </button>
          </div>
        </div>

        <NavSearch className="mt-3 lg:hidden" />

        <div className="mt-3 hidden rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] px-2 py-1 md:block">
          <ul className="flex min-h-12 flex-wrap items-center gap-1">
            {items.map((item) => {
              const Icon = menuIconMap[item.id] ?? Squares2X2Icon;
              const isOpen = openMenuId === item.id;
              const itemHasSubmenu = hasSubmenu(item);
              const active = isCurrentPath(pathname, item.href);
              const panelVisibilityClass = isOpen
                ? "visible translate-y-0 opacity-100 pointer-events-auto"
                : "invisible -translate-y-2 opacity-0 pointer-events-none";

              return (
                <li
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => {
                    if (itemHasSubmenu) {
                      setOpenMenuId(item.id);
                    }
                  }}
                  onMouseLeave={() => {
                    if (itemHasSubmenu) {
                      setOpenMenuId((current) => (current === item.id ? null : current));
                    }
                  }}
                >
                  <div className="flex items-center gap-1">
                    <Link
                      href={item.href}
                      className={[
                        "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition",
                        "hover:bg-white hover:text-[color:var(--color-primary)]",
                        active ? "bg-white text-[color:var(--color-primary)]" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => setOpenMenuId(null)}
                    >
                      <Icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>

                    {itemHasSubmenu ? (
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-[color:var(--color-muted)] transition hover:bg-white hover:text-[color:var(--color-primary)]"
                        aria-label={`${item.title} alt menüsü`}
                        aria-expanded={isOpen}
                        onClick={() => setOpenMenuId((current) => (current === item.id ? null : item.id))}
                      >
                        <ChevronDownIcon
                          className={[
                            "size-4 transition-transform duration-200",
                            isOpen ? "rotate-180 text-[color:var(--color-primary)]" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        />
                      </button>
                    ) : null}
                  </div>

                  {item.type === "dropdown" || item.type === "corporate" ? (
                    item.children?.length ? (
                      <div
                        className={[
                          "absolute left-0 top-[calc(100%+0.4rem)] z-[120] w-64 rounded-2xl border border-[color:var(--color-border)] bg-white p-2 shadow-[0_18px_32px_rgba(15,23,42,0.12)]",
                          "origin-top transition-all duration-200 ease-out",
                          panelVisibilityClass,
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={`${item.id}-${child.title}-${child.href}-${childIndex}`}
                            href={child.href}
                            className="flex items-center justify-between rounded-xl px-3 py-2 text-sm transition hover:bg-[#fff4f4]"
                            onClick={() => setOpenMenuId(null)}
                          >
                            <span>{child.title}</span>
                            <ChevronRightIcon className="size-4 text-[color:var(--color-muted)]" />
                          </Link>
                        ))}
                      </div>
                    ) : null
                  ) : null}

                  {item.type === "mega" && item.mega?.columns.length ? (
                    <div
                      className={[
                        "absolute left-0 top-[calc(100%+0.4rem)] z-[120] w-[min(92vw,820px)] rounded-2xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_22px_36px_rgba(15,23,42,0.14)]",
                        "origin-top transition-all duration-200 ease-out",
                        panelVisibilityClass,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <div className="grid gap-4 md:grid-cols-3">
                        {item.mega.columns.map((column, columnIndex) => (
                          <div key={`${item.id}-${column.title}-${columnIndex}`}>
                            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[color:var(--color-muted)]">
                              {column.title}
                            </p>
                            <div className="grid gap-1">
                              {column.links.map((link, linkIndex) => (
                                <Link
                                  key={`${item.id}-${column.title}-${link.title}-${link.href}-${linkIndex}`}
                                  href={link.href}
                                  className="flex items-center justify-between rounded-xl px-3 py-2 text-sm transition hover:bg-[#fff4f4]"
                                  onClick={() => setOpenMenuId(null)}
                                >
                                  <span>{link.title}</span>
                                  <ChevronRightIcon className="size-4 text-[color:var(--color-muted)]" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>

        {mobileOpen ? (
          <div className="mt-3 rounded-2xl border border-[color:var(--color-border)] bg-white p-3 shadow-[0_16px_28px_rgba(15,23,42,0.08)] md:hidden">
            <div className="grid gap-1">
              {items.map((item) => {
                const itemHasSubmenu = hasSubmenu(item);
                const isExpanded = Boolean(mobileExpanded[item.id]);

                return (
                  <div key={`mobile-${item.id}`} className="rounded-xl border border-[color:var(--color-border)] bg-[#fffafa]">
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        className="flex-1 px-3 py-2 text-sm font-semibold"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.title}
                      </Link>

                      {itemHasSubmenu ? (
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpanded((current) => ({
                              ...current,
                              [item.id]: !current[item.id],
                            }))
                          }
                          className="inline-flex h-10 w-10 items-center justify-center"
                          aria-label="Alt menüyü aç"
                        >
                          <ChevronDownIcon
                            className={[
                              "size-4 transition-transform",
                              isExpanded ? "rotate-180" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          />
                        </button>
                      ) : null}
                    </div>

                    {isExpanded && item.type === "mega" && item.mega?.columns.length ? (
                      <div className="space-y-3 border-t border-[color:var(--color-border)] px-3 py-2">
                        {item.mega.columns.map((column) => (
                          <div key={`mobile-col-${column.title}`}>
                            <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-muted)]">
                              {column.title}
                            </p>
                            <div className="mt-1 grid gap-1">
                              {column.links.map((link, linkIndex) => (
                                <Link
                                  key={`mobile-link-${column.title}-${link.title}-${linkIndex}`}
                                  href={link.href}
                                  className="rounded-lg px-2 py-1 text-sm text-[color:var(--color-foreground)]"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {link.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {isExpanded && (item.type === "dropdown" || item.type === "corporate") && item.children?.length ? (
                      <div className="grid gap-1 border-t border-[color:var(--color-border)] px-3 py-2">
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={`mobile-child-${item.id}-${child.title}-${childIndex}`}
                            href={child.href}
                            className="rounded-lg px-2 py-1 text-sm text-[color:var(--color-foreground)]"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
