import { HashLink } from "@/components/layout/HashLink";
import { MotionLink } from "@/components/motion/MotionLink";
import type { Dictionary } from "@/data/dictionary";

export interface FooterProps {
  lang: string;
  copy: Dictionary["footer"];
}

function TelegramIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21.5 3.5 2.8 11.2c-1 .4-.9 1.8.1 2.1l4.7 1.5 1.8 5.5c.3.9 1.5 1.1 2.1.4l2.7-3.1 4.9 3.6c.8.6 2 .2 2.3-.8L22.9 5c.3-1.1-.8-2-1.4-1.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 11.5A8.5 8.5 0 0 1 7.4 18.6L4 20l1.5-3.3A8.5 8.5 0 1 1 20 11.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 9.4c.3-.6.5-.6.8-.6h.6c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.4.5c-.1.2-.1.4.1.6.5.6 1.1 1.1 1.8 1.5.2.1.4.1.6 0l.6-.4c.2-.1.4-.1.6 0l1.5.8c.3.1.4.3.4.5v.6c0 .3 0 .5-.3.7-.5.4-1.2.6-1.9.5A7 7 0 0 1 9 10.3c0-.5.1-.8.2-.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  telegram: TelegramIcon,
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
} as const;

export function Footer({ lang, copy }: FooterProps) {
  const telHref = `tel:${copy.phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-white transition-colors hover:bg-amber-400 hover:text-neutral-900"
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
