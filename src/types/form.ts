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
  files?: FilePayload[];
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

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export const ACCEPTED_UPLOAD_MIME_SET = new Set<string>([
  "application/pdf",
  "image/jpeg",
  "image/png",
]);

export function isAcceptedUploadFile(file: File): boolean {
  const name = file.name.toLowerCase();
  const extOk =
    name.endsWith(".pdf") ||
    name.endsWith(".jpg") ||
    name.endsWith(".jpeg") ||
    name.endsWith(".png");
  const mimeOk =
    !file.type || ACCEPTED_UPLOAD_MIME_SET.has(file.type);
  return extOk && mimeOk;
}
