import type { Dictionary } from "@/data/dictionary";

export interface FooterProps {
  lang: string;
  copy: Dictionary["footer"];
}

export function Footer({ lang, copy }: FooterProps) {
  return (
    <footer className="border-t border-border bg-dark text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:py-16">
        <div className="flex flex-col gap-2">
          <p className="text-base font-bold tracking-tight text-accent">
            Rocla
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-white/70">
            {copy.tagline}
          </p>
        </div>
        <p className="text-sm text-white/70">
          {copy.locale} · {lang.toUpperCase()}
        </p>
      </div>
    </footer>
  );
}
