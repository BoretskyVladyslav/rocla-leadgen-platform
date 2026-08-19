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
import { cn } from "@/lib/utils";

export interface ReviewSubmitModalProps {
  open: boolean;
  onClose: () => void;
  copy: Dictionary["reviews"];
}

type ReviewErrors = CallbackFieldErrors & { message?: string };

export function ReviewSubmitModal({
  open,
  onClose,
  copy,
}: ReviewSubmitModalProps) {
  const titleId = useId();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ReviewErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const resetAndClose = useCallback(() => {
    setFullName("");
    setPhone("");
    setMessage("");
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

  function validate(): ReviewErrors {
    const next = validateCallbackFields(
      { fullName, phone },
      copy.errors,
    ) as ReviewErrors;
    if (!message.trim()) next.message = copy.errors.message;
    return next;
  }

  function handleBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = event.target.name;
    const next = validate();
    if (name === "fullName" || name === "phone" || name === "message") {
      setErrors((prev) => ({ ...prev, [name]: next[name] }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    if (!isValidFullName(fullName) || !isValidUaPhone(phone)) return;

    console.info("submit-review", { fullName, phone, message });
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
        aria-label={copy.modalClose}
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
          aria-label={copy.modalClose}
        >
          <X className="h-5 w-5" />
        </button>

        <h2
          id={titleId}
          className="pr-10 text-xl font-bold tracking-tight text-heading sm:text-2xl"
        >
          {copy.modalTitle}
        </h2>

        {status === "success" ? (
          <p className="mt-6 text-sm font-semibold text-heading">
            {copy.modalSuccess}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-5 flex flex-col gap-3"
            noValidate
          >
            <Input
              id="review-fullName"
              name="fullName"
              compact
              required
              autoComplete="name"
              label={copy.modalName}
              value={fullName}
              error={errors.fullName}
              onBlur={handleBlur}
              onChange={(e) => setFullName(e.target.value)}
            />
            <PhoneInput
              id="review-phone"
              name="phone"
              compact
              required
              label={copy.modalPhone}
              value={phone}
              error={errors.phone}
              onBlur={handleBlur}
              onValueChange={setPhone}
            />
            <div className="flex w-full flex-col gap-1 text-sm">
              <label
                htmlFor="review-message"
                className="font-medium tracking-tight text-foreground"
              >
                {copy.modalMessage}
              </label>
              <textarea
                id="review-message"
                name="message"
                required
                rows={4}
                value={message}
                onBlur={handleBlur}
                onChange={(e) => setMessage(e.target.value)}
                aria-invalid={errors.message ? true : undefined}
                className={cn(
                  "w-full resize-y rounded-lg border border-border bg-white px-3.5 py-2.5 text-foreground shadow-sm",
                  "placeholder:text-muted/80",
                  "transition-[border-color,box-shadow] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent",
                  errors.message &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500/40",
                )}
              />
              {errors.message ? (
                <span className="text-xs text-red-600">{errors.message}</span>
              ) : null}
            </div>
            <Button type="submit" size="lg" className="mt-1 w-full">
              {copy.modalSubmit}
            </Button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
