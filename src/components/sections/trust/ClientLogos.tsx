export interface ClientLogo {
  name: string;
}

export interface ClientLogosProps {
  logos?: ClientLogo[];
}

const DEFAULT_LOGOS: ClientLogo[] = [
  { name: "Nordic Fleet" },
  { name: "Apex Logistics" },
  { name: "Harbor Works" },
  { name: "Summit Industrial" },
];

export function ClientLogos({ logos = DEFAULT_LOGOS }: ClientLogosProps) {
  return (
    <section className="bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Trusted by operations teams
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
          {logos.map((logo) => (
            <li
              key={logo.name}
              className="text-sm font-medium text-foreground/70"
            >
              {logo.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
