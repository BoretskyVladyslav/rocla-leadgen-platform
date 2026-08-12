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
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Core advantages
        </p>
        <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Built for high-intent B2B capture
        </h2>
        <div className="mt-12 grid gap-10 border-t border-border pt-10 sm:grid-cols-3 sm:gap-8">
          {badges.map((badge) => (
            <div key={badge.label}>
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                {badge.label}
              </h3>
              {badge.description ? (
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {badge.description}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
