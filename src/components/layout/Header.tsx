import Link from "next/link";

export interface HeaderProps {
  lang: string;
}

export function Header({ lang }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href={`/${lang}`}
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Rocla
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-6 text-sm">
          <Link
            href={`/${lang}#catalog`}
            className="font-medium text-muted transition-colors hover:text-foreground"
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
