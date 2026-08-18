"use client";

import { useState } from "react";
import Image from "next/image";
import { HashLink } from "@/components/layout/HashLink";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Dictionary } from "@/data/dictionary";
import { cn } from "@/lib/utils";
import type { Product, ProductImage, ProductSpec } from "@/types/product";

export interface ProductHeroProps {
  product: Product;
  copy: Dictionary["product"];
}

const THUMB_COUNT = 4;

const HERO_SPEC_MATCHERS = [
  ["тип візка", "тип тележки"],
  ["вантажопідйомність", "грузоподъёмность", "грузоподъемность"],
  ["довжина вил", "длина вил"],
  ["висота підйому", "высота подъёма", "высота подъема"],
  ["ширина вил", "ширина вил"],
  ["вага", "вес"],
  ["матеріал", "материал"],
  ["гарантія", "гарантия"],
] as const;

function pickHeroSpecs(specs: ProductSpec[]) {
  return HERO_SPEC_MATCHERS.flatMap((keys) => {
    const match = specs.find((spec) => {
      const label = spec.label.toLowerCase();
      return keys.some((key) => label.includes(key));
    });
    return match ? [match] : [];
  }).slice(0, 8);
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
  const quickSpecs = pickHeroSpecs(product.specs ?? []);

  const showThumbs = thumbs.length > 0;

  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-stretch gap-6 px-4 lg:grid-cols-2 lg:gap-8">
      <div className="flex h-[380px] gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:p-8">
        {showThumbs ? (
          <ul className="flex w-16 shrink-0 flex-col gap-3">
            {thumbs.map((image, index) => (
              <li key={image.thumbKey}>
                <button
                  type="button"
                  onClick={() => setActiveThumb(index)}
                  aria-label={`${copy.thumbPlaceholder} ${index + 1}`}
                  aria-pressed={index === activeThumb}
                  className={cn(
                    "relative block h-16 w-16 cursor-pointer overflow-hidden rounded-lg border-2 transition-all",
                    index === activeThumb
                      ? "border-amber-400"
                      : "border-transparent hover:border-gray-200",
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="64px"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="relative flex h-full min-w-0 flex-1 items-center justify-center overflow-hidden rounded-xl bg-white p-2">
          {activeImage?.src ? (
            <Image
              key={`${activeImage.src}-${activeThumb}`}
              src={activeImage.src}
              alt={activeImage.alt ?? product.name ?? copy.imagePlaceholder}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="max-h-full max-w-full object-contain"
              priority
            />
          ) : (
            <MediaPlaceholder
              aspect="4/3"
              label={product.name ?? copy.imagePlaceholder}
              bordered={false}
              className="h-full"
            />
          )}
        </div>
      </div>

      <div className="flex h-[380px] flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:p-8">
        <div>
          <h1 className="text-xl leading-tight font-bold text-gray-900 uppercase lg:text-2xl">
            {product.name}
          </h1>
          <p className="mt-1 mb-3 text-xs text-gray-400">
            {copy.skuLabel}: {product.sku}
          </p>

          {quickSpecs.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-gray-700">
              {quickSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex min-w-0 items-center justify-between gap-2"
                >
                  <span className="truncate text-gray-500">{spec.label}</span>
                  <span className="shrink-0 font-bold tabular-nums text-gray-900">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          {product.priceLabel ? (
            <div className="mb-2 flex items-baseline gap-4">
              {hasDiscount ? (
                <p className="text-sm font-bold text-gray-400 line-through">
                  {product.compareAtPriceLabel}
                </p>
              ) : null}
              <p className="text-2xl font-black tabular-nums text-red-600 lg:text-3xl">
                {product.priceLabel}
              </p>
            </div>
          ) : null}

          <HashLink
            href="#consultation"
            className="flex h-12 w-full items-stretch overflow-hidden rounded-lg bg-amber-400 shadow-sm transition-all hover:bg-amber-500 md:h-13"
          >
            {product.priceLabel ? (
              <span className="flex h-full shrink-0 items-center bg-amber-500 px-4 text-sm font-extrabold tabular-nums !text-red-700 [clip-path:polygon(0_0,100%_0,calc(100%-12px)_50%,100%_100%,0_100%)] md:text-base">
                {product.priceLabel}
              </span>
            ) : null}
            <span className="flex flex-1 items-center justify-center pl-2 text-xs font-bold tracking-wide text-gray-900 uppercase md:text-sm">
              {copy.buyCta}
            </span>
          </HashLink>
        </div>
      </div>
    </div>
  );
}
