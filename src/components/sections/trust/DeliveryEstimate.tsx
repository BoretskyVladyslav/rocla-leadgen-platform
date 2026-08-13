"use client";

import { useState, type FormEvent, type FocusEvent } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import type { Dictionary } from "@/data/dictionary";
import {
  validateDeliveryFields,
  type DeliveryFieldErrors,
} from "@/lib/validation";

export interface DeliveryEstimateProps {
  copy: Dictionary["delivery"];
}

export function DeliveryEstimate({ copy }: DeliveryEstimateProps) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<DeliveryFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function validateField(field: keyof DeliveryFieldErrors) {
    const next = validateDeliveryFields({ from, to, phone }, copy.errors);
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    const name = event.target.name as keyof DeliveryFieldErrors;
    if (name === "from" || name === "to" || name === "phone") {
      validateField(name);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateDeliveryFields({ from, to, phone }, copy.errors);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    console.info("delivery-estimate", { from, to, phone });
    setStatus("success");
    setFrom("");
    setTo("");
    setPhone("");
  }

  return (
    <section className="bg-surface">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <ScrollReveal>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="section-heading">{copy.title}</h2>
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-4"
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label={copy.from}
                  name="from"
                  required
                  value={from}
                  error={errors.from}
                  onBlur={handleBlur}
                  onChange={(e) => setFrom(e.target.value)}
                />
                <Input
                  label={copy.to}
                  name="to"
                  required
                  value={to}
                  error={errors.to}
                  onBlur={handleBlur}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
              <PhoneInput
                label={copy.phone}
                name="phone"
                required
                value={phone}
                error={errors.phone}
                onBlur={handleBlur}
                onValueChange={setPhone}
              />
              <div className="flex w-full sm:justify-end">
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full sm:w-auto sm:px-10"
                >
                  {copy.submit}
                </Button>
              </div>
            </form>
            {status === "success" ? (
              <p className="mt-4 text-center text-sm font-semibold text-heading">
                {copy.success}
              </p>
            ) : null}
            <div className="mt-8">
              <p className="mb-4 text-center text-sm font-bold uppercase tracking-[0.12em] text-heading">
                {copy.partnersTitle}
              </p>
              <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {copy.partners.map((name) => (
                  <li
                    key={name}
                    className="text-xs font-bold uppercase tracking-[0.18em] text-muted/70"
                  >
                    {name}
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
