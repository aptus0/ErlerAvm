"use client";

import {
  BuildingOffice2Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  FireIcon,
  HomeIcon,
  Squares2X2Icon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ComponentType, SVGProps } from "react";

import { getActiveMenuItems, type MenuItem } from "@/lib/constants";

type MenuIcon = ComponentType<SVGProps<SVGSVGElement>>;

const menuIconMap: Record<string, MenuIcon> = {
  home: HomeIcon,
  products: Squares2X2Icon,
  campaigns: FireIcon,
  corporate: BuildingOffice2Icon,
  account: UserCircleIcon,
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
  const items = getActiveMenuItems();
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  return (
    <nav ref={navRef} className="relative z-30 border-b border-[color:var(--color-border)] bg-white">
      <div className="container">
        <ul className="flex min-h-14 flex-wrap items-center gap-1 py-2">
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
                      "hover:bg-[color:var(--color-background)] hover:text-[color:var(--color-primary)]",
                      active ? "bg-[color:var(--color-background)] text-[color:var(--color-primary)]" : "",
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
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-[color:var(--color-muted)] transition hover:bg-[color:var(--color-background)] hover:text-[color:var(--color-primary)]"
                      aria-label={`${item.title} alt menusu`}
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenMenuId((current) => (current === item.id ? null : item.id))
                      }
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
                        "absolute left-0 top-[calc(100%+0.35rem)] z-40 w-64 rounded-2xl border border-[color:var(--color-border)] bg-white p-2 shadow-xl",
                        "origin-top transition-all duration-200 ease-out",
                        panelVisibilityClass,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={`${item.id}-${child.href}`}
                          href={child.href}
                          className="flex items-center justify-between rounded-xl px-3 py-2 text-sm transition hover:bg-[color:var(--color-background)]"
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
                      "absolute left-0 top-[calc(100%+0.35rem)] z-40 w-[min(92vw,760px)] rounded-2xl border border-[color:var(--color-border)] bg-white p-5 shadow-xl",
                      "origin-top transition-all duration-200 ease-out",
                      panelVisibilityClass,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <div className="grid gap-4 md:grid-cols-3">
                      {item.mega.columns.map((column) => (
                        <div key={`${item.id}-${column.title}`}>
                          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[color:var(--color-muted)]">
                            {column.title}
                          </p>
                          <div className="grid gap-1">
                            {column.links.map((link) => (
                              <Link
                                key={`${item.id}-${link.href}`}
                                href={link.href}
                                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm transition hover:bg-[color:var(--color-background)]"
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
    </nav>
  );
}
