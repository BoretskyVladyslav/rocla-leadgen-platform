"use client";

import { useState, type FormEvent, type FocusEvent, type ReactNode } from "react";
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

function TruckIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 18H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 18h2v-3.65a1 1 0 0 0-.22-.62l-2.56-3.42A2 2 0 0 0 16.56 10H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="18" r="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="7" cy="18" r="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function FileTextIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v4a2 2 0 0 0 2 2h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 9H8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 13H8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 17H8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TRUST_ICONS: ReactNode[] = [
  <TruckIcon key="truck" />,
  <FileTextIcon key="file" />,
  <ShieldCheckIcon key="shield" />,
];

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
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch lg:gap-12 lg:py-24">
        <ScrollReveal className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="max-w-3xl text-3xl font-bold uppercase tracking-tight text-heading sm:text-4xl lg:text-5xl lg:leading-[1.08]">
              {copy.title}
            </h1>
            <p className="text-lg font-bold uppercase tracking-[0.08em] text-muted sm:text-xl">
              {copy.subtitle}
            </p>
          </div>

          <form
            id="hero-form"
            onSubmit={handleSubmit}
            className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
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
                <PhoneInput
                  label={copy.phone}
                  name="phone"
                  required
                  value={phone}
                  error={errors.phone}
                  onBlur={handleBlur}
                  onValueChange={setPhone}
                />
                <div className="sm:w-44 sm:shrink-0 sm:pb-[calc(0.375rem+1.25rem)]">
                  <Button type="submit" size="lg" className="h-12 w-full">
                    {copy.submit}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="relative mx-auto flex h-full w-full min-w-0 max-w-lg flex-col lg:max-w-none">
          <MediaImage
            src={copy.imageSrc}
            alt={copy.imageAlt}
            aspect={false}
            fit="contain"
            priority
            objectPosition="object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="min-h-[320px] rounded-2xl border border-gray-200 bg-surface shadow-sm sm:min-h-[380px] lg:min-h-[440px]"
          />
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {copy.trustBadges.map((badge, index) => (
              <li
                key={badge}
                className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-surface px-3 py-2.5 text-xs font-bold tracking-tight text-heading sm:flex-col sm:items-start sm:gap-2 sm:text-center sm:text-[11px] lg:text-xs"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-fg sm:mx-auto">
                  {TRUST_ICONS[index] ?? null}
                </span>
                {badge}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
