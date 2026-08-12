import { ProductGrid } from "@/components/sections/catalog/ProductGrid";
import { LeadCaptureForm } from "@/components/sections/forms/LeadCaptureForm";
import { MainHero } from "@/components/sections/hero/MainHero";
import { ClientLogos } from "@/components/sections/trust/ClientLogos";
import { FaqAccordion } from "@/components/sections/trust/FaqAccordion";
import { TrustBadges } from "@/components/sections/trust/TrustBadges";
import { getProducts } from "@/data/products";

export default async function HomePage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;
  const products = getProducts(lang);

  /* Archiv-ltd content order: hero → catalog → advantages → clients → form → reviews/FAQ */
  return (
    <>
      <MainHero />
      <ProductGrid lang={lang} products={products} />
      <TrustBadges />
      <ClientLogos />
      <LeadCaptureForm />
      <FaqAccordion />
    </>
  );
}
