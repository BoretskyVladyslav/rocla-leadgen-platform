"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Product, ProductImage } from "@/types/product";

export interface ProductHeroProps {
  product: Product;
}

function GalleryPlaceholder({
  image,
  size,
}: {
  image: ProductImage;
  size: "main" | "thumb";
}) {
  const isMain = size === "main";

  if (image.src) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover"
        sizes={isMain ? "(max-width: 768px) 100vw, 50vw" : "96px"}
      />
    );
  }

  return (
    <span
      className={cn(
        "absolute inset-0 flex items-center justify-center text-muted",
        isMain ? "text-sm font-medium" : "px-1 text-center text-[10px]",
      )}
    >
      {isMain ? "Image placeholder" : "Thumb"}
    </span>
  );
}

export function ProductHero({ product }: ProductHeroProps) {
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [
          {
            src: product.imageSrc ?? "",
            alt: product.imageAlt ?? `${product.name} placeholder`,
          },
        ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];
  const hasDiscount = Boolean(
    product.compareAtPriceLabel && product.priceLabel,
  );

  return (
    <section className="bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="flex flex-col gap-3">
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-surface">
            <GalleryPlaceholder image={activeImage} size="main" />
          </div>
          {images.length > 1 ? (
            <ul className="grid grid-cols-4 gap-2 sm:grid-cols-5">
              {images.map((image, index) => (
                <li key={`${image.alt}-${index}`}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show ${image.alt}`}
                    className={cn(
                      "relative aspect-square w-full overflow-hidden border bg-surface transition-colors hover:border-foreground/40",
                      index === activeIndex
                        ? "border-foreground"
                        : "border-border",
                    )}
                  >
                    <GalleryPlaceholder image={image} size="thumb" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
              Product
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.1]">
              {product.name}
            </h1>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {product.summary}
            </p>
          </div>

          {product.priceLabel ? (
            <div className="flex flex-wrap items-baseline gap-3 border-y border-border py-5">
              <p className="text-3xl font-semibold tracking-tight text-foreground">
                {product.priceLabel}
              </p>
              {hasDiscount ? (
                <>
                  <p className="text-base text-muted line-through">
                    {product.compareAtPriceLabel}
                  </p>
                  {product.discountLabel ? (
                    <p className="badge-status">{product.discountLabel}</p>
                  ) : null}
                </>
              ) : null}
            </div>
          ) : null}

          <Link
            href="#order"
            className="inline-flex h-12 w-fit items-center justify-center rounded-md bg-accent px-6 text-sm font-bold uppercase tracking-wide text-accent-fg transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Request a quote
          </Link>

          {product.specs && product.specs.length > 0 ? (
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-foreground">
                Specifications
              </h2>
              <table className="mt-4 w-full text-left text-sm">
                <tbody>
                  {product.specs.map((spec) => (
                    <tr key={spec.label} className="border-b border-border">
                      <th
                        scope="row"
                        className="py-3 pr-4 font-medium text-muted"
                      >
                        {spec.label}
                      </th>
                      <td className="py-3 text-foreground">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
