export interface FooterProps {
  lang: string;
}

export function Footer({ lang }: FooterProps) {
  return (
    <footer className="border-t border-border bg-dark text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:py-16">
        <div className="flex flex-col gap-2">
          <p className="text-base font-bold tracking-tight text-accent">
            Rocla
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-white/70">
            B2B lead generation for industrial equipment inquiries.
          </p>
        </div>
        <p className="text-sm text-white/70">
          Locale · {lang.toUpperCase()}
        </p>
      </div>
    </footer>
  );
}
