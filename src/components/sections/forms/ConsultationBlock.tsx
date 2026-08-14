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
      <div className="mx-auto grid w-full max-w-7xl items-start gap-8 px-4 pt-16 sm:px-6 lg:grid-cols-[minmax(0,1.25fr)_auto] lg:gap-x-12 lg:pt-16 lg:pl-8 lg:pr-6">
        <ScrollReveal className="flex flex-col gap-5 self-start lg:max-w-md lg:pt-8">
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

        <div className="flex items-end justify-end gap-0 self-end">
          <ScrollReveal delay={0.06} className="w-full max-w-sm shrink-0 self-center pb-10 lg:w-[20rem] lg:pb-12">
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

          <div className="relative self-end">
            <Image
              src="/images/manager.png"
              alt={copy.imageAlt}
              width={400}
              height={600}
              sizes="(max-width: 1024px) 200px, 240px"
              className="h-[300px] w-auto object-contain object-bottom lg:h-[380px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
