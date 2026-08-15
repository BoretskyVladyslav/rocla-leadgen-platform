import { CommercialOfferCard } from "@/components/sections/forms/CommercialOfferCard";
import { FaqAccordion } from "@/components/sections/trust/FaqAccordion";
import type { Dictionary } from "@/data/dictionary";

export interface HomepageFaqOfferProps {
  faq: Dictionary["faq"];
  offer: Dictionary["product"]["commercialOffer"];
}

const CARD_CLASS =
  "bg-white rounded-none p-6 sm:p-8 border border-neutral-200/80 shadow-xs h-full flex flex-col justify-between";

export function HomepageFaqOffer({ faq, offer }: HomepageFaqOfferProps) {
  return (
    <section className="bg-sky-50/50 py-16 md:py-20">
      <div className="mx-auto grid w-full max-w-7xl items-stretch gap-8 px-4 sm:px-6 lg:grid-cols-2">
        <div className={CARD_CLASS}>
          <FaqAccordion copy={faq} embedded />
        </div>
        <CommercialOfferCard copy={offer} className={CARD_CLASS} />
      </div>
    </section>
  );
}
