"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Dictionary } from "@/data/dictionary";
import { cn } from "@/lib/utils";

export interface ReviewsCarouselProps {
  copy: Dictionary["reviews"];
}

export function ReviewsCarousel({ copy }: ReviewsCarouselProps) {
  const [active, setActive] = useState(0);
  const items = copy.items;

  return (
    <section id="reviews" className="scroll-mt-20 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <ScrollReveal>
          <h2 className="text-center text-2xl font-bold uppercase tracking-[0.08em] text-heading sm:text-3xl">
            {copy.title}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.08} className="mt-10 md:hidden">
          <ReviewCard item={items[active]} />
        </ScrollReveal>

        <ul className="mt-10 hidden gap-6 md:grid md:grid-cols-3">
          {items.map((item, index) => (
            <li key={`${item.company}-${item.author}`}>
              <ScrollReveal delay={index * 0.06}>
                <ReviewCard item={item} />
              </ScrollReveal>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center gap-2" role="tablist">
          {items.map((item, index) => (
            <button
              key={`${item.company}-dot`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-label={item.company}
              onClick={() => setActive(index)}
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
          <p className="mt-2 text-xs uppercase tracking-wide text-muted">{item.author}</p>
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
