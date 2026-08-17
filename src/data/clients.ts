import type { Locale } from "@/lib/i18n";

export const CLIENT_BRANDS = [
  {
    uk: "McDonald's",
    ru: "McDonald's",
    imageSrc: "/images/clients/mcdonalds.jpg",
  },
  {
    uk: "Нова Пошта",
    ru: "Новая Почта",
    imageSrc: "/images/clients/nova-poshta.jpg",
  },
  { uk: "OKKO", ru: "OKKO", imageSrc: null },
  { uk: "Наша Ряба", ru: "Наша Ряба", imageSrc: null },
  { uk: "Укрпошта", ru: "Укрпочта", imageSrc: null },
] as const;

export function getClientLogos(locale: Locale) {
  return CLIENT_BRANDS.map((brand) => ({
    name: brand[locale],
    imageSrc: brand.imageSrc,
  }));
}
