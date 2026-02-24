"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { SparklesIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/Button";
import { PRODUCTS } from "@/lib/constants";
import { formatTry } from "@/lib/format";

type FallingBall = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  blur: number;
  drift: number;
  opacity: number;
  color: string;
  radius: string;
};

type HeroStar = {
  id: number;
  left: number;
  top: number;
  size: number;
  opacity: number;
  blur: number;
  delay: number;
};

const FALLING_BALLS: FallingBall[] = [
  { id: 1, left: 4, size: 10, delay: 0.0, duration: 0.92, blur: 0.2, drift: -12, opacity: 0.86, color: "#ef4444", radius: "50%" },
  { id: 2, left: 10, size: 14, delay: 0.04, duration: 0.98, blur: 0.5, drift: 16, opacity: 0.82, color: "#dc2626", radius: "56% 44% 50% 50%" },
  { id: 3, left: 16, size: 8, delay: 0.07, duration: 0.9, blur: 0.6, drift: 10, opacity: 0.76, color: "#f87171", radius: "48% 52% 51% 49%" },
  { id: 4, left: 24, size: 16, delay: 0.1, duration: 1.02, blur: 0.9, drift: -18, opacity: 0.74, color: "#ef4444", radius: "52% 48% 46% 54%" },
  { id: 5, left: 31, size: 12, delay: 0.12, duration: 0.96, blur: 0.4, drift: 13, opacity: 0.84, color: "#dc2626", radius: "50%" },
  { id: 6, left: 37, size: 9, delay: 0.15, duration: 0.9, blur: 0.3, drift: -9, opacity: 0.78, color: "#f87171", radius: "50% 47% 53% 50%" },
  { id: 7, left: 45, size: 14, delay: 0.17, duration: 1.04, blur: 0.8, drift: 18, opacity: 0.76, color: "#ef4444", radius: "47% 53% 50% 50%" },
  { id: 8, left: 52, size: 7, delay: 0.2, duration: 0.86, blur: 0.5, drift: -12, opacity: 0.7, color: "#f87171", radius: "50%" },
  { id: 9, left: 58, size: 11, delay: 0.22, duration: 0.92, blur: 0.35, drift: 9, opacity: 0.82, color: "#dc2626", radius: "52% 48% 50% 50%" },
  { id: 10, left: 65, size: 15, delay: 0.24, duration: 1.04, blur: 1, drift: -15, opacity: 0.72, color: "#ef4444", radius: "54% 46% 52% 48%" },
  { id: 11, left: 72, size: 9, delay: 0.27, duration: 0.9, blur: 0.4, drift: 10, opacity: 0.78, color: "#f87171", radius: "50%" },
  { id: 12, left: 79, size: 13, delay: 0.3, duration: 0.98, blur: 0.6, drift: -13, opacity: 0.74, color: "#dc2626", radius: "47% 53% 48% 52%" },
  { id: 13, left: 85, size: 8, delay: 0.33, duration: 0.88, blur: 0.45, drift: 11, opacity: 0.73, color: "#f87171", radius: "50%" },
  { id: 14, left: 91, size: 11, delay: 0.35, duration: 0.95, blur: 0.35, drift: -10, opacity: 0.84, color: "#ef4444", radius: "55% 45% 49% 51%" },
  { id: 15, left: 96, size: 10, delay: 0.38, duration: 0.94, blur: 0.3, drift: 8, opacity: 0.8, color: "#dc2626", radius: "50%" },
];

const HERO_STARS: HeroStar[] = [
  { id: 1, left: 8, top: 12, size: 4, opacity: 0.4, blur: 0, delay: 0 },
  { id: 2, left: 13, top: 36, size: 6, opacity: 0.3, blur: 0.3, delay: 0.2 },
  { id: 3, left: 18, top: 20, size: 5, opacity: 0.35, blur: 0, delay: 0.5 },
  { id: 4, left: 26, top: 8, size: 6, opacity: 0.25, blur: 0.4, delay: 0.7 },
  { id: 5, left: 34, top: 24, size: 4, opacity: 0.35, blur: 0, delay: 0.1 },
  { id: 6, left: 45, top: 15, size: 7, opacity: 0.22, blur: 0.5, delay: 0.6 },
  { id: 7, left: 52, top: 35, size: 5, opacity: 0.34, blur: 0, delay: 0.9 },
  { id: 8, left: 59, top: 9, size: 4, opacity: 0.28, blur: 0, delay: 0.3 },
  { id: 9, left: 67, top: 28, size: 6, opacity: 0.3, blur: 0.3, delay: 0.4 },
  { id: 10, left: 74, top: 12, size: 5, opacity: 0.38, blur: 0, delay: 0.8 },
  { id: 11, left: 82, top: 34, size: 7, opacity: 0.25, blur: 0.5, delay: 0.2 },
  { id: 12, left: 90, top: 22, size: 5, opacity: 0.32, blur: 0, delay: 1.1 },
];

const BALL_TRIGGER_SCROLL = 36;
const HERO_COMPACT_SCROLL = 70;
const MINI_HERO_TRIGGER_SCROLL = 230;

const ProductViewer3D = dynamic(
  () => import("@/components/product/ProductViewer3D").then((module) => module.ProductViewer3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[240px] items-center justify-center bg-[radial-gradient(circle_at_top,_#fff7f8,_#ffe4e6,_#fff1f2)] text-xs font-semibold text-[color:var(--color-muted)]">
        3D sahne yukleniyor...
      </div>
    ),
  },
);

export function Banner() {
  const banner3dProducts = useMemo(() => PRODUCTS.filter((product) => product.has3d).slice(0, 4), []);

  const [scrollY, setScrollY] = useState(0);
  const [showBallBurst, setShowBallBurst] = useState(false);
  const [ballBurstKey, setBallBurstKey] = useState(0);
  const [active3dSlug, setActive3dSlug] = useState(banner3dProducts[0]?.slug ?? "atlas-pro-laptop");

  const crossedThresholdRef = useRef(false);
  const burstTimeoutRef = useRef<number | null>(null);

  const active3dProduct =
    banner3dProducts.find((product) => product.slug === active3dSlug) ?? banner3dProducts[0] ?? null;

  useEffect(() => {
    const triggerBallBurst = () => {
      if (burstTimeoutRef.current) {
        window.clearTimeout(burstTimeoutRef.current);
      }

      setBallBurstKey((prev) => prev + 1);
      setShowBallBurst(true);

      burstTimeoutRef.current = window.setTimeout(() => {
        setShowBallBurst(false);
      }, 1120);
    };

    const handleScroll = () => {
      const nextY = window.scrollY;
      setScrollY(nextY);

      const passedTrigger = nextY > BALL_TRIGGER_SCROLL;

      if (passedTrigger && !crossedThresholdRef.current) {
        crossedThresholdRef.current = true;
        triggerBallBurst();
      }

      if (!passedTrigger) {
        crossedThresholdRef.current = false;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (burstTimeoutRef.current) {
        window.clearTimeout(burstTimeoutRef.current);
      }
    };
  }, []);

  const compactHero = scrollY > HERO_COMPACT_SCROLL;
  const showMiniHero = scrollY > MINI_HERO_TRIGGER_SCROLL;

  return (
    <div className="relative mb-10 -mt-8">
      <section
        className={[
          "brand-hero-grain brand-hero-stars relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-[color:var(--color-border)]",
          "bg-[radial-gradient(circle_at_top_right,_#fde7eb_0%,_#fff4f6_40%,_#ffffff_78%)]",
          "transition-[min-height,padding] duration-500",
          compactHero ? "min-h-[430px] px-4 py-7" : "min-h-[calc(100vh-7.2rem)] px-4 py-10",
        ].join(" ")}
      >
        <div className="pointer-events-none absolute -right-28 top-8 h-56 w-56 rounded-full bg-[#fca5a5]/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-28 -top-10 h-64 w-64 rounded-full bg-[#fecdd3]/45 blur-3xl" />

        <div className="pointer-events-none absolute inset-0 z-[5]">
          {HERO_STARS.map((star) => (
            <span
              key={`hero-star-${star.id}`}
              className="brand-hero-star absolute"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                filter: `blur(${star.blur}px)`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute right-6 top-6 z-20 hidden items-center gap-2 rounded-full border border-[#f5b8c1] bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)] md:inline-flex">
          <SparklesIcon className="size-4" /> ERLER AVM KAMPANYA
        </div>

        {showBallBurst ? (
          <div key={ballBurstKey} className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-56 overflow-hidden">
            {FALLING_BALLS.map((ball) => (
              <span
                key={`ball-${ballBurstKey}-${ball.id}`}
                className="brand-falling-ball absolute top-0"
                style={{
                  left: `${ball.left}%`,
                  width: `${ball.size}px`,
                  height: `${ball.size}px`,
                  borderRadius: ball.radius,
                  opacity: ball.opacity,
                  filter: `blur(${ball.blur}px)`,
                  background: ball.color,
                  boxShadow: "0 8px 18px rgba(217,15,35,0.22)",
                  animationDelay: `${ball.delay}s`,
                  animationDuration: `${ball.duration}s`,
                  ["--ball-drift" as string]: `${ball.drift}px`,
                }}
              />
            ))}
          </div>
        ) : null}

        <div className="container relative z-10 grid gap-8 xl:grid-cols-[1.2fr_0.92fr] xl:items-center">
          <div
            className={[
              "will-change-transform transition-all duration-500",
              compactHero ? "translate-y-[-8px] opacity-95" : "translate-y-0 opacity-100",
            ].join(" ")}
          >
            <p className="inline-flex items-center gap-1 rounded-full border border-[#f5b8c1] bg-white/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-primary)]">
              <SparklesIcon className="size-4" /> ERLER AVM KAMPANYA
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-[color:var(--color-foreground)] md:text-5xl">
              Premium kampanya haftasi ve modern e-ticaret deneyimi
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-[color:var(--color-muted)] md:text-base">
              Banner alani mat yildizli premium zeminde 3D urun vitriniyle calisir. Kampanya urunlerini hizli inceleyip
              tek tikla detay sayfasina gecebilirsiniz.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/products">
                <Button className="h-11 px-6 text-white">Urunlere Git</Button>
              </Link>
              <Link href="/products?campaign=flash">
                <Button variant="secondary" className="h-11 px-6">
                  Kampanyalari Gor
                </Button>
              </Link>
            </div>
          </div>

          <aside
            className={[
              "will-change-transform rounded-3xl border border-[color:var(--color-border)] bg-white/88 p-5 shadow-[0_20px_36px_rgba(15,23,42,0.12)] backdrop-blur-sm transition-all duration-500",
              compactHero ? "translate-y-[6px] opacity-95" : "translate-y-0 opacity-100",
            ].join(" ")}
          >
            {active3dProduct ? (
              <div className="rounded-2xl border border-[color:var(--color-border)] bg-[linear-gradient(145deg,_#fff8f8,_#ffffff)] p-3">
                <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-primary)]">
                  <SparklesIcon className="size-4" /> Banner 3D Urun Vitrini
                </p>
                <div className="mt-3 overflow-hidden rounded-xl border border-[color:var(--color-border)]">
                  <ProductViewer3D productSlug={active3dProduct.slug} className="h-[240px]" />
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-[color:var(--color-foreground)]">{active3dProduct.name}</p>
                    <p className="text-xs text-[color:var(--color-muted)]">{active3dProduct.category}</p>
                  </div>
                  <p className="text-sm font-bold text-[color:var(--color-primary)]">{formatTry(active3dProduct.price)}</p>
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                  {banner3dProducts.map((product) => (
                    <button
                      key={`banner-3d-${product.slug}`}
                      type="button"
                      onClick={() => setActive3dSlug(product.slug)}
                      className={[
                        "rounded-lg border px-2 py-2 text-left text-xs font-semibold transition",
                        active3dSlug === product.slug
                          ? "border-[color:var(--color-primary)] bg-[#ffe4e6] text-[color:var(--color-primary)]"
                          : "border-[color:var(--color-border)] bg-white hover:border-[color:var(--color-primary)]",
                      ].join(" ")}
                    >
                      {product.name}
                    </button>
                  ))}
                </div>

                <Link href={`/products/${active3dProduct.slug}`} className="mt-3 inline-flex w-full">
                  <Button className="h-10 w-full text-white">3D Urunu Incele</Button>
                </Link>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      <div
        className={[
          "pointer-events-none fixed inset-x-0 z-[65] transition-all duration-300",
          showMiniHero ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
        ].join(" ")}
        style={{ top: "6.6rem" }}
      >
        <div className="container pointer-events-auto">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-[color:var(--color-border)] bg-white/95 px-4 py-3 shadow-[0_14px_30px_rgba(15,23,42,0.14)] backdrop-blur-md">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                Mini Hero
              </p>
              <p className="text-sm font-bold text-[color:var(--color-foreground)] md:text-base">
                ERLER AVM kampanya urunleri ile hizli ve guvenli alisveris
              </p>
            </div>

            <Link href="/products">
              <Button className="h-10 px-4 text-white">Urunlere Git</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
