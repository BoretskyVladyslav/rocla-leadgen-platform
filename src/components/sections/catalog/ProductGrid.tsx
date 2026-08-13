"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MotionLink } from "@/components/motion/MotionLink";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  StaggerItem,
  StaggerReveal,
} from "@/components/motion/StaggerReveal";
import { cardHover, cardHoverClassName } from "@/components/motion/variants";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Dictionary } from "@/data/dictionary";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

export interface ProductGridProps {
  lang: string;
  products: Product[];
  copy: Dictionary["catalog"];
  title?: string;
  sectionId?: string;
  orderCta?: string;
}

export function ProductGrid({
  lang,
  products,
  copy,
  title,
  sectionId = "catalog",
  orderCta,
}: ProductGridProps) {
  return (
    <section id={sectionId} className="scroll-mt-20 bg-surface-muted">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <ScrollReveal>
          {!title ? (
            <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-accent-alt">
              {copy.eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-center text-2xl font-bold uppercase tracking-[0.08em] text-heading sm:text-3xl">
            {title ?? copy.title}
          </h2>
          {!title ? (
            <p className="mx-auto mt-3 max-w-xl text-center text-base leading-relaxed text-muted">
              {copy.subtitle}
            </p>
          ) : null}
        </ScrollReveal>
        <StaggerReveal className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const badges = (product.specs ?? []).slice(0, 3);

            return (
              <StaggerItem key={product.slug} className="min-w-0">
                <motion.article
                  className={cn(
                    "flex h-full flex-col overflow-hidden",
                    cardHoverClassName,
                  )}
                  {...cardHover}
                >
                  <Link
                    href={`/${lang}/product/${product.slug}`}
                    className="group block border-b border-border"
                  >
                    <MediaPlaceholder
                      aspect="4/3"
                      label={copy.imageFallback}
                      bordered={false}
                      className="transition-[filter] duration-300 group-hover:brightness-[0.98]"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <Link href={`/${lang}/product/${product.slug}`}>
                      <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors hover:text-heading">
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
                        {product.discountLabel ? (
                          <span className="badge-status -rotate-3">
                            {product.discountLabel}
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                    <MotionLink
                      href={`/${lang}/product/${product.slug}`}
                      className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-lg bg-accent px-5 text-sm font-bold uppercase tracking-wide text-accent-fg transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      {orderCta ?? copy.requestQuote}
                    </MotionLink>
                  </div>
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
