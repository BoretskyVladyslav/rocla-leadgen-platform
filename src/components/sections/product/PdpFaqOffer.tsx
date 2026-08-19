import { CommercialOfferCard } from "@/components/sections/forms/CommercialOfferCard";
import { FaqAccordion } from "@/components/sections/trust/FaqAccordion";
import type { Dictionary } from "@/data/dictionary";
import { PAGE_CONTAINER } from "@/lib/layout";

export interface PdpFaqOfferProps {
  faq: Dictionary["faq"];
  offer: Dictionary["product"]["commercialOffer"];
}

const CARD_CLASS =
  "bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm h-full flex flex-col justify-between";

export function PdpFaqOffer({ faq, offer }: PdpFaqOfferProps) {
  return (
    <section className="bg-[#F2F7FA] py-10 md:py-14">
      <div className={`${PAGE_CONTAINER} grid items-stretch gap-8 lg:grid-cols-2`}>
        <div className={CARD_CLASS}>
          <FaqAccordion copy={faq} embedded />
        </div>
        <CommercialOfferCard copy={offer} className={CARD_CLASS} />
      </div>
    </section>
  );
}
