"use client";

import { useState, type FormEvent, type FocusEvent } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
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

    console.info("hero-callback", { fullName, phone });
    setStatus("success");
    setFullName("");
    setPhone("");
  }

  return (
    <section className="scroll-mt-20 border-b border-border bg-white">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:py-16">
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
            className="scroll-mt-24 rounded-md border border-border bg-white p-3 shadow-sm sm:p-4"
            noValidate
          >
            {status === "success" ? (
              <p className="px-2 py-3 text-sm font-semibold text-heading">
                {copy.success}
              </p>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
                  <span className="sr-only">{copy.name}</span>
                  <input
                    name="fullName"
                    value={fullName}
                    onBlur={handleBlur}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={copy.name}
                    className="h-12 rounded-md border border-border bg-white px-3.5 text-foreground shadow-sm placeholder:text-muted/80 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45"
                    aria-invalid={errors.fullName ? true : undefined}
                  />
                  {errors.fullName ? (
                    <span className="text-xs text-red-600">{errors.fullName}</span>
                  ) : null}
                </label>
                <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
                  <span className="sr-only">{copy.phone}</span>
                  <input
                    name="phone"
                    type="tel"
                    value={phone}
                    onBlur={handleBlur}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+380"
                    className="h-12 rounded-md border border-border bg-white px-3.5 text-foreground shadow-sm placeholder:text-muted/80 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45"
                    aria-invalid={errors.phone ? true : undefined}
                  />
                  {errors.phone ? (
                    <span className="text-xs text-red-600">{errors.phone}</span>
                  ) : null}
                </label>
                <div className="sm:w-40">
                  <Button type="submit" size="lg" className="h-12 w-full">
                    {copy.submit}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="relative">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden bg-white">
            <Image
              src="/images/hero/rokla-hero.jpg"
              alt={copy.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-contain object-center"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
