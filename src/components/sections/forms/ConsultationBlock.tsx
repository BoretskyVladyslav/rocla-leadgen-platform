"use client";

import { useState, type FormEvent, type FocusEvent } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import type { Dictionary } from "@/data/dictionary";
import {
  validateCallbackFields,
  type CallbackFieldErrors,
} from "@/lib/validation";
import { PAGE_CONTAINER } from "@/lib/layout";
import { cn } from "@/lib/utils";

export interface ConsultationBlockProps {
  copy: Dictionary["consultation"];
  className?: string;
}

export function ConsultationBlock({ copy, className }: ConsultationBlockProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<CallbackFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function validateField(field: keyof CallbackFieldErrors) {
    const next = validateCallbackFields(
      { fullName, phone },
      copy.errors,
    );
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    const name = event.target.name as keyof CallbackFieldErrors;
    if (name === "fullName" || name === "phone") {
      validateField(name);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateCallbackFields(
      { fullName, phone },
      copy.errors,
    );
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    console.info("consultation", { fullName, phone, comment });
    setStatus("success");
    setFullName("");
    setPhone("");
    setComment("");
  }

  const inputClass =
    "h-11 rounded-md border-gray-200 shadow-none focus:border-gray-300 focus:shadow-md focus:ring-0 focus-visible:border-gray-300 focus-visible:ring-0 focus-within:border-gray-300 focus-within:shadow-md focus-within:ring-0";

  return (
    <section
      id="consultation"
      className={cn("scroll-mt-20 py-10 md:py-14 xl:py-[18px]", className)}
    >
      <div className={PAGE_CONTAINER}>
        <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-[#E2F0FB]">
          <div className="grid grid-cols-1 items-end lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(200px,280px)]">
          <div className="px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-[1.75rem]">
              {copy.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              {copy.subtitle}
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {copy.benefits.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-gray-800 sm:text-[15px]"
                >
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#C5A35A] text-[#C5A35A]">
                    <Check className="h-3 w-3" strokeWidth={2.2} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="px-6 pb-8 sm:px-8 lg:px-4 lg:py-10">
            {status === "success" ? (
              <p className="py-4 text-center text-sm font-semibold text-gray-900">
                {copy.success}
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-2.5"
                noValidate
              >
                <Input
                  id="consultation-fullName"
                  name="fullName"
                  compact
                  required
                  autoComplete="name"
                  placeholder={copy.fullName}
                  aria-label={copy.fullName}
                  value={fullName}
                  error={errors.fullName}
                  onBlur={handleBlur}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputClass}
                />
                <PhoneInput
                  id="consultation-phone"
                  name="phone"
                  compact
                  required
                  value={phone}
                  error={errors.phone}
                  onBlur={handleBlur}
                  onValueChange={setPhone}
                  aria-label={copy.phone}
                  className={cn(inputClass, "overflow-hidden")}
                />
                <Input
                  id="consultation-comment"
                  name="comment"
                  compact
                  autoComplete="off"
                  placeholder={copy.comment}
                  aria-label={copy.comment}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className={inputClass}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="mt-1 h-12 w-full text-sm font-bold"
                >
                  {copy.submit}
                </Button>
              </form>
            )}
          </div>

          <div className="relative flex min-h-[280px] items-end justify-center lg:min-h-0 lg:justify-end">
            <Image
              src={copy.imageSrc}
              alt={copy.imageAlt}
              width={480}
              height={720}
              sizes="(max-width: 1024px) 220px, 280px"
              loading="lazy"
              className="pointer-events-none relative h-auto max-h-[320px] w-auto max-w-full object-contain object-bottom lg:max-h-[360px]"
            />
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
