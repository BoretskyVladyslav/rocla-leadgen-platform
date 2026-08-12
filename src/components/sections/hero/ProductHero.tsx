"use client";

import { useState } from "react";
import { MotionLink } from "@/components/motion/MotionLink";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Dictionary } from "@/data/dictionary";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

export interface ProductHeroProps {
  product: Product;
  copy: Dictionary["product"];
}

export function ProductHero({ product, copy }: ProductHeroProps) {
  const thumbCount = Math.max(product.images?.length ?? 2, 2);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasDiscount = Boolean(
    product.compareAtPriceLabel && product.priceLabel,
  );

  return (
    <section className="bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div className="flex flex-col gap-3">
          <MediaPlaceholder
            aspect="4/3"
            label="Product Photo Placeholder"
            sizeHint="800×600"
            className="border-2 border-accent shadow-sm"
          />
          <ul className="grid grid-cols-4 gap-2 sm:grid-cols-5">
            {Array.from({ length: Math.min(thumbCount, 4) }).map((_, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`${copy.thumbPlaceholder} ${index + 1}`}
                  className={cn(
                    "w-full overflow-hidden transition-colors",
                    index === activeIndex
                      ? "ring-2 ring-accent ring-offset-1"
                      : "opacity-80 hover:opacity-100",
                  )}
                >
                  <MediaPlaceholder
                    aspect="1/1"
                    label={copy.thumbPlaceholder}
                    sizeHint={`${index + 1}`}
                    bordered
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-alt">
              {copy.eyebrow}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-heading sm:text-5xl sm:leading-[1.1]">
              {product.name}
            </h1>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {product.summary}
            </p>
          </div>

          {product.priceLabel ? (
            <div className="flex flex-wrap items-baseline gap-3 border-y border-border py-5">
              <p className="text-3xl font-bold tracking-tight text-foreground">
                {product.priceLabel}
              </p>
              {hasDiscount ? (
                <>
                  <p className="text-base text-muted line-through">
                    {product.compareAtPriceLabel}
                  </p>
                  {product.discountLabel ? (
                    <p className="badge-status">{product.discountLabel}</p>
                  ) : null}
                </>
              ) : null}
            </div>
          ) : null}

          <MotionLink
            href="#order"
            className="inline-flex h-12 w-fit items-center justify-center rounded-md bg-accent px-6 text-sm font-bold uppercase tracking-wide text-accent-fg transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {copy.requestQuote}
          </MotionLink>

          {product.specs && product.specs.length > 0 ? (
            <div>
              <h2 className="text-sm font-bold tracking-tight text-foreground">
                {copy.specifications}
              </h2>
              <table className="mt-4 w-full text-left text-sm">
                <tbody>
                  {product.specs.map((spec) => (
                    <tr key={spec.label} className="border-b border-border">
                      <th
                        scope="row"
                        className="py-3 pr-4 font-medium text-muted"
                      >
                        {spec.label}
                      </th>
                      <td className="py-3 text-foreground">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
