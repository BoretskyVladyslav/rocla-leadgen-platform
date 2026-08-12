"use client";

import { MotionLink } from "@/components/motion/MotionLink";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Dictionary } from "@/data/dictionary";
import { cn } from "@/lib/utils";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-md font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export interface MainHeroProps {
  copy: Dictionary["hero"];
}

export function MainHero({ copy }: MainHeroProps) {
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent-alt">
                {copy.brand}
              </p>
              <h1 className="max-w-xl text-4xl font-bold uppercase tracking-tight text-heading sm:text-5xl lg:text-6xl lg:leading-[1.05]">
                {copy.title}
              </h1>
              <p className="max-w-lg text-base leading-relaxed text-muted sm:text-lg">
                {copy.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <MotionLink
                href="#catalog"
                className={cn(
                  buttonBase,
                  "h-12 px-6 text-sm bg-accent text-accent-fg hover:bg-accent-hover focus-visible:ring-accent",
                )}
              >
                {copy.browseCatalog}
              </MotionLink>
              <MotionLink
                href="#contact"
                className={cn(
                  buttonBase,
                  "h-12 px-6 text-sm bg-dark text-white hover:bg-graphite focus-visible:ring-dark",
                )}
              >
                {copy.requestQuote}
              </MotionLink>
            </div>

            <ul className="grid grid-cols-2 gap-3 border-t border-border pt-8 sm:grid-cols-4">
              {copy.badges.map((badge) => (
                <li key={badge.label} className="flex flex-col gap-2">
                  <span
                    className={
                      badge.tone === "gold"
                        ? "badge-status w-fit"
                        : "badge-status-dark w-fit"
                    }
                  >
                    {badge.label}
                  </span>
                  <p className="text-sm font-semibold tracking-tight text-foreground">
                    {badge.value}
                  </p>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <MediaPlaceholder
              aspect="16/9"
              label="Hero Photo Placeholder"
              sizeHint="1600×900"
              className="border-2 border-accent shadow-sm"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
