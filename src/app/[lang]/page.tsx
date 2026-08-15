import { CategoryGrid } from "@/components/sections/catalog/CategoryGrid";
import { MainHero } from "@/components/sections/hero/MainHero";
import { ClientLogos } from "@/components/sections/trust/ClientLogos";
import { DeliveryEstimate } from "@/components/sections/trust/DeliveryEstimate";
import { FeaturedCase } from "@/components/sections/trust/FeaturedCase";
import { HomepageFaqOffer } from "@/components/sections/trust/HomepageFaqOffer";
import { ReviewsCarousel } from "@/components/sections/trust/ReviewsCarousel";
import { SeoTextAccordion } from "@/components/sections/trust/SeoTextAccordion";
import { TrustBadges } from "@/components/sections/trust/TrustBadges";
import { WarehouseContacts } from "@/components/sections/trust/WarehouseContacts";
import { getDictionary } from "@/data/dictionary";

export default async function HomePage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <MainHero copy={dict.hero} />
      <CategoryGrid lang={lang} copy={dict.categories} />
      <TrustBadges copy={dict.advantages} />
      <ClientLogos copy={dict.clients} />
      <FeaturedCase copy={dict.caseStudy} />
      <DeliveryEstimate copy={dict.delivery} />
      <ReviewsCarousel copy={dict.reviews} />
      <HomepageFaqOffer faq={dict.faq} offer={dict.product.commercialOffer} />
      <WarehouseContacts copy={dict.branches} />
      <SeoTextAccordion copy={dict.seoText} />
    </>
  );
}
