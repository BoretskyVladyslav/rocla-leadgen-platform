import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MediaImage } from "@/components/ui/MediaImage";
import type { Dictionary } from "@/data/dictionary";

export interface FeaturedCaseProps {
  copy: Dictionary["caseStudy"];
}

export function FeaturedCase({ copy }: FeaturedCaseProps) {
  return (
    <section className="bg-neutral-50/80 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-xs sm:p-12 lg:grid-cols-2 lg:gap-12">
          <ScrollReveal className="mx-auto min-w-0 w-full max-w-[420px]">
            <MediaImage
              src={copy.imageSrc}
              alt={copy.imageAlt}
              aspect={false}
              fit="cover"
              objectPosition="object-center"
              sizes="(max-width: 1024px) 100vw, 420px"
              className="mx-auto h-[480px] w-full max-w-[420px] rounded-2xl border border-gray-200 shadow-sm lg:h-[540px]"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.08} className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold tracking-wide text-neutral-900 uppercase md:text-3xl">
              {copy.title}
            </h2>
            <p className="mt-2 mb-4 text-base font-semibold text-amber-500 md:text-lg">
              {copy.role}
            </p>
            <div className="space-y-3 text-sm leading-relaxed text-neutral-700 md:text-base">
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="pt-2 font-semibold text-neutral-900">{copy.signoff}</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
