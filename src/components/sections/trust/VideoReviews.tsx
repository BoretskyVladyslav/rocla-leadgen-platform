"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Dictionary } from "@/data/dictionary";

export interface VideoReviewsProps {
  copy: Dictionary["videos"];
}

export function VideoReviews({ copy }: VideoReviewsProps) {
  return (
    <section id="videos" className="scroll-mt-20 bg-surface-muted">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-heading">{copy.title}</h2>
            {copy.subtitle ? (
              <p className="mt-3 text-base leading-relaxed text-muted">
                {copy.subtitle}
              </p>
            ) : null}
          </div>
        </ScrollReveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {copy.items.map((item, index) => (
            <li key={item.title}>
              <ScrollReveal delay={index * 0.05}>
                <a
                  href="#contact"
                  className="group relative block aspect-video overflow-hidden rounded-2xl border border-border bg-dark shadow-md"
                >
                  <MediaPlaceholder
                    aspect="16/9"
                    label={item.imageAlt}
                    bordered={false}
                    className="h-full opacity-90 transition-[filter] duration-300 group-hover:brightness-90"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/25" />
                  <p className="pointer-events-none absolute inset-x-0 top-0 z-10 p-4 text-left text-sm font-bold leading-snug text-white drop-shadow">
                    {item.title}
                  </p>
                  <span
                    aria-hidden
                    className="absolute inset-0 z-10 flex items-center justify-center"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform group-hover:scale-110">
                      <svg
                        viewBox="0 0 24 24"
                        className="ml-0.5 h-7 w-7 fill-current"
                        aria-hidden
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                  <span className="sr-only">{item.title}</span>
                </a>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
