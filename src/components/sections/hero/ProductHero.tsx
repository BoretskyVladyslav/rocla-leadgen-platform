"use client";

import { useState } from "react";
import Image from "next/image";
import { QuickOrderModal } from "@/components/sections/forms/QuickOrderModal";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Dictionary } from "@/data/dictionary";
import { PAGE_CONTAINER } from "@/lib/layout";
import { cn } from "@/lib/utils";
import type { Product, ProductImage, ProductSpec } from "@/types/product";

export interface ProductHeroProps {
  product: Product;
  copy: Dictionary["product"];
}

const THUMB_COUNT = 4;
const CATALOG_ISOLATED_SRC = "/images/catalog/gidravlicheskie-telezhki.jpg";

const HERO_SPEC_MATCHERS = [
  ["тип візка", "тип тележки"],
  ["вантажопідйомність", "грузоподъёмность", "грузоподъемность"],
  ["довжина вил", "длина вил"],
  ["висота підйому", "высота подъёма", "высота подъема"],
  ["ширина вил", "ширина вил"],
  ["вага", "вес"],
  ["матеріал", "материал"],
  ["гарантія", "гарантия"],
] as const;

function pickHeroSpecs(specs: ProductSpec[]) {
  return HERO_SPEC_MATCHERS.flatMap((keys) => {
    const match = specs.find((spec) => {
      const label = spec.label.toLowerCase();
      return keys.some((key) => label.includes(key));
    });
    return match ? [match] : [];
  }).slice(0, 8);
}

function ChevronDivider() {
  return (
    <svg
      aria-hidden
      className="h-full w-4 shrink-0 fill-white"
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
  const warehouseImages = product.images?.length
    ? product.images
    : product.imageSrc
      ? [{ src: product.imageSrc, alt: product.imageAlt ?? product.name }]
      : [];
  const gallery = [
    { src: CATALOG_ISOLATED_SRC, alt: product.name },
    ...warehouseImages,
  ];
  const thumbs = buildThumbs(gallery);
  const [activeThumb, setActiveThumb] = useState(0);
  const [orderOpen, setOrderOpen] = useState(false);
  const activeImage =
    gallery.length > 0 ? gallery[activeThumb % gallery.length] : undefined;
  const hasDiscount = Boolean(
    product.compareAtPriceLabel && product.priceLabel,
  );
  const quickSpecs = pickHeroSpecs(product.specs ?? []);
  const leftSpecs = quickSpecs.filter((_, index) => index % 2 === 0);
  const rightSpecs = quickSpecs.filter((_, index) => index % 2 === 1);

  const showThumbs = thumbs.length > 0;

  return (
    <div className={`${PAGE_CONTAINER} grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2`}>
      <div className="flex h-[300px] gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:h-[380px] sm:p-4">
        {showThumbs ? (
          <ul className="flex w-14 shrink-0 flex-col gap-1.5">
            {thumbs.map((image, index) => (
              <li key={image.thumbKey}>
                <button
                  type="button"
                  onClick={() => setActiveThumb(index)}
                  aria-label={`${copy.thumbPlaceholder} ${index + 1}`}
                  aria-pressed={index === activeThumb}
                  className={cn(
                    "relative block h-14 w-14 cursor-pointer overflow-hidden rounded-md border-2 transition-all",
                    index === activeThumb
                      ? "border-amber-400"
                      : "border-transparent hover:border-gray-200",
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="56px"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="relative flex h-full min-w-0 w-full flex-1 items-center justify-center overflow-hidden p-3">
          {activeImage?.src ? (
            <div className="relative flex h-full w-full items-center justify-center">
              <Image
                key={`${activeImage.src}-${activeThumb}`}
                src={activeImage.src}
                alt={activeImage.alt ?? product.name ?? copy.imagePlaceholder}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full max-h-full max-w-full object-contain object-center"
                priority
              />
            </div>
          ) : (
            <MediaPlaceholder
              aspect="4/3"
              label={product.name ?? copy.imagePlaceholder}
              bordered={false}
              className="h-full"
            />
          )}
        </div>
      </div>

      <div className="flex h-auto flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:h-[380px] sm:p-5 lg:p-6">
        <div>
          <h1 className="text-xl leading-tight font-bold text-gray-900 uppercase lg:text-2xl">
            {product.name}
          </h1>
          <p className="mt-1 mb-3 text-xs text-gray-400">
            {copy.skuLabel}: {product.sku}
          </p>

          {quickSpecs.length > 0 ? (
            <div className="flex items-stretch text-xs text-gray-700">
              <div className="flex min-w-0 flex-1 flex-col gap-y-3.5 pr-5">
                {leftSpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex min-w-0 items-center justify-between gap-2"
                  >
                    <span className="truncate text-gray-500">{spec.label}</span>
                    <span className="shrink-0 font-bold tabular-nums text-gray-900">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-px shrink-0 self-stretch bg-gray-200" />
              <div className="flex min-w-0 flex-1 flex-col gap-y-3.5 pl-5">
                {rightSpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex min-w-0 items-center justify-between gap-2"
                  >
                    <span className="truncate text-gray-500">{spec.label}</span>
                    <span className="shrink-0 font-bold tabular-nums text-gray-900">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div>
          {product.priceLabel ? (
            <div className="mb-2 flex items-baseline gap-4">
              {hasDiscount ? (
                <p className="text-sm font-bold text-gray-400 line-through">
                  {product.compareAtPriceLabel}
                </p>
              ) : null}
              <p className="text-3xl font-extrabold tabular-nums text-red-700">
                {product.priceLabel}
              </p>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setOrderOpen(true)}
            className="flex h-12 w-full cursor-pointer items-stretch overflow-hidden rounded-md bg-[#F9BC06] shadow-sm transition-opacity hover:opacity-90 md:h-13"
          >
            {product.priceLabel ? (
              <>
                <span className="flex h-full shrink-0 items-center px-5 text-sm font-extrabold tabular-nums text-gray-900 md:text-base">
                  {product.priceLabel}
                </span>
                <ChevronDivider />
              </>
            ) : null}
            <span className="flex flex-1 items-center justify-center pl-2 text-xs font-bold tracking-wide text-gray-900 uppercase md:text-sm">
              {copy.buyCta}
            </span>
          </button>
        </div>
      </div>

      <QuickOrderModal
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
        copy={copy.quickOrder}
        productSlug={product.slug}
        productName={product.name}
      />
    </div>
  );
}
