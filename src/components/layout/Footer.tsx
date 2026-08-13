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
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:py-16">
        <div className="flex flex-col gap-3">
          <p className="font-serif text-xl font-bold uppercase tracking-[0.14em] text-accent">
            {copy.brand}
          </p>
          <a href={telHref} className="text-sm font-semibold text-white hover:text-accent">
            {copy.phone}
          </a>
          <a href={`mailto:${copy.email}`} className="text-sm text-white/70 hover:text-white">
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
          <p className="mt-4 text-sm leading-relaxed text-white/75">{copy.address}</p>
          <p className="mt-6 text-xs text-white/50">{copy.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
