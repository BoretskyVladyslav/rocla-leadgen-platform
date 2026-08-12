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

  return (
    <div
      className="flex items-center gap-1 text-xs font-medium"
      role="navigation"
      aria-label={label}
    >
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
            "rounded px-1.5 py-1 uppercase tracking-wide transition-colors",
            locale === lang
              ? "bg-accent text-accent-fg"
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
