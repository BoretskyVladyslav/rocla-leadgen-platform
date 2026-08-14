import { HashLink } from "@/components/layout/HashLink";
import { MotionLink } from "@/components/motion/MotionLink";
import type { Dictionary } from "@/data/dictionary";

export interface FooterProps {
  lang: string;
  copy: Dictionary["footer"];
}

function TelegramIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function ViberIcon() {
  return (
    <svg
      className="h-5 w-5 fill-current text-white transition-colors group-hover:text-neutral-950"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M19.38 3.52C16.8 1.45 13.06 1.03 9.4 1.34c-4.4.38-7.97 3.59-8.32 8.01-.2 2.52.48 4.96 1.95 6.95l-.76 2.92c-.17.65.41 1.23 1.06 1.06l2.87-.75c2.31 1.4 5.07 1.91 7.78 1.41 4.54-.83 8.07-4.5 8.35-9.1.18-3.05-.88-6.02-2.95-8.32zm-2.02 12.01c-.35.98-1.57 1.76-2.58 1.84-.71.05-1.63-.16-3.79-1.07-2.61-1.1-4.46-3.62-5.46-5.06-.21-.3-.49-.78-.49-1.32 0-.96.61-1.68 1.02-2.05.21-.19.49-.3.77-.3.26 0 .42.02.58.05.37.08.57.51.78.97.24.52.54 1.25.61 1.38.11.2.14.41.03.62-.08.15-.17.29-.27.42-.14.18-.3.33-.4.47-.13.17-.16.32-.07.49.52.99 1.32 1.87 2.34 2.51.2.13.37.14.52.02.2-.16.5-.54.67-.78.17-.24.38-.26.6-.17.18.07 1.24.59 1.49.71.3.15.54.26.63.4.11.19.11.83-.24 1.81z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  telegram: TelegramIcon,
  instagram: InstagramIcon,
  viber: ViberIcon,
} as const;

export function Footer({ lang, copy }: FooterProps) {
  const telHref = `tel:${copy.phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Mobile */}
        <div className="flex flex-col gap-10 md:hidden">
          <BrandColumn copy={copy} />
          <div className="grid grid-cols-2 gap-6">
            <LinkColumn title={copy.navTitle} links={copy.navLinks} lang={lang} />
            <LinkColumn
              title={copy.catalogTitle}
              links={copy.catalogLinks}
              lang={lang}
            />
          </div>
          <HelpColumn lang={lang} copy={copy} telHref={telHref} />
        </div>

        {/* Desktop — 4 columns */}
        <div className="hidden gap-8 md:grid md:grid-cols-4 lg:gap-10">
          <BrandColumn copy={copy} />
          <LinkColumn title={copy.navTitle} links={copy.navLinks} lang={lang} />
          <LinkColumn
            title={copy.catalogTitle}
            links={copy.catalogLinks}
            lang={lang}
          />
          <HelpColumn lang={lang} copy={copy} telHref={telHref} />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-4 text-xs leading-relaxed text-white/55 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>{copy.legal}</p>
          <p>{copy.siteNote}</p>
        </div>
      </div>
    </footer>
  );
}

function BrandColumn({ copy }: { copy: Dictionary["footer"] }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-serif text-xl font-bold uppercase tracking-[0.14em] text-white">
        {copy.brand}
      </p>
      <p className="max-w-xs text-sm leading-relaxed text-white/75">
        {copy.tagline}
      </p>
      <div className="flex items-center gap-3">
        {copy.social.map((item) => {
          const Icon = SOCIAL_ICONS[item.network];
          return (
            <a
              key={item.network}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 transition hover:bg-[#FFCC00] hover:text-black"
            >
              <Icon />
            </a>
          );
        })}
      </div>
      <p className="text-xs text-white/45">{copy.copyright}</p>
      <p className="text-xs text-white/45">{copy.privacy}</p>
    </div>
  );
}

function LinkColumn({
  title,
  links,
  lang,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
  lang: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white">
        {title}
      </p>
      <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/75">
        {links.map((item) => (
          <li key={item.label}>
            <HashLink
              href={`/${lang}${item.href}`}
              className="transition-colors hover:text-white"
            >
              {item.label}
            </HashLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HelpColumn({
  lang,
  copy,
  telHref,
}: {
  lang: string;
  copy: Dictionary["footer"];
  telHref: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white">
        {copy.helpTitle}
      </p>
      <p className="text-sm leading-relaxed text-white/75">{copy.helpText}</p>
      <MotionLink
        href={`/${lang}#consultation`}
        className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-accent px-5 text-sm font-bold uppercase tracking-wide text-accent-fg transition-colors hover:bg-accent-hover cta-glow"
      >
        {copy.cta}
      </MotionLink>
      <ul className="flex flex-col gap-2.5 text-sm text-white/85">
        <li>
          <a href={telHref} className="font-semibold hover:text-accent">
            {copy.phone}
          </a>
        </li>
        <li>
          <a
            href={`mailto:${copy.email}`}
            className="hover:text-white"
          >
            {copy.email}
          </a>
        </li>
        <li className="text-white/70">{copy.hours}</li>
      </ul>
    </div>
  );
}
