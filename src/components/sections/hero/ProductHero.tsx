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
      className="h-full w-4 shrink-0 fill-current text-white"
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
    .slice(0, 8);

  const showThumbs = thumbs.length > 0;

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
      <div className="flex h-[380px] gap-4 rounded-xl bg-white p-5 shadow-sm lg:col-span-7">
        {showThumbs ? (
          <ul className="flex w-12 shrink-0 flex-col gap-2">
            {thumbs.map((image, index) => (
              <li key={image.thumbKey}>
                <button
                  type="button"
                  onClick={() => setActiveThumb(index)}
                  aria-label={`${copy.thumbPlaceholder} ${index + 1}`}
                  aria-pressed={index === activeThumb}
                  className={cn(
                    "relative block h-12 w-12 cursor-pointer overflow-hidden rounded border",
                    index === activeThumb
                      ? "border-amber-500"
                      : "border-gray-200",
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="48px"
                    loading="lazy"
                    className="object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="relative flex h-full min-w-0 flex-1 items-center justify-center p-4">
          {activeImage?.src ? (
            <Image
              key={`${activeImage.src}-${activeThumb}`}
              src={activeImage.src}
              alt={activeImage.alt ?? product.name ?? copy.imagePlaceholder}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="max-h-full object-contain rounded-lg"
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

      <div className="flex min-h-[380px] flex-col justify-start rounded-xl bg-white p-6 shadow-sm lg:col-span-5">
        <div className="flex flex-col gap-0">
          <h1 className="text-xl leading-tight font-bold text-gray-900 uppercase">
            {product.name}
          </h1>
          <p className="mt-1 mb-4 text-xs text-gray-400">
            {copy.skuLabel}: {product.sku}
          </p>

          {quickSpecs.length > 0 ? (
            <dl className="mb-6 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-700">
              {quickSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex min-w-0 items-baseline justify-between gap-2"
                >
                  <dt className="truncate">{spec.label}</dt>
                  <dd className="shrink-0 font-semibold tabular-nums text-gray-800">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {product.priceLabel ? (
            <div className="mb-2 flex items-baseline gap-4">
              {hasDiscount ? (
                <p className="text-sm font-bold text-gray-400 line-through">
                  {product.compareAtPriceLabel}
                </p>
              ) : null}
              <p className="text-2xl font-black tabular-nums text-red-600">
                {product.priceLabel}
              </p>
            </div>
          ) : null}

          <HashLink
            href="#consultation"
            className="flex h-12 w-full items-stretch overflow-hidden rounded bg-[#F9BC06] shadow-sm"
          >
            {product.priceLabel ? (
              <>
                <span className="flex items-center justify-center px-4 text-base font-extrabold tabular-nums !text-red-700">
                  {product.priceLabel}
                </span>
                <ChevronDivider />
              </>
            ) : null}
            <span className="flex flex-1 items-center justify-center text-sm font-bold text-gray-900 uppercase">
              {copy.buyCta}
            </span>
          </HashLink>
        </div>
      </div>
    </div>
  );
}
