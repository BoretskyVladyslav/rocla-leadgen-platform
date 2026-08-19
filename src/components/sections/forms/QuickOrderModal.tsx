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

const CATALOG_ISOLATED_SRC = "/images/catalog/gidravlicheskie-telezhki.jpg";

const fieldClassName =
  "h-10 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-none focus:border-gray-400 focus:ring-0 focus-visible:border-gray-400 focus-visible:ring-0";

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
  return [
    { src: CATALOG_ISOLATED_SRC, alt: product.name },
  ];
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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rawFile, setRawFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<OrderErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const activeImage = gallery[0];
  const specsHeading = copy.specsHeading.replace("{name}", product.name);

  const resetAndClose = useCallback(() => {
    setFullName("");
    setEmail("");
    setPhone("");
    setRawFile(null);
    setErrors({});
    setStatus("idle");
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
                <div className="relative w-full bg-white">
                  {activeImage?.src ? (
                    <div className="relative h-[260px] w-full">
                      <Image
                        key={activeImage.src}
                        src={activeImage.src}
                        alt={activeImage.alt ?? product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 28rem"
                        className="object-contain object-center"
                      />
                    </div>
                  ) : (
                    <div className="flex h-[260px] w-full items-center justify-center text-sm text-gray-400">
                      {product.name}
                    </div>
                  )}
                  <span className="absolute top-2 right-2 rounded-sm bg-[#0056B3] px-2 py-0.5 text-[11px] font-bold tracking-wide text-white uppercase">
                    {copy.hitBadge}
                  </span>
                </div>
                {gallery[0] ? (
                  <ul className="mt-3 flex gap-2">
                    <li>
                      <div className="relative h-16 w-16 overflow-hidden rounded-md border border-gray-200 bg-white">
                        <Image
                          src={gallery[0].src}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-contain object-center p-1"
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
                  <div className="mt-5 flex flex-wrap items-baseline">
                    <span className="mr-3 text-sm text-gray-700">
                      {copy.priceLabel}
                    </span>
                    {product.compareAtPriceLabel ? (
                      <span className="mr-3 text-sm text-gray-500 line-through">
                        {product.compareAtPriceLabel}
                      </span>
                    ) : null}
                    <span className="text-xl font-bold tabular-nums text-red-600">
                      {product.priceLabel}
                    </span>
                  </div>
                ) : null}

                {product.summary ? (
                  <p className="mt-4 border-t border-gray-200 pt-3 text-sm leading-relaxed text-gray-600">
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
                  className={fieldClassName}
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
                  className={fieldClassName}
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
                  className="h-10 rounded-md border-gray-300 shadow-none focus-within:border-gray-400 focus-within:ring-0"
                />
              </div>
              <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div className="flex min-w-0 flex-1 flex-col gap-1">
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
                    className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-md file:border file:border-gray-300 file:bg-white file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-gray-800"
                  />
                  {errors.file ? (
                    <span className="text-xs text-red-600">{errors.file}</span>
                  ) : null}
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full shrink-0 rounded-md bg-[#F9BC06] px-10 py-3 font-bold tracking-wider text-black uppercase shadow-none hover:bg-[#e5ac05] md:w-auto"
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
