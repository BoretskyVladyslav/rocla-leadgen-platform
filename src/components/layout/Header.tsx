import Link from "next/link";
import { MotionLink } from "@/components/motion/MotionLink";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import type { Dictionary } from "@/data/dictionary";

export interface HeaderProps {
  lang: string;
  copy: Dictionary["header"];
}

export function Header({ lang, copy }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={`/${lang}`}
          className="text-lg font-bold tracking-tight text-heading"
        >
          Rocla
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-4 text-sm sm:gap-6">
          <LocaleSwitcher lang={lang} label={copy.language} />
          <Link
            href={`/${lang}#catalog`}
            className="hidden font-bold uppercase tracking-wide text-muted transition-colors hover:text-accent-alt sm:inline"
          >
            {copy.catalog}
          </Link>
          <MotionLink
            href={`/${lang}#contact`}
            className="inline-flex h-9 items-center rounded-md bg-accent px-3.5 text-xs font-bold uppercase tracking-wide text-accent-fg transition-colors hover:bg-accent-hover"
          >
            {copy.requestQuote}
          </MotionLink>
        </nav>
      </div>
    </header>
  );
}
