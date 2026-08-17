"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { PAGE_CONTAINER } from "@/lib/layout";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/data/dictionary";

export interface ClientLogosProps {
  copy: Dictionary["clients"];
  className?: string;
  variant?: "marquee" | "compact";
}

function LogoMark({
  name,
  imageSrc,
  className,
}: {
  name: string;
  imageSrc: string;
  className?: string;
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
      sizes="160px"
      loading="lazy"
      className={cn("h-auto max-h-10 w-auto object-contain", className)}
      onError={() => setFailed(true)}
    />
  );
}

export function ClientLogos({
  copy,
  className,
  variant = "marquee",
}: ClientLogosProps) {
  if (variant === "compact") {
    return (
      <section
        className={cn(
          "flex flex-wrap items-center gap-x-6 gap-y-3 py-3",
          className,
        )}
        aria-label={copy.title}
      >
        <p className="shrink-0 text-sm font-semibold text-heading">
          {copy.title}
        </p>
        <ul className="flex min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-2">
          {copy.logos.map((logo) => (
            <li key={logo.name} className="shrink-0">
              <LogoMark
                name={logo.name}
                imageSrc={logo.imageSrc}
                className="max-h-8 opacity-70 grayscale"
              />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  const logos = [...copy.logos, ...copy.logos];

  return (
    <section className={cn("w-full bg-[#F5F5F5] pb-6", className)}>
      <div className={PAGE_CONTAINER}>
        <ScrollReveal>
          <h2 className="section-heading">{copy.title}</h2>
        </ScrollReveal>
      </div>

      <div className="group/marquee mt-4 overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul
          className="logo-marquee flex w-max items-center whitespace-nowrap py-1 group-hover/marquee:[animation-play-state:paused]"
          aria-label={copy.title}
        >
          {logos.map((logo, index) => (
            <li
              key={`${logo.name}-${index}`}
              className="mx-2 flex h-24 w-48 flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-4"
              aria-hidden={index >= copy.logos.length}
            >
              <LogoMark name={logo.name} imageSrc={logo.imageSrc} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
