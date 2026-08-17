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

    return (
      <section
        className={cn("flex items-center gap-3 py-3 md:gap-4", className)}
        aria-label={copy.compactTitle}
      >
        <p className="max-w-[80px] shrink-0 text-xs font-extrabold leading-tight text-gray-800 uppercase md:text-sm">
          {headingWords.map((word, index) => (
            <span key={`${word}-${index}`}>
              {index > 0 ? <br /> : null}
              {word}
            </span>
          ))}
        </p>
        <ul className="flex w-full min-w-0 flex-nowrap items-center justify-between gap-2 overflow-x-auto md:gap-3 md:overflow-visible">
          {copy.logos.map((logo) => (
            <li key={logo.name} className="shrink-0">
              <LogoMark
                name={logo.name}
                imageSrc={logo.imageSrc}
                className="h-11 max-h-none max-w-[130px] w-auto shrink-0 cursor-pointer object-contain opacity-80 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0 md:h-14 lg:h-16"
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
