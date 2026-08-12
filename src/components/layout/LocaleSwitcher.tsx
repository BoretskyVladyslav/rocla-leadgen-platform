"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export interface LocaleSwitcherProps {
  lang: string;
}

export function LocaleSwitcher({ lang }: LocaleSwitcherProps) {
  const pathname = usePathname();

  function hrefFor(locale: string) {
    const segments = pathname.split("/");
    if (segments.length > 1) {
      segments[1] = locale;
      return segments.join("/") || `/${locale}`;
    }
    return `/${locale}`;
  }

  return (
    <div className="flex items-center gap-1 text-xs font-medium" role="navigation" aria-label="Language">
      {LOCALES.map((locale) => (
        <Link
          key={locale}
          href={hrefFor(locale)}
          className={cn(
            "rounded px-1.5 py-1 uppercase tracking-wide transition-colors",
            locale === lang
              ? "bg-surface text-foreground"
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
