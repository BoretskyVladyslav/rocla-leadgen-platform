import { CategoryGrid } from "@/components/sections/catalog/CategoryGrid";
import { ConsultationBlock } from "@/components/sections/forms/ConsultationBlock";
import { LeadCaptureForm } from "@/components/sections/forms/LeadCaptureForm";
import { MainHero } from "@/components/sections/hero/MainHero";
import { ClientLogos } from "@/components/sections/trust/ClientLogos";
import { DeliveryEstimate } from "@/components/sections/trust/DeliveryEstimate";
import { FaqAccordion } from "@/components/sections/trust/FaqAccordion";
import { FeaturedCase } from "@/components/sections/trust/FeaturedCase";
import { ReviewsCarousel } from "@/components/sections/trust/ReviewsCarousel";
import { SeoTextAccordion } from "@/components/sections/trust/SeoTextAccordion";
import { TrustBadges } from "@/components/sections/trust/TrustBadges";
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
      <DeliveryEstimate copy={dict.delivery} />
      <ClientLogos copy={dict.clients} />
      <FeaturedCase lang={lang} copy={dict.caseStudy} />
      <ReviewsCarousel copy={dict.reviews} />
      <FaqAccordion copy={dict.faq} />
      <LeadCaptureForm copy={dict.leadForm} />
      <ConsultationBlock copy={dict.consultation} />
      <SeoTextAccordion copy={dict.seoText} />
    </>
  );
}
