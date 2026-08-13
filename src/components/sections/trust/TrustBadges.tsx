import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Dictionary } from "@/data/dictionary";

export interface TrustBadgesProps {
  copy: Dictionary["advantages"];
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 text-accent-fg" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8.2 6.4 11l6.1-6.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrustBadges({ copy }: TrustBadgesProps) {
  return (
    <section id="about" className="scroll-mt-20 bg-white">
      <div id="services" className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-24">
        <ScrollReveal>
          <h2 className="section-heading">{copy.title}</h2>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {copy.items.map((item) => (
              <li
                key={item.label}
                className="flex gap-4 rounded-xl bg-gray-50 p-4"
              >
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent shadow-sm">
                  <CheckIcon />
                </span>
                <div>
                  <h3 className="text-base font-bold tracking-tight text-heading">
                    {item.label}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
