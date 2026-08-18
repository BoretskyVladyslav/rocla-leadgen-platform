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
    const headingWords = copy.compactTitle.split(" ");
    const logos = [7, 8, 2, 4, 6, 1].flatMap((index) => {
      const logo = copy.logos[index];
      return logo ? [logo] : [];
    });

    return (
      <section
        className={cn(
          "w-full border-t border-b border-[#E2DCF0] bg-[#EDE9F7] py-5 lg:py-6",
          className,
        )}
        aria-label={copy.compactTitle}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-4">
          <p className="shrink-0 text-lg leading-tight font-bold text-gray-900 lg:text-xl">
            {headingWords.map((word, index) => (
              <span key={`${word}-${index}`}>
                {index > 0 ? <br /> : null}
                {word}
              </span>
            ))}
          </p>
          <ul className="flex min-w-0 flex-1 items-center justify-between gap-5 opacity-75 grayscale transition-all hover:opacity-100">
            {logos.map((logo) => (
              <li key={logo.name} className="shrink-0">
                <LogoMark
                  name={logo.name}
                  imageSrc={logo.imageSrc}
                  className="h-10 max-h-none w-auto max-w-[140px] shrink-0 object-contain mix-blend-multiply md:h-12"
                />
              </li>
            ))}
          </ul>
        </div>
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
