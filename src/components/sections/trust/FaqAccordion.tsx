"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Dictionary } from "@/data/dictionary";

export interface FaqAccordionProps {
  copy: Dictionary["faq"];
}

function AnswerBody({ text }: { text: string }) {
  const blocks = text.split("\n\n");

  return (
    <div className="space-y-3 text-sm leading-relaxed text-neutral-600">
      {blocks.map((block, blockIndex) => {
        const lines = block.split("\n").filter((line) => line.trim().length > 0);
        const intro: string[] = [];
        const bullets: string[] = [];
        const numbered: string[] = [];

        for (const line of lines) {
          if (line.startsWith("• ")) {
            bullets.push(line.slice(2));
          } else if (/^\d+\.\s/.test(line)) {
            numbered.push(line.replace(/^\d+\.\s/, ""));
          } else {
            intro.push(line);
          }
        }

        return (
          <div key={blockIndex} className="space-y-2">
            {intro.map((paragraph) => (
              <p key={paragraph} className="font-medium text-neutral-700">
                {paragraph}
              </p>
            ))}
            {bullets.length > 0 ? (
              <ul className="list-disc space-y-1.5 pl-5 marker:text-amber-500">
                {bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {numbered.length > 0 ? (
              <ol className="list-decimal space-y-2 pl-5 marker:font-semibold marker:text-neutral-900">
                {numbered.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function FaqAccordion({ copy }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 lg:py-28">
        <ScrollReveal>
          <h2 className="section-heading">{copy.title}</h2>
          <ul className="mt-10">
            {copy.items.map((item, index) => {
              const isOpen = openIndex === index;
              const triggerId = `${item.id ?? `faq-${index}`}-trigger`;
              const panelId = `${item.id ?? `faq-${index}`}-panel`;
              return (
                <li
                  key={item.id ?? item.question}
                  className="mb-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs transition-colors hover:border-amber-300"
                >
                  <button
                    type="button"
                    id={triggerId}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="text-sm font-semibold tracking-tight text-heading sm:text-base">
                      {item.question}
                    </span>
                    <motion.span
                      className="text-lg font-medium text-muted"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      aria-hidden
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="content"
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5">
                          <AnswerBody text={item.answer} />
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
