import {
  Boxes,
  CreditCard,
  Gift,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/data/dictionary";

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
    <section className="mt-8 border-t border-amber-200/80 bg-gradient-to-b from-[#F6D56B] via-[#FBE8A8] to-white py-7">
      <ul className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {copy.map((item) => {
          const Icon = ICONS[item.id];
          return (
            <li
              key={item.id}
              className="flex origin-left items-center gap-3.5 transition-transform duration-200 hover:scale-105"
            >
              <Icon
                className="h-9 w-9 shrink-0 text-amber-600"
                strokeWidth={2.25}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">{item.subtitle}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
