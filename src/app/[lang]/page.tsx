import { ProductGrid } from "@/components/sections/catalog/ProductGrid";
import { LeadCaptureForm } from "@/components/sections/forms/LeadCaptureForm";
import { MainHero } from "@/components/sections/hero/MainHero";
import { ClientLogos } from "@/components/sections/trust/ClientLogos";
import { FaqAccordion } from "@/components/sections/trust/FaqAccordion";
import { TrustBadges } from "@/components/sections/trust/TrustBadges";
import { getDictionary } from "@/data/dictionary";
import { getProducts } from "@/data/products";

export default async function HomePage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;
  const products = getProducts(lang);
  const dict = getDictionary(lang);

  return (
    <>
      <MainHero copy={dict.hero} />
      <ProductGrid lang={lang} products={products} copy={dict.catalog} />
      <TrustBadges copy={dict.advantages} />
      <ClientLogos copy={dict.clients} reviews={dict.reviews} />
      <LeadCaptureForm copy={dict.leadForm} />
      <FaqAccordion copy={dict.faq} />
    </>
  );
}
