import type { Product } from "@/types/product";
import {
  DEFAULT_LOCALE,
  LOCALES,
  resolveLocale,
  type Locale,
} from "@/lib/i18n";

export { LOCALES, DEFAULT_LOCALE, resolveLocale };
export type { Locale };

const PRODUCTS_UK: Product[] = [
  {
    slug: "hydraulic-pallet-truck-2t",
    name: "Гідравлічна рохля 2 т",
    summary:
      "Універсальна рокла для складів і рамп — вантажопідйомність 2000 кг.",
    description:
      "Базова гідравлічна рохля для щоденного переміщення палет на складі, у логістичному центрі чи на завантажувальній рампі.",
    priceLabel: "від 8 900 ₴",
    compareAtPriceLabel: "9 900 ₴",
    discountLabel: "−10%",
    images: [
      {
        src: "/images/products/pallet-truck-2t-1.jpg",
        alt: "Гідравлічна рохля 2 т — загальний вигляд",
      },
      {
        src: "/images/products/pallet-truck-2t-2.jpg",
        alt: "Гідравлічна рохля 2 т — вила",
      },
    ],
    specs: [
      { label: "Вантажопідйомність", value: "2000 кг" },
      { label: "Довжина вил", value: "1150 мм" },
      { label: "Ширина вил", value: "550 мм" },
      { label: "Гарантія", value: "12 місяців" },
    ],
  },
  {
    slug: "hydraulic-pallet-truck-long-fork",
    name: "Рохля з довгими вилами",
    summary:
      "Подовжені вила 1500 мм для нестандартних і подвійних палет.",
    description:
      "Гідравлічна рокла з подовженими вилами для роботи з європалетами в ряді, довгими вантажами та подвійними піддонами.",
    priceLabel: "від 11 500 ₴",
    compareAtPriceLabel: "12 800 ₴",
    discountLabel: "−10%",
    images: [
      {
        src: "/images/products/pallet-truck-long-1.jpg",
        alt: "Рохля з довгими вилами — загальний вигляд",
      },
      {
        src: "/images/products/pallet-truck-long-2.jpg",
        alt: "Рохля з довгими вилами — деталь вил",
      },
    ],
    specs: [
      { label: "Вантажопідйомність", value: "2000 кг" },
      { label: "Довжина вил", value: "1500 мм" },
      { label: "Ширина вил", value: "550 мм" },
      { label: "Гарантія", value: "12 місяців" },
    ],
  },
  {
    slug: "hydraulic-pallet-truck-heavy-duty",
    name: "Посилена рохля 2.5 т",
    summary:
      "Підсилена конструкція для інтенсивного складського навантаження.",
    description:
      "Важка гідравлічна рокла з посиленою рамою та гідравлічним вузлом для безперервної роботи на великих складах.",
    priceLabel: "від 14 200 ₴",
    images: [
      {
        src: "/images/products/pallet-truck-heavy-1.jpg",
        alt: "Посилена рохля 2.5 т — загальний вигляд",
      },
      {
        src: "/images/products/pallet-truck-heavy-2.jpg",
        alt: "Посилена рохля 2.5 т — гідравлічний вузол",
      },
    ],
    specs: [
      { label: "Вантажопідйомність", value: "2500 кг" },
      { label: "Довжина вил", value: "1150 мм" },
      { label: "Ширина вил", value: "570 мм" },
      { label: "Гарантія", value: "24 місяці" },
    ],
  },
];

const PRODUCTS_RU: Product[] = [
  {
    slug: "hydraulic-pallet-truck-2t",
    name: "Гидравлическая рохля 2 т",
    summary:
      "Универсальная рокла для складов и рамп — грузоподъёмность 2000 кг.",
    description:
      "Базовая гидравлическая рохля для ежедневного перемещения паллет на складе, в логистическом центре или на погрузочной рампе.",
    priceLabel: "от 8 900 ₴",
    compareAtPriceLabel: "9 900 ₴",
    discountLabel: "−10%",
    images: [
      {
        src: "/images/products/pallet-truck-2t-1.jpg",
        alt: "Гидравлическая рохля 2 т — общий вид",
      },
      {
        src: "/images/products/pallet-truck-2t-2.jpg",
        alt: "Гидравлическая рохля 2 т — вилы",
      },
    ],
    specs: [
      { label: "Грузоподъёмность", value: "2000 кг" },
      { label: "Длина вил", value: "1150 мм" },
      { label: "Ширина вил", value: "550 мм" },
      { label: "Гарантия", value: "12 месяцев" },
    ],
  },
  {
    slug: "hydraulic-pallet-truck-long-fork",
    name: "Рохля с длинными вилами",
    summary:
      "Удлинённые вилы 1500 мм для нестандартных и двойных паллет.",
    description:
      "Гидравлическая рокла с удлинёнными вилами для работы с европаллетами в ряд, длинными грузами и двойными поддонами.",
    priceLabel: "от 11 500 ₴",
    compareAtPriceLabel: "12 800 ₴",
    discountLabel: "−10%",
    images: [
      {
        src: "/images/products/pallet-truck-long-1.jpg",
        alt: "Рохля с длинными вилами — общий вид",
      },
      {
        src: "/images/products/pallet-truck-long-2.jpg",
        alt: "Рохля с длинными вилами — деталь вил",
      },
    ],
    specs: [
      { label: "Грузоподъёмность", value: "2000 кг" },
      { label: "Длина вил", value: "1500 мм" },
      { label: "Ширина вил", value: "550 мм" },
      { label: "Гарантия", value: "12 месяцев" },
    ],
  },
  {
    slug: "hydraulic-pallet-truck-heavy-duty",
    name: "Усиленная рохля 2.5 т",
    summary:
      "Усиленная конструкция для интенсивной складской нагрузки.",
    description:
      "Тяжёлая гидравлическая рокла с усиленной рамой и гидравлическим узлом для непрерывной работы на крупных складах.",
    priceLabel: "от 14 200 ₴",
    images: [
      {
        src: "/images/products/pallet-truck-heavy-1.jpg",
        alt: "Усиленная рохля 2.5 т — общий вид",
      },
      {
        src: "/images/products/pallet-truck-heavy-2.jpg",
        alt: "Усиленная рохля 2.5 т — гидравлический узел",
      },
    ],
    specs: [
      { label: "Грузоподъёмность", value: "2500 кг" },
      { label: "Длина вил", value: "1150 мм" },
      { label: "Ширина вил", value: "570 мм" },
      { label: "Гарантия", value: "24 месяца" },
    ],
  },
];

const PRODUCTS_BY_LOCALE: Record<Locale, Product[]> = {
  uk: PRODUCTS_UK,
  ru: PRODUCTS_RU,
};

/** Shared slugs across locales (for static params). */
export const PRODUCT_SLUGS = PRODUCTS_UK.map((product) => product.slug);

/** Default-locale catalog (uk) for callers that need a flat list. */
export const PRODUCTS = PRODUCTS_BY_LOCALE[DEFAULT_LOCALE];

export function getProducts(lang: string): Product[] {
  return PRODUCTS_BY_LOCALE[resolveLocale(lang)];
}

export function getProductBySlug(
  slug: string,
  lang: string = DEFAULT_LOCALE,
): Product | undefined {
  return getProducts(lang).find((product) => product.slug === slug);
}
