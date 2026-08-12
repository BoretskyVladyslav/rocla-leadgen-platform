import type { Product } from "@/types/product";

export interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-16 sm:px-6 lg:py-20">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
          Product
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {product.name}
        </h1>
        <p className="max-w-2xl text-base text-muted">{product.summary}</p>
      </div>
    </section>
  );
}
