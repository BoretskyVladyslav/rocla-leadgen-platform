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
    { href: `/${lang}#contact`, label: copy.nav.contacts },
  ];

  const telHref = `tel:${copy.phone.replace(/[^\d+]/g, "")}`;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href={`/${lang}`} className="min-w-0 shrink leading-tight">
          <span className="block font-sans text-2xl font-extrabold uppercase tracking-tight md:text-3xl">
            <span className="text-amber-500">{copy.brand.slice(0, 1)}</span>
            <span className="text-neutral-900">{copy.brand.slice(1)}</span>
          </span>
          <span className="mt-0.5 block max-w-[14rem] text-[11px] font-medium leading-tight text-neutral-600 sm:max-w-[20rem] sm:text-xs">
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
            className="inline-flex items-center bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-accent-fg rounded-sm transition-colors hover:bg-accent-hover"
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
