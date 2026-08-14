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
      <div className="mx-auto max-w-5xl px-4 py-10">
        <ScrollReveal>
          <h2 className="mb-4 text-2xl font-bold text-neutral-900">
            {copy.title}
          </h2>
          <div className="space-y-3 leading-relaxed text-neutral-600">
            {copy.preview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {expanded ? (
              <div id={contentId} className="space-y-3">
                {copy.rest.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}
          </div>
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-1 font-semibold text-amber-500 hover:underline"
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
