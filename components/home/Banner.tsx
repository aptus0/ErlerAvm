"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { SparklesIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/Button";
import { NAV_MENU } from "@/lib/constants";

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

const FALLING_BALLS: FallingBall[] = [
  { id: 1, left: 5, size: 9, delay: 0.0, duration: 0.84, blur: 0, drift: -10, opacity: 0.86, color: "#ef4444", radius: "50%" },
  { id: 2, left: 11, size: 12, delay: 0.04, duration: 0.92, blur: 0.4, drift: 14, opacity: 0.8, color: "#dc2626", radius: "56% 44% 50% 50%" },
  { id: 3, left: 17, size: 7, delay: 0.05, duration: 0.8, blur: 0.5, drift: 9, opacity: 0.74, color: "#f87171", radius: "48% 52% 51% 49%" },
  { id: 4, left: 25, size: 15, delay: 0.08, duration: 0.94, blur: 0.8, drift: -16, opacity: 0.72, color: "#ef4444", radius: "52% 48% 46% 54%" },
  { id: 5, left: 32, size: 11, delay: 0.1, duration: 0.9, blur: 0.3, drift: 12, opacity: 0.82, color: "#dc2626", radius: "50%" },
  { id: 6, left: 38, size: 8, delay: 0.12, duration: 0.86, blur: 0.2, drift: -8, opacity: 0.78, color: "#f87171", radius: "50% 47% 53% 50%" },
  { id: 7, left: 45, size: 13, delay: 0.14, duration: 0.95, blur: 0.7, drift: 16, opacity: 0.74, color: "#ef4444", radius: "47% 53% 50% 50%" },
  { id: 8, left: 52, size: 6, delay: 0.16, duration: 0.8, blur: 0.4, drift: -11, opacity: 0.66, color: "#f87171", radius: "50%" },
  { id: 9, left: 59, size: 10, delay: 0.18, duration: 0.86, blur: 0.3, drift: 8, opacity: 0.8, color: "#dc2626", radius: "52% 48% 50% 50%" },
  { id: 10, left: 66, size: 14, delay: 0.19, duration: 0.96, blur: 0.9, drift: -14, opacity: 0.7, color: "#ef4444", radius: "54% 46% 52% 48%" },
  { id: 11, left: 72, size: 8, delay: 0.22, duration: 0.84, blur: 0.35, drift: 9, opacity: 0.76, color: "#f87171", radius: "50%" },
  { id: 12, left: 79, size: 12, delay: 0.24, duration: 0.92, blur: 0.5, drift: -12, opacity: 0.73, color: "#dc2626", radius: "47% 53% 48% 52%" },
  { id: 13, left: 84, size: 7, delay: 0.25, duration: 0.82, blur: 0.4, drift: 10, opacity: 0.71, color: "#f87171", radius: "50%" },
  { id: 14, left: 90, size: 10, delay: 0.28, duration: 0.9, blur: 0.3, drift: -9, opacity: 0.82, color: "#ef4444", radius: "55% 45% 49% 51%" },
  { id: 15, left: 95, size: 9, delay: 0.31, duration: 0.88, blur: 0.2, drift: 7, opacity: 0.79, color: "#dc2626", radius: "50%" },
];

const BALL_TRIGGER_SCROLL = 80;
const MINI_HERO_TRIGGER_SCROLL = 360;

export function Banner() {
  const megaColumns = useMemo(
    () => NAV_MENU.find((item) => item.id === "products" && item.type === "mega")?.mega?.columns ?? [],
    [],
  );

  const [scrollY, setScrollY] = useState(0);
  const [showBallBurst, setShowBallBurst] = useState(false);
  const [ballBurstKey, setBallBurstKey] = useState(0);
  const hasTriggeredBurstRef = useRef(false);

  useEffect(() => {
    let burstTimer: number | undefined;

    const handleScroll = () => {
      const nextY = window.scrollY;
      setScrollY(nextY);

      if (nextY > BALL_TRIGGER_SCROLL && !hasTriggeredBurstRef.current) {
        hasTriggeredBurstRef.current = true;
        setBallBurstKey((key) => key + 1);
        setShowBallBurst(true);

        burstTimer = window.setTimeout(() => {
          setShowBallBurst(false);
        }, 900);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (burstTimer) {
        window.clearTimeout(burstTimer);
      }
    };
  }, []);

  const compactHero = scrollY > BALL_TRIGGER_SCROLL;
  const showMiniHero = scrollY > MINI_HERO_TRIGGER_SCROLL;

  return (
    <div className="relative mb-10 -mt-8">
      <section
        className={[
          "brand-hero-grain relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-[color:var(--color-border)]",
          "bg-[radial-gradient(circle_at_top_right,_#ffe7eb_0%,_#fff3f5_35%,_#ffffff_74%)]",
          "transition-[min-height,padding] duration-500",
          compactHero ? "min-h-[480px] px-4 py-8" : "min-h-[calc(100vh-4.2rem)] px-4 py-10",
        ].join(" ")}
      >
        <div className="pointer-events-none absolute -right-28 top-8 h-56 w-56 rounded-full bg-[#fca5a5]/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-28 -top-10 h-64 w-64 rounded-full bg-[#fecdd3]/45 blur-3xl" />

        {showBallBurst ? (
          <div key={ballBurstKey} className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-52 overflow-hidden">
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
                  animationDelay: `${ball.delay}s`,
                  animationDuration: `${ball.duration}s`,
                  ["--ball-drift" as string]: `${ball.drift}px`,
                }}
              />
            ))}
          </div>
        ) : null}

        <div className="container relative z-10 grid gap-8 xl:grid-cols-[1.2fr_0.92fr] xl:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-primary)]">ERLER AVM V1</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-[color:var(--color-foreground)] md:text-5xl">
              Kirmizi-Beyaz temada modern e-ticaret altyapisi
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-[color:var(--color-muted)] md:text-base">
              Banner, urun bolumleri, menu mimarisi ve admin panel route gruplari hazir. Marka deneyimi splash,
              mini hero ve premium scroll akisiyla guclendirildi.
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

          <aside className="rounded-3xl border border-[color:var(--color-border)] bg-white/90 p-5 shadow-[0_20px_36px_rgba(15,23,42,0.12)] backdrop-blur-sm">
            <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-primary)]">
              <SparklesIcon className="size-4" /> Mega Menu Hizli Erisim
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
              {megaColumns.map((column) => (
                <div
                  key={column.title}
                  className="rounded-xl border border-[color:var(--color-border)] bg-[linear-gradient(145deg,_#fff8f8,_#ffffff)] p-3"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-[color:var(--color-muted)]">{column.title}</p>
                  <div className="mt-2 grid gap-1">
                    {column.links.map((link, linkIndex) => (
                      <Link
                        key={`${column.title}-${link.title}-${linkIndex}`}
                        href={link.href}
                        className="rounded-lg px-2 py-1 text-sm font-medium hover:bg-[#fff1f2] hover:text-[color:var(--color-primary)]"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <div
        className={[
          "pointer-events-none fixed inset-x-0 z-40 transition-all duration-300",
          showMiniHero ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
        ].join(" ")}
        style={{ top: "4.2rem" }}
      >
        <div className="container pointer-events-auto">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-[color:var(--color-border)] bg-white/95 px-4 py-3 shadow-[0_14px_30px_rgba(15,23,42,0.14)] backdrop-blur-md">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                Mini Hero
              </p>
              <p className="text-sm font-bold text-[color:var(--color-foreground)] md:text-base">
                ERLER AVM ile guvenli, hizli ve premium alisveris
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
