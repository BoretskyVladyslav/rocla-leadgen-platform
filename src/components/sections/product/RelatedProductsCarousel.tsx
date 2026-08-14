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
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

export interface RelatedProductsCarouselProps {
  lang: string;
  products: Product[];
  copy: Dictionary["catalog"];
  title: string;
  orderCta: string;
}

export function RelatedProductsCarousel({
  lang,
  products,
  title,
  orderCta,
}: RelatedProductsCarouselProps) {
  const getKey = useCallback((product: Product) => product.slug, []);

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
    <section id="related" className="scroll-mt-20 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <ScrollReveal>
          <div className="mb-8 flex flex-row items-end justify-between gap-4">
            <h2 className="text-left text-2xl font-bold uppercase tracking-[0.08em] text-heading sm:text-3xl">
              {title}
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
          className={cn("will-change-transform", trackClassName)}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          {...dragHandlers}
        >
          {loopedItems.map(({ item: product, key }) => {
            const badges = (product.specs ?? []).slice(0, 3);

            return (
              <motion.li
                key={key}
                data-related-card
                variants={staggerItem}
                className={cn(
                  "w-[min(100%,17.5rem)] shrink-0 snap-start",
                  "sm:w-[calc(50%-0.625rem)]",
                  "lg:w-[calc((100%-3.75rem)/3)]",
                  "xl:w-[calc((100%-5rem)/4)]",
                )}
              >
                <motion.article
                  className={cn(
                    "flex h-full flex-col overflow-hidden",
                    cardHoverClassName,
                  )}
                  {...cardHover}
                >
                  <Link
                    href={`/${lang}/product/${product.slug}`}
                    className="block overflow-hidden rounded-2xl bg-neutral-50 p-2"
                    draggable={false}
                  >
                    <MediaImage
                      src={product.images?.[0]?.src ?? product.imageSrc}
                      alt={product.images?.[0]?.alt ?? product.imageAlt ?? product.name}
                      aspect="4/5"
                      fit="contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
                      className="h-full w-full rounded-2xl bg-neutral-50"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <Link
                      href={`/${lang}/product/${product.slug}`}
                      draggable={false}
                    >
                      <h3 className="text-base font-bold tracking-tight text-foreground transition-colors hover:text-heading sm:text-lg">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="flex-1 text-sm leading-relaxed text-muted">
                      {product.summary}
                    </p>
                    {badges.length > 0 ? (
                      <ul className="flex flex-wrap gap-2">
                        {badges.map((spec) => (
                          <li key={spec.label} className="badge-status-outline">
                            {spec.value}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {product.priceLabel ? (
                      <div className="flex flex-wrap items-baseline gap-2 border-t border-border pt-3">
                        {product.compareAtPriceLabel ? (
                          <span className="text-sm tabular-nums text-muted line-through">
                            {product.compareAtPriceLabel}
                          </span>
                        ) : null}
                        <span className="text-base font-bold tabular-nums text-accent-alt">
                          {product.priceLabel}
                        </span>
                      </div>
                    ) : null}
                    <MotionLink
                      href={`/${lang}/product/${product.slug}`}
                      className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-lg bg-accent px-5 text-sm font-bold uppercase tracking-wide text-accent-fg transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      draggable={false}
                    >
                      {orderCta}
                    </MotionLink>
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
