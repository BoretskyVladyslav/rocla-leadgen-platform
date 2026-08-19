"use client";

import { useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MotionLink } from "@/components/motion/MotionLink";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  cardHover,
  cardHoverClassName,
  staggerContainer,
  staggerItem,
} from "@/components/motion/variants";
import { MediaImage } from "@/components/ui/MediaImage";
import type { Dictionary } from "@/data/dictionary";
import { useCarouselTrack } from "@/hooks/useCarouselTrack";
import type { Product, ProductSpec } from "@/types/product";
import { PAGE_CONTAINER } from "@/lib/layout";
import { cn } from "@/lib/utils";

export interface RelatedProductsCarouselProps {
  lang: string;
  products: Product[];
  copy: Dictionary["product"];
}

const CAPACITY_KEYS = [
  "вантажопідйомність",
  "грузоподъёмность",
  "грузоподъемность",
];
const LIFT_KEYS = [
  "висота підйому",
  "высота подъёма",
  "высота подъема",
];

function findSpecValue(specs: ProductSpec[] | undefined, keys: string[]) {
  return specs?.find((spec) => {
    const label = spec.label.toLowerCase();
    return keys.some((key) => label.includes(key));
  })?.value;
}

function formatPrice(label?: string) {
  if (!label) return null;
  return label.replace(/₴/g, "грн").trim();
}

export function RelatedProductsCarousel({
  lang,
  products,
  copy,
}: RelatedProductsCarouselProps) {
  const getKey = useCallback(
    (product: Product) => product.images?.[0]?.src ?? product.slug,
    [],
  );

  const {
    trackRef,
    loopedItems,
    activePage,
    pageCount,
    go,
    goToPage,
    dragHandlers,
    trackClassName,
  } = useCarouselTrack({
    items: products,
    getKey,
    cardSelector: "[data-related-card]",
    infinite: true,
    stepMode: "page",
    gapClassName: "gap-5",
  });

  if (products.length === 0) return null;

  return (
    <section id="related" className="scroll-mt-20 bg-amber-50/30 py-10 md:py-14 xl:pt-[18px] xl:pb-[68px]">
      <div className={PAGE_CONTAINER}>
        <ScrollReveal>
          <div className="mb-8 flex flex-row items-end justify-between gap-4">
            <h2 className="text-left text-2xl font-bold uppercase tracking-[0.08em] text-heading sm:text-3xl">
              {copy.relatedTitle}
            </h2>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label="Previous product"
                onClick={() => go(-1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border-2 border-dark bg-white text-lg font-bold text-heading shadow-sm transition-colors hover:border-accent hover:bg-accent"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next product"
                onClick={() => go(1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border-2 border-dark bg-white text-lg font-bold text-heading shadow-sm transition-colors hover:border-accent hover:bg-accent"
              >
                →
              </button>
            </div>
          </div>
        </ScrollReveal>

        <motion.ul
          ref={trackRef}
          className={cn("items-stretch will-change-transform", trackClassName)}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          {...dragHandlers}
        >
          {loopedItems.map(({ item: product, key }) => {
            const href = `/${lang}/product/${product.slug}`;
            const capacity = findSpecValue(product.specs, CAPACITY_KEYS);
            const liftHeight = findSpecValue(product.specs, LIFT_KEYS);
            const price = formatPrice(product.priceLabel);

            return (
              <motion.li
                key={key}
                data-related-card
                variants={staggerItem}
                className={cn(
                  "flex h-auto self-stretch",
                  "w-[82%] min-w-0 shrink-0 snap-start",
                  "sm:w-[calc((100%-1.25rem)/2)]",
                  "lg:w-[calc((100%-2.5rem)/3)]",
                  "xl:w-[calc((100%-3.75rem)/4)]",
                )}
              >
                <motion.article
                  className={cn(
                    "flex h-full w-full flex-col overflow-hidden",
                    cardHoverClassName,
                  )}
                  {...cardHover}
                >
                  <Link
                    href={href}
                    className="block shrink-0 overflow-hidden rounded-t-2xl rounded-b-none bg-white"
                    draggable={false}
                  >
                    <MediaImage
                      src={product.images?.[0]?.src ?? product.imageSrc}
                      alt={product.images?.[0]?.alt ?? product.imageAlt ?? product.name}
                      aspect="4/3"
                      fit="contain"
                      sizes="(max-width: 640px) 280px, (max-width: 1280px) 33vw, 280px"
                      className="h-full w-full rounded-t-2xl rounded-b-none bg-white"
                    />
                  </Link>
                  <div className="flex min-h-0 flex-1 flex-col bg-white p-4">
                    <p className="min-h-4 text-xs font-medium tracking-wide text-gray-400">
                      {product.sku ?? "\u00a0"}
                    </p>
                    <Link href={href} draggable={false}>
                      <h3 className="mt-0.5 line-clamp-2 min-h-[48px] text-base leading-snug font-bold tracking-tight text-gray-900 transition-colors hover:text-heading sm:text-lg">
                        {product.name}
                      </h3>
                    </Link>
                    <dl className="mt-3 shrink-0">
                      <div className="flex h-9 items-center justify-between gap-3 border-b border-gray-100 text-sm">
                        <dt className="text-gray-500">{copy.capacityLabel}</dt>
                        <dd className="font-bold tabular-nums text-gray-900">
                          {capacity ?? "—"}
                        </dd>
                      </div>
                      <div className="flex h-9 items-center justify-between gap-3 text-sm">
                        <dt className="text-gray-500">{copy.liftHeightLabel}</dt>
                        <dd className="font-bold tabular-nums text-gray-900">
                          {liftHeight ?? "—"}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                      {price ? (
                        <span className="text-base font-bold tabular-nums text-gray-900">
                          {price}
                        </span>
                      ) : (
                        <span />
                      )}
                      <MotionLink
                        href={href}
                        className="inline-flex h-9 shrink-0 items-center justify-center rounded-md bg-accent px-3.5 text-xs font-bold uppercase tracking-wide text-accent-fg transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                        draggable={false}
                      >
                        {copy.detailsCta}
                      </MotionLink>
                    </div>
                  </div>
                </motion.article>
              </motion.li>
            );
          })}
        </motion.ul>

        <div className="mt-5 flex justify-center gap-2" role="tablist">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={`related-page-${index}`}
              type="button"
              role="tab"
              aria-selected={activePage === index}
              aria-label={`Page ${index + 1}`}
              onClick={() => goToPage(index)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-colors",
                activePage === index ? "bg-accent" : "bg-border hover:bg-muted",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
