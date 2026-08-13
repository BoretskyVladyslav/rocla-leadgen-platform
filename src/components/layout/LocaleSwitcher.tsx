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

  const activeIndex = Math.max(0, LOCALES.indexOf(lang as (typeof LOCALES)[number]));

  return (
    <div
      className="relative inline-flex items-center rounded-md bg-surface p-0.5 text-xs font-medium"
      role="navigation"
      aria-label={label}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded bg-accent transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          activeIndex === 1 ? "translate-x-full" : "translate-x-0",
        )}
      />
      {LOCALES.map((locale) => (
        <Link
          key={locale}
          href={hrefFor(locale)}
          scroll={false}
          onClick={(event: MouseEvent<HTMLAnchorElement>) => {
            if (locale === lang) {
              event.preventDefault();
              return;
            }
            handleClick();
          }}
          className={cn(
            "relative z-10 rounded px-1.5 py-1 uppercase tracking-wide transition-colors duration-300",
            locale === lang
              ? "text-accent-fg"
              : "text-muted hover:text-foreground",
          )}
          hrefLang={locale}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
