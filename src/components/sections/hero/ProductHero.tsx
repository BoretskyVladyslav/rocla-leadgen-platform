"use client";

import { useState } from "react";
import Image from "next/image";
import { MotionLink } from "@/components/motion/MotionLink";
import type { Dictionary } from "@/data/dictionary";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

export interface ProductHeroProps {
  product: Product;
  copy: Dictionary["product"];
}

export function ProductHero({ product, copy }: ProductHeroProps) {
  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.imageSrc
        ? [{ src: product.imageSrc, alt: product.imageAlt ?? product.name }]
        : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];
  const hasDiscount = Boolean(
    product.compareAtPriceLabel && product.priceLabel,
  );
  const quickSpecs = (product.specs ?? []).filter(
    (spec) => spec.label.toLowerCase() !== copy.skuLabel.toLowerCase(),
  ).slice(0, 6);

  return (
    <section className="bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-6 pt-6 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:pb-8 lg:pt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          {images.length > 1 ? (
            <ul className="order-2 flex gap-2 sm:order-1 sm:w-20 sm:shrink-0 sm:flex-col">
              {images.slice(0, 3).map((image, index) => (
                <li key={image.src} className="min-w-0 flex-1 sm:flex-none">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`${copy.thumbPlaceholder} ${index + 1}`}
                    aria-pressed={index === activeIndex}
                    className={cn(
                      "relative aspect-square w-full overflow-hidden rounded-md border-2 bg-surface transition-colors",
                      index === activeIndex
                        ? "border-accent"
                        : "border-border opacity-80 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="order-1 relative aspect-[4/3] w-full overflow-hidden rounded-xl border-2 border-accent bg-surface shadow-sm sm:order-2">
            {activeImage ? (
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted">
                {copy.imagePlaceholder}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
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
                  <tr key={spec.label} className="border-b border-border">
                    <th
                      scope="row"
                      className="py-2.5 pr-4 font-medium text-muted"
                    >
                      {spec.label}
                    </th>
                    <td className="py-2.5 font-semibold text-foreground">
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
                <p className="text-base text-muted line-through">
                  {product.compareAtPriceLabel}
                </p>
              ) : null}
              <p className="text-3xl font-bold tracking-tight text-accent-alt">
                {product.priceLabel}
              </p>
              {product.discountLabel ? (
                <p className="badge-status">{product.discountLabel}</p>
              ) : null}
            </div>
          ) : null}

          <MotionLink
            href="#contact"
            className="inline-flex h-12 min-w-[12rem] items-center justify-center rounded-md bg-accent px-6 text-sm font-bold uppercase tracking-wide text-accent-fg transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {copy.buyCta}
          </MotionLink>
        </div>
      </div>
    </section>
  );
}
