import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Dictionary } from "@/data/dictionary";

export interface ClientLogosProps {
  copy: Dictionary["clients"];
  reviews: Dictionary["reviews"];
}

export function ClientLogos({ copy, reviews }: ClientLogosProps) {
  return (
    <section className="bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <ScrollReveal>
          <div className="rounded-md border border-border bg-white px-6 py-10 shadow-sm sm:px-10">
            <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-accent-alt">
              {copy.eyebrow}
            </p>
            <h2 className="mt-3 text-center text-2xl font-bold uppercase tracking-[0.08em] text-heading sm:text-3xl">
              {copy.title}
            </h2>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {copy.logos.map((logo) => (
                <li
                  key={logo.name}
                  className="flex h-20 items-center justify-center border border-border bg-surface px-3 text-center"
                >
                  <span className="badge-status-outline max-w-full truncate">
                    {logo.name}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-12 border-t border-border pt-10">
              <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-accent-alt">
                {reviews.eyebrow}
              </p>
              <h3 className="mt-3 text-center text-xl font-bold uppercase tracking-[0.06em] text-heading sm:text-2xl">
                {reviews.title}
              </h3>
              <ul className="mt-8 grid gap-5 md:grid-cols-3">
                {reviews.items.map((review) => (
                  <li
                    key={`${review.company}-${review.author}`}
                    className="border border-border bg-surface p-5 shadow-sm"
                  >
                    <p className="badge-status w-fit">{review.company}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {review.text}
                    </p>
                    <p className="mt-4 text-xs font-bold uppercase tracking-wide text-foreground">
                      {review.author}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
