import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Dictionary } from "@/data/dictionary";

export interface TrustBadgesProps {
  copy: Dictionary["advantages"];
}

function AdvantageIcon({ type }: { type: Dictionary["advantages"]["items"][number]["icon"] }) {
  const common = "h-6 w-6 text-accent-fg";
  if (type === "delivery") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 7h11v10H3V7Zm11 3h4l3 3v4h-7V10Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="7" cy="18" r="1.5" fill="currentColor" />
        <circle cx="17" cy="18" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  if (type === "warranty") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="m9 12 2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 18V8l8-4 8 4v10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 18v-5h6v5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrustBadges({ copy }: TrustBadgesProps) {
  return (
    <section className="bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <ScrollReveal>
          <div className="rounded-md border border-border bg-white px-6 py-10 sm:px-10 sm:py-12">
            <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-accent-alt">
              {copy.eyebrow}
            </p>
            <h2 className="mt-3 text-center text-2xl font-bold uppercase tracking-[0.08em] text-heading sm:text-3xl">
              {copy.title}
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-8">
              {copy.items.map((badge) => (
                <div
                  key={badge.label}
                  className="border-l-4 border-accent bg-surface px-4 py-4"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent">
                    <AdvantageIcon type={badge.icon} />
                  </div>
                  <h3 className="text-base font-bold tracking-tight text-foreground">
                    {badge.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {badge.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
