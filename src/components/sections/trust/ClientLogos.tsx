import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Dictionary } from "@/data/dictionary";

export interface ClientLogosProps {
  copy: Dictionary["clients"];
}

export function ClientLogos({ copy }: ClientLogosProps) {
  return (
    <section className="bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <ScrollReveal>
          <h2 className="text-center text-2xl font-bold uppercase tracking-[0.08em] text-heading sm:text-3xl">
            {copy.title}
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {copy.logos.map((logo) => (
              <li
                key={logo.name}
                className="flex h-24 items-center justify-center rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="text-center text-sm font-bold uppercase tracking-wide text-heading">
                  {logo.name}
                </span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
