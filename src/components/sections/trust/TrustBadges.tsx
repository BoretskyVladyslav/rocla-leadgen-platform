"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  StaggerItem,
  StaggerReveal,
} from "@/components/motion/StaggerReveal";
import type { Dictionary } from "@/data/dictionary";

export interface TrustBadgesProps {
  copy: Dictionary["advantages"];
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8.2 6.4 11l6.1-6.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrustBadges({ copy }: TrustBadgesProps) {
  return (
    <section id="about" className="scroll-mt-20 bg-neutral-50/80 py-12">
      <div
        id="services"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 sm:px-6"
      >
        <ScrollReveal>
          <h2 className="section-heading">{copy.title}</h2>
        </ScrollReveal>
        <div className="mx-auto mt-10 max-w-6xl rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-xs sm:p-12">
          <StaggerReveal className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2 lg:gap-y-8">
            {copy.items.map((item) => (
              <StaggerItem key={item.label}>
                <div className="flex items-start gap-4 rounded-xl p-2 transition-colors hover:bg-neutral-50/80">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#FFCC00] bg-amber-50 text-amber-500">
                    <CheckIcon />
                  </span>
                  <div>
                    <h3 className="mb-1 text-base font-bold text-neutral-900 md:text-lg">
                      {item.label}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
