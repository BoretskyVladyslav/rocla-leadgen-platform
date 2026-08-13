"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Dictionary } from "@/data/dictionary";

export interface VideoReviewsProps {
  copy: Dictionary["videos"];
}

export function VideoReviews({ copy }: VideoReviewsProps) {
  return (
    <section id="videos" className="scroll-mt-20 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <ScrollReveal>
          <h2 className="section-heading">{copy.title}</h2>
        </ScrollReveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.items.map((item, index) => (
            <li key={item.title}>
              <ScrollReveal delay={index * 0.05}>
                <a
                  href="#contact"
                  className="group relative block aspect-video overflow-hidden rounded-xl border border-border bg-dark shadow-sm"
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
                  <div className="absolute inset-0 flex flex-col justify-between p-4">
                    <p className="text-sm font-bold leading-snug text-white">
                      {item.title}
                    </p>
                    <span
                      aria-hidden
                      className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform group-hover:scale-110"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="ml-0.5 h-6 w-6 fill-current"
                        aria-hidden
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span className="sr-only">{item.title}</span>
                  </div>
                </a>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
