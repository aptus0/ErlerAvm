"use client";

import {
  ArrowPathRoundedSquareIcon,
  ArrowsPointingOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayCircleIcon,
  ShieldCheckIcon,
  TruckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import type { TouchEvent } from "react";

import type { ProductMediaItem } from "@/lib/constants";

interface ProductGalleryProps {
  productName: string;
  media: ProductMediaItem[];
  has3d: boolean;
}

export function ProductGallery({ productName, media, has3d }: ProductGalleryProps) {
  const touchStartXRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [show3dModal, setShow3dModal] = useState(false);

  if (!media.length) {
    return (
      <div className="card p-6">
        <p className="text-sm text-[color:var(--color-muted)]">Galeri icerigi bulunamadi.</p>
      </div>
    );
  }

  const activeMedia = media[activeIndex] ?? media[0];

  const goToIndex = (index: number) => {
    const normalizedIndex = (index + media.length) % media.length;
    setActiveIndex(normalizedIndex);
    setZoomed(false);
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartXRef.current;
    const endX = event.changedTouches[0]?.clientX ?? null;

    if (startX === null || endX === null) {
      touchStartXRef.current = null;
      return;
    }

    const deltaX = endX - startX;

    if (deltaX < -45) {
      goToIndex(activeIndex + 1);
    }

    if (deltaX > 45) {
      goToIndex(activeIndex - 1);
    }

    touchStartXRef.current = null;
  };

  return (
    <section className="space-y-4">
      <div className="relative overflow-hidden rounded-[1.35rem] border border-[color:var(--color-border)] bg-white p-4 shadow-[0_16px_35px_rgba(15,23,42,0.06)]">
        <div className="absolute left-7 top-7 z-20 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[color:var(--color-foreground)]">
            <TruckIcon className="size-4 text-[color:var(--color-primary)]" />
            Hizli Kargo
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[color:var(--color-foreground)]">
            <ShieldCheckIcon className="size-4 text-[color:var(--color-primary)]" />
            Orijinal Urun
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[color:var(--color-foreground)]">
            <ArrowPathRoundedSquareIcon className="size-4 text-[color:var(--color-primary)]" />
            Kolay Iade
          </span>
        </div>

        <div className="absolute right-7 top-7 z-20 flex gap-2">
          <button
            type="button"
            onClick={() => setZoomed((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-white/90 text-[color:var(--color-muted)] transition hover:text-[color:var(--color-primary)]"
            aria-label="Yaklastir"
          >
            <ArrowsPointingOutIcon className="size-5" />
          </button>

          {has3d ? (
            <button
              type="button"
              onClick={() => setShow3dModal(true)}
              className="inline-flex items-center gap-1 rounded-full border border-[color:var(--color-border)] bg-white/90 px-3 text-xs font-semibold text-[color:var(--color-foreground)] transition hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
            >
              <ArrowPathRoundedSquareIcon className="size-4" />
              360 / 3D
            </button>
          ) : null}
        </div>

        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative overflow-hidden rounded-[1.1rem] border border-[color:var(--color-border)]"
          style={{
            background: `linear-gradient(140deg, ${activeMedia.gradientFrom}, ${activeMedia.gradientTo})`,
          }}
        >
          <div
            className={[
              "relative flex min-h-[430px] items-end justify-between p-8 transition-transform duration-300",
              zoomed ? "scale-[1.05]" : "scale-100",
            ].join(" ")}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                {activeMedia.type === "video" ? "Video" : "Galeri"}
              </p>
              <p className="mt-2 text-3xl font-bold text-[color:var(--color-foreground)]">{activeMedia.title}</p>
              <p className="mt-2 max-w-md text-sm text-[color:var(--color-muted)]">{activeMedia.subtitle}</p>
            </div>

            <div className="relative flex h-44 w-44 items-center justify-center rounded-[2rem] border-2 border-[color:var(--color-primary)]/30 bg-white/75 shadow-[0_10px_25px_rgba(217,15,35,0.18)]">
              {activeMedia.type === "video" ? (
                <PlayCircleIcon className="size-20 text-[color:var(--color-primary)]" />
              ) : (
                <div className="h-20 w-20 rotate-6 rounded-2xl border-2 border-[color:var(--color-primary)] bg-white/90" />
              )}
              {activeMedia.duration ? (
                <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-white">
                  {activeMedia.duration}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-muted)] transition hover:text-[color:var(--color-primary)]"
            onClick={() => goToIndex(activeIndex - 1)}
            aria-label="Onceki gorsel"
          >
            <ChevronLeftIcon className="size-4" />
          </button>

          <p className="text-xs text-[color:var(--color-muted)]">
            {activeIndex + 1} / {media.length} - {productName}
          </p>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-muted)] transition hover:text-[color:var(--color-primary)]"
            onClick={() => goToIndex(activeIndex + 1)}
            aria-label="Sonraki gorsel"
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {media.map((item, index) => (
          <button
            type="button"
            key={item.id}
            onClick={() => goToIndex(index)}
            className={[
              "relative overflow-hidden rounded-xl border p-2 text-left transition",
              index === activeIndex
                ? "border-[color:var(--color-primary)] bg-[#fff2f3]"
                : "border-[color:var(--color-border)] bg-white hover:border-[color:var(--color-primary)]/45",
            ].join(" ")}
          >
            <div
              className="mb-2 h-12 rounded-lg"
              style={{
                background: `linear-gradient(140deg, ${item.gradientFrom}, ${item.gradientTo})`,
              }}
            />
            <p className="truncate text-[11px] font-semibold text-[color:var(--color-foreground)]">{item.title}</p>
            <p className="text-[10px] uppercase tracking-wide text-[color:var(--color-muted)]">
              {item.type === "video" ? "Video" : "Gorsel"}
            </p>
          </button>
        ))}
      </div>

      {show3dModal ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-3xl rounded-3xl bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">3D Izleyici</p>
                <h3 className="text-lg font-bold">{productName}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShow3dModal(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-muted)]"
                aria-label="Kapat"
              >
                <XMarkIcon className="size-5" />
              </button>
            </div>

            <div className="mt-4 rounded-2xl border border-[color:var(--color-border)] bg-[radial-gradient(circle_at_top,_#fff1f2,_#fee2e2,_#fef2f2)] p-8">
              <div className="flex min-h-[340px] items-center justify-center rounded-xl border-2 border-dashed border-[color:var(--color-primary)]/40">
                <div className="text-center">
                  <p className="text-xl font-bold">360 / 3D Viewer Hazir</p>
                  <p className="mt-2 text-sm text-[color:var(--color-muted)]">
                    Sprint 2 ile @react-three/fiber sahnesi bu modal icerisine baglanacak.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
