import type { SVGProps } from "react";
import type { Dictionary } from "@/data/dictionary";

export interface ProductAdvantagesProps {
  copy: Dictionary["product"]["advantages"];
}

const ICONS = {
  stock: PalletIcon,
  shipping: GiftExpressIcon,
  payment: CardsIcon,
  warranty: ServiceIcon,
};

export function ProductAdvantages({ copy }: ProductAdvantagesProps) {
  return (
    <section className="mt-8 border-y border-amber-100/60 bg-[#FFF9E6] py-5">
      <ul className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {copy.map((item) => {
          const Icon = ICONS[item.id];
          return (
            <li key={item.id} className="flex items-center gap-3">
              <Icon
                className="h-8 w-8 shrink-0 text-amber-500"
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

function PalletIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="8" y="3.5" width="11" height="8" rx="0.8" />
      <rect x="13" y="7.5" width="11" height="8" rx="0.8" />
      <path d="M4 18.5h24" />
      <path d="M5.5 18.5v5.5M12 18.5v4M20 18.5v4M26.5 18.5v5.5" />
      <path d="M4 24h24" />
      <path d="M4 26.5h24" />
    </svg>
  );
}

function GiftExpressIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="5" y="13" width="18" height="13" rx="1" />
      <path d="M5 18h18" />
      <path d="M14 13v13" />
      <path d="M14 13c-2.2-3.8-6.2-4-7.2-2.2S8 14.5 14 13c2.2-3.8 6.2-4 7.2-2.2S20 14.5 14 13Z" />
      <circle cx="24.5" cy="24.5" r="5" />
      <path d="M24.5 22.2v2.6l1.8 1.1" />
    </svg>
  );
}

function CardsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="6" width="20" height="13" rx="1.5" />
      <path d="M4 11h20" />
      <rect x="8" y="13" width="20" height="13" rx="1.5" />
      <path d="M8 18h20" />
      <path d="M11 22.5h5" />
    </svg>
  );
}

function ServiceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="20.5" cy="12.5" r="5.2" />
      <path d="M20.5 7.3v1.6M20.5 16.1v1.6M15.3 12.5h1.6M24.1 12.5h1.6M16.8 8.8l1.1 1.1M23.1 15.1l1.1 1.1M16.8 16.2l1.1-1.1M23.1 9.9l1.1-1.1" />
      <circle cx="20.5" cy="12.5" r="2" />
      <path d="M6.2 22.8c-.8-.8-.8-2.1 0-2.9l2.4-2.4 6.1 6.1-2.4 2.4c-.8.8-2.1.8-2.9 0l-.4-.4-1.5 1.5c-.5.5-1.3.5-1.8 0l-.6-.6c-.5-.5-.5-1.3 0-1.8l1.5-1.5-.4-.4Z" />
    </svg>
  );
}
