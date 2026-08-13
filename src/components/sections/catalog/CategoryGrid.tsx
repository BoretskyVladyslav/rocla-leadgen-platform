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
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Dictionary } from "@/data/dictionary";
import { cn } from "@/lib/utils";

export interface CategoryGridProps {
  lang: string;
  copy: Dictionary["categories"];
}

const MOBILE_PREVIEW = 4;
const PRIMARY_PRODUCT_SLUG = "hydraulic-pallet-truck-2t";
const iconClass = "h-6 w-6 sm:h-7 sm:w-7";

function PalletIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 16h16v3H4v-3Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6 16V8h12v8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 8V5h6v3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function StackerIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 20V6h4v14" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M11 9h7v3H11M11 14h7v3H11"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function TableIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 14h14l-2 5H7l-2-5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M8 14V8h8v6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function ServiceIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ReachIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 18V8h7v10" stroke="currentColor" strokeWidth="1.7" />
      <path d="M11 11h8v3" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="7" cy="19" r="1.4" fill="currentColor" />
      <circle cx="16" cy="19" r="1.4" fill="currentColor" />
    </svg>
  );
}

function ForkliftIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 17h9V8H7L3 12v5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M12 11h7v2H12M19 8v10" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="7" cy="19" r="1.4" fill="currentColor" />
      <circle cx="16" cy="19" r="1.4" fill="currentColor" />
    </svg>
  );
}

function LiftIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 20 12 5l5 15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9 14h6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function PartsIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="8" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16" cy="16" r="2.4" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

const CATEGORY_ICONS = [
  <PalletIcon key="pallet" />,
  <StackerIcon key="stacker" />,
  <TableIcon key="table" />,
  <ServiceIcon key="service" />,
  <ReachIcon key="reach" />,
  <ForkliftIcon key="forklift" />,
  <LiftIcon key="lift" />,
  <PartsIcon key="parts" />,
];

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
              "group flex h-full flex-col overflow-hidden",
              cardHoverClassName,
            );

            const cardBody = (
              <>
                <MediaPlaceholder
                  aspect="4/3"
                  label={item.imageAlt}
                  bordered={false}
                  icon={CATEGORY_ICONS[index]}
                  className="min-h-0"
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
