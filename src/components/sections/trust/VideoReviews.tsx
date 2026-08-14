"use client";

import { Play } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MediaImage } from "@/components/ui/MediaImage";
import type { Dictionary } from "@/data/dictionary";
import { cn } from "@/lib/utils";

export interface VideoReviewsProps {
  copy: Dictionary["videos"];
  className?: string;
}

export function VideoReviews({ copy, className }: VideoReviewsProps) {
  return (
    <section
      id="videos"
      className={cn("scroll-mt-20 bg-purple-50/50 py-16 md:py-24", className)}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
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
            <li key={item.title} className="flex justify-center">
              <ScrollReveal delay={index * 0.05} className="w-full max-w-[240px]">
                <a
                  href={copy.youtubeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative mx-auto block aspect-[9/16] min-h-[380px] max-w-[240px] overflow-hidden rounded-2xl border border-border bg-dark shadow-md"
                >
                  <MediaImage
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    aspect={false}
                    fit="cover"
                    sizes="240px"
                    className="absolute inset-0 h-full w-full opacity-90 transition-[filter] duration-300 group-hover:brightness-90"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/30" />
                  <p className="pointer-events-none absolute inset-x-0 top-0 z-10 p-4 text-left text-sm font-bold leading-snug text-white drop-shadow">
                    {item.title}
                  </p>
                  <span className="absolute right-3 bottom-3 z-10 rounded-md bg-black/75 px-2 py-0.5 text-xs font-bold tabular-nums text-white">
                    {item.duration}
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 z-10 flex items-center justify-center"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/80 text-heading backdrop-blur-sm transition-transform group-hover:scale-110">
                      <Play
                        className="ml-0.5 h-7 w-7 fill-current"
                        aria-hidden
                      />
                    </span>
                  </span>
                  <span className="sr-only">{item.title}</span>
                </a>
              </ScrollReveal>
            </li>
          ))}
        </ul>

        <ScrollReveal delay={0.12}>
          <div className="mt-10 flex justify-center">
            <a
              href={copy.youtubeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-6 text-sm font-bold uppercase tracking-wide text-accent-fg transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 cta-glow cta-shine"
            >
              {copy.youtubeCta}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
