"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Dictionary } from "@/data/dictionary";
import { useCarouselTrack } from "@/hooks/useCarouselTrack";
import { cn } from "@/lib/utils";

export interface ReviewsCarouselProps {
  copy: Dictionary["reviews"];
}

type ReviewItem = Dictionary["reviews"]["items"][number];

export function ReviewsCarousel({ copy }: ReviewsCarouselProps) {
  const items = copy.items;
  const getKey = useCallback(
    (item: ReviewItem) => `${item.company}-${item.author}`,
    [],
  );

  const {
    trackRef,
    loopedItems,
    activeLogical,
    go,
    goToLogical,
    dragHandlers,
    trackClassName,
  } = useCarouselTrack({
    items,
    getKey,
    cardSelector: "[data-review-card]",
    infinite: true,
    stepMode: "item",
    gapClassName: "gap-6",
  });

  return (
    <section id="reviews" className="scroll-mt-20 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="section-heading sm:text-left">{copy.title}</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous review"
                onClick={() => go(-1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border-2 border-dark bg-white text-lg font-bold text-heading shadow-sm transition-colors hover:border-accent hover:bg-accent"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next review"
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
          className={cn("mt-10", trackClassName)}
          {...dragHandlers}
        >
          {loopedItems.map(({ item, key, logical }) => (
            <li
              key={key}
              data-review-card
              className={cn(
                "w-[min(100%,20rem)] shrink-0 snap-start",
                "sm:w-[calc(50%-0.75rem)]",
                "lg:w-[calc((100%-3rem)/3)]",
              )}
            >
              <ReviewCard item={item} active={activeLogical === logical} />
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center gap-2" role="tablist">
          {items.map((item, index) => (
            <button
              key={`${item.company}-dot`}
              type="button"
              role="tab"
              aria-selected={activeLogical === index}
              aria-label={item.company}
              onClick={() => goToLogical(index)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-colors",
                activeLogical === index
                  ? "bg-accent"
                  : "bg-border hover:bg-muted",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({
  item,
  active,
}: {
  item: ReviewItem;
  active: boolean;
}) {
  return (
    <motion.article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow",
        active
          ? "border-accent shadow-md"
          : "border-gray-200 hover:shadow-md",
      )}
    >
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="badge-status w-fit">{item.company}</p>
          {item.date ? (
            <time className="shrink-0 text-xs text-muted">{item.date}</time>
          ) : null}
        </div>
        <p className="text-sm leading-relaxed text-muted">{item.text}</p>
        <p className="mt-auto text-xs uppercase tracking-wide text-muted">
          {item.author}
        </p>
      </div>
      <MediaPlaceholder
        aspect="4/3"
        label={item.imageAlt}
        sizeHint="4:3"
        bordered={false}
      />
    </motion.article>
  );
}
