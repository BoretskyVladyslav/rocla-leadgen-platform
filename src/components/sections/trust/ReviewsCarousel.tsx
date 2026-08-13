"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
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
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <ScrollReveal>
          <h2 className="text-center text-2xl font-bold uppercase tracking-[0.08em] text-heading sm:text-3xl">
            {copy.title}
          </h2>
        </ScrollReveal>

        <div className="mt-10 md:hidden">
          <ReviewCard item={items[active]} />
        </div>

        <ul className="mt-10 hidden gap-6 md:grid md:grid-cols-3">
          {items.map((item) => (
            <li key={`${item.company}-${item.author}`}>
              <ReviewCard item={item} />
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
      className="flex h-full flex-col overflow-hidden border border-border bg-white shadow-sm"
    >
      <div className="flex flex-1 flex-col gap-4 p-5">
        <p className="text-sm leading-relaxed text-muted">{item.text}</p>
        <div>
          <p className="text-sm font-bold tracking-tight text-heading">{item.company}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-muted">{item.author}</p>
        </div>
      </div>
      <div className="relative aspect-[16/10] w-full bg-surface">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 768px) 30vw, 90vw"
          className="object-cover"
        />
      </div>
    </motion.article>
  );
}
