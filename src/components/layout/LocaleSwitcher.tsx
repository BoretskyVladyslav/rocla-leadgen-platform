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

  return (
    <div
      className="inline-flex overflow-hidden rounded-md border border-neutral-200 bg-white"
      role="navigation"
      aria-label={label}
    >
      {LOCALES.map((locale) => {
        const active = locale === lang;
        return (
          <Link
            key={locale}
            href={hrefFor(locale)}
            scroll={false}
            hrefLang={locale}
            aria-current={active ? "page" : undefined}
            onClick={(event: MouseEvent<HTMLAnchorElement>) => {
              if (locale === lang) {
                event.preventDefault();
                return;
              }
              handleClick();
            }}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-bold uppercase tracking-wide transition-colors",
              active
                ? "bg-accent text-accent-fg"
                : "text-neutral-500 hover:text-neutral-800",
            )}
          >
            {active ? (locale === "ru" ? <RuFlag /> : <UaFlag />) : null}
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
