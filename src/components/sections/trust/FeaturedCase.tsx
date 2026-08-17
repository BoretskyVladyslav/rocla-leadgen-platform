import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MediaImage } from "@/components/ui/MediaImage";
import type { Dictionary } from "@/data/dictionary";
import { PAGE_CONTAINER } from "@/lib/layout";

export interface FeaturedCaseProps {
  copy: Dictionary["caseStudy"];
}

export function FeaturedCase({ copy }: FeaturedCaseProps) {
  return (
    <section className="bg-[#F5F5F5] pb-10 md:pb-14">
      <div className={PAGE_CONTAINER}>
        <div className="grid w-full items-center gap-10 rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8 lg:grid-cols-2 lg:gap-12">
          <ScrollReveal className="mx-auto min-w-0 w-full max-w-[420px]">
            <MediaImage
              src={copy.imageSrc}
              alt={copy.imageAlt}
              aspect={false}
              fit="cover"
              objectPosition="object-center"
              sizes="(max-width: 1024px) 100vw, 420px"
              className="mx-auto h-[480px] w-full max-w-[420px] rounded-lg border border-gray-200 shadow-sm lg:h-[540px]"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.08} className="flex flex-col justify-center">
            <h2 className="text-xl font-bold tracking-wide text-[#1A1A1A] uppercase whitespace-normal lg:text-2xl lg:whitespace-nowrap">
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
