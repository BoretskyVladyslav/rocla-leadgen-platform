"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Dictionary } from "@/data/dictionary";

export interface FaqAccordionProps {
  copy: Dictionary["faq"];
}

export function FaqAccordion({ copy }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-surface">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        <ScrollReveal>
          <div className="rounded-md border border-border bg-white px-6 py-10 sm:px-10">
            <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-accent-alt">
              {copy.eyebrow}
            </p>
            <h2 className="mt-3 text-center text-2xl font-bold uppercase tracking-[0.08em] text-heading sm:text-3xl">
              {copy.title}
            </h2>
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {copy.items.map((item, index) => {
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
                      <motion.span
                        className="text-muted"
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
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 text-sm leading-relaxed text-muted">
                            {item.answer}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
