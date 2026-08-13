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
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 lg:gap-12 lg:py-16">
        {/* Tier 1 — brand bar */}
        <div className="flex flex-col gap-3 border-b border-white/10 pb-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-8 sm:gap-y-3">
          <p className="font-serif text-xl font-bold uppercase tracking-[0.14em] text-accent">
            {copy.brand}
          </p>
          <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-6">
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

        {/* Tier 2 — catalog + navigation side by side */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:max-w-2xl">
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

        {/* Tier 3 — address + copyright */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-sm leading-relaxed text-white/75">{copy.address}</p>
          <p className="mt-3 text-xs leading-relaxed text-white/50">
            {copy.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
