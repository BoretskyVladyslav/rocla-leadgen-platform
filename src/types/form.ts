export type AcceptedUploadMime =
  | "application/pdf"
  | "image/jpeg"
  | "image/png";

export type AcceptedUploadExtension = ".pdf" | ".jpg" | ".jpeg" | ".png";

export interface FilePayload {
  name: string;
  size: number;
  type: AcceptedUploadMime | string;
  lastModified: number;
}

export interface LeadFormData {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
}

export interface ProductOrderFormData extends LeadFormData {
  productSlug: string;
  variantId?: string;
  quantity?: number;
  files: FilePayload[];
}

export const ACCEPTED_UPLOAD_EXTENSIONS: AcceptedUploadExtension[] = [
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
];

export const ACCEPTED_UPLOAD_ACCEPT =
  ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png";
