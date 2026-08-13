import { HashLink } from "@/components/layout/HashLink";
import type { Dictionary } from "@/data/dictionary";

export interface FooterProps {
  lang: string;
  copy: Dictionary["footer"];
}

export function Footer({ lang, copy }: FooterProps) {
  const telHref = `tel:${copy.phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer className="bg-dark text-white">
      {/* Mobile — 3-tier (< md) */}
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-14 sm:px-6 md:hidden">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-6">
          <p className="font-serif text-xl font-bold uppercase tracking-[0.14em] text-accent">
            {copy.brand}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <a
              href={telHref}
              className="font-semibold text-white hover:text-accent"
            >
              {copy.phone}
            </a>
            <a
              href={`mailto:${copy.email}`}
              className="text-white/70 hover:text-white"
            >
              {copy.email}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
              {copy.catalogTitle}
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-white/75">
              {copy.catalogLinks.map((item) => (
                <li key={item.label}>
                  <HashLink
                    href={`/${lang}${item.href}`}
                    className="hover:text-white"
                  >
                    {item.label}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
              {copy.navTitle}
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-white/75">
              {copy.navLinks.map((item) => (
                <li key={item.label}>
                  <HashLink
                    href={`/${lang}${item.href}`}
                    className="hover:text-white"
                  >
                    {item.label}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-sm leading-relaxed text-white/75">{copy.address}</p>
          <p className="mt-3 text-xs leading-relaxed text-white/50">
            {copy.copyright}
          </p>
        </div>
      </div>

      {/* Desktop — original 4-column grid (md+) */}
      <div className="mx-auto hidden w-full max-w-7xl grid-cols-4 gap-8 px-4 py-14 sm:px-6 md:grid lg:py-16">
        <div className="flex flex-col gap-3">
          <p className="font-serif text-xl font-bold uppercase tracking-[0.14em] text-accent">
            {copy.brand}
          </p>
          <a
            href={telHref}
            className="text-sm font-semibold text-white hover:text-accent"
          >
            {copy.phone}
          </a>
          <a
            href={`mailto:${copy.email}`}
            className="text-sm text-white/70 hover:text-white"
          >
            {copy.email}
          </a>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            {copy.catalogTitle}
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/75">
            {copy.catalogLinks.map((item) => (
              <li key={item.label}>
                <HashLink
                  href={`/${lang}${item.href}`}
                  className="hover:text-white"
                >
                  {item.label}
                </HashLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            {copy.navTitle}
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/75">
            {copy.navLinks.map((item) => (
              <li key={item.label}>
                <HashLink
                  href={`/${lang}${item.href}`}
                  className="hover:text-white"
                >
                  {item.label}
                </HashLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            {copy.addressTitle}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            {copy.address}
          </p>
          <p className="mt-6 text-xs text-white/50">{copy.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
