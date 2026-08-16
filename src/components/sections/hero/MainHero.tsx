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
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch lg:grid-cols-2">
        <ScrollReveal className="order-1 flex flex-col items-center justify-center px-4 py-10 text-center sm:px-6 lg:min-h-[640px] lg:py-12">
          <h1 className="text-4xl font-black uppercase leading-tight text-amber-500 sm:text-5xl">
            <span className="block">{copy.titleLine1}</span>
            <span className="block">{copy.titleLine2}</span>
          </h1>
          <div className="mx-auto my-3 h-1 w-12 bg-amber-400" />
          <p className="mt-2 text-xl font-bold text-neutral-900">
            {copy.marketTitle}
          </p>
          <p className="mt-2 text-base font-normal text-neutral-800">
            {copy.discountOffer}
          </p>
          <p className="mt-1 text-lg font-black text-neutral-900">
            {copy.urgency}
          </p>
          <p className="mt-2 text-xs text-neutral-500">{copy.disclaimer}</p>

          <form
            id="hero-form"
            onSubmit={handleSubmit}
            className="mt-4 w-full max-w-lg scroll-mt-24 text-left"
            noValidate
          >
            {status === "success" ? (
              <p className="px-2 py-3 text-center text-sm font-semibold text-heading">
                {copy.success}
              </p>
            ) : (
              <>
                <p className="mb-1 text-xs text-neutral-500">{copy.phoneHint}</p>
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-start">
                  <div className="min-w-0 flex-1">
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
                      className="rounded-md"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <PhoneInput
                      id="hero-phone"
                      name="phone"
                      required
                      placeholder={copy.phone}
                      aria-label={copy.phone}
                      value={phone}
                      error={errors.phone}
                      onBlur={handleBlur}
                      onValueChange={setPhone}
                      className="rounded-md"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Button
                      type="submit"
                      size="lg"
                      className="h-12 w-full rounded-md bg-amber-400 font-bold uppercase text-neutral-900 hover:bg-amber-500"
                    >
                      {copy.submit}
                    </Button>
                    <div className="relative min-h-[1.25rem]" />
                  </div>
                </div>
              </>
            )}
          </form>
        </ScrollReveal>

        <ScrollReveal
          delay={0.1}
          className="relative order-2 h-full min-h-[320px] w-full sm:min-h-[420px] lg:min-h-[640px]"
        >
          <MediaImage
            src={copy.imageSrc}
            alt={copy.imageAlt}
            aspect={false}
            fit="cover"
            priority
            objectPosition="object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-full min-h-[320px] rounded-none sm:min-h-[420px] lg:min-h-[640px]"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
