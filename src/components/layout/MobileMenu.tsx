"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MobileMenuItem {
  href: string;
  label: string;
}

export interface MobileMenuProps {
  items: MobileMenuItem[];
  phone: string;
  telHref: string;
  openLabel: string;
  closeLabel: string;
}

export function MobileMenu({
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
        <span className="relative block h-3.5 w-4" aria-hidden>
          <span
            className={cn(
              "absolute left-0 block h-0.5 w-full rounded-full bg-current transition-all duration-300",
              open ? "top-1.5 rotate-45" : "top-0",
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-1.5 block h-0.5 w-full rounded-full bg-current transition-all duration-300",
              open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100",
            )}
          />
          <span
            className={cn(
              "absolute left-0 block h-0.5 w-full rounded-full bg-current transition-all duration-300",
              open ? "top-1.5 -rotate-45" : "top-3",
            )}
          />
        </span>
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
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <a
                  href={telHref}
                  className="text-sm font-bold tracking-tight text-heading"
                  onClick={close}
                >
                  {phone}
                </a>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-heading transition-colors hover:border-accent"
                  aria-label={closeLabel}
                  onClick={close}
                >
                  <span className="relative block h-3.5 w-4" aria-hidden>
                    <span className="absolute left-0 top-1.5 block h-0.5 w-full rotate-45 rounded-full bg-current" />
                    <span className="absolute left-0 top-1.5 block h-0.5 w-full -rotate-45 rounded-full bg-current" />
                  </span>
                </button>
              </div>
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
