export type ProductVariantId = string;

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductVariant {
  id: ProductVariantId;
  name: string;
  sku?: string;
  specs?: ProductSpec[];
  priceLabel?: string;
}

export interface Product {
  slug: string;
  name: string;
  summary: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  variants?: ProductVariant[];
  specs?: ProductSpec[];
}
