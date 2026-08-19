"use client";

import { useId, useState } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Dictionary } from "@/data/dictionary";
import { cn } from "@/lib/utils";
import { PAGE_CONTAINER } from "@/lib/layout";

export interface SeoTextAccordionProps {
  copy: Dictionary["seoText"];
  className?: string;
}

export function SeoTextAccordion({ copy, className }: SeoTextAccordionProps) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();

  return (
    <section className={cn("border-t border-gray-100 bg-white py-10 md:py-14 xl:py-[36px]", className)}>
      <div className={`${PAGE_CONTAINER} xl:pl-[68px] xl:pr-[352px]`}>
        <ScrollReveal>
          <h2 className="mb-4 text-2xl font-bold text-neutral-900">
            {copy.title}
          </h2>
          <div className="space-y-3 leading-relaxed text-neutral-600">
            {copy.preview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div
              id={contentId}
              className={expanded ? "space-y-3" : "hidden"}
              hidden={!expanded}
            >
              {copy.rest.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
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
