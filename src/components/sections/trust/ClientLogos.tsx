"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/data/dictionary";

export interface ClientLogosProps {
  copy: Dictionary["clients"];
  className?: string;
}

function LogoMark({
  name,
  imageSrc,
}: {
  name: string;
  imageSrc: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-center text-xs font-bold uppercase tracking-wide text-heading sm:text-sm">
        {name}
      </span>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={name}
      width={160}
      height={48}
      className="h-auto max-h-12 w-auto object-contain"
      onError={() => setFailed(true)}
    />
  );
}

export function ClientLogos({ copy, className }: ClientLogosProps) {
  const logos = [...copy.logos, ...copy.logos];

  return (
    <section className={cn("bg-white py-14", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="section-heading">{copy.title}</h2>
        </ScrollReveal>

        <div className="group/marquee mt-10 overflow-hidden select-none">
          <ul
            className="logo-marquee flex w-max whitespace-nowrap py-1 group-hover/marquee:[animation-play-state:paused]"
            aria-label={copy.title}
          >
            {logos.map((logo, index) => (
              <li
                key={`${logo.name}-${index}`}
                className="mx-3 inline-flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 shadow-xs transition-shadow hover:shadow-md md:w-52"
                aria-hidden={index >= copy.logos.length}
              >
                <LogoMark name={logo.name} imageSrc={logo.imageSrc} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
