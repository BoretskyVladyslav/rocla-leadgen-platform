"use client";

import { useState } from "react";
import Image from "next/image";
import { HashLink } from "@/components/layout/HashLink";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Dictionary } from "@/data/dictionary";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

export interface ProductHeroProps {
  product: Product;
  copy: Dictionary["product"];
}

export function ProductHero({ product, copy }: ProductHeroProps) {
  const gallery = product.images?.length
    ? product.images
    : product.imageSrc
      ? [{ src: product.imageSrc, alt: product.imageAlt ?? product.name }]
      : [];
  const thumbCount = Math.min(Math.max(gallery.length, 1), 3);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = gallery[activeIndex];
  const hasDiscount = Boolean(
    product.compareAtPriceLabel && product.priceLabel,
  );
  const quickSpecs = (product.specs ?? [])
    .filter(
      (spec) => spec.label.toLowerCase() !== copy.skuLabel.toLowerCase(),
    )
    .slice(0, 6);

  return (
    <section className="bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-6 pt-6 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:pb-8 lg:pt-8">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start">
          {thumbCount > 1 ? (
            <ul className="order-2 flex gap-2 sm:order-1 sm:w-20 sm:shrink-0 sm:flex-col">
              {gallery.slice(0, thumbCount).map((image, index) => (
                <li key={image.src} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`${copy.thumbPlaceholder} ${index + 1}`}
                    aria-pressed={index === activeIndex}
                    className={cn(
                      "relative block aspect-square w-20 overflow-hidden rounded-xl",
                      index === activeIndex
                        ? "border-2 border-amber-500"
                        : "border border-neutral-200 opacity-90 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="80px"
                      className="h-full w-full object-cover"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="order-1 min-w-0 w-full sm:order-2">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-50">
              {activeImage?.src ? (
                <Image
                  key={activeImage.src}
                  src={activeImage.src}
                  alt={activeImage.alt ?? product.name ?? copy.imagePlaceholder}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
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
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-alt">
              {copy.eyebrow}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl sm:leading-[1.15]">
              {product.name}
            </h1>
            <p className="badge-status w-fit">
              {copy.skuLabel}: {product.sku}
            </p>
          </div>

          {quickSpecs.length > 0 ? (
            <table className="w-full text-left text-sm">
              <tbody>
                {quickSpecs.map((spec) => (
                  <tr
                    key={spec.label}
                    className="border-b border-border odd:bg-neutral-50"
                  >
                    <th
                      scope="row"
                      className="py-2.5 pr-4 font-medium text-muted"
                    >
                      {spec.label}
                    </th>
                    <td className="py-2.5 font-semibold tabular-nums text-foreground">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}

          {product.priceLabel ? (
            <div className="flex flex-wrap items-baseline gap-3 border-y border-border py-5">
              {hasDiscount ? (
                <p className="text-base tabular-nums text-muted line-through">
                  {product.compareAtPriceLabel}
                </p>
              ) : null}
              <p className="text-3xl font-bold tracking-tight tabular-nums text-accent-alt">
                {product.priceLabel}
              </p>
              {product.discountLabel ? (
                <p className="badge-status -rotate-3">{product.discountLabel}</p>
              ) : null}
            </div>
          ) : null}

          <HashLink
            href="#consultation"
            className="inline-flex h-12 min-w-[12rem] items-center justify-center rounded-lg bg-accent px-6 text-sm font-bold uppercase tracking-wide text-accent-fg transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 cta-glow cta-shine"
          >
            {copy.buyCta}
          </HashLink>
        </div>
      </div>
    </section>
  );
}
