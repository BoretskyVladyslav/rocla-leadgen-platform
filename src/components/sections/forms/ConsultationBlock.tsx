"use client";

import { useState, type FormEvent, type FocusEvent } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MediaImage } from "@/components/ui/MediaImage";
import { PhoneInput } from "@/components/ui/PhoneInput";
import type { Dictionary } from "@/data/dictionary";
import {
  validateLeadFields,
  type LeadFieldErrors,
} from "@/lib/validation";

export interface ConsultationBlockProps {
  copy: Dictionary["consultation"];
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 text-accent-fg" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8.2 6.4 11l6.1-6.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ConsultationBlock({ copy }: ConsultationBlockProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function validateField(field: keyof LeadFieldErrors) {
    const next = validateLeadFields(
      { fullName, email, phone },
      copy.errors,
    );
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    const name = event.target.name as keyof LeadFieldErrors;
    if (name === "fullName" || name === "email" || name === "phone") {
      validateField(name);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateLeadFields(
      { fullName, email, phone },
      copy.errors,
    );
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    console.info("consultation", { fullName, phone, email });
    setStatus("success");
    setFullName("");
    setPhone("");
    setEmail("");
  }

  return (
    <section
      id="consultation"
      className="scroll-mt-20 border-y border-border bg-[#eef5f8]"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr_auto] lg:gap-12 lg:py-20">
        <ScrollReveal className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            {copy.title}
          </h2>
          <ul className="flex flex-col gap-3">
            {copy.benefits.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground sm:text-base">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent shadow-sm">
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={0.06}>
          {status === "success" ? (
            <p className="rounded-2xl border border-border bg-white px-5 py-8 text-center text-sm font-semibold text-heading shadow-sm">
              {copy.success}
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6"
              noValidate
            >
              <Input
                id="consultation-fullName"
                label={copy.fullName}
                name="fullName"
                required
                value={fullName}
                error={errors.fullName}
                onBlur={handleBlur}
                onChange={(e) => setFullName(e.target.value)}
              />
              <PhoneInput
                id="consultation-phone"
                label={copy.phone}
                name="phone"
                required
                value={phone}
                error={errors.phone}
                onBlur={handleBlur}
                onValueChange={setPhone}
              />
              <Input
                id="consultation-email"
                label={copy.email}
                name="email"
                type="email"
                value={email}
                error={errors.email}
                onBlur={handleBlur}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" size="lg" className="mt-1 w-full">
                {copy.submit}
              </Button>
            </form>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mx-auto hidden w-full max-w-[14rem] lg:block">
          <MediaImage
            src={copy.imageSrc}
            alt={copy.imageAlt}
            aspect="3/4"
            fit="cover"
            sizes="224px"
            className="rounded-2xl border border-gray-200 shadow-sm"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
