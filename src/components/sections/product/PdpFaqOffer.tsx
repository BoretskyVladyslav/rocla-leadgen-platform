import { CommercialOfferCard } from "@/components/sections/forms/CommercialOfferCard";
import { FaqAccordion } from "@/components/sections/trust/FaqAccordion";
import type { Dictionary } from "@/data/dictionary";

export interface PdpFaqOfferProps {
  faq: Dictionary["faq"];
  offer: Dictionary["product"]["commercialOffer"];
}

const CARD_CLASS =
  "bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs h-full flex flex-col justify-between";

export function PdpFaqOffer({ faq, offer }: PdpFaqOfferProps) {
  return (
    <section className="bg-neutral-50/80">
      <div className="mx-auto grid w-full max-w-7xl items-stretch gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div className={CARD_CLASS}>
          <FaqAccordion copy={faq} embedded />
        </div>
        <CommercialOfferCard copy={offer} className={CARD_CLASS} />
      </div>
    </section>
  );
}
