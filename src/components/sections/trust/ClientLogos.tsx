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
  { name: "Polar Warehousing" },
  { name: "Cascade Materials" },
];

export function ClientLogos({ logos = DEFAULT_LOGOS }: ClientLogosProps) {
  return (
    <section className="bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="rounded-md border border-border bg-white px-6 py-10 sm:px-10">
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-accent-alt">
            Trusted by operations teams
          </p>
          <h2 className="mt-3 text-center text-2xl font-bold uppercase tracking-[0.08em] text-heading sm:text-3xl">
            Our clients
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {logos.map((logo) => (
              <li
                key={logo.name}
                className="flex h-16 items-center justify-center border border-border bg-surface px-3 text-center text-xs font-bold tracking-tight text-foreground/70"
              >
                {logo.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
