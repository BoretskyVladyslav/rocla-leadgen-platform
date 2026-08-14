"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  StaggerItem,
  StaggerReveal,
} from "@/components/motion/StaggerReveal";
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

export function ClientLogos({ copy }: ClientLogosProps) {
  return (
    <section className="bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <ScrollReveal>
          <h2 className="section-heading">{copy.title}</h2>
        </ScrollReveal>

        <StaggerReveal className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3">
          {copy.logos.map((logo) => (
            <StaggerItem key={logo.name}>
              <div className="flex h-24 items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 shadow-xs transition-shadow hover:shadow-md">
                <LogoMark name={logo.name} imageSrc={logo.imageSrc} />
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
