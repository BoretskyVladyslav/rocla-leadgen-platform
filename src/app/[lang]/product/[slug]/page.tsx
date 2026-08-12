import { notFound } from "next/navigation";
import { ProductOrderForm } from "@/components/sections/forms/ProductOrderForm";
import { ProductHero } from "@/components/sections/hero/ProductHero";
import {
  getProductBySlug,
  LOCALES,
  PRODUCTS,
} from "@/data/products";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    PRODUCTS.map((product) => ({ lang, slug: product.slug })),
  );
}

export default async function ProductPage({
  params,
}: PageProps<"/[lang]/product/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

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
