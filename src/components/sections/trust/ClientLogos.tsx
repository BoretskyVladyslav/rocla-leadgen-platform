"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Dictionary } from "@/data/dictionary";

export interface ClientLogosProps {
  copy: Dictionary["clients"];
}

export function ClientLogos({ copy }: ClientLogosProps) {
  const logos = [...copy.logos, ...copy.logos];

  return (
    <section className="bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <ScrollReveal>
          <h2 className="section-heading">{copy.title}</h2>
        </ScrollReveal>

        {/* Mobile + reduced-motion: all logos in a wrapping grid */}
        <ul
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 motion-safe:sm:hidden"
          aria-label={copy.title}
        >
          {copy.logos.map((logo) => (
            <li
              key={logo.name}
              className="flex h-24 items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 shadow-sm"
            >
              <span className="text-center text-sm font-bold uppercase tracking-wide text-heading">
                {logo.name}
              </span>
            </li>
          ))}
        </ul>

        {/* sm+ with motion: infinite marquee */}
        <div className="group/marquee relative mt-10 hidden overflow-hidden motion-safe:sm:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-surface to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-surface to-transparent sm:w-16" />
          <ul
            className="logo-marquee flex w-max gap-4 py-1 group-hover/marquee:[animation-play-state:paused]"
            aria-label={copy.title}
          >
            {logos.map((logo, index) => (
              <li
                key={`${logo.name}-${index}`}
                className="flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 shadow-sm sm:w-52"
                aria-hidden={index >= copy.logos.length}
              >
                <span className="text-center text-sm font-bold uppercase tracking-wide text-heading">
                  {logo.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
