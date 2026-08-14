import { CommercialOfferCard } from "@/components/sections/forms/CommercialOfferCard";
import { FaqAccordion } from "@/components/sections/trust/FaqAccordion";
import type { Dictionary } from "@/data/dictionary";

export interface PdpFaqOfferProps {
  faq: Dictionary["faq"];
  offer: Dictionary["product"]["commercialOffer"];
}

export function PdpFaqOffer({ faq, offer }: PdpFaqOfferProps) {
  return (
    <section className="bg-neutral-50/80">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-start lg:gap-10 lg:py-20">
        <FaqAccordion copy={faq} embedded />
        <CommercialOfferCard copy={offer} />
      </div>
    </section>
  );
}
