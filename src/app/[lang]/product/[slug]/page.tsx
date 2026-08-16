import { Home } from "lucide-react";
import { notFound } from "next/navigation";
import { ConsultationBlock } from "@/components/sections/forms/ConsultationBlock";
import { ProductHero } from "@/components/sections/hero/ProductHero";
import { ProductAdvantages } from "@/components/sections/product/ProductAdvantages";
import { PdpFaqOffer } from "@/components/sections/product/PdpFaqOffer";
import { RelatedProductsCarousel } from "@/components/sections/product/RelatedProductsCarousel";
import { ProductTabs } from "@/components/sections/product/ProductTabs";
import { ClientLogos } from "@/components/sections/trust/ClientLogos";
import { DeliveryEstimate } from "@/components/sections/trust/DeliveryEstimate";
import { ReviewsCarousel } from "@/components/sections/trust/ReviewsCarousel";
import { SeoTextAccordion } from "@/components/sections/trust/SeoTextAccordion";
import { VideoReviews } from "@/components/sections/trust/VideoReviews";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
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

  const others = getProducts(lang).filter((item) => item.slug !== product.slug);
  const related = Array.from({ length: 8 }, (_, i) => {
    const base = others[i % others.length];
    return {
      ...base,
      images: [
        {
          src: `/images/products/related-${i + 1}.jpg`,
          alt: base.name,
        },
      ],
    };
  });

  const crumbs = dict.product.breadcrumbs;

  return (
    <>
      <Breadcrumbs
        items={[
          {
            label: crumbs.home,
            href: `/${lang}`,
            icon: <Home className="h-4 w-4" />,
          },
          {
            label: crumbs.catalog,
            href: `/${lang}#catalog`,
          },
          {
            label: crumbs.category,
            href: `/${lang}#catalog`,
          },
          {
            label: product.name,
          },
        ]}
      />
      <ProductHero product={product} copy={dict.product} />
      <ClientLogos
        copy={dict.clients}
        className="bg-purple-50/50 py-16 md:py-24"
      />
      <ProductTabs product={product} copy={dict.product} />
      <ProductAdvantages copy={dict.product.advantages} />
      <ConsultationBlock copy={dict.consultation} />
      <RelatedProductsCarousel
        lang={lang}
        products={related}
        copy={dict.catalog}
        title={dict.product.relatedTitle}
        orderCta={dict.product.orderCta}
      />
      <DeliveryEstimate
        copy={dict.delivery}
        className="bg-emerald-50/50 py-16 md:py-24"
      />
      <VideoReviews copy={dict.videos} />
      <ReviewsCarousel
        copy={dict.reviews}
        className="bg-yellow-50/30 py-16 md:py-24"
      />
      <PdpFaqOffer faq={dict.faq} offer={dict.product.commercialOffer} />
      <SeoTextAccordion
        copy={dict.seoText}
        className="bg-rose-50/30 py-16 md:py-24"
      />
    </>
  );
}
