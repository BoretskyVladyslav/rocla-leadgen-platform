"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MotionLink } from "@/components/motion/MotionLink";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Dictionary } from "@/data/dictionary";
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
  copy,
  title,
  orderCta,
}: RelatedProductsCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelectorAll<HTMLElement>("[data-related-card]")[
      index
    ];
    if (!card) return;
    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
  }

  function go(direction: -1 | 1) {
    if (products.length === 0) return;
    const next = (active + direction + products.length) % products.length;
    setActive(next);
    scrollToIndex(next);
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onScroll() {
      const el = trackRef.current;
      if (!el) return;
      const cards = el.querySelectorAll<HTMLElement>("[data-related-card]");
      let nearest = 0;
      let nearestDist = Number.POSITIVE_INFINITY;
      cards.forEach((card, index) => {
        const dist = Math.abs(card.offsetLeft - el.offsetLeft - el.scrollLeft);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = index;
        }
      });
      setActive(nearest);
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  if (products.length === 0) return null;

  return (
    <section id="related" className="scroll-mt-20 bg-surface-muted">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-center text-2xl font-bold uppercase tracking-[0.08em] text-heading sm:text-left sm:text-3xl">
              {title}
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous product"
                onClick={() => go(-1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border-2 border-dark bg-white text-lg font-bold text-heading shadow-sm transition-colors hover:border-accent hover:bg-accent"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next product"
                onClick={() => go(1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border-2 border-dark bg-white text-lg font-bold text-heading shadow-sm transition-colors hover:border-accent hover:bg-accent"
              >
                →
              </button>
            </div>
          </div>
        </ScrollReveal>

        <ul
          ref={trackRef}
          className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => {
            const badges = (product.specs ?? []).slice(0, 3);

            return (
              <li
                key={product.slug}
                data-related-card
                className={cn(
                  "w-[min(100%,17.5rem)] shrink-0 snap-start",
                  "sm:w-[calc(50%-0.625rem)]",
                  "lg:w-[calc((100%-3.75rem)/3)]",
                  "xl:w-[calc((100%-5rem)/4)]",
                )}
              >
                <article className="flex h-full flex-col overflow-hidden border-2 border-border bg-white shadow-sm transition-colors hover:border-accent hover:shadow-md">
                  <Link
                    href={`/${lang}/product/${product.slug}`}
                    className="block border-b border-border"
                  >
                    <MediaPlaceholder
                      aspect="4/3"
                      label={copy.imageFallback}
                      sizeHint="4:3"
                      bordered={false}
                    />
                  </Link>
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <Link href={`/${lang}/product/${product.slug}`}>
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
                          <span className="text-sm text-muted line-through">
                            {product.compareAtPriceLabel}
                          </span>
                        ) : null}
                        <span className="text-base font-bold text-accent-alt">
                          {product.priceLabel}
                        </span>
                      </div>
                    ) : null}
                      <MotionLink
                        href={`/${lang}/product/${product.slug}`}
                        className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-md bg-accent px-5 text-sm font-bold uppercase tracking-wide text-accent-fg transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      >
                        {orderCta}
                      </MotionLink>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex justify-center gap-2" role="tablist">
          {products.map((product, index) => (
            <button
              key={`${product.slug}-dot`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-label={product.name}
              onClick={() => {
                setActive(index);
                scrollToIndex(index);
              }}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-colors",
                active === index ? "bg-accent" : "bg-border hover:bg-muted",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
