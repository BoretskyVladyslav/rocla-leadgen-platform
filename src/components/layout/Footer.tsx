import { Clock, Mail, Phone } from "lucide-react";
import { HashLink } from "@/components/layout/HashLink";
import { MotionLink } from "@/components/motion/MotionLink";
import type { Dictionary } from "@/data/dictionary";

export interface FooterProps {
  lang: string;
  copy: Dictionary["footer"];
}

function iconClassName() {
  return "h-6 w-6";
}

function TelegramIcon() {
  return (
    <svg
      className={iconClassName()}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14.5 9.5 9 12.5l7.5 6.5L21 4 3 11l4.5 1.5L9 19l2-3.5" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      className={iconClassName()}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ViberIcon() {
  return (
    <svg
      className={iconClassName()}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9.5 7.5c.4 2 1.6 3.8 3.2 5.2 1.5 1.3 3.4 2.2 5.3 2.4" />
      <path d="M14.2 7.8c1.1.4 2.1 1.2 2.8 2.2.6.9.9 2 .9 3.1" />
      <path d="M8.2 3.6C4.9 5.2 3 8.6 3 12.3c0 1.7.5 3.3 1.3 4.7L3 21l4.2-1.2c1.3.7 2.8 1.1 4.3 1.1 5.2 0 9.5-4.3 9.5-9.5S16.7 2 11.5 2c-1.2 0-2.3.2-3.3.6Z" />
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
      <div className="mx-auto w-full max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
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

        <div className="my-8 border-t border-neutral-800" />

        <div className="flex flex-col gap-2 pb-6 text-xs leading-relaxed text-white/55 md:flex-row md:items-center md:justify-between">
          <p>{copy.legal}</p>
          <p>{copy.siteNote}</p>
        </div>
      </div>
    </footer>
  );
}

function BrandMark({ brand }: { brand: string }) {
  return (
    <p className="font-sans text-3xl font-extrabold uppercase tracking-tight">
      <span className="text-amber-500">{brand.slice(0, 1)}</span>
      <span className="text-white">{brand.slice(1)}</span>
    </p>
  );
}

function BrandColumn({ copy }: { copy: Dictionary["footer"] }) {
  return (
    <div className="flex h-full flex-col gap-4">
      <BrandMark brand={copy.brand} />
      <p className="max-w-xs text-sm leading-relaxed text-white/75">
        {copy.tagline}
      </p>
      <p className="mt-auto text-xs text-white/45">{copy.copyright}</p>
      <p className="text-xs text-white/45">{copy.privacy}</p>
      <div className="flex items-center gap-4">
        {copy.social.map((item) => {
          const Icon = SOCIAL_ICONS[item.network];
          return (
            <a
              key={item.network}
              href={
                item.network === "viber"
                  ? "viber://chat?number=%2B380981540982"
                  : item.href
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="text-white transition-colors hover:text-amber-500"
            >
              <Icon />
            </a>
          );
        })}
      </div>
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
      <ul className="flex flex-col gap-3 text-sm text-white/85">
        <li>
          <a href={telHref} className="flex items-center gap-3 font-semibold hover:text-accent">
            <Phone className="h-5 w-5 shrink-0 text-amber-500" aria-hidden />
            {copy.phone}
          </a>
        </li>
        <li>
          <a
            href={`mailto:${copy.email}`}
            className="flex items-center gap-3 hover:text-white"
          >
            <Mail className="h-5 w-5 shrink-0 text-amber-500" aria-hidden />
            {copy.email}
          </a>
        </li>
        <li className="flex items-center gap-3 text-white/70">
          <Clock className="h-5 w-5 shrink-0 text-amber-500" aria-hidden />
          {copy.hours}
        </li>
      </ul>
    </div>
  );
}
