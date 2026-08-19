"use client";

import {
  useCallback,
  useEffect,
  useId,
  useState,
  type FormEvent,
  type FocusEvent,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import type { Dictionary } from "@/data/dictionary";
import {
  isValidFullName,
  isValidUaPhone,
  validateCallbackFields,
  type CallbackFieldErrors,
} from "@/lib/validation";

export interface QuickOrderModalProps {
  open: boolean;
  onClose: () => void;
  copy: Dictionary["product"]["quickOrder"];
  productSlug?: string;
  productName?: string;
}

export function QuickOrderModal({
  open,
  onClose,
  copy,
  productSlug,
  productName,
}: QuickOrderModalProps) {
  const titleId = useId();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<CallbackFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const resetAndClose = useCallback(() => {
    setFullName("");
    setPhone("");
    setErrors({});
    setStatus("idle");
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

  function validate(): CallbackFieldErrors {
    return validateCallbackFields({ fullName, phone }, copy.errors);
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    const name = event.target.name;
    const next = validate();
    if (name === "fullName" || name === "phone") {
      setErrors((prev) => ({ ...prev, [name]: next[name] }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    if (!isValidFullName(fullName) || !isValidUaPhone(phone)) return;

    console.info("quick-order", { fullName, phone, productSlug, productName });
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
        className="absolute inset-0 bg-black/50"
        onClick={resetAndClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-lg sm:p-6"
      >
        <button
          type="button"
          onClick={resetAndClose}
          className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          aria-label={copy.close}
        >
          <X className="h-5 w-5" />
        </button>

        <h2
          id={titleId}
          className="pr-10 text-xl font-bold tracking-tight text-heading sm:text-2xl"
        >
          {copy.title}
        </h2>

        {status === "success" ? (
          <p className="mt-6 text-sm font-semibold text-heading">
            {copy.success}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-5 flex flex-col gap-3"
            noValidate
          >
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
            <Button type="submit" size="lg" className="mt-1 w-full">
              {copy.submit}
            </Button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
