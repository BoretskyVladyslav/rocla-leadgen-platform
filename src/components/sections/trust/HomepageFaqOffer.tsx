import { CommercialOfferCard } from "@/components/sections/forms/CommercialOfferCard";
import { FaqAccordion } from "@/components/sections/trust/FaqAccordion";
import type { Dictionary } from "@/data/dictionary";
import { PAGE_CONTAINER } from "@/lib/layout";

export interface HomepageFaqOfferProps {
  faq: Dictionary["faq"];
  offer: Dictionary["product"]["commercialOffer"];
}

const CARD_CLASS =
  "flex h-full flex-col justify-between rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8";

export function HomepageFaqOffer({ faq, offer }: HomepageFaqOfferProps) {
  return (
    <section className="bg-[#F2F7FA] py-10 md:py-14">
      <div className={`${PAGE_CONTAINER} grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2`}>
        <div className={CARD_CLASS}>
          <FaqAccordion copy={faq} embedded />
        </div>
        <CommercialOfferCard copy={offer} className={CARD_CLASS} />
      </div>
    </section>
  );
}
