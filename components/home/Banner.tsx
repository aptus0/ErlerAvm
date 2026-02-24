"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
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
  color: string;
};

type CinematicPopBall = {
  id: number;
  left: number;
  size: number;
  delay: number;
  drift: number;
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

const CINEMATIC_POP_BALLS: CinematicPopBall[] = [
  { id: 1, left: 39, size: 8, delay: 0.02, drift: -14 },
  { id: 2, left: 44, size: 11, delay: 0.08, drift: -7 },
  { id: 3, left: 49, size: 7, delay: 0.12, drift: 2 },
  { id: 4, left: 54, size: 10, delay: 0.18, drift: 9 },
  { id: 5, left: 59, size: 9, delay: 0.24, drift: 15 },
];

const HERO_STARS: HeroStar[] = [
  { id: 1, left: 8, top: 12, size: 4, opacity: 0.4, blur: 0, delay: 0, color: "rgba(252, 211, 77, 0.95)" },
  { id: 2, left: 13, top: 36, size: 6, opacity: 0.3, blur: 0.3, delay: 0.2, color: "rgba(251, 191, 36, 0.9)" },
  { id: 3, left: 18, top: 20, size: 5, opacity: 0.35, blur: 0, delay: 0.5, color: "rgba(254, 243, 199, 0.94)" },
  { id: 4, left: 26, top: 8, size: 6, opacity: 0.25, blur: 0.4, delay: 0.7, color: "rgba(245, 158, 11, 0.88)" },
  { id: 5, left: 34, top: 24, size: 4, opacity: 0.35, blur: 0, delay: 0.1, color: "rgba(252, 211, 77, 0.92)" },
  { id: 6, left: 45, top: 15, size: 7, opacity: 0.22, blur: 0.5, delay: 0.6, color: "rgba(251, 191, 36, 0.84)" },
  { id: 7, left: 52, top: 35, size: 5, opacity: 0.34, blur: 0, delay: 0.9, color: "rgba(254, 240, 138, 0.9)" },
  { id: 8, left: 59, top: 9, size: 4, opacity: 0.28, blur: 0, delay: 0.3, color: "rgba(245, 158, 11, 0.9)" },
  { id: 9, left: 67, top: 28, size: 6, opacity: 0.3, blur: 0.3, delay: 0.4, color: "rgba(252, 211, 77, 0.92)" },
  { id: 10, left: 74, top: 12, size: 5, opacity: 0.38, blur: 0, delay: 0.8, color: "rgba(254, 243, 199, 0.95)" },
  { id: 11, left: 82, top: 34, size: 7, opacity: 0.25, blur: 0.5, delay: 0.2, color: "rgba(251, 191, 36, 0.85)" },
  { id: 12, left: 90, top: 22, size: 5, opacity: 0.32, blur: 0, delay: 1.1, color: "rgba(245, 158, 11, 0.9)" },
];

const BALL_TRIGGER_SCROLL = 36;
const HERO_COMPACT_SCROLL = 70;
const MINI_HERO_TRIGGER_SCROLL = 230;
const CINEMATIC_STORAGE_KEY = "erler_banner_cinematic_seen_v1";

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

  const hero3dRef = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [showBallBurst, setShowBallBurst] = useState(false);
  const [ballBurstKey, setBallBurstKey] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [enableMotionFx, setEnableMotionFx] = useState(false);
  const [render3dViewer, setRender3dViewer] = useState(false);
  const [showCinematicIntro, setShowCinematicIntro] = useState(true);
  const [cinematicStep, setCinematicStep] = useState<1 | 2 | 3 | 4>(1);
  const [cinematicFadeOut, setCinematicFadeOut] = useState(false);
  const [active3dSlug, setActive3dSlug] = useState(banner3dProducts[0]?.slug ?? "atlas-pro-laptop");

  const crossedThresholdRef = useRef(false);
  const burstTimeoutRef = useRef<number | null>(null);

  const active3dProduct =
    banner3dProducts.find((product) => product.slug === active3dSlug) ?? banner3dProducts[0] ?? null;

  useEffect(() => {
    const reduceMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePerformanceMode = () => {
      window.requestAnimationFrame(() => {
        const desktop = window.innerWidth >= 1024;
        setIsDesktop(desktop);
        setEnableMotionFx(desktop && !reduceMotionMedia.matches);
      });
    };

    updatePerformanceMode();
    window.addEventListener("resize", updatePerformanceMode, { passive: true });
    reduceMotionMedia.addEventListener("change", updatePerformanceMode);

    return () => {
      window.removeEventListener("resize", updatePerformanceMode);
      reduceMotionMedia.removeEventListener("change", updatePerformanceMode);
    };
  }, []);

  useEffect(() => {
    const reduceMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId: number | null = null;
    const timers: number[] = [];

    const startCinematicFlow = () => {
      const alreadySeen = window.sessionStorage.getItem(CINEMATIC_STORAGE_KEY) === "1";

      if (alreadySeen || reduceMotionMedia.matches) {
        setShowCinematicIntro(false);
        return;
      }

      timers.push(window.setTimeout(() => setCinematicStep(2), 420));
      timers.push(window.setTimeout(() => setCinematicStep(3), 1320));
      timers.push(window.setTimeout(() => setCinematicStep(4), 2280));
      timers.push(window.setTimeout(() => setCinematicFadeOut(true), 3900));
      timers.push(
        window.setTimeout(() => {
          setShowCinematicIntro(false);
          window.sessionStorage.setItem(CINEMATIC_STORAGE_KEY, "1");
        }, 4320),
      );
    };

    frameId = window.requestAnimationFrame(startCinematicFlow);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      timers.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, []);

  useEffect(() => {
    if (!isDesktop || render3dViewer) {
      return;
    }

    const target = hero3dRef.current;
    if (!target) {
      return;
    }

    let idleTimer: number | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }

        observer.disconnect();
        idleTimer = window.setTimeout(() => {
          setRender3dViewer(true);
        }, 180);
      },
      { rootMargin: "220px" },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
      if (idleTimer) {
        window.clearTimeout(idleTimer);
      }
    };
  }, [isDesktop, render3dViewer]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!enableMotionFx) {
      return;
    }

    const triggerBallBurst = () => {
      if (burstTimeoutRef.current) {
        window.clearTimeout(burstTimeoutRef.current);
      }

      setBallBurstKey((prev) => prev + 1);
      setShowBallBurst(true);

      burstTimeoutRef.current = window.setTimeout(() => {
        setShowBallBurst(false);
      }, 920);
    };

    const handleBurstScroll = () => {
      const nextY = window.scrollY;
      const passedTrigger = nextY > BALL_TRIGGER_SCROLL;

      if (passedTrigger && !crossedThresholdRef.current) {
        crossedThresholdRef.current = true;
        triggerBallBurst();
      }

      if (!passedTrigger) {
        crossedThresholdRef.current = false;
      }
    };

    handleBurstScroll();
    window.addEventListener("scroll", handleBurstScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleBurstScroll);
      if (burstTimeoutRef.current) {
        window.clearTimeout(burstTimeoutRef.current);
      }
    };
  }, [enableMotionFx]);

  const compactHero = scrollY > HERO_COMPACT_SCROLL;
  const showMiniHero = scrollY > MINI_HERO_TRIGGER_SCROLL;

  return (
    <div className="relative mb-10 -mt-8">
      <section
        className={[
          "brand-hero-grain brand-hero-stars relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-[color:var(--color-border)]",
          "bg-[radial-gradient(circle_at_top_right,_#a01629_0%,_#7f1d1d_32%,_#4c1016_66%,_#2c0b11_100%)]",
          "transition-[min-height,padding] duration-500",
          compactHero
            ? "min-h-[430px] px-4 py-7"
            : "min-h-[560px] px-4 py-8 md:min-h-[calc(100vh-7.2rem)] md:py-10",
        ].join(" ")}
      >
        <div className="pointer-events-none absolute -right-20 top-8 h-60 w-60 rounded-full bg-[#f59e0b]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 -top-12 h-72 w-72 rounded-full bg-[#fbbf24]/14 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#7f1d1d]/40 blur-3xl" />

        {showCinematicIntro ? (
          <div
            className={[
              "brand-cinematic-layer",
              cinematicFadeOut ? "brand-cinematic-layer--fade" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden
          >
            <div className={["brand-cinematic-ribbon", cinematicStep >= 2 ? "is-active" : "", cinematicStep >= 3 ? "is-open" : ""].filter(Boolean).join(" ")}>
              <span className="brand-cinematic-ribbon-half left" />
              <span className="brand-cinematic-ribbon-half right" />
            </div>

            <div className={["brand-cinematic-brand", cinematicStep >= 3 ? "is-active" : ""].filter(Boolean).join(" ")}>
              <span>ERLER AVM</span>
            </div>

            <div className={["brand-cinematic-gift", cinematicStep >= 4 ? "is-open" : ""].filter(Boolean).join(" ")}>
              <span className="brand-cinematic-gift-shadow" />
              <span className="brand-cinematic-gift-lid" />
              <span className="brand-cinematic-gift-base">
                <span className="brand-cinematic-gift-ribbon-v" />
                <span className="brand-cinematic-gift-ribbon-h" />
              </span>
              <span className="brand-cinematic-product">
                <Image
                  src={active3dProduct?.image ?? "/products/real/atlas-main.jpg"}
                  alt="ERLER AVM kampanya urunu"
                  fill
                  sizes="320px"
                  className="object-cover"
                  priority
                />
              </span>
            </div>

            <div className={["brand-cinematic-pop", cinematicStep >= 4 ? "is-active" : ""].filter(Boolean).join(" ")}>
              {CINEMATIC_POP_BALLS.map((ball) => (
                <span
                  key={`cinematic-pop-${ball.id}`}
                  className="brand-cinematic-pop-ball"
                  style={{
                    left: `${ball.left}%`,
                    width: `${ball.size}px`,
                    height: `${ball.size}px`,
                    animationDelay: `${ball.delay}s`,
                    ["--cinematic-drift" as string]: `${ball.drift}px`,
                  }}
                />
              ))}
            </div>
          </div>
        ) : null}

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
                ["--star-color" as string]: star.color,
              }}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute right-6 top-6 z-20 hidden items-center gap-2 rounded-full border border-amber-200/60 bg-[#3c1118]/65 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-100 md:inline-flex">
          <SparklesIcon className="size-4" /> ERLER AVM KAMPANYA
        </div>

        {enableMotionFx && showBallBurst ? (
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

        <div className="container relative z-10 grid gap-5 sm:gap-8 xl:grid-cols-[1.2fr_0.92fr] xl:items-center">
          <div
            className={[
              "will-change-transform transition-all duration-500",
              compactHero ? "translate-y-[-8px] opacity-95" : "translate-y-0 opacity-100",
            ].join(" ")}
          >
            <p className="inline-flex items-center gap-1 rounded-full border border-amber-200/60 bg-[#3c1118]/65 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-100">
              <SparklesIcon className="size-4" /> ERLER AVM KAMPANYA
            </p>
            <h1 className="mt-3 max-w-3xl text-2xl font-black leading-tight text-white sm:text-3xl md:text-5xl">
              Premium kampanya haftasi ve modern e-ticaret deneyimi
            </h1>
            <p className="mt-3 max-w-2xl text-xs text-rose-100/90 sm:mt-4 sm:text-sm md:text-base">
              Banner alani mat yildizli premium zeminde 3D urun vitriniyle calisir. Kampanya urunlerini hizli inceleyip
              tek tikla detay sayfasina gecebilirsiniz.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-2 sm:mt-6 sm:flex sm:flex-wrap sm:gap-3">
              <Link href="/products">
                <Button className="h-11 w-full px-6 text-white sm:w-auto">Urunlere Git</Button>
              </Link>
              <Link href="/products?campaign=flash">
                <Button variant="secondary" className="h-11 w-full px-6 sm:w-auto">
                  Kampanyalari Gor
                </Button>
              </Link>
            </div>
          </div>

          <aside
            className={[
              "will-change-transform rounded-3xl border border-[color:var(--color-border)] bg-white/88 p-3.5 shadow-[0_20px_36px_rgba(15,23,42,0.12)] backdrop-blur-sm transition-all duration-500 sm:p-5",
              compactHero ? "translate-y-[6px] opacity-95" : "translate-y-0 opacity-100",
            ].join(" ")}
          >
            {active3dProduct ? (
              <div className="rounded-2xl border border-[color:var(--color-border)] bg-[linear-gradient(145deg,_#fff8f8,_#ffffff)] p-3">
                <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-primary)]">
                  <SparklesIcon className="size-4" /> Banner 3D Urun Vitrini
                </p>
                <div ref={hero3dRef} className="mt-3 overflow-hidden rounded-xl border border-[color:var(--color-border)]">
                  {render3dViewer ? (
                    <ProductViewer3D productSlug={active3dProduct.slug} className="h-[190px] sm:h-[240px]" />
                  ) : (
                    <div className="relative h-[190px] bg-[radial-gradient(circle_at_top,_#fff7f8,_#ffe4e6,_#fff1f2)] sm:h-[240px]">
                      <Image
                        src={active3dProduct.image}
                        alt={`${active3dProduct.name} onizleme`}
                        fill
                        sizes="(max-width: 640px) 100vw, 480px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs font-semibold text-white/95">3D sahne performans icin gec yukleniyor</p>
                        <button
                          type="button"
                          onClick={() => setRender3dViewer(true)}
                          className="self-start rounded-lg border border-white/50 bg-black/45 px-2.5 py-1.5 text-[11px] font-semibold text-white sm:self-auto"
                        >
                          3D Yukle
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-[color:var(--color-foreground)]">{active3dProduct.name}</p>
                    <p className="text-xs text-[color:var(--color-muted)]">{active3dProduct.category}</p>
                  </div>
                  <p className="text-sm font-bold text-[color:var(--color-primary)]">{formatTry(active3dProduct.price)}</p>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                  {banner3dProducts.map((product) => (
                    <button
                      key={`banner-3d-${product.slug}`}
                      type="button"
                      onClick={() => setActive3dSlug(product.slug)}
                      className={[
                        "rounded-lg border px-2 py-2 text-left text-[11px] font-semibold transition sm:text-xs",
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
          "pointer-events-none fixed inset-x-0 z-[65] hidden transition-all duration-300 md:block",
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
