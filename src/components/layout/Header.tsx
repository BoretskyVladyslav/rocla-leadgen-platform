import Link from "next/link";

export interface HeaderProps {
  lang: string;
}

export function Header({ lang }: HeaderProps) {
  return (
    <header className="border-b border-border bg-white">
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
            className="text-muted transition-colors hover:text-foreground"
          >
            Catalog
          </Link>
          <Link
            href={`/${lang}#contact`}
            className="text-muted transition-colors hover:text-foreground"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
