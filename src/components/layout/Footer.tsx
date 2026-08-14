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
          if (item.network === "viber") {
            return (
              <a
                key={item.network}
                href="viber://chat?number=%2B380981540982"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 transition-colors hover:bg-[#7360F2]"
                aria-label="Viber"
              >
                <svg className="h-5 w-5 fill-white" viewBox="0 0 512 512" aria-hidden>
                  <path d="M443.7 387.6c-17.7-17.7-41.9-27.5-67.2-27.5-24.9 0-48.4 9.4-66.2 26.5l-21.7 20.8c-7.3 7-17.5 9.4-27 6.3-43.2-14-87.7-44.4-125.4-85.7-37.4-41-62.8-87.7-71.5-131.6-1.9-9.5 1.5-19.2 8.9-25.5l22.4-19.1c35.7-30.5 37.9-83.3 5-116.3l-28.7-28.7c-33.1-33.1-87-33.1-120.1 0l-28.6 28.6c-27.7 27.7-39.7 66.8-32.9 107.4 15.3 90.9 66.6 182.1 140.5 250 83.2 76.4 186.7 122.9 283.8 127.4 7.6.4 15.1.5 22.7.5 35.8 0 69.8-12.8 96.6-36.2l25.7-25.7c33-33 33-87 0-120.1l-18.4-18.4zM245.3 128.5c58.2 5.8 104.3 51.9 110.1 110.1 1 9.9 9.3 17.4 19.1 17.4.7 0 1.4 0 2.1-.1 10.5-1.1 18.2-10.4 17.1-20.9-7.8-78.5-69.9-140.6-148.4-148.4-10.5-1-19.8 6.6-20.9 17.1-1.1 10.5 6.6 19.8 17.1 20.9zm41.2 59.8c18.5 4.8 33 19.3 37.8 37.8 2.2 8.7 10 14.3 18.5 14.3 1.6 0 3.3-.2 5-.7 10.1-2.6 16.3-12.9 13.7-23-7.6-29.4-30.8-52.6-60.2-60.2-10.1-2.6-20.4 3.6-23 13.7-2.6 10.1 3.6 20.4 13.7 23.1 4.5-1.9 4.5-1.9 4.5-1.9z" />
                </svg>
              </a>
            );
          }

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
