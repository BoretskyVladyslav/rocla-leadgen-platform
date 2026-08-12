import { ProductGrid } from "@/components/sections/catalog/ProductGrid";
import { LeadCaptureForm } from "@/components/sections/forms/LeadCaptureForm";
import { MainHero } from "@/components/sections/hero/MainHero";
import { ClientLogos } from "@/components/sections/trust/ClientLogos";
import { FaqAccordion } from "@/components/sections/trust/FaqAccordion";
import { TrustBadges } from "@/components/sections/trust/TrustBadges";
import { PRODUCTS } from "@/data/products";

export default async function HomePage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <>
      <MainHero />
      <TrustBadges />
      <ProductGrid lang={lang} products={PRODUCTS} />
      <ClientLogos />
      <FaqAccordion />
      <LeadCaptureForm />
    </>
  );
}
