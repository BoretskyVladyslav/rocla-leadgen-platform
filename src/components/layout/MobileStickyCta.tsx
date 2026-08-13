import { HashLink } from "@/components/layout/HashLink";
import type { Dictionary } from "@/data/dictionary";

export interface MobileStickyCtaProps {
  lang: string;
  phone: string;
  copy: Dictionary["stickyCta"];
}

export function MobileStickyCta({ lang, phone, copy }: MobileStickyCtaProps) {
  const telHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex gap-3 border-t border-gray-200 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <a
        href={telHref}
        className="inline-flex h-12 flex-1 items-center justify-center rounded-md bg-dark px-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-graphite"
      >
        {copy.call}
      </a>
      <HashLink
        href={`/${lang}#contact`}
        className="inline-flex h-12 flex-1 items-center justify-center rounded-md bg-accent px-4 text-sm font-bold uppercase tracking-wide text-accent-fg transition-colors hover:bg-accent-hover cta-glow"
      >
        {copy.order}
      </HashLink>
    </div>
  );
}
