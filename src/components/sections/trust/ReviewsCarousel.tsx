"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  staggerContainer,
  staggerItem,
} from "@/components/motion/variants";
import { MediaImage } from "@/components/ui/MediaImage";
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
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <ScrollReveal>
          <div className="mb-8 flex flex-row items-end justify-between gap-4">
            <h2 className="text-left text-2xl font-bold uppercase tracking-[0.08em] text-heading sm:text-3xl">
              {copy.title}
            </h2>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label="Previous review"
                onClick={() => go(-1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border-2 border-dark bg-white text-lg font-bold text-heading shadow-sm transition-colors hover:border-accent hover:bg-accent"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next review"
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
          {loopedItems.map(({ item, key, logical }) => (
            <motion.li
              key={key}
              data-review-card
              variants={staggerItem}
              className={cn(
                "w-[min(100%,20rem)] shrink-0 snap-start",
                "sm:w-[calc(50%-0.75rem)]",
                "lg:w-[calc((100%-3rem)/3)]",
              )}
            >
              <ReviewCard item={item} active={activeLogical === logical} />
            </motion.li>
          ))}
        </motion.ul>

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
    <article
      className={cn(
        "flex h-full flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-md",
        active && "border-accent shadow-md",
      )}
    >
      <div className="mb-4 flex flex-1 flex-col justify-start overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <p className="inline-block w-fit rounded-md bg-[#FFCC00]/20 px-2.5 py-1 text-xs font-bold text-neutral-900">
            {item.company}
          </p>
          {item.date ? (
            <time className="shrink-0 text-xs text-muted">{item.date}</time>
          ) : null}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          {item.text}
        </p>
        <p className="mt-3 text-xs tracking-wide text-muted uppercase">
          {item.author}
        </p>
      </div>
      <MediaImage
        src={item.imageSrc}
        alt={item.imageAlt}
        aspect={false}
        fit="cover"
        objectPosition="object-top"
        sizes="(max-width: 640px) 20rem, (max-width: 1024px) 50vw, 33vw"
        className="mt-auto h-80 w-full rounded-xl bg-neutral-100 [&_img]:transition-transform [&_img]:duration-300 hover:[&_img]:scale-105"
      />
    </article>
  );
}
