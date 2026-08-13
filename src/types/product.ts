export type ProductVariantId = string;

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductImage {
  src: string;
  alt: string;
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
  sku: string;
  description?: string;
  descriptionParagraphs?: string[];
  descriptionBullets?: string[];
  imageSrc?: string;
  imageAlt?: string;
  images?: ProductImage[];
  priceLabel?: string;
  compareAtPriceLabel?: string;
  discountLabel?: string;
  variants?: ProductVariant[];
  specs?: ProductSpec[];
}
