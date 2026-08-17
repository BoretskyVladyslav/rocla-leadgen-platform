import {
  Headset,
  RotateCcw,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Dictionary } from "@/data/dictionary";

export interface ProductAdvantagesProps {
  copy: Dictionary["product"]["advantages"];
}

const ICONS: Record<
  Dictionary["product"]["advantages"][number]["id"],
  LucideIcon
> = {
  quality: ShieldCheck,
  delivery: Truck,
  return: RotateCcw,
  support: Headset,
};

export function ProductAdvantages({ copy }: ProductAdvantagesProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-14">
        <ScrollReveal>
          <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
            {copy.map((item) => {
              const Icon = ICONS[item.id];
              return (
                <li
                  key={item.id}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-amber-50 text-heading">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <p className="text-sm font-bold text-heading sm:text-base">
                    {item.label}
                  </p>
                </li>
              );
            })}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
