import type { Locale } from "@/lib/i18n";

export const CLIENT_BRANDS = [
  { uk: "АТБ", ru: "АТБ", imageSrc: "/images/clients/atb.jpg" },
  { uk: "Coca-Cola", ru: "Coca-Cola", imageSrc: "/images/clients/coca-cola.jpg" },
  { uk: "Comfy", ru: "Comfy", imageSrc: "/images/clients/comfy.jpg" },
  { uk: "Дарниця", ru: "Дарница", imageSrc: "/images/clients/darnitsa.jpg" },
  { uk: "Епіцентр", ru: "Эпицентр", imageSrc: "/images/clients/epicentr.jpg" },
  { uk: "Київстар", ru: "Киевстар", imageSrc: "/images/clients/kyivstar.jpg" },
  { uk: "McDonald's", ru: "McDonald's", imageSrc: "/images/clients/mcdonalds.jpg" },
  { uk: "Нова Пошта", ru: "Новая Почта", imageSrc: "/images/clients/nova-poshta.jpg" },
  { uk: "Roshen", ru: "Roshen", imageSrc: "/images/clients/roshen.jpg" },
] as const;

export function getClientLogos(locale: Locale) {
  return CLIENT_BRANDS.map((brand) => ({
    name: brand[locale],
    imageSrc: brand.imageSrc,
  }));
}
