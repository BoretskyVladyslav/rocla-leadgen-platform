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
import { cn } from "@/lib/utils";

export interface DeliveryEstimateProps {
  copy: Dictionary["delivery"];
  className?: string;
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
      className="h-6 w-auto max-w-[90px] object-contain grayscale transition duration-300 group-hover:grayscale-0"
      onError={() => setFailed(true)}
    />
  );
}

const FIELD_CLASS =
  "h-12 rounded-lg border border-neutral-300 bg-white px-3.5 text-sm shadow-none focus:border-amber-400 focus:ring-0 focus:outline-none";

export function DeliveryEstimate({ copy, className }: DeliveryEstimateProps) {
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
    <section className={cn("bg-white py-12", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-xs">
            <div
              className="pointer-events-none absolute bottom-0 left-0 z-0 hidden h-full w-[22%] md:block lg:w-[24%]"
              aria-hidden
            >
              <Image
                src="/images/delivery/boxes-left.jpg"
                alt=""
                fill
                sizes="(min-width: 1280px) 280px, (min-width: 768px) 200px, 0px"
                className="max-h-none max-w-none object-contain object-left-bottom"
              />
            </div>
            <div
              className="pointer-events-none absolute right-0 bottom-0 z-0 hidden h-full w-[22%] md:block lg:w-[24%]"
              aria-hidden
            >
              <Image
                src="/images/delivery/boxes-right.jpg"
                alt=""
                fill
                sizes="(min-width: 1280px) 280px, (min-width: 768px) 200px, 0px"
                className="max-h-none max-w-none object-contain object-right-bottom"
              />
            </div>

            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-10 text-center sm:px-10 sm:py-12 md:px-16">
              <h2 className="text-2xl font-extrabold tracking-wide text-neutral-900 uppercase sm:text-3xl">
                {copy.title}
              </h2>
              <p className="mt-2 text-xs text-neutral-500 italic">
                {copy.subtitle}
              </p>

              {status === "success" ? (
                <p className="mt-6 text-sm font-semibold text-heading">
                  {copy.success}
                </p>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:items-start"
                  noValidate
                >
                  <div className="w-full sm:flex-1">
                    <Input
                      id="delivery-fullName"
                      name="fullName"
                      required
                      placeholder={copy.name}
                      aria-label={copy.name}
                      value={fullName}
                      error={errors.fullName}
                      onBlur={handleBlur}
                      onChange={(e) => setFullName(e.target.value)}
                      className={FIELD_CLASS}
                    />
                  </div>
                  <div className="w-full sm:flex-1">
                    <PhoneInput
                      id="delivery-phone"
                      name="phone"
                      required
                      aria-label={copy.phone}
                      value={phone}
                      error={errors.phone}
                      onBlur={handleBlur}
                      onValueChange={setPhone}
                      className="h-12 rounded-lg border border-neutral-300 bg-white shadow-none focus-within:border-amber-400 focus-within:ring-0"
                    />
                  </div>
                  <div className="w-full sm:flex-1">
                    <Button
                      type="submit"
                      size="lg"
                      className="h-12 w-full rounded-lg bg-amber-400 px-5 text-xs font-bold text-white uppercase shadow-none hover:bg-amber-500 sm:text-sm"
                    >
                      {copy.submit}
                    </Button>
                    <div className="relative min-h-[1.25rem]" />
                  </div>
                </form>
              )}

              <p className="mt-2 text-xs font-bold tracking-wider text-neutral-400 uppercase">
                {copy.partnersTitle}
              </p>
              <ul className="mt-3 flex w-full flex-nowrap items-center justify-center gap-4 overflow-x-auto sm:gap-6">
                {copy.partners.map((partner) => (
                  <li
                    key={partner.name}
                    className="group flex h-7 shrink-0 items-center justify-center"
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
