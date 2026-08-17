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
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="section-heading">{copy.title}</h2>
        </ScrollReveal>
        <ul
          className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
          aria-label={copy.title}
        >
          {copy.logos.map((logo) => (
            <li
              key={logo.name}
              className="flex h-20 items-center justify-center rounded-lg border border-gray-200 bg-white p-4"
            >
              <LogoMark name={logo.name} imageSrc={logo.imageSrc} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
