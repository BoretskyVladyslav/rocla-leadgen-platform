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
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Core advantages
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          Built for high-intent B2B capture
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {badges.map((badge) => (
            <div key={badge.label}>
              <h3 className="text-sm font-semibold text-foreground">
                {badge.label}
              </h3>
              {badge.description ? (
                <p className="mt-1 text-sm text-muted">{badge.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
