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
    <section className="border-y border-border bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 lg:py-28">
        <ScrollReveal>
          <h2 className="section-heading">{copy.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-muted sm:text-base">
            {copy.subtitle}
          </p>

          {status === "success" ? (
            <p className="mt-8 text-center text-sm font-semibold text-heading">
              {copy.success}
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-end"
              noValidate
            >
              <Input
                label={copy.name}
                name="fullName"
                required
                placeholder={copy.name}
                value={fullName}
                error={errors.fullName}
                onBlur={handleBlur}
                onChange={(e) => setFullName(e.target.value)}
              />
              <PhoneInput
                label={copy.phone}
                name="phone"
                required
                value={phone}
                error={errors.phone}
                onBlur={handleBlur}
                onValueChange={setPhone}
              />
              <div className="flex w-full shrink-0 flex-col gap-1.5 sm:w-auto">
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full bg-[#FFCC00] px-8 font-semibold text-black sm:min-w-[11.5rem]"
                >
                  {copy.submit}
                </Button>
                <div className="relative min-h-[1.25rem]" />
              </div>
            </form>
          )}

          <div className="mt-10">
            <p className="mb-5 text-center text-sm font-bold uppercase tracking-[0.12em] text-heading">
              {copy.partnersTitle}
            </p>
            <ul className="flex flex-row flex-nowrap items-center justify-start gap-5 overflow-x-auto pb-1 sm:justify-center sm:gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {copy.partners.map((partner) => (
                <li
                  key={partner.name}
                  className="flex h-8 shrink-0 items-center justify-center"
                >
                  <PartnerLogo name={partner.name} imageSrc={partner.imageSrc} />
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
