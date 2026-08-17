"use client";

import { useState } from "react";
import Image from "next/image";
import { HashLink } from "@/components/layout/HashLink";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Dictionary } from "@/data/dictionary";
import { cn } from "@/lib/utils";
import type { Product, ProductImage } from "@/types/product";

export interface ProductHeroProps {
  product: Product;
  copy: Dictionary["product"];
}

const THUMB_COUNT = 4;

function ChevronDivider() {
  return (
    <svg
      aria-hidden
      className="h-full w-3 shrink-0 fill-current text-white md:w-4"
      viewBox="0 0 16 48"
      preserveAspectRatio="none"
    >
      <path d="M0 0 L10 24 L0 48 L6 48 L16 24 L6 0 Z" />
    </svg>
  );
}

function buildThumbs(gallery: ProductImage[]) {
  if (gallery.length === 0) return [];
  return Array.from({ length: THUMB_COUNT }, (_, index) => {
    const image = gallery[index % gallery.length];
    return { ...image, thumbKey: `${image.src}-${index}` };
  });
}

export function ProductHero({ product, copy }: ProductHeroProps) {
  const gallery = product.images?.length
    ? product.images
    : product.imageSrc
      ? [{ src: product.imageSrc, alt: product.imageAlt ?? product.name }]
      : [];
  const thumbs = buildThumbs(gallery);
  const [activeThumb, setActiveThumb] = useState(0);
  const activeImage =
    gallery.length > 0 ? gallery[activeThumb % gallery.length] : undefined;
  const hasDiscount = Boolean(
    product.compareAtPriceLabel && product.priceLabel,
  );
  const quickSpecs = (product.specs ?? [])
    .filter(
      (spec) => spec.label.toLowerCase() !== copy.skuLabel.toLowerCase(),
    )
    .slice(0, 6);

  const showThumbs = thumbs.length > 0;

  return (
    <div className="mx-auto max-w-5xl rounded-xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
        <div className="flex min-w-0 items-center justify-center gap-3">
          {showThumbs ? (
            <ul className="flex shrink-0 flex-row gap-1.5 md:flex-col">
              {thumbs.map((image, index) => (
                <li key={image.thumbKey} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveThumb(index)}
                    aria-label={`${copy.thumbPlaceholder} ${index + 1}`}
                    aria-pressed={index === activeThumb}
                    className={cn(
                      "relative block h-10 w-10 overflow-hidden rounded border border-gray-200 md:h-11 md:w-11",
                      index === activeThumb && "border-amber-500",
                    )}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="44px"
                      loading="lazy"
                      className="object-cover"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="relative flex h-[240px] w-full items-center justify-center p-2 md:h-[280px]">
            {activeImage?.src ? (
              <Image
                key={`${activeImage.src}-${activeThumb}`}
                src={activeImage.src}
                alt={activeImage.alt ?? product.name ?? copy.imagePlaceholder}
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-contain p-2"
                priority
              />
            ) : (
              <MediaPlaceholder
                aspect="4/3"
                label={product.name ?? copy.imagePlaceholder}
                bordered={false}
                className="h-full max-h-full"
              />
            )}
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-start gap-3">
          <div>
            <h1 className="text-lg font-black leading-tight text-gray-900 uppercase md:text-xl">
              {product.name}
            </h1>
            <p className="-mt-1 text-xs text-gray-400">
              {copy.skuLabel}: {product.sku}
            </p>
          </div>

          {quickSpecs.length > 0 ? (
            <dl className="my-1 grid grid-cols-2 gap-x-4 gap-y-1.5 py-1 text-xs text-gray-600">
              {quickSpecs.map((spec) => (
                <div key={spec.label} className="flex min-w-0 items-baseline justify-between gap-2">
                  <dt className="truncate">{spec.label}</dt>
                  <dd className="shrink-0 font-semibold tabular-nums text-gray-800">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {product.priceLabel ? (
            <div className="flex flex-wrap items-baseline gap-3">
              {hasDiscount ? (
                <p className="text-sm tabular-nums text-gray-400 line-through">
                  {product.compareAtPriceLabel}
                </p>
              ) : null}
              <p className="text-xl font-black tabular-nums text-red-600 md:text-2xl">
                {product.priceLabel}
              </p>
            </div>
          ) : null}

          <HashLink
            href="#consultation"
            className="flex h-10 w-full items-stretch overflow-hidden rounded-sm bg-[#F9BC06] shadow-sm transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9BC06] focus-visible:ring-offset-2 md:h-11"
          >
            {product.priceLabel ? (
              <>
                <span className="flex shrink-0 items-center justify-center px-3 text-sm font-extrabold tabular-nums !text-red-700 md:text-base">
                  {product.priceLabel}
                </span>
                <ChevronDivider />
              </>
            ) : null}
            <span className="flex flex-1 items-center justify-center px-4 text-xs font-bold tracking-wide text-[#1A2E3B] uppercase md:text-sm">
              {copy.buyCta}
            </span>
          </HashLink>
        </div>
      </div>
    </div>
  );
}
