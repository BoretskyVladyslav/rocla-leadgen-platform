"use client";

import { useState, type FormEvent, type FocusEvent } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  BadgePercent,
  Headset,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import type { Dictionary } from "@/data/dictionary";
import {
  validateCallbackFields,
  type CallbackFieldErrors,
} from "@/lib/validation";
import { PAGE_CONTAINER } from "@/lib/layout";
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
      sizes="90px"
      loading="lazy"
      className="h-6 w-auto max-w-[90px] object-contain grayscale transition duration-300 group-hover:grayscale-0"
      onError={() => setFailed(true)}
    />
  );
}

const TRUST_ICONS: Record<
  Dictionary["delivery"]["trustFactors"][number]["id"],
  LucideIcon
> = {
  experience: ShieldCheck,
  warranty: BadgeCheck,
  service: Wrench,
  prices: BadgePercent,
  approach: Headset,
};

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
    <section className={cn("w-full bg-white", className)}>
      <div className="relative w-full overflow-hidden py-10 md:py-14">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[22%] md:block lg:w-[24%]"
          aria-hidden
        >
          <Image
            src="/images/delivery/boxes-left.jpg"
            alt=""
            fill
            sizes="(min-width: 1280px) 280px, (min-width: 768px) 200px, 0px"
            loading="lazy"
            className="max-h-none max-w-none object-contain object-left-bottom"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[22%] md:block lg:w-[24%]"
          aria-hidden
        >
          <Image
            src="/images/delivery/boxes-right.jpg"
            alt=""
            fill
            sizes="(min-width: 1280px) 280px, (min-width: 768px) 200px, 0px"
            loading="lazy"
            className="max-h-none max-w-none object-contain object-right-bottom"
          />
        </div>

        <div className={`${PAGE_CONTAINER} relative z-10`}>
          <ScrollReveal>
            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-0 pt-8 pb-6 text-center sm:px-10 sm:pt-12 sm:pb-6 md:px-16">
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
                      className="h-12 w-full rounded-lg bg-accent px-5 text-xs font-bold text-accent-fg uppercase shadow-none hover:bg-accent-hover sm:text-sm"
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
          </ScrollReveal>
        </div>
      </div>
      <ul className={`${PAGE_CONTAINER} mt-1 grid grid-cols-2 gap-6 border-t border-gray-100 pt-4 pb-2 md:grid-cols-3 lg:grid-cols-5 xl:px-[68px] xl:py-[21px]`}>
        {copy.trustFactors.map((item) => {
          const Icon = TRUST_ICONS[item.id];
          return (
            <li key={item.id} className="flex items-start gap-3">
              <Icon
                className="mt-0.5 h-7 w-7 shrink-0 text-gray-900"
                strokeWidth={1.75}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">{item.subtitle}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
