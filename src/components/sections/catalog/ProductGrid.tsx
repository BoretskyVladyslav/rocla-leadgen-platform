import Link from "next/link";
import type { Product } from "@/types/product";

export interface ProductGridProps {
  lang: string;
  products: Product[];
}

export function ProductGrid({ lang, products }: ProductGridProps) {
  return (
    <section id="catalog" className="bg-surface-muted">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-accent-alt">
          Catalog
        </p>
        <h2 className="mt-3 text-center text-2xl font-bold uppercase tracking-[0.08em] text-heading sm:text-3xl">
          Warehouse equipment
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-base leading-relaxed text-muted">
          Select a product to open its dedicated lead capture page.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.slug}>
              <Link
                href={`/${lang}/product/${product.slug}`}
                className="group flex h-full flex-col overflow-hidden border-2 border-border bg-white transition-colors hover:border-accent"
              >
                <div className="relative aspect-[16/10] border-b border-border bg-surface">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="badge-status-outline">Image</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-heading">
                    {product.name}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted">
                    {product.summary}
                  </p>
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
                    <span className="badge-status-dark w-fit">Request quote</span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
