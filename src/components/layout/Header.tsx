import Link from "next/link";
import { MotionLink } from "@/components/motion/MotionLink";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import type { Dictionary } from "@/data/dictionary";

export interface HeaderProps {
  lang: string;
  copy: Dictionary["header"];
}

export function Header({ lang, copy }: HeaderProps) {
  const nav = [
    { href: `/${lang}#about`, label: copy.nav.about },
    { href: `/${lang}#catalog`, label: copy.nav.catalog },
    { href: `/${lang}#catalog`, label: copy.nav.promos },
    { href: `/${lang}#services`, label: copy.nav.services },
    { href: `/${lang}#reviews`, label: copy.nav.reviews },
    { href: `/${lang}#contact`, label: copy.nav.contacts },
  ];

  const telHref = `tel:${copy.phone.replace(/[^\d+]/g, "")}`;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href={`/${lang}`} className="min-w-0 shrink leading-tight">
          <span className="block font-serif text-xl font-bold uppercase tracking-[0.14em] text-heading">
            {copy.brand}
          </span>
          <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
            {copy.tagline}
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-5 text-xs font-semibold uppercase tracking-wide text-foreground lg:flex"
        >
          {nav.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className="transition-colors hover:text-accent-alt"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <div className="hidden md:inline-flex">
            <LocaleSwitcher lang={lang} label={copy.language} />
          </div>
          <a
            href={telHref}
            className="hidden text-sm font-bold tracking-tight text-heading md:inline"
          >
            {copy.phone}
          </a>
          <MotionLink
            href={`/${lang}#hero-form`}
            className="inline-flex h-9 max-w-[9.5rem] items-center truncate rounded-md bg-dark px-2.5 text-[10px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-graphite sm:max-w-none sm:px-3.5 sm:text-xs"
          >
            {copy.requestCall}
          </MotionLink>
          <MobileMenu
            lang={lang}
            languageLabel={copy.language}
            items={nav}
            phone={copy.phone}
            telHref={telHref}
            openLabel={copy.openMenu}
            closeLabel={copy.closeMenu}
          />
        </div>
      </div>
    </header>
  );
}
