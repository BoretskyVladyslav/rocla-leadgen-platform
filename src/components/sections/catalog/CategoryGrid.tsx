"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HashLink } from "@/components/layout/HashLink";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  StaggerItem,
  StaggerReveal,
} from "@/components/motion/StaggerReveal";
import { cardHover, cardHoverClassName } from "@/components/motion/variants";
import { Button } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import type { Dictionary } from "@/data/dictionary";
import { cn } from "@/lib/utils";

export interface CategoryGridProps {
  lang: string;
  copy: Dictionary["categories"];
}

const MOBILE_PREVIEW = 4;
const PRIMARY_PRODUCT_SLUG = "hydraulic-pallet-truck-2t";

export function CategoryGrid({ lang, copy }: CategoryGridProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = copy.items.length > MOBILE_PREVIEW;

  return (
    <section id="catalog" className="scroll-mt-20 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <ScrollReveal>
          <h2 className="section-heading">{copy.title}</h2>
        </ScrollReveal>
        <StaggerReveal className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {copy.items.map((item, index) => {
            const productSlug =
              index === 0
                ? (item.productSlug ?? PRIMARY_PRODUCT_SLUG)
                : item.productSlug;
            const isProduct = Boolean(productSlug);
            const href = isProduct
              ? `/${lang}/product/${productSlug}`
              : `/${lang}#contact`;
            const hiddenOnMobile = !expanded && index >= MOBILE_PREVIEW;
            const tileClassName = cn(
              "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm",
              cardHoverClassName,
            );

            const cardBody = (
              <>
                <MediaImage
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  aspect="4/3"
                  fit="contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="min-h-0 border-b border-border"
                />
                <div className="flex flex-col gap-1 px-4 py-3 sm:px-5">
                  <h3 className="text-sm font-bold tracking-tight text-heading sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted">{item.subtitle}</p>
                  <p className="text-sm font-bold tabular-nums text-accent-alt">
                    {item.priceLabel}
                  </p>
                </div>
              </>
            );

            return (
              <StaggerItem
                key={item.title}
                className={cn(hiddenOnMobile && "hidden lg:block")}
              >
                <motion.div className="h-full" {...cardHover}>
                  {isProduct ? (
                    <Link href={href} className={tileClassName}>
                      {cardBody}
                    </Link>
                  ) : (
                    <HashLink href={href} className={tileClassName}>
                      {cardBody}
                    </HashLink>
                  )}
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerReveal>

        {hasMore && !expanded ? (
          <div className="mt-8 flex justify-center lg:hidden">
            <Button type="button" onClick={() => setExpanded(true)}>
              {copy.showAll}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
