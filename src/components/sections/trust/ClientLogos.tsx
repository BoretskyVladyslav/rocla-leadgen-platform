"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Dictionary } from "@/data/dictionary";

export interface ClientLogosProps {
  copy: Dictionary["clients"];
}

function LogoMark({
  name,
  imageSrc,
}: {
  name: string;
  imageSrc: string;
}) {
  const [failed, setFailed] = useState(false);
  const isSvg = imageSrc.endsWith(".svg");

  if (failed) {
    return (
      <span className="text-center text-xs font-bold uppercase tracking-wide text-heading sm:text-sm">
        {name}
      </span>
    );
  }

  if (isSvg) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageSrc}
        alt={name}
        className="max-h-10 w-auto max-w-[7.5rem] object-contain sm:max-h-12 sm:max-w-[9rem]"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={name}
      width={160}
      height={48}
      className="max-h-10 w-auto max-w-[7.5rem] object-contain sm:max-h-12 sm:max-w-[9rem]"
      onError={() => setFailed(true)}
    />
  );
}

export function ClientLogos({ copy }: ClientLogosProps) {
  const logos = [...copy.logos, ...copy.logos];

  return (
    <section className="bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <ScrollReveal>
          <h2 className="section-heading">{copy.title}</h2>
        </ScrollReveal>

        <div
          className="group/marquee relative mt-10 overflow-x-auto overflow-y-hidden motion-safe:overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul
            className="logo-marquee flex w-max gap-3 py-1 sm:gap-4 group-hover/marquee:[animation-play-state:paused]"
            aria-label={copy.title}
          >
            {logos.map((logo, index) => (
              <li
                key={`${logo.name}-${index}`}
                className="flex h-20 w-36 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white px-3 shadow-sm sm:h-24 sm:w-52 sm:px-4"
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
