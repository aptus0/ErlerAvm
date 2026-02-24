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
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import type { TouchEvent } from "react";

import type { ProductMediaItem } from "@/lib/constants";

const ProductViewer3D = dynamic(
  () => import("@/components/product/ProductViewer3D").then((module) => module.ProductViewer3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[360px] items-center justify-center bg-[radial-gradient(circle_at_top,_#fff7f8,_#ffe4e6,_#fff1f2)] text-sm font-semibold text-[color:var(--color-muted)]">
        3D sahne yukleniyor...
      </div>
    ),
  },
);

interface ProductGalleryProps {
  productName: string;
  productSlug: string;
  media: ProductMediaItem[];
  has3d: boolean;
}

function getMediaVisual(item: ProductMediaItem): string | null {
  if (item.type === "video") {
    return item.posterSrc ?? item.imageSrc ?? null;
  }

  return item.imageSrc ?? null;
}

export function ProductGallery({ productName, productSlug, media, has3d }: ProductGalleryProps) {
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
  const activeVisual = getMediaVisual(activeMedia);

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
          <div className="relative min-h-[430px]">
            {activeVisual ? (
              <Image
                src={activeVisual}
                alt={`${productName} - ${activeMedia.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className={[
                  "object-cover transition-transform duration-300",
                  zoomed ? "scale-110" : "scale-100",
                ].join(" ")}
                priority={activeIndex === 0}
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(140deg, ${activeMedia.gradientFrom}, ${activeMedia.gradientTo})`,
                }}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div className="absolute inset-0 z-10 flex items-end justify-between p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
                  {activeMedia.type === "video" ? "Video" : "Galeri"}
                </p>
                <p className="mt-2 text-3xl font-bold text-white">{activeMedia.title}</p>
                <p className="mt-2 max-w-md text-sm text-white/85">{activeMedia.subtitle}</p>
              </div>

              <div className="relative flex h-44 w-44 items-center justify-center rounded-[2rem] border border-white/70 bg-white/15 backdrop-blur-sm">
                {activeMedia.type === "video" ? (
                  <PlayCircleIcon className="size-20 text-white" />
                ) : (
                  <div className="h-20 w-20 rotate-6 rounded-2xl border-2 border-white/80 bg-white/70" />
                )}
                {activeMedia.duration ? (
                  <span className="absolute bottom-3 right-3 rounded-full bg-black/75 px-2 py-1 text-xs font-semibold text-white">
                    {activeMedia.duration}
                  </span>
                ) : null}
              </div>
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
        {media.map((item, index) => {
          const thumbVisual = getMediaVisual(item);

          return (
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
              <div className="relative mb-2 h-12 overflow-hidden rounded-lg border border-[color:var(--color-border)]">
                {thumbVisual ? (
                  <Image
                    src={thumbVisual}
                    alt={item.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="h-full w-full"
                    style={{
                      background: `linear-gradient(140deg, ${item.gradientFrom}, ${item.gradientTo})`,
                    }}
                  />
                )}
              </div>
              <p className="truncate text-[11px] font-semibold text-[color:var(--color-foreground)]">{item.title}</p>
              <p className="text-[10px] uppercase tracking-wide text-[color:var(--color-muted)]">
                {item.type === "video" ? "Video" : "Gorsel"}
              </p>
            </button>
          );
        })}
      </div>

      {show3dModal ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-4xl rounded-3xl bg-white p-6">
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

            <div className="mt-4 overflow-hidden rounded-2xl border border-[color:var(--color-border)]">
              <ProductViewer3D productSlug={productSlug} />
            </div>

            <p className="mt-3 text-sm text-[color:var(--color-muted)]">
              Modeli fare veya parmaginizla surukleyerek 360 derece inceleyebilirsiniz.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
