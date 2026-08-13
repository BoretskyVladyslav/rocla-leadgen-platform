"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Dictionary } from "@/data/dictionary";

export interface ReviewsCarouselProps {
  copy: Dictionary["reviews"];
}

export function ReviewsCarousel({ copy }: ReviewsCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const items = copy.items;

  function scrollByCard(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-review-card]");
    const gap = 24;
    const amount = (card?.offsetWidth ?? track.clientWidth * 0.85) + gap;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

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
                onClick={() => scrollByCard(-1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border-2 border-dark bg-white text-lg font-bold text-heading shadow-sm transition-colors hover:border-accent hover:bg-accent"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next review"
                onClick={() => scrollByCard(1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border-2 border-dark bg-white text-lg font-bold text-heading shadow-sm transition-colors hover:border-accent hover:bg-accent"
              >
                →
              </button>
            </div>
          </div>
        </ScrollReveal>

        <ul
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, index) => (
            <li
              key={`${item.company}-${item.author}`}
              data-review-card
              className="w-[min(100%,22rem)] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <ScrollReveal delay={index * 0.06}>
                <ReviewCard item={item} />
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ReviewCard({
  item,
}: {
  item: Dictionary["reviews"]["items"][number];
}) {
  return (
    <motion.article
      layout
      className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
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
