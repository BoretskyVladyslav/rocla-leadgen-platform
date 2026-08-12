export interface FooterProps {
  lang: string;
}

export function Footer({ lang }: FooterProps) {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:px-6">
        <p className="font-medium text-foreground">Rocla</p>
        <p>Lead generation platform · {lang.toUpperCase()}</p>
      </div>
    </footer>
  );
}
