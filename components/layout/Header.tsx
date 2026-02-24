"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 26);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-[80] transition-all duration-300",
        isHome && !scrolled
          ? "border-b border-transparent bg-white/72 backdrop-blur-md"
          : "border-b border-[color:var(--color-border)] bg-white/95 shadow-[0_8px_18px_rgba(15,23,42,0.08)] backdrop-blur-lg",
      ].join(" ")}
    >
      <div
        className={[
          "container flex flex-wrap items-center justify-between gap-2 text-xs text-[color:var(--color-muted)] transition-all duration-300 sm:text-sm",
          scrolled ? "min-h-8" : "min-h-10",
        ].join(" ")}
      >
        <p className="font-medium">7/24 Musteri Destegi: 0850 000 00 00</p>
        <div className="flex items-center gap-3">
          <Link href="/corporate/kargo-ve-teslimat" className="font-semibold hover:text-[color:var(--color-primary)]">
            Ayni Gun Kargo
          </Link>
          <Link
            href="/corporate/iade-politikasi"
            className="hidden font-semibold hover:text-[color:var(--color-primary)] sm:inline-flex"
          >
            14 Gun Iade
          </Link>
        </div>
      </div>
    </header>
  );
}
