import Link from "next/link";
import { cn } from "@/lib/utils";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-md font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const SPEC_BADGES = [
  { label: "Capacity", value: "Up to 2.5 t", tone: "gold" as const },
  { label: "Aisle", value: "From 2.7 m", tone: "dark" as const },
  { label: "Lift", value: "Up to 12.5 m", tone: "gold" as const },
  { label: "Lead time", value: "Quote in 24h", tone: "dark" as const },
];

export function MainHero() {
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent-alt">
                Rocla
              </p>
              <h1 className="max-w-xl text-4xl font-bold uppercase tracking-tight text-heading sm:text-5xl lg:text-6xl lg:leading-[1.05]">
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
                  "h-12 px-6 text-sm bg-accent text-accent-fg hover:bg-accent-hover focus-visible:ring-accent",
                )}
              >
                Browse catalog
              </Link>
              <Link
                href="#contact"
                className={cn(
                  buttonBase,
                  "h-12 px-6 text-sm bg-dark text-white hover:bg-graphite focus-visible:ring-dark",
                )}
              >
                Request a quote
              </Link>
            </div>

            <ul className="grid grid-cols-2 gap-3 border-t border-border pt-8 sm:grid-cols-4">
              {SPEC_BADGES.map((badge) => (
                <li key={badge.label} className="flex flex-col gap-2">
                  <span
                    className={
                      badge.tone === "gold"
                        ? "badge-status w-fit"
                        : "badge-status-dark w-fit"
                    }
                  >
                    {badge.label}
                  </span>
                  <p className="text-sm font-semibold tracking-tight text-foreground">
                    {badge.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="relative aspect-[4/3] w-full overflow-hidden border-2 border-accent bg-surface"
            aria-label="Hero product imagery placeholder"
          >
            <div className="absolute inset-0 bg-[linear-gradient(145deg,#f5f5f5_0%,#ebebeb_55%,#e5e5e5_100%)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
              <p className="badge-status">Product visual</p>
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
