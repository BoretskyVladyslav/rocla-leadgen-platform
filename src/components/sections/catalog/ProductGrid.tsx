import Link from "next/link";
import type { Product } from "@/types/product";

export interface ProductGridProps {
  lang: string;
  products: Product[];
}

export function ProductGrid({ lang, products }: ProductGridProps) {
  return (
    <section id="catalog" className="bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Catalog
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Select a product to open its dedicated lead capture page.
        </p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.slug}>
              <Link
                href={`/${lang}/product/${product.slug}`}
                className="block border-b border-border pb-4 transition-colors hover:border-foreground"
              >
                <h3 className="text-lg font-medium text-foreground">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-muted">{product.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
