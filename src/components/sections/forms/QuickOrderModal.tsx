"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type FocusEvent,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import type { Dictionary } from "@/data/dictionary";
import {
  isValidEmail,
  isValidFullName,
  isValidUaPhone,
  validateLeadFields,
  type LeadFieldErrors,
} from "@/lib/validation";
import { cn } from "@/lib/utils";
import {
  ACCEPTED_UPLOAD_ACCEPT,
  MAX_UPLOAD_BYTES,
  isAcceptedUploadFile,
  type FilePayload,
} from "@/types/form";
import type { Product, ProductImage, ProductSpec } from "@/types/product";

export interface QuickOrderModalProps {
  open: boolean;
  onClose: () => void;
  copy: Dictionary["product"]["quickOrder"];
  product: Product;
}

type OrderErrors = LeadFieldErrors & { file?: string };

const MODAL_SPEC_MATCHERS = [
  ["артикул"],
  ["вантажопідйомність", "грузоподъёмность", "грузоподъемность"],
  ["висота підйому", "высота подъёма", "высота подъема"],
  ["довжина вил", "длина вил"],
  ["ширина вил", "ширина вил"],
  ["гарантія", "гарантия"],
] as const;

function pickModalSpecs(
  specs: ProductSpec[],
  sku: string,
  skuLabel: string,
): ProductSpec[] {
  const picked = MODAL_SPEC_MATCHERS.flatMap((keys) => {
    const match = specs.find((spec) => {
      const label = spec.label.toLowerCase();
      return keys.some((key) => label.includes(key));
    });
    return match ? [match] : [];
  });
  const hasArticle = picked.some((spec) =>
    spec.label.toLowerCase().includes("артикул"),
  );
  if (!hasArticle && sku) {
    return [{ label: skuLabel, value: sku }, ...picked];
  }
  return picked;
}

function toFilePayload(file: File): FilePayload {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
  };
}

function productGallery(product: Product): ProductImage[] {
  if (product.images?.length) return product.images;
  if (product.imageSrc) {
    return [{ src: product.imageSrc, alt: product.imageAlt ?? product.name }];
  }
  return [];
}

export function QuickOrderModal({
  open,
  onClose,
  copy,
  product,
}: QuickOrderModalProps) {
  const titleId = useId();
  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const gallery = productGallery(product);
  const specRows = pickModalSpecs(
    product.specs ?? [],
    product.sku,
    copy.skuLabel,
  );
  const [activeThumb, setActiveThumb] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rawFile, setRawFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<OrderErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const activeImage =
    gallery.length > 0 ? gallery[activeThumb % gallery.length] : undefined;
  const specsHeading = copy.specsHeading.replace("{name}", product.name);

  const resetAndClose = useCallback(() => {
    setFullName("");
    setEmail("");
    setPhone("");
    setRawFile(null);
    setErrors({});
    setStatus("idle");
    setActiveThumb(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") resetAndClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, resetAndClose]);

  function validate(): OrderErrors {
    const next = validateLeadFields(
      { fullName, email, phone },
      copy.errors,
    ) as OrderErrors;
    if (!email.trim() || !isValidEmail(email)) next.email = copy.errors.email;
    if (rawFile) {
      if (!isAcceptedUploadFile(rawFile)) next.file = copy.errors.fileType;
      else if (rawFile.size > MAX_UPLOAD_BYTES) next.file = copy.errors.fileSize;
    }
    return next;
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    const name = event.target.name;
    const next = validate();
    if (name === "fullName" || name === "email" || name === "phone") {
      setErrors((prev) => ({ ...prev, [name]: next[name] }));
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setRawFile(file);
    if (!file) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.file;
        return next;
      });
      return;
    }
    if (!isAcceptedUploadFile(file)) {
      setErrors((prev) => ({ ...prev, file: copy.errors.fileType }));
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setErrors((prev) => ({ ...prev, file: copy.errors.fileSize }));
      return;
    }
    setErrors((prev) => {
      const next = { ...prev };
      delete next.file;
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    if (!isValidFullName(fullName) || !isValidEmail(email) || !isValidUaPhone(phone)) {
      return;
    }

    const files = rawFile ? [toFilePayload(rawFile)] : [];
    console.info("quick-order", {
      fullName,
      email,
      phone,
      files,
      productSlug: product.slug,
      productName: product.name,
    });
    setStatus("success");
  }

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center"
      role="presentation"
    >
      <button
        type="button"
        aria-label={copy.close}
        className="absolute inset-0 bg-black/60"
        onClick={resetAndClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-lg"
      >
        <div className="relative flex items-start justify-between gap-4 px-6 pt-6">
          <h2
            id={titleId}
            className="pr-10 text-2xl font-bold tracking-tight text-heading"
          >
            {product.name}
          </h2>
          <button
            type="button"
            onClick={resetAndClose}
            className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            aria-label={copy.close}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {status === "success" ? (
          <p className="px-6 py-8 text-sm font-semibold text-heading">
            {copy.success}
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
              <div>
                <div className="relative overflow-hidden rounded-lg border border-gray-100 bg-white">
                  {activeImage?.src ? (
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        key={activeImage.src}
                        src={activeImage.src}
                        alt={activeImage.alt ?? product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 28rem"
                        className="object-contain p-4"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-gray-50 text-sm text-gray-400">
                      {product.name}
                    </div>
                  )}
                  <span className="absolute top-2 right-2 rounded-sm bg-[#0056B3] px-2 py-0.5 text-[11px] font-bold tracking-wide text-white uppercase">
                    {copy.hitBadge}
                  </span>
                </div>
                {gallery.length > 1 ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {gallery.map((image, index) => (
                      <li key={`${image.src}-${index}`}>
                        <button
                          type="button"
                          onClick={() => setActiveThumb(index)}
                          aria-label={`${product.name} ${index + 1}`}
                          aria-pressed={index === activeThumb}
                          className={cn(
                            "relative h-16 w-16 overflow-hidden rounded-md border-2 bg-white",
                            index === activeThumb
                              ? "border-amber-400"
                              : "border-gray-200 hover:border-gray-300",
                          )}
                        >
                          <Image
                            src={image.src}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-contain p-1"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : gallery.length === 1 ? (
                  <ul className="mt-3 flex gap-2">
                    <li>
                      <div className="relative h-16 w-16 overflow-hidden rounded-md border-2 border-amber-400 bg-white">
                        <Image
                          src={gallery[0].src}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-contain p-1"
                        />
                      </div>
                    </li>
                  </ul>
                ) : null}
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-700">
                  {specsHeading}
                </h3>
                <dl className="mt-3 flex flex-col gap-2">
                  {specRows.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-baseline gap-2 text-sm"
                    >
                      <dt className="shrink-0 text-gray-500">{spec.label}</dt>
                      <span
                        className="min-w-0 flex-1 border-b border-dotted border-gray-300"
                        aria-hidden
                      />
                      <dd className="shrink-0 font-medium text-gray-900">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                  <div className="flex items-baseline gap-2 text-sm">
                    <dt className="shrink-0 text-gray-500">{copy.stockLabel}</dt>
                    <span
                      className="min-w-0 flex-1 border-b border-dotted border-gray-300"
                      aria-hidden
                    />
                    <dd className="shrink-0 font-medium text-gray-900">
                      {copy.inStock}
                    </dd>
                  </div>
                </dl>

                {product.priceLabel ? (
                  <div className="mt-5 flex flex-wrap items-baseline gap-3">
                    <span className="text-sm text-gray-700">{copy.priceLabel}</span>
                    {product.compareAtPriceLabel ? (
                      <span className="text-sm font-medium text-gray-400 line-through">
                        {product.compareAtPriceLabel}
                      </span>
                    ) : null}
                    <span className="text-xl font-bold tabular-nums text-red-700">
                      {product.priceLabel}
                    </span>
                  </div>
                ) : null}

                {product.summary ? (
                  <p className="mt-4 border-y border-gray-200 py-3 text-sm leading-relaxed text-gray-600">
                    {product.summary}
                  </p>
                ) : null}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-gray-100 px-6 pt-4 pb-6"
              noValidate
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <Input
                  id="quick-order-fullName"
                  name="fullName"
                  compact
                  required
                  autoComplete="name"
                  label={copy.name}
                  value={fullName}
                  error={errors.fullName}
                  onBlur={handleBlur}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <Input
                  id="quick-order-email"
                  name="email"
                  type="email"
                  compact
                  required
                  autoComplete="email"
                  label={copy.email}
                  value={email}
                  error={errors.email}
                  onBlur={handleBlur}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <PhoneInput
                  id="quick-order-phone"
                  name="phone"
                  compact
                  required
                  label={copy.phone}
                  value={phone}
                  error={errors.phone}
                  onBlur={handleBlur}
                  onValueChange={setPhone}
                />
              </div>
              <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div className="min-w-0 flex-1">
                  <label
                    htmlFor={fileInputId}
                    className="text-sm font-medium text-gray-700"
                  >
                    {copy.filesLabel}
                  </label>
                  <input
                    ref={fileInputRef}
                    id={fileInputId}
                    name="file"
                    type="file"
                    accept={ACCEPTED_UPLOAD_ACCEPT}
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-600 file:mr-3 file:rounded-md file:border file:border-gray-300 file:bg-white file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-gray-800"
                  />
                  {errors.file ? (
                    <span className="mt-1 block text-xs text-red-600">
                      {errors.file}
                    </span>
                  ) : null}
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full shrink-0 bg-amber-400 px-10 font-bold tracking-wide text-gray-900 uppercase shadow-none hover:bg-amber-400 hover:opacity-90 md:w-auto"
                >
                  {copy.submit}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
