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
      className="h-5 w-auto max-w-[85px] object-contain opacity-75 grayscale transition-all hover:opacity-100 hover:grayscale-0 sm:h-6"
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
    <section className="relative overflow-hidden bg-white">
      <Image
        src="/images/delivery/boxes-left.jpg"
        alt=""
        width={180}
        height={180}
        className="pointer-events-none absolute bottom-0 left-0 hidden max-w-[160px] select-none lg:block xl:max-w-[200px]"
      />
      <Image
        src="/images/delivery/boxes-right.jpg"
        alt=""
        width={180}
        height={180}
        className="pointer-events-none absolute right-0 bottom-0 hidden max-w-[160px] select-none lg:block xl:max-w-[200px]"
      />
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
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
                className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-3 sm:flex-row"
                noValidate
              >
                <div className="w-full sm:w-64">
                  <Input
                    name="fullName"
                    required
                    placeholder={copy.name}
                    aria-label={copy.name}
                    value={fullName}
                    error={errors.fullName}
                    onBlur={handleBlur}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-12 rounded-xl border-neutral-300 bg-white px-4 text-sm shadow-none focus:border-amber-500 focus:ring-0 focus:outline-none"
                  />
                </div>
                <div className="w-full sm:w-64">
                  <PhoneInput
                    name="phone"
                    required
                    aria-label={copy.phone}
                    value={phone}
                    error={errors.phone}
                    onBlur={handleBlur}
                    onValueChange={setPhone}
                    className="h-12 rounded-xl border-neutral-300 bg-white shadow-none focus-within:border-amber-500 focus-within:ring-0"
                  />
                </div>
                <div className="flex w-full shrink-0 flex-col gap-1.5 sm:w-auto">
                  <Button
                    type="submit"
                    size="lg"
                    className="flex h-12 w-full shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-[#FFCC00] px-6 text-xs font-bold text-neutral-900 uppercase shadow-xs transition-all hover:bg-amber-400 sm:w-auto sm:text-sm"
                  >
                    {copy.submit}
                  </Button>
                  <div className="relative min-h-[1.25rem]" />
                </div>
              </form>
            )}

            <div className="mt-8 border-t border-neutral-200/60 pt-6">
              <p className="mb-3 text-center text-xs font-bold tracking-wider text-neutral-400 uppercase">
                {copy.partnersTitle}
              </p>
              <ul className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4 px-4 sm:gap-6">
                {copy.partners.map((partner) => (
                  <li
                    key={partner.name}
                    className="flex h-6 shrink-0 items-center justify-center"
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
        </ScrollReveal>
      </div>
    </section>
  );
}
