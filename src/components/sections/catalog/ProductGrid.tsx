import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Dictionary } from "@/data/dictionary";
import type { Product } from "@/types/product";

export interface ProductGridProps {
  lang: string;
  products: Product[];
  copy: Dictionary["catalog"];
}

export function ProductGrid({ lang, products, copy }: ProductGridProps) {
  return (
    <section id="catalog" className="bg-surface-muted">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <ScrollReveal>
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-accent-alt">
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 text-center text-2xl font-bold uppercase tracking-[0.08em] text-heading sm:text-3xl">
            {copy.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-base leading-relaxed text-muted">
            {copy.subtitle}
          </p>
        </ScrollReveal>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const cover = product.images?.[0]?.src || product.imageSrc || "";
            const coverAlt =
              product.images?.[0]?.alt ||
              product.imageAlt ||
              product.name;
            const badges = (product.specs ?? []).slice(0, 3);

            return (
              <li key={product.slug}>
                <ScrollReveal delay={index * 0.06}>
                  <Link
                    href={`/${lang}/product/${product.slug}`}
                    className="group flex h-full flex-col overflow-hidden border-2 border-border bg-white transition-colors hover:border-accent"
                  >
                    <div className="relative aspect-[16/10] border-b border-border bg-surface">
                      {cover ? (
                        <Image
                          src={cover}
                          alt={coverAlt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="badge-status-outline">
                            {copy.imageFallback}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <h3 className="text-lg font-bold tracking-tight text-foreground">
                        {product.name}
                      </h3>
                      <p className="flex-1 text-sm leading-relaxed text-muted">
                        {product.summary}
                      </p>
                      {badges.length > 0 ? (
                        <ul className="flex flex-wrap gap-2">
                          {badges.map((spec) => (
                            <li key={spec.label} className="badge-status-outline">
                              {spec.value}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {product.priceLabel ? (
                        <div className="flex flex-wrap items-baseline gap-2 border-t border-border pt-3">
                          <span className="text-base font-bold text-foreground">
                            {product.priceLabel}
                          </span>
                          {product.compareAtPriceLabel ? (
                            <span className="text-sm text-muted line-through">
                              {product.compareAtPriceLabel}
                            </span>
                          ) : null}
                          {product.discountLabel ? (
                            <span className="badge-status">
                              {product.discountLabel}
                            </span>
                          ) : null}
                        </div>
                      ) : (
                        <span className="badge-status-dark w-fit">
                          {copy.requestQuote}
                        </span>
                      )}
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
