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
}

function LogoMark({
  name,
  imageSrc,
}: {
  name: string;
  imageSrc: string | null;
}) {
  const [failed, setFailed] = useState(!imageSrc);

  if (failed || !imageSrc) {
    return (
      <span className="text-center text-sm font-extrabold uppercase tracking-wide text-heading">
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
      className="h-auto max-h-10 w-auto object-contain"
      onError={() => setFailed(true)}
    />
  );
}

export function ClientLogos({ copy, className }: ClientLogosProps) {
  return (
    <section className={cn("w-full bg-[#F4F6F8] pb-12", className)}>
      <div className={PAGE_CONTAINER}>
        <ScrollReveal>
          <h2 className="section-heading">{copy.title}</h2>
        </ScrollReveal>
        <ul
          className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5"
          aria-label={copy.title}
        >
          {copy.logos.map((logo) => (
            <li
              key={logo.name}
              className="flex h-24 w-full items-center justify-center rounded-lg border border-gray-200 bg-white p-4"
            >
              <LogoMark name={logo.name} imageSrc={logo.imageSrc} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
