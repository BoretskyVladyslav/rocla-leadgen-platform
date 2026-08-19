import { Clock, Mail, Phone } from "lucide-react";
import { HashLink } from "@/components/layout/HashLink";
import { MotionLink } from "@/components/motion/MotionLink";
import type { Dictionary } from "@/data/dictionary";
import { PAGE_CONTAINER } from "@/lib/layout";

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

function ViberIcon() {
  return (
    <svg
      className={iconClassName()}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M11.4 2C6.53 2 2.6 5.66 2.6 10.2c0 2.1.87 4.02 2.3 5.45L4 21.1l5.7-1.52c.54.1 1.1.16 1.7.16 4.87 0 8.8-3.66 8.8-8.2S16.27 2 11.4 2Zm4.36 11.86c-.18.5-1.05.95-1.45 1.01-.37.05-.84.08-1.36-.08-.31-.1-.72-.23-1.24-.45-2.18-.94-3.6-3.14-3.71-3.28-.11-.14-.9-1.2-.9-2.29 0-1.09.57-1.63.78-1.85.2-.22.44-.28.59-.28h.42c.14 0 .32-.05.5.38.18.44.62 1.52.67 1.63.06.11.09.24.02.39-.07.14-.11.24-.22.37-.11.13-.23.29-.33.39-.11.11-.22.23-.1.45.13.22.57.94 1.22 1.52.84.75 1.55 1 1.77 1.11.22.11.35.1.48-.06.13-.15.55-.64.7-.86.15-.22.3-.18.5-.11.2.07 1.28.6 1.5.71.22.11.37.17.42.26.06.1.06.55-.12 1.05Z" />
    </svg>
  );
}

function YoutubeIcon() {
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
      <path d="M2.5 8.5A3.5 3.5 0 0 1 6 5h12a3.5 3.5 0 0 1 3.5 3.5v7A3.5 3.5 0 0 1 18 19H6a3.5 3.5 0 0 1-3.5-3.5v-7Z" />
      <path d="m10 9.5 5 2.5-5 2.5v-5Z" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  telegram: TelegramIcon,
  viber: ViberIcon,
  youtube: YoutubeIcon,
} as const;

export function Footer({ lang, copy }: FooterProps) {
  const telHref = `tel:${copy.phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className={`${PAGE_CONTAINER} pt-12`}>
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
