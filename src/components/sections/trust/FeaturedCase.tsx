import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MediaImage } from "@/components/ui/MediaImage";
import type { Dictionary } from "@/data/dictionary";

export interface FeaturedCaseProps {
  lang: string;
  copy: Dictionary["caseStudy"];
}

export function FeaturedCase({ lang, copy }: FeaturedCaseProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-28">
        <ScrollReveal className="min-w-0">
          <MediaImage
            src={copy.imageSrc}
            alt={copy.imageAlt}
            aspect="4/3"
            fit="cover"
            objectPosition="object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="min-h-[360px] w-full rounded-2xl border border-gray-200 shadow-sm"
          />
        </ScrollReveal>
        <ScrollReveal delay={0.08} className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold uppercase tracking-[0.08em] text-accent-alt sm:text-3xl lg:text-4xl">
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
