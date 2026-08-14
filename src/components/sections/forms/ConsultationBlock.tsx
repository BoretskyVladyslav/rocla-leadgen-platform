"use client";

import { useState, type FormEvent, type FocusEvent } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
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
      className="relative scroll-mt-20 overflow-hidden border-y border-border bg-[#eef5f8]"
    >
      <div className="mx-auto grid w-full max-w-7xl items-start gap-8 px-4 pt-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,28rem)_auto] lg:gap-x-8 lg:pt-14 lg:pr-4">
        <ScrollReveal className="flex flex-col self-start lg:max-w-sm">
          <h2 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            {copy.title}
          </h2>
          <p className="mt-1 mb-6 text-xs text-neutral-500">{copy.subtitle}</p>
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

        <ScrollReveal delay={0.06} className="w-full max-w-md self-start justify-self-center lg:justify-self-stretch">
          {status === "success" ? (
            <p className="rounded-3xl border border-border bg-white px-8 py-10 text-center text-sm font-semibold text-heading shadow-sm">
              {copy.success}
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-2 rounded-3xl border border-border bg-white p-8 shadow-sm"
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
                className="h-auto py-3.5 px-4 text-base"
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
                className="h-auto min-h-12 py-1"
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
                className="h-auto py-3.5 px-4 text-base"
              />
              <Button type="submit" size="lg" className="mt-2 h-14 w-full text-base font-bold">
                {copy.submit}
              </Button>
            </form>
          )}
        </ScrollReveal>

        <div className="relative justify-self-end self-end">
          <Image
            src="/images/manager.png"
            alt={copy.imageAlt}
            width={480}
            height={720}
            sizes="(max-width: 1280px) 260px, 300px"
            className="h-[400px] w-auto object-contain object-bottom lg:h-[460px] xl:h-[500px]"
          />
        </div>
      </div>
    </section>
  );
}
