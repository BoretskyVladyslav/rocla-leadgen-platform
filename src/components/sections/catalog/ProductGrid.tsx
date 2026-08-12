import Link from "next/link";
import type { Product } from "@/types/product";

export interface ProductGridProps {
  lang: string;
  products: Product[];
}

export function ProductGrid({ lang, products }: ProductGridProps) {
  return (
    <section id="catalog" className="bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Catalog
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
          Select a product to open its dedicated lead capture page.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.slug}>
              <Link
                href={`/${lang}/product/${product.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-md border border-border bg-white transition-all hover:border-foreground/25 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] border-b border-border bg-surface">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                      Image
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-foreground">
                    {product.name}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted">
                    {product.summary}
                  </p>
                  {product.priceLabel ? (
                    <div className="flex flex-wrap items-baseline gap-2 border-t border-border pt-3">
                      <span className="text-base font-semibold text-foreground">
                        {product.priceLabel}
                      </span>
                      {product.compareAtPriceLabel ? (
                        <span className="text-sm text-muted line-through">
                          {product.compareAtPriceLabel}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
