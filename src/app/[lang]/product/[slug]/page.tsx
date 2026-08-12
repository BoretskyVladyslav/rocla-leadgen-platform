import { notFound } from "next/navigation";
import { ProductOrderForm } from "@/components/sections/forms/ProductOrderForm";
import { ProductHero } from "@/components/sections/hero/ProductHero";
import { getDictionary } from "@/data/dictionary";
import {
  getProductBySlug,
  LOCALES,
  PRODUCT_SLUGS,
} from "@/data/products";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    PRODUCT_SLUGS.map((slug) => ({ lang, slug })),
  );
}

export default async function ProductPage({
  params,
}: PageProps<"/[lang]/product/[slug]">) {
  const { lang, slug } = await params;
  const product = getProductBySlug(slug, lang);
  const dict = getDictionary(lang);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductHero product={product} copy={dict.product} />
      <ProductOrderForm productSlug={product.slug} copy={dict.leadForm} />
    </>
  );
}
