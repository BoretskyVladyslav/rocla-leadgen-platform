import type { Product } from "@/types/product";

export const LOCALES = ["en", "uk"] as const;

export const PRODUCTS: Product[] = [
  {
    slug: "reach-truck",
    name: "Reach Truck",
    summary: "High-bay warehouse handling with narrow-aisle precision.",
    description:
      "Placeholder product detail for reach truck configurations and inquiry capture.",
    priceLabel: "€42,500",
    compareAtPriceLabel: "€48,900",
    discountLabel: "13% off",
    images: [
      { src: "", alt: "Reach truck front view placeholder" },
      { src: "", alt: "Reach truck side view placeholder" },
      { src: "", alt: "Reach truck cabin placeholder" },
    ],
    specs: [
      { label: "Lift height", value: "Up to 12.5 m" },
      { label: "Load capacity", value: "1,600 kg" },
      { label: "Aisle width", value: "From 2.7 m" },
      { label: "Battery", value: "Li-ion / lead-acid" },
    ],
  },
  {
    slug: "counterbalance-forklift",
    name: "Counterbalance Forklift",
    summary: "Versatile indoor/outdoor load handling for mixed fleets.",
    description:
      "Placeholder product detail for counterbalance forklift configurations.",
    priceLabel: "€36,200",
    compareAtPriceLabel: "€39,800",
    discountLabel: "9% off",
    images: [
      { src: "", alt: "Counterbalance forklift front placeholder" },
      { src: "", alt: "Counterbalance forklift side placeholder" },
    ],
    specs: [
      { label: "Lift height", value: "Up to 6.5 m" },
      { label: "Load capacity", value: "2,500 kg" },
      { label: "Drive", value: "Electric / LPG" },
      { label: "Tire type", value: "Pneumatic / cushion" },
    ],
  },
  {
    slug: "pallet-truck",
    name: "Pallet Truck",
    summary: "Compact horizontal transport for docks and staging areas.",
    description: "Placeholder product detail for pallet truck configurations.",
    priceLabel: "€4,850",
    images: [
      { src: "", alt: "Pallet truck overview placeholder" },
      { src: "", alt: "Pallet truck fork detail placeholder" },
    ],
    specs: [
      { label: "Load capacity", value: "2,000 kg" },
      { label: "Fork length", value: "1,150 mm" },
      { label: "Travel speed", value: "Up to 6 km/h" },
      { label: "Battery", value: "Maintenance-free" },
    ],
  },
];

export const PRODUCTS_BY_SLUG: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((product) => [product.slug, product]),
);

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS_BY_SLUG[slug];
}
