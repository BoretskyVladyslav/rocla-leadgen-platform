import { notFound } from "next/navigation";
import { LeadCaptureForm } from "@/components/sections/forms/LeadCaptureForm";
import { ProductHero } from "@/components/sections/hero/ProductHero";
import { RelatedProductsCarousel } from "@/components/sections/product/RelatedProductsCarousel";
import { ProductTabs } from "@/components/sections/product/ProductTabs";
import { ClientLogos } from "@/components/sections/trust/ClientLogos";
import { DeliveryEstimate } from "@/components/sections/trust/DeliveryEstimate";
import { ReviewsCarousel } from "@/components/sections/trust/ReviewsCarousel";
import { VideoReviews } from "@/components/sections/trust/VideoReviews";
import { getDictionary } from "@/data/dictionary";
import {
  getProductBySlug,
  getProducts,
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

  const related = getProducts(lang)
    .filter((item) => item.slug !== product.slug)
    .slice(0, 5);

  return (
    <>
      <ProductHero product={product} copy={dict.product} />
      <ProductTabs product={product} copy={dict.product} />
      <RelatedProductsCarousel
        lang={lang}
        products={related}
        copy={dict.catalog}
        title={dict.product.relatedTitle}
        orderCta={dict.product.orderCta}
      />
      <ClientLogos copy={dict.clients} />
      <DeliveryEstimate copy={dict.delivery} />
      <VideoReviews copy={dict.videos} />
      <ReviewsCarousel copy={dict.reviews} />
      <LeadCaptureForm copy={dict.leadForm} />
    </>
  );
}
