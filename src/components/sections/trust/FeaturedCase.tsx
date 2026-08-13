import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Dictionary } from "@/data/dictionary";

export interface FeaturedCaseProps {
  lang: string;
  copy: Dictionary["caseStudy"];
}

export function FeaturedCase({ lang, copy }: FeaturedCaseProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto grid w-full max-w-7xl items-stretch gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-16">
        <ScrollReveal>
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface sm:aspect-[4/5] lg:h-full lg:min-h-[28rem] lg:aspect-auto">
            <Image
              src={copy.imageSrc}
              alt={copy.imageAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover object-center"
            />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.08} className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-accent-alt sm:text-3xl lg:text-4xl">
            {copy.title}
          </h2>
          <div className="mt-6 flex flex-col gap-4">
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-muted sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
          <Link
            href={`/${lang}#about`}
            className="mt-6 text-sm font-bold uppercase tracking-wide text-heading underline decoration-accent underline-offset-4 hover:text-accent-alt"
          >
            {copy.readMore}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
