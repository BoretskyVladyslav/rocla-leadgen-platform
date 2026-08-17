"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  StaggerItem,
  StaggerReveal,
} from "@/components/motion/StaggerReveal";
import type { Dictionary } from "@/data/dictionary";
import { PAGE_CONTAINER } from "@/lib/layout";

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
    <section id="about" className="w-full scroll-mt-20 bg-[#F4F6F8] py-12">
      <div id="services" className={`${PAGE_CONTAINER} scroll-mt-20`}>
        <ScrollReveal>
          <h2 className="section-heading">{copy.title}</h2>
        </ScrollReveal>
        <div className="mt-10 w-full rounded-lg border border-gray-100 bg-white p-8 shadow-sm sm:p-12">
          <StaggerReveal className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2 lg:gap-y-8">
            {copy.items.map((item) => (
              <StaggerItem key={item.label}>
                <div className="flex items-start gap-4 p-2">
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
