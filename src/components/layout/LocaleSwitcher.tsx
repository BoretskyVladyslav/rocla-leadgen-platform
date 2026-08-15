"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { LOCALES } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const SCROLL_KEY = "rocla-locale-scroll-y";

export interface LocaleSwitcherProps {
  lang: string;
  label: string;
}

function UaFlag() {
  return (
    <svg viewBox="0 0 16 12" className="h-3 w-4 shrink-0" aria-hidden>
      <rect width="16" height="6" fill="#0057B7" />
      <rect y="6" width="16" height="6" fill="#FFD700" />
    </svg>
  );
}

function RuFlag() {
  return (
    <svg viewBox="0 0 16 12" className="h-3 w-4 shrink-0" aria-hidden>
      <rect width="16" height="4" fill="#fff" />
      <rect y="4" width="16" height="4" fill="#0039A6" />
      <rect y="8" width="16" height="4" fill="#D52B1E" />
    </svg>
  );
}

export function LocaleSwitcher({ lang, label }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const prevPath = useRef(pathname);

  useEffect(() => {
    setHash(window.location.hash);
    function onHashChange() {
      setHash(window.location.hash);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved == null) return;
    const y = Number(saved);
    sessionStorage.removeItem(SCROLL_KEY);
    requestAnimationFrame(() => {
      if (window.location.hash) {
        const id = window.location.hash.slice(1);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          return;
        }
      }
      window.scrollTo({ top: Number.isFinite(y) ? y : 0 });
    });
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function hrefFor(locale: string) {
    const segments = pathname.split("/");
    if (segments.length > 1) {
      segments[1] = locale;
      return `${segments.join("/") || `/${locale}`}${hash}`;
    }
    return `/${locale}${hash}`;
  }

  function handleClick() {
    sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
  }

  const Flag = lang === "ru" ? RuFlag : UaFlag;

  return (
    <div ref={rootRef} className="relative" role="navigation" aria-label={label}>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-neutral-900"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
      >
        <Flag />
        {lang}
        <span aria-hidden>▾</span>
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute top-full right-0 z-50 mt-1 min-w-full overflow-hidden rounded-md border border-neutral-200 bg-white shadow-md"
        >
          {LOCALES.map((locale) => (
            <li key={locale} role="option" aria-selected={locale === lang}>
              <Link
                href={hrefFor(locale)}
                scroll={false}
                hrefLang={locale}
                onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                  if (locale === lang) {
                    event.preventDefault();
                    setOpen(false);
                    return;
                  }
                  handleClick();
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold uppercase",
                  locale === lang
                    ? "bg-amber-50 text-neutral-900"
                    : "text-neutral-700 hover:bg-neutral-50",
                )}
              >
                {locale === "ru" ? <RuFlag /> : <UaFlag />}
                {locale}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
