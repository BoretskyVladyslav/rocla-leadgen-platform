"use client";

import { useState, type FormEvent, type FocusEvent } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import type { Dictionary } from "@/data/dictionary";
import {
  validateCallbackFields,
  type CallbackFieldErrors,
} from "@/lib/validation";

export interface DeliveryEstimateProps {
  copy: Dictionary["delivery"];
}

function PartnerLogo({ name, imageSrc }: { name: string; imageSrc: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted/70">
        {name}
      </span>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={name}
      width={120}
      height={32}
      className="h-7 w-auto object-contain opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0 sm:h-8"
      onError={() => setFailed(true)}
    />
  );
}

const fieldClassName =
  "h-12 rounded-xl border-neutral-300 bg-white px-4 text-sm shadow-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500";

export function DeliveryEstimate({ copy }: DeliveryEstimateProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<CallbackFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function validateField(field: keyof CallbackFieldErrors) {
    const next = validateCallbackFields({ fullName, phone }, copy.errors);
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
    const nextErrors = validateCallbackFields({ fullName, phone }, copy.errors);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    console.info("delivery-request", { fullName, phone });
    setStatus("success");
    setFullName("");
    setPhone("");
  }

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
        <ScrollReveal>
          <div className="mx-auto max-w-5xl rounded-3xl border border-neutral-200/80 bg-neutral-50/70 p-6 shadow-xs sm:p-10">
            <h2 className="text-center text-2xl font-extrabold tracking-wide text-neutral-900 uppercase sm:text-3xl">
              {copy.title}
            </h2>
            <p className="mb-6 mt-3 text-center text-xs text-neutral-500">
              {copy.subtitle}
            </p>

            {status === "success" ? (
              <p className="text-center text-sm font-semibold text-heading">
                {copy.success}
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-3 sm:flex-row"
                noValidate
              >
                <Input
                  name="fullName"
                  required
                  placeholder={copy.name}
                  aria-label={copy.name}
                  value={fullName}
                  error={errors.fullName}
                  onBlur={handleBlur}
                  onChange={(e) => setFullName(e.target.value)}
                  className={fieldClassName}
                />
                <PhoneInput
                  name="phone"
                  required
                  aria-label={copy.phone}
                  value={phone}
                  error={errors.phone}
                  onBlur={handleBlur}
                  onValueChange={setPhone}
                  className="h-12 rounded-xl border-neutral-300 bg-white shadow-none focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 shrink-0 rounded-xl bg-[#FFCC00] px-6 font-bold text-neutral-900 uppercase shadow-xs transition-all hover:bg-amber-400"
                >
                  {copy.submit}
                </Button>
              </form>
            )}

            <div className="mt-8 border-t border-neutral-200/60 pt-6">
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:flex-nowrap">
                <p className="shrink-0 text-xs font-semibold tracking-wider text-neutral-600 uppercase sm:text-sm">
                  {copy.partnersTitle}
                </p>
                <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:flex-nowrap">
                  {copy.partners.map((partner) => (
                    <li
                      key={partner.name}
                      className="flex h-8 shrink-0 items-center justify-center"
                    >
                      <PartnerLogo
                        name={partner.name}
                        imageSrc={partner.imageSrc}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
