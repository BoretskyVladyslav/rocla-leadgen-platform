import { ArrowRight } from "lucide-react";
import { CommercialOfferCard } from "@/components/sections/forms/CommercialOfferCard";
import { HashLink } from "@/components/layout/HashLink";
import { FaqAccordion } from "@/components/sections/trust/FaqAccordion";
import type { Dictionary } from "@/data/dictionary";
import { PAGE_CONTAINER } from "@/lib/layout";

export interface PdpFaqOfferProps {
  lang: string;
  faq: Dictionary["faq"];
  offer: Dictionary["product"]["commercialOffer"];
}

const CARD_CLASS =
  "bg-white rounded-2xl p-4 md:p-6 xl:p-8 border border-gray-200 shadow-sm h-full flex flex-col justify-between";

export function PdpFaqOffer({ lang, faq, offer }: PdpFaqOfferProps) {
  return (
    <section className="bg-[#F2F7FA] py-10 md:py-14 xl:py-[22px]">
      <div className={`${PAGE_CONTAINER} grid items-stretch gap-8 xl:px-[68px] lg:grid-cols-2`}>
        <div className={CARD_CLASS}>
          <FaqAccordion copy={faq} embedded />
          <HashLink
            href={`/${lang}#faq`}
            className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-amber-500 transition-colors hover:text-amber-600"
          >
            {faq.seeAll}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </HashLink>
        </div>
        <CommercialOfferCard copy={offer} className={CARD_CLASS} />
      </div>
    </section>
  );
}
