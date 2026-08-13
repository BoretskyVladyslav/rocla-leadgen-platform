"use client";

import { useId, useState } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Dictionary } from "@/data/dictionary";

export interface SeoTextAccordionProps {
  copy: Dictionary["seoText"];
}

export function SeoTextAccordion({ copy }: SeoTextAccordionProps) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <ScrollReveal className="max-w-4xl">
          <h2 className="text-xl font-bold tracking-tight text-heading sm:text-2xl">
            {copy.title}
          </h2>
          <div className="mt-5 flex flex-col gap-4 text-sm leading-relaxed text-muted sm:text-base">
            {copy.preview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {expanded ? (
              <div id={contentId} className="flex flex-col gap-4">
                {copy.rest.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}
          </div>
          <button
            type="button"
            className="mt-5 text-sm font-bold text-heading underline decoration-accent underline-offset-4 transition-colors hover:text-accent-alt"
            aria-expanded={expanded}
            aria-controls={contentId}
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? copy.readLess : copy.readMore}
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
