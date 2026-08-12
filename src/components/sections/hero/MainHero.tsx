import Link from "next/link";
import { cn } from "@/lib/utils";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-11 px-5 text-sm";

const SPEC_BADGES = [
  { label: "Capacity", value: "Up to 2.5 t" },
  { label: "Aisle", value: "From 2.7 m" },
  { label: "Lift", value: "Up to 12.5 m" },
  { label: "Lead time", value: "Quote in 24h" },
];

export function MainHero() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6 lg:py-28">
        <div className="flex flex-col gap-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
            Rocla
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Industrial equipment leads, built for conversion
          </h1>
          <p className="max-w-xl text-base text-muted sm:text-lg">
            Modular product pages and capture flows optimized for PageSpeed and
            B2B inquiry quality.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#catalog"
              className={cn(
                buttonBase,
                "bg-accent text-accent-fg hover:bg-accent-hover focus-visible:ring-accent",
              )}
            >
              Browse catalog
            </Link>
            <Link
              href="#contact"
              className={cn(
                buttonBase,
                "border border-border bg-surface text-foreground hover:bg-border/60 focus-visible:ring-foreground/20",
              )}
            >
              Request a quote
            </Link>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-4 border-t border-border pt-8 sm:grid-cols-4">
          {SPEC_BADGES.map((badge) => (
            <li key={badge.label}>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                {badge.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {badge.value}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
