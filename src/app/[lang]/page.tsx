import { ProductGrid } from "@/components/sections/catalog/ProductGrid";
import { LeadCaptureForm } from "@/components/sections/forms/LeadCaptureForm";
import { MainHero } from "@/components/sections/hero/MainHero";
import { ClientLogos } from "@/components/sections/trust/ClientLogos";
import { FaqAccordion } from "@/components/sections/trust/FaqAccordion";
import { TrustBadges } from "@/components/sections/trust/TrustBadges";
import type { Product } from "@/types/product";

const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    slug: "reach-truck",
    name: "Reach Truck",
    summary: "High-bay warehouse handling with narrow-aisle precision.",
  },
  {
    slug: "counterbalance-forklift",
    name: "Counterbalance Forklift",
    summary: "Versatile indoor/outdoor load handling for mixed fleets.",
  },
  {
    slug: "pallet-truck",
    name: "Pallet Truck",
    summary: "Compact horizontal transport for docks and staging areas.",
  },
];

export default async function HomePage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <>
      <MainHero />
      <TrustBadges />
      <ProductGrid lang={lang} products={PLACEHOLDER_PRODUCTS} />
      <ClientLogos />
      <FaqAccordion />
      <LeadCaptureForm />
    </>
  );
}
