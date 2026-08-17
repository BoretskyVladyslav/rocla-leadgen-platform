"use client";

import { useState } from "react";
import Link from "next/link";
import { HashLink } from "@/components/layout/HashLink";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  StaggerItem,
  StaggerReveal,
} from "@/components/motion/StaggerReveal";
import { Button } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import type { Dictionary } from "@/data/dictionary";
import { cn } from "@/lib/utils";
import { PAGE_CONTAINER } from "@/lib/layout";

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
    <section id="catalog" className="scroll-mt-20 bg-[#F5F5F5] py-10 md:py-14">
      <div className={PAGE_CONTAINER}>
        <ScrollReveal>
          <h2 className="section-heading">{copy.title}</h2>
        </ScrollReveal>
        <StaggerReveal className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
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
            const tileClassName =
              "group flex aspect-[4/5] min-h-[320px] h-full flex-col items-center justify-between rounded-none border border-[#FBBA00] bg-white px-4 py-8 md:rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";

            const cardBody = (
              <>
                <h3 className="shrink-0 text-center text-sm font-bold tracking-wide text-neutral-900 uppercase sm:text-base">
                  {item.title}
                </h3>
                <MediaImage
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  aspect={false}
                  fit="contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                  className="mt-4 flex min-h-0 w-full flex-1 items-center justify-center bg-white [&_img]:object-contain [&_img]:p-4 [&_img]:transition-transform [&_img]:duration-300 group-hover:[&_img]:scale-105"
                />
              </>
            );

            return (
              <StaggerItem
                key={item.title}
                className={cn(hiddenOnMobile && "hidden lg:block")}
              >
                {isProduct ? (
                  <Link href={href} className={tileClassName}>
                    {cardBody}
                  </Link>
                ) : (
                  <HashLink href={href} className={tileClassName}>
                    {cardBody}
                  </HashLink>
                )}
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
