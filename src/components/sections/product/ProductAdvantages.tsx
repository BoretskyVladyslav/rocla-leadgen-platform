import {
  Boxes,
  CreditCard,
  Gift,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/data/dictionary";
import { PAGE_CONTAINER } from "@/lib/layout";

export interface ProductAdvantagesProps {
  copy: Dictionary["product"]["advantages"];
}

const ICONS: Record<
  Dictionary["product"]["advantages"][number]["id"],
  LucideIcon
> = {
  stock: Boxes,
  shipping: Gift,
  payment: CreditCard,
  warranty: Wrench,
};

export function ProductAdvantages({ copy }: ProductAdvantagesProps) {
  return (
    <section className="border-t border-[#E8DCC0]/50 bg-gradient-to-b from-[#F7F1E3] via-[#FBF8F1] to-white py-10 md:py-14 xl:py-[37px]">
      <ul className={`${PAGE_CONTAINER} grid grid-cols-2 gap-4 sm:gap-x-6 sm:gap-y-7 lg:grid-cols-4`}>
        {copy.map((item) => {
          const Icon = ICONS[item.id];
          return (
            <li
              key={item.id}
              className="flex origin-left items-start gap-3 transition-transform duration-200 hover:scale-[1.03]"
            >
              <Icon
                className="mt-0.5 h-7 w-7 shrink-0 text-[#C5A35A] md:h-8 md:w-8"
                strokeWidth={1.35}
                aria-hidden
              />
              <div className="min-w-0 leading-snug">
                <p className="text-xs font-bold text-gray-900 md:text-sm">{item.title}</p>
                <p className="mt-0.5 text-xs leading-snug text-gray-500 md:text-sm md:leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
