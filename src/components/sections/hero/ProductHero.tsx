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
    .slice(0, 6);

  const showThumbs = thumbs.length > 0;

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <div className="grid w-full grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
          <div className="flex h-full w-full items-start gap-4">
            {showThumbs ? (
              <ul className="flex w-14 shrink-0 flex-col gap-2 md:w-16">
                {thumbs.map((image, index) => (
                  <li key={image.thumbKey}>
                    <button
                      type="button"
                      onClick={() => setActiveThumb(index)}
                      aria-label={`${copy.thumbPlaceholder} ${index + 1}`}
                      aria-pressed={index === activeThumb}
                      className={cn(
                        "relative block aspect-square h-14 w-14 cursor-pointer overflow-hidden rounded-md border md:h-16 md:w-16",
                        index === activeThumb
                          ? "border-amber-500"
                          : "border-gray-200",
                      )}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="64px"
                        loading="lazy"
                        className="object-cover"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="relative h-[320px] min-w-0 flex-1 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 md:h-[380px]">
              {activeImage?.src ? (
                <Image
                  key={`${activeImage.src}-${activeThumb}`}
                  src={activeImage.src}
                  alt={activeImage.alt ?? product.name ?? copy.imagePlaceholder}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-cover object-center"
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

          <div className="flex h-full flex-col justify-between gap-4">
            <div className="flex min-w-0 flex-col gap-2">
              <h1 className="text-xl font-bold text-gray-900 uppercase md:text-2xl">
                {product.name}
              </h1>
              <p className="text-xs text-gray-400">
                {copy.skuLabel}: {product.sku}
              </p>

              {quickSpecs.length > 0 ? (
                <dl className="my-2 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
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
            </div>

            <div className="flex flex-col gap-4">
              {product.priceLabel ? (
                <div className="flex flex-wrap items-baseline gap-3">
                  {hasDiscount ? (
                    <p className="text-base tabular-nums text-gray-400 line-through">
                      {product.compareAtPriceLabel}
                    </p>
                  ) : null}
                  <p className="text-2xl font-extrabold tabular-nums text-red-600 md:text-3xl">
                    {product.priceLabel}
                  </p>
                </div>
              ) : null}

              <HashLink
                href="#consultation"
                className="flex h-12 w-full items-stretch overflow-hidden rounded bg-[#F9BC06] md:h-14"
              >
                {product.priceLabel ? (
                  <>
                    <span className="flex items-center justify-center px-4 text-base font-extrabold tabular-nums !text-red-700 md:text-lg">
                      {product.priceLabel}
                    </span>
                    <ChevronDivider />
                  </>
                ) : null}
                <span className="flex flex-1 items-center justify-center text-sm font-bold tracking-wide text-[#1A2E3B] uppercase md:text-base">
                  {copy.buyCta}
                </span>
              </HashLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
