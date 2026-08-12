"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  items?: FaqItem[];
}

const DEFAULT_ITEMS: FaqItem[] = [
  {
    question: "What file types can I upload with an order inquiry?",
    answer: "PDF, JPG, and PNG. Keep drawings and specs under typical email attachment limits.",
  },
  {
    question: "How quickly do you respond to leads?",
    answer: "Placeholder: response SLAs will be configured per market and product line.",
  },
  {
    question: "Can product pages be localized?",
    answer: "Yes. Routes are language-prefixed via /[lang] for multilingual rollout.",
  },
];

export function FaqAccordion({ items = DEFAULT_ITEMS }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-surface">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="rounded-md border border-border bg-white px-6 py-10 sm:px-10">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-accent-alt">
          Support
        </p>
        <h2 className="mt-3 text-center text-2xl font-bold uppercase tracking-[0.08em] text-heading sm:text-3xl">
          FAQ
        </h2>
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={item.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-sm font-medium tracking-tight text-foreground sm:text-base">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "text-muted transition-transform",
                      isOpen && "rotate-45",
                    )}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                {isOpen ? (
                  <p className="pb-5 text-sm leading-relaxed text-muted">
                    {item.answer}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
        </div>
      </div>
    </section>
  );
}
