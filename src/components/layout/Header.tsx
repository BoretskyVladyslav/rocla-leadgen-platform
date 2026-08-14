import Link from "next/link";
import { HashLink } from "@/components/layout/HashLink";
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
          <span className="mt-0.5 block max-w-[11.5rem] text-[9px] leading-snug text-muted sm:max-w-[16rem] sm:text-[10px] lg:max-w-[18rem]">
            {copy.tagline}
          </span>
        </Link>

          <nav
          aria-label={copy.navLabel}
          className="hidden items-center gap-5 text-xs font-medium uppercase tracking-wide text-foreground lg:flex"
        >
          {nav.map((item) => (
            <HashLink
              key={`${item.href}-${item.label}`}
              href={item.href}
              className="relative py-1 transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-amber-500 after:transition-transform after:duration-300 after:ease-out hover:text-amber-500 hover:after:scale-x-100"
            >
              {item.label}
            </HashLink>
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
          <HashLink
            href={`/${lang}#hero-form`}
            className="inline-flex h-9 max-w-[9.5rem] items-center truncate rounded-lg bg-accent px-2.5 text-[10px] font-bold uppercase tracking-wide text-accent-fg shadow-sm transition-all hover:scale-105 hover:bg-accent-hover active:scale-95 sm:max-w-none sm:px-3.5 sm:text-xs"
          >
            {copy.requestCall}
          </HashLink>
          <MobileMenu
            lang={lang}
            languageLabel={copy.language}
            navLabel={copy.navLabel}
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
