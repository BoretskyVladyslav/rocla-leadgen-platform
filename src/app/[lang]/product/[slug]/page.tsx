import { notFound } from "next/navigation";
import { ProductOrderForm } from "@/components/sections/forms/ProductOrderForm";
import { ProductHero } from "@/components/sections/hero/ProductHero";
import type { Product } from "@/types/product";

const PRODUCTS: Record<string, Product> = {
  "reach-truck": {
    slug: "reach-truck",
    name: "Reach Truck",
    summary: "High-bay warehouse handling with narrow-aisle precision.",
    description:
      "Placeholder product detail for reach truck configurations and inquiry capture.",
  },
  "counterbalance-forklift": {
    slug: "counterbalance-forklift",
    name: "Counterbalance Forklift",
    summary: "Versatile indoor/outdoor load handling for mixed fleets.",
  },
  "pallet-truck": {
    slug: "pallet-truck",
    name: "Pallet Truck",
    summary: "Compact horizontal transport for docks and staging areas.",
  },
};

export function generateStaticParams() {
  return Object.keys(PRODUCTS).map((slug) => ({ slug }));
}

export default async function ProductPage({
  params,
}: PageProps<"/[lang]/product/[slug]">) {
  const { slug } = await params;
  const product = PRODUCTS[slug];

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductHero product={product} />
      <ProductOrderForm productSlug={product.slug} />
    </>
  );
}
