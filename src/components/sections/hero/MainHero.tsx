import Link from "next/link";
import { cn } from "@/lib/utils";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const SPEC_BADGES = [
  { label: "Capacity", value: "Up to 2.5 t" },
  { label: "Aisle", value: "From 2.7 m" },
  { label: "Lift", value: "Up to 12.5 m" },
  { label: "Lead time", value: "Quote in 24h" },
];

export function MainHero() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted">
                Rocla
              </p>
              <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-foreground lg:text-6xl lg:leading-[1.05]">
                Industrial equipment leads, built for conversion
              </h1>
              <p className="max-w-lg text-base leading-relaxed text-muted sm:text-lg">
                Modular product pages and capture flows optimized for PageSpeed
                and B2B inquiry quality.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#catalog"
                className={cn(
                  buttonBase,
                  "h-12 px-6 text-base bg-accent text-accent-fg hover:bg-accent-hover focus-visible:ring-accent",
                )}
              >
                Browse catalog
              </Link>
              <Link
                href="#contact"
                className={cn(
                  buttonBase,
                  "h-12 px-6 text-base border border-border bg-white text-foreground hover:bg-surface focus-visible:ring-foreground/20",
                )}
              >
                Request a quote
              </Link>
            </div>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-8 sm:grid-cols-4">
              {SPEC_BADGES.map((badge) => (
                <li key={badge.label}>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                    {badge.label}
                  </p>
                  <p className="mt-1.5 text-sm font-semibold tracking-tight text-foreground">
                    {badge.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-surface"
            aria-label="Hero product imagery placeholder"
          >
            <div className="absolute inset-0 bg-[linear-gradient(145deg,#f4f5f7_0%,#e5e7eb_55%,#d1d5db_100%)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                Product visual
              </p>
              <p className="text-sm font-medium text-foreground/70">
                Hero image placeholder
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
