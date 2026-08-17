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
    <div className="mx-auto grid w-full grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
      <div className="flex h-full min-h-[440px] flex-col items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:min-h-[480px] lg:flex-row">
        {showThumbs ? (
          <ul className="grid w-full shrink-0 grid-cols-4 gap-2.5 lg:flex lg:w-auto lg:flex-col">
            {thumbs.map((image, index) => (
              <li key={image.thumbKey} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveThumb(index)}
                  aria-label={`${copy.thumbPlaceholder} ${index + 1}`}
                  aria-pressed={index === activeThumb}
                  className={cn(
                    "relative block aspect-square h-16 w-16 cursor-pointer overflow-hidden rounded-lg border transition-all md:h-20 md:w-20",
                    index === activeThumb
                      ? "border-amber-500 ring-2 ring-amber-500/20"
                      : "border-neutral-200 opacity-90 hover:opacity-100",
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="80px"
                    loading="lazy"
                    className="object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="relative h-[400px] min-w-0 w-full overflow-hidden rounded-xl bg-gray-50 md:h-[450px]">
          {activeImage?.src ? (
            <Image
              key={`${activeImage.src}-${activeThumb}`}
              src={activeImage.src}
              alt={activeImage.alt ?? product.name ?? copy.imagePlaceholder}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
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

      <div className="flex h-full min-h-[440px] flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:min-h-[480px] md:p-8">
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-heading uppercase sm:text-3xl sm:leading-[1.15]">
              {product.name}
            </h1>
            <p className="text-sm text-muted">
              {copy.skuLabel}: {product.sku}
            </p>
          </div>

          {quickSpecs.length > 0 ? (
            <dl className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
              {quickSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-baseline justify-between gap-3 border-b border-border py-2 text-sm"
                >
                  <dt className="font-medium text-muted">{spec.label}</dt>
                  <dd className="shrink-0 font-semibold tabular-nums text-foreground">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {product.priceLabel ? (
            <div className="flex flex-wrap items-baseline">
              {hasDiscount ? (
                <p className="mr-4 text-base font-medium tabular-nums text-gray-400 line-through md:text-lg">
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
            className="flex h-12 w-full items-stretch overflow-hidden rounded-sm bg-[#F9BC06] shadow-sm transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9BC06] focus-visible:ring-offset-2 md:h-14"
          >
            {product.priceLabel ? (
              <>
                <span className="flex shrink-0 items-center justify-center bg-[#F9BC06] px-4 text-lg font-extrabold tabular-nums text-red-700 md:text-xl">
                  {product.priceLabel}
                </span>
                <ChevronDivider />
              </>
            ) : null}
            <span className="flex flex-1 items-center justify-center px-6 text-sm font-bold tracking-wide text-[#1A2E3B] uppercase md:text-base">
              {copy.buyCta}
            </span>
          </HashLink>
        </div>
      </div>
    </div>
  );
}
