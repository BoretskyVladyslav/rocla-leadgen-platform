"use client";

import { useState, type FormEvent, type FocusEvent } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MediaImage } from "@/components/ui/MediaImage";
import { PhoneInput } from "@/components/ui/PhoneInput";
import type { Dictionary } from "@/data/dictionary";
import {
  validateCallbackFields,
  type CallbackFieldErrors,
} from "@/lib/validation";

export interface MainHeroProps {
  copy: Dictionary["hero"];
}

export function MainHero({ copy }: MainHeroProps) {
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

    console.info("hero-callback", { fullName, phone });
    setStatus("success");
    setFullName("");
    setPhone("");
  }

  return (
    <section className="scroll-mt-20 border-b border-border bg-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-x-10 lg:py-16">
        <ScrollReveal className="order-1 flex h-full min-h-0 flex-col justify-between gap-6 lg:min-h-[640px]">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-extrabold uppercase leading-tight tracking-tight text-amber-500 sm:text-4xl md:text-5xl">
              <span className="block">{copy.titleLine1}</span>
              <span className="block">{copy.titleLine2}</span>
            </h1>
            <div className="mx-auto my-4 h-1 w-16 bg-amber-400 md:mx-0" />
            <p className="mt-2 text-xl font-black tracking-wide text-neutral-900 md:text-2xl">
              {copy.marketTitle}
            </p>
            <p className="mt-2 text-base font-medium text-neutral-800 md:text-lg">
              {copy.discountOffer}
            </p>
            <p className="mt-1 text-lg font-black text-neutral-900 md:text-xl">
              {copy.urgency}
            </p>
            <p className="mt-3 text-xs text-neutral-500 italic">
              {copy.disclaimer}
            </p>
          </div>

          <form
            id="hero-form"
            onSubmit={handleSubmit}
            className="scroll-mt-24 w-full"
            noValidate
          >
            {status === "success" ? (
              <p className="px-2 py-3 text-sm font-semibold text-heading">
                {copy.success}
              </p>
            ) : (
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="w-full md:flex-1">
                  <Input
                    id="hero-fullName"
                    name="fullName"
                    required
                    placeholder={copy.name}
                    aria-label={copy.name}
                    value={fullName}
                    error={errors.fullName}
                    onBlur={handleBlur}
                    onChange={(e) => setFullName(e.target.value)}
                    className="rounded-none"
                  />
                </div>
                <div className="w-full md:flex-1">
                  <PhoneInput
                    id="hero-phone"
                    name="phone"
                    required
                    aria-label={copy.phone}
                    value={phone}
                    error={errors.phone}
                    onBlur={handleBlur}
                    onValueChange={setPhone}
                    className="rounded-none"
                  />
                </div>
                <div className="w-full md:flex-1">
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 w-full rounded-none bg-[#FFCC00] font-bold tracking-wide uppercase hover:bg-amber-400"
                  >
                    {copy.submit}
                  </Button>
                  <div className="relative min-h-[1.25rem]" />
                </div>
              </div>
            )}
          </form>
        </ScrollReveal>

        <ScrollReveal
          delay={0.1}
          className="relative order-2 mx-auto h-full w-full min-w-0 lg:max-w-none"
        >
          <MediaImage
            src={copy.imageSrc}
            alt={copy.imageAlt}
            aspect={false}
            fit="cover"
            priority
            objectPosition="object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-full min-h-[320px] rounded-none border border-gray-200 bg-surface shadow-sm sm:min-h-[420px] lg:min-h-[640px]"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
