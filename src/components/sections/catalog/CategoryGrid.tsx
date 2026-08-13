import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Dictionary } from "@/data/dictionary";

export interface CategoryGridProps {
  lang: string;
  copy: Dictionary["categories"];
}

export function CategoryGrid({ lang, copy }: CategoryGridProps) {
  return (
    <section id="catalog" className="scroll-mt-20 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {copy.items.map((item, index) => {
            const href = item.productSlug
              ? `/${lang}/product/${item.productSlug}`
              : `/${lang}#contact`;

            return (
              <li key={item.title}>
                <ScrollReveal delay={index * 0.04}>
                  <Link
                    href={href}
                    className="group flex h-full flex-col border border-accent bg-white p-4 transition-shadow hover:shadow-md sm:p-5"
                  >
                    <h2 className="text-base font-bold uppercase tracking-tight text-heading sm:text-lg">
                      {item.title}
                    </h2>
                    <div className="relative mt-3 aspect-[16/9] w-full overflow-hidden bg-white">
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        fill
                        sizes="(min-width: 640px) 45vw, 90vw"
                        className="object-contain object-center transition-[filter] duration-300 group-hover:brightness-[0.98]"
                      />
                    </div>
                  </Link>
                </ScrollReveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
