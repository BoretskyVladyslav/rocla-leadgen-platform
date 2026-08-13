"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Dictionary } from "@/data/dictionary";
import { cn } from "@/lib/utils";

export interface ReviewsCarouselProps {
  copy: Dictionary["reviews"];
}

export function ReviewsCarousel({ copy }: ReviewsCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const items = copy.items;
  const [active, setActive] = useState(0);

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelectorAll<HTMLElement>("[data-review-card]")[index];
    if (!card) return;
    const left = card.offsetLeft - track.offsetLeft;
    track.scrollTo({ left, behavior: "smooth" });
  }

  function go(direction: -1 | 1) {
    const next = (active + direction + items.length) % items.length;
    setActive(next);
    scrollToIndex(next);
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onScroll() {
      const el = trackRef.current;
      if (!el) return;
      const cards = el.querySelectorAll<HTMLElement>("[data-review-card]");
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
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, index) => (
            <li
              key={`${item.company}-${item.author}`}
              data-review-card
              className={cn(
                "w-[min(100%,20rem)] shrink-0 snap-start",
                "sm:w-[calc(50%-0.75rem)]",
                "lg:w-[calc((100%-3rem)/2.35)]",
              )}
            >
              <ReviewCard item={item} active={active === index} />
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center gap-2" role="tablist">
          {items.map((item, index) => (
            <button
              key={`${item.company}-dot`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-label={item.company}
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

function ReviewCard({
  item,
  active,
}: {
  item: Dictionary["reviews"]["items"][number];
  active: boolean;
}) {
  return (
    <motion.article
      layout
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow",
        active
          ? "border-accent shadow-md"
          : "border-gray-200 hover:shadow-md",
      )}
    >
      <div className="flex flex-1 flex-col gap-4 p-5">
        <p className="text-sm leading-relaxed text-muted">{item.text}</p>
        <div>
          <p className="badge-status w-fit">{item.company}</p>
          <p className="mt-2 text-xs uppercase tracking-wide text-muted">
            {item.author}
          </p>
        </div>
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
