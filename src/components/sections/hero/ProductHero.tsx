"use client";

import { useState } from "react";
import Image from "next/image";
import { HashLink } from "@/components/layout/HashLink";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Dictionary } from "@/data/dictionary";
import { cn } from "@/lib/utils";
import type { Product, ProductImage, ProductSpec } from "@/types/product";

export interface ProductHeroProps {
  product: Product;
  copy: Dictionary["product"];
}

const THUMB_COUNT = 4;

const SPEC_ORDER: Array<(label: string) => boolean> = [
  (l) => l.includes("тип"),
  (l) => l.includes("вантаж") || l.includes("грузопод"),
  (l) => l.includes("довжин") || l.includes("длина"),
  (l) => l.includes("висота") || l.includes("высота"),
  (l) => l.includes("ширин"),
  (l) => l.includes("колір") || l.includes("цвет"),
  (l) => l.includes("матеріал") || l.includes("материал"),
  (l) => l.includes("гарант"),
];

function pickHeroSpecs(specs: ProductSpec[], skuLabel: string) {
  const rest = specs.filter(
    (spec) => spec.label.toLowerCase() !== skuLabel.toLowerCase(),
  );
  const used = new Set<string>();
  const picked: ProductSpec[] = [];

  for (const match of SPEC_ORDER) {
    const found = rest.find(
      (spec) => !used.has(spec.label) && match(spec.label.toLowerCase()),
    );
    if (found) {
      used.add(found.label);
      picked.push(found);
    }
  }

  for (const spec of rest) {
    if (picked.length >= 8) break;
    if (!used.has(spec.label)) {
      used.add(spec.label);
      picked.push(spec);
    }
  }

  return picked.slice(0, 8);
}

function ChevronDivider() {
  return (
    <svg
      aria-hidden
      className="h-full w-4 shrink-0 fill-current text-white"
      viewBox="0 0 16 48"
      preserveAspectRatio="none"
    >
      <path d="M0 0 L10 24 L0 48 L6 48 L16 24 L6 0 Z" />
    </svg>
  );
}

function buildThumbs(gallery: ProductImage[]) {
  if (gallery.length === 0) return [];
  return Array.from({ length: THUMB_COUNT }, (_, index) => {
    const image = gallery[index % gallery.length];
    return { ...image, thumbKey: `${image.src}-${index}` };
  });
}

export function ProductHero({ product, copy }: ProductHeroProps) {
  const gallery = product.images?.length
    ? product.images
    : product.imageSrc
      ? [{ src: product.imageSrc, alt: product.imageAlt ?? product.name }]
      : [];
  const thumbs = buildThumbs(gallery);
  const [activeThumb, setActiveThumb] = useState(0);
  const activeImage =
    gallery.length > 0 ? gallery[activeThumb % gallery.length] : undefined;
  const hasDiscount = Boolean(
    product.compareAtPriceLabel && product.priceLabel,
  );
  const quickSpecs = pickHeroSpecs(product.specs ?? [], copy.skuLabel);
  const showThumbs = thumbs.length > 0;

  return (
    <section className="bg-[#F0F5FA] px-4 pt-8 pb-0 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          <div className="flex h-full w-full items-start gap-3">
            {showThumbs ? (
              <ul className="flex shrink-0 flex-col gap-2">
                {thumbs.map((image, index) => (
                  <li key={image.thumbKey}>
                    <button
                      type="button"
                      onClick={() => setActiveThumb(index)}
                      aria-label={`${copy.thumbPlaceholder} ${index + 1}`}
                      aria-pressed={index === activeThumb}
                      className={cn(
                        "relative block h-12 w-12 shrink-0 cursor-pointer overflow-hidden rounded border bg-white",
                        index === activeThumb
                          ? "border-amber-500"
                          : "border-gray-200",
                      )}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="48px"
                        loading="lazy"
                        className="object-cover"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="relative flex h-[320px] min-w-0 flex-1 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
              {activeImage?.src ? (
                <Image
                  key={`${activeImage.src}-${activeThumb}`}
                  src={activeImage.src}
                  alt={activeImage.alt ?? product.name ?? copy.imagePlaceholder}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-3"
                  priority
                />
              ) : (
                <MediaPlaceholder
                  aspect="4/3"
                  label={product.name ?? copy.imagePlaceholder}
                  bordered={false}
                  className="h-full max-h-full"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-7">
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-gray-900 uppercase md:text-lg">
                {product.name}
              </h1>
              <p className="mt-0.5 mb-3 text-xs text-gray-400">
                {copy.skuLabel}: {product.sku}
              </p>

              {quickSpecs.length > 0 ? (
                <dl className="mb-4 grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-gray-700">
                  {quickSpecs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex min-w-0 items-baseline justify-between gap-2"
                    >
                      <dt className="truncate">{spec.label}</dt>
                      <dd className="shrink-0 font-semibold tabular-nums">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>

            <div>
              {product.priceLabel ? (
                <div className="flex flex-wrap items-baseline">
                  {hasDiscount ? (
                    <p className="mr-6 text-sm font-bold tabular-nums text-gray-700 line-through md:text-base">
                      {product.compareAtPriceLabel}
                    </p>
                  ) : null}
                  <p className="text-2xl font-black tabular-nums text-red-600 md:text-3xl">
                    {product.priceLabel}
                  </p>
                </div>
              ) : null}

              <HashLink
                href="#consultation"
                className="mt-3 flex h-11 w-full items-stretch overflow-hidden rounded-sm bg-[#F9BC06] md:h-12"
              >
                {product.priceLabel ? (
                  <>
                    <span className="flex items-center justify-center px-4 text-sm font-extrabold tabular-nums !text-red-700 md:text-base">
                      {product.priceLabel}
                    </span>
                    <ChevronDivider />
                  </>
                ) : null}
                <span className="flex flex-1 items-center justify-center text-xs font-bold tracking-wider text-[#1A2E3B] uppercase md:text-sm">
                  {copy.buyCta}
                </span>
              </HashLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
