export interface TrustBadge {
  label: string;
  description?: string;
}

export interface TrustBadgesProps {
  badges?: TrustBadge[];
}

const DEFAULT_BADGES: TrustBadge[] = [
  { label: "ISO-ready workflows", description: "Documented B2B processes" },
  { label: "Secure file intake", description: "PDF / JPG / PNG uploads" },
  { label: "Fast inquiry routing", description: "Structured lead payloads" },
];

export function TrustBadges({ badges = DEFAULT_BADGES }: TrustBadgesProps) {
  return (
    <section className="bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="rounded-md border border-border bg-white px-6 py-10 sm:px-10 sm:py-12">
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-accent-alt">
            Core advantages
          </p>
          <h2 className="mt-3 text-center text-2xl font-bold uppercase tracking-[0.08em] text-heading sm:text-3xl">
            Built for high-intent B2B capture
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="border-l-4 border-accent bg-surface px-4 py-4"
              >
                <span className="badge-status-dark mb-3">{badge.label}</span>
                {badge.description ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {badge.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
