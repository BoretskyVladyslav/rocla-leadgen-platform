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
    <section className="bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          FAQ
        </h2>
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={item.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-sm font-medium text-foreground">
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
                  <p className="pb-4 text-sm text-muted">{item.answer}</p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
