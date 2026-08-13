"use client";

import { useState, type FormEvent, type FocusEvent } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import {
  StoreLocationPicker,
  formatWarehouseValue,
} from "@/components/ui/StoreLocationPicker";
import type { Dictionary, Warehouse } from "@/data/dictionary";
import {
  validateDeliveryFields,
  type DeliveryFieldErrors,
} from "@/lib/validation";

export interface DeliveryEstimateProps {
  copy: Dictionary["delivery"];
}

function PartnerLogo({ name, imageSrc }: { name: string; imageSrc: string }) {
  const [failed, setFailed] = useState(false);
  const isSvg = imageSrc.endsWith(".svg");

  if (failed) {
    return (
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted/70">
        {name}
      </span>
    );
  }

  if (isSvg) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageSrc}
        alt={name}
        className="h-8 w-auto max-w-[6.5rem] object-contain opacity-80 grayscale transition-[filter,opacity] hover:opacity-100 hover:grayscale-0 sm:h-9 sm:max-w-[7.5rem]"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={name}
      width={120}
      height={36}
      className="h-8 w-auto max-w-[6.5rem] object-contain opacity-80 grayscale transition-[filter,opacity] hover:opacity-100 hover:grayscale-0 sm:h-9 sm:max-w-[7.5rem]"
      onError={() => setFailed(true)}
    />
  );
}

export function DeliveryEstimate({ copy }: DeliveryEstimateProps) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string | null>(
    null,
  );
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

  function handleWarehouseSelect(warehouse: Warehouse) {
    setSelectedWarehouseId(warehouse.id);
    setFrom(formatWarehouseValue(warehouse));
    setErrors((prev) => ({ ...prev, from: undefined }));
    setStatus("idle");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateDeliveryFields({ from, to, phone }, copy.errors);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    console.info("delivery-estimate", {
      from,
      to,
      phone,
      warehouseId: selectedWarehouseId,
    });
    setStatus("success");
    setFrom("");
    setTo("");
    setPhone("");
    setSelectedWarehouseId(null);
  }

  return (
    <section className="bg-surface">
      <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 lg:py-28">
        <ScrollReveal>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="section-heading">{copy.title}</h2>
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-4"
              noValidate
            >
              <StoreLocationPicker
                hint={copy.warehousesHint}
                officeLabel={copy.warehouseOfficeLabel}
                hoursLabel={copy.warehouseHoursLabel}
                warehouses={copy.warehouses}
                selectedId={selectedWarehouseId}
                onSelect={handleWarehouseSelect}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label={copy.from}
                  name="from"
                  required
                  value={from}
                  error={errors.from}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFrom(e.target.value);
                    setSelectedWarehouseId(null);
                  }}
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
              <p className="mb-5 text-center text-sm font-bold uppercase tracking-[0.12em] text-heading">
                {copy.partnersTitle}
              </p>
              <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-10">
                {copy.partners.map((partner) => (
                  <li
                    key={partner.name}
                    className="flex h-10 items-center justify-center"
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
