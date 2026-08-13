"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";

export interface MobileMenuItem {
  href: string;
  label: string;
}

export interface MobileMenuProps {
  lang: string;
  languageLabel: string;
  items: MobileMenuItem[];
  phone: string;
  telHref: string;
  openLabel: string;
  closeLabel: string;
}

export function MobileMenu({
  lang,
  languageLabel,
  items,
  phone,
  telHref,
  openLabel,
  closeLabel,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-white text-heading transition-colors hover:border-accent"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            aria-hidden
          >
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            aria-hidden
          >
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              aria-hidden
            />
            <motion.nav
              id={panelId}
              key="panel"
              aria-label="Primary"
              className="fixed inset-y-0 right-0 z-40 flex w-[min(100%,20rem)] flex-col border-l border-border bg-white shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
                <LocaleSwitcher lang={lang} label={languageLabel} />
                <button
                  type="button"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-heading transition-colors hover:border-accent"
                  aria-label={closeLabel}
                  onClick={close}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <a
                href={telHref}
                className="border-b border-border px-5 py-3 text-sm font-bold tracking-tight text-heading"
                onClick={close}
              >
                {phone}
              </a>
              <ul className="flex flex-col gap-1 px-3 py-4">
                {items.map((item) => (
                  <li key={`${item.href}-${item.label}`}>
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-surface hover:text-accent-alt"
                      onClick={close}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
