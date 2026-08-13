"use client";

import { useState, type FormEvent, type FocusEvent } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Dictionary } from "@/data/dictionary";
import {
  formatUaPhoneMask,
  UA_PHONE_PLACEHOLDER,
} from "@/lib/phone-mask";
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
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:py-24">
        <ScrollReveal className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="max-w-3xl text-3xl font-bold uppercase tracking-tight text-accent-alt sm:text-4xl lg:text-5xl lg:leading-[1.08]">
              {copy.title}
            </h1>
            <p className="text-lg font-bold uppercase tracking-[0.08em] text-heading sm:text-xl">
              {copy.subtitle}
            </p>
          </div>

          <form
            id="hero-form"
            onSubmit={handleSubmit}
            className="scroll-mt-24 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
            noValidate
          >
            {status === "success" ? (
              <p className="px-2 py-3 text-sm font-semibold text-heading">
                {copy.success}
              </p>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <Input
                  label={copy.name}
                  name="fullName"
                  required
                  value={fullName}
                  error={errors.fullName}
                  onBlur={handleBlur}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <Input
                  label={copy.phone}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  error={errors.phone}
                  placeholder={UA_PHONE_PLACEHOLDER}
                  onBlur={handleBlur}
                  onChange={(e) => setPhone(formatUaPhoneMask(e.target.value))}
                />
                <div className="sm:w-40 sm:shrink-0">
                  <Button type="submit" size="lg" className="h-12 w-full">
                    {copy.submit}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="relative mx-auto w-full max-w-lg">
          <MediaPlaceholder
            aspect="4/3"
            label={copy.imageAlt}
            sizeHint="1600×1200"
            className="rounded-xl border-gray-200 shadow-sm"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
