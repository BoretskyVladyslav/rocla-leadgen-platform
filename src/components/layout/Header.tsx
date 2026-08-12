import Link from "next/link";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";

export interface HeaderProps {
  lang: string;
}

export function Header({ lang }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={`/${lang}`}
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Rocla
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-4 text-sm sm:gap-6">
          <LocaleSwitcher lang={lang} />
          <Link
            href={`/${lang}#catalog`}
            className="hidden font-medium text-muted transition-colors hover:text-foreground sm:inline"
          >
            Catalog
          </Link>
          <Link
            href={`/${lang}#contact`}
            className="inline-flex h-9 items-center rounded-md bg-accent px-3.5 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          >
            Request quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
