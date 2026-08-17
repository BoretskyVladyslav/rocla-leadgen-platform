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
import { PAGE_CONTAINER } from "@/lib/layout";

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
      <section className="py-6 md:py-8">
        <div className={PAGE_CONTAINER}>
          <Breadcrumbs
            className="mb-4 bg-transparent px-0 py-0 text-xs text-gray-500 md:text-sm [&_ol]:max-w-none [&_ol]:px-0 [&_ol]:py-0 [&_ol]:text-inherit"
            items={[
              {
                label: crumbs.home,
                href: `/${lang}`,
                icon: <Home className="h-3.5 w-3.5" />,
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
          <div className="rounded-xl border border-border bg-white p-8 shadow-sm md:p-10">
            <ProductHero product={product} copy={dict.product} />
          </div>
          <ClientLogos
            copy={dict.clients}
            variant="compact"
            className="mt-4"
          />
        </div>
      </section>
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
      <DeliveryEstimate copy={dict.delivery} />
      <VideoReviews copy={dict.videos} />
      <ReviewsCarousel copy={dict.reviews} />
      <PdpFaqOffer faq={dict.faq} offer={dict.product.commercialOffer} />
      <SeoTextAccordion copy={dict.seoText} />
    </>
  );
}
