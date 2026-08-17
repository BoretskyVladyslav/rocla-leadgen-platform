"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
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
    <div
      className={cn(
        "grid grid-cols-1 gap-6 lg:items-start lg:gap-8",
        showThumbs
          ? "lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.2fr)]"
          : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]",
      )}
    >
      {showThumbs ? (
        <ul className="order-2 flex flex-row items-start justify-start gap-2.5 lg:order-1 lg:flex-col">
          {thumbs.map((image, index) => (
            <li key={image.thumbKey} className="shrink-0">
              <button
                type="button"
                onClick={() => setActiveThumb(index)}
                aria-label={`${copy.thumbPlaceholder} ${index + 1}`}
                aria-pressed={index === activeThumb}
                className={cn(
                  "relative block h-14 w-14 cursor-pointer overflow-hidden rounded-md border transition-all md:h-16 md:w-16",
                  index === activeThumb
                    ? "border-amber-500 ring-2 ring-amber-500/20"
                    : "border-neutral-200 opacity-90 hover:opacity-100",
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

      <div className="order-1 min-w-0 lg:order-2">
        <div className="relative mx-auto aspect-square w-full max-h-[340px] overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
          {activeImage?.src ? (
            <Image
              key={`${activeImage.src}-${activeThumb}`}
              src={activeImage.src}
              alt={activeImage.alt ?? product.name ?? copy.imagePlaceholder}
              fill
              sizes="(max-width: 1024px) 100vw, 360px"
              className="object-cover object-center"
              priority
            />
          ) : (
            <MediaPlaceholder
              aspect="1/1"
              label={product.name ?? copy.imagePlaceholder}
              bordered={false}
            />
          )}
        </div>
      </div>

      <div className="order-3 flex min-w-0 flex-col gap-4">
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

        {product.priceLabel ? (
          <div className="flex flex-wrap items-baseline justify-center gap-3 pt-1 sm:justify-start">
            {hasDiscount ? (
              <p className="text-base tabular-nums text-gray-400 line-through">
                {product.compareAtPriceLabel}
              </p>
            ) : null}
            <p className="text-2xl font-bold tracking-tight tabular-nums text-red-600 md:text-3xl">
              {product.priceLabel}
            </p>
          </div>
        ) : null}

        <HashLink
          href="#consultation"
          className="inline-flex w-full items-center justify-center gap-3 rounded-md bg-amber-400 px-6 py-3.5 text-sm font-bold tracking-wide text-gray-900 uppercase shadow-sm transition-all hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 cta-glow cta-shine"
        >
          {product.priceLabel ? (
            <span className="shrink-0 tabular-nums">
              {product.priceLabel.toUpperCase()}
            </span>
          ) : null}
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          <span>{copy.buyCta}</span>
        </HashLink>
      </div>
    </div>
  );
}
