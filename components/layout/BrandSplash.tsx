"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SPLASH_STORAGE_KEY = "erler_brand_splash_seen_v2";

export function BrandSplash() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      if (window.sessionStorage.getItem(SPLASH_STORAGE_KEY) === "1") {
        setVisible(false);
      }
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const fadeTimer = window.setTimeout(() => setFadeOut(true), 1300);
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      window.sessionStorage.setItem(SPLASH_STORAGE_KEY, "1");
    }, 1500);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={[
        "fixed inset-0 z-[200] flex items-center justify-center bg-white",
        fadeOut ? "brand-splash-fade-out" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Marka yukleme ekrani"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-24 w-24 overflow-hidden rounded-xl">
          <Image
            src="/logo/erler-logo.png"
            alt="ERLER AVM"
            fill
            sizes="96px"
            className="object-contain opacity-25"
            priority
          />
          <div className="brand-splash-fill absolute inset-0">
            <Image
              src="/logo/erler-logo.png"
              alt="ERLER AVM"
              fill
              sizes="96px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-primary)]">
          Kirmizi-Beyaz Alisveris
        </p>
      </div>
    </div>
  );
}
