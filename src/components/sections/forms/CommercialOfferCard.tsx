"use client";

import { useState, type FormEvent, type FocusEvent } from "react";
import { Button } from "@/components/ui/Button";
import { FileUpload } from "@/components/ui/FileUpload";
import { Input } from "@/components/ui/Input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import type { Dictionary } from "@/data/dictionary";
import { isValidEmail, isValidUaPhone } from "@/lib/validation";
import type { FilePayload } from "@/types/form";

export interface CommercialOfferCardProps {
  copy: Dictionary["product"]["commercialOffer"];
}

type OfferErrors = {
  email?: string;
  phone?: string;
};

export function CommercialOfferCard({ copy }: CommercialOfferCardProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [files, setFiles] = useState<FilePayload[]>([]);
  const [rawFiles, setRawFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<OfferErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function validate(): OfferErrors {
    const next: OfferErrors = {};
    if (!email.trim() || !isValidEmail(email)) next.email = copy.errors.email;
    if (!isValidUaPhone(phone)) next.phone = copy.errors.phone;
    return next;
  }

  function validateField(field: keyof OfferErrors) {
    const next = validate();
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    const name = event.target.name as keyof OfferErrors;
    if (name === "email" || name === "phone") {
      validateField(name);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    console.info("commercial-offer", { email, phone, files }, {
      fileCount: rawFiles.length,
    });
    setStatus("success");
    setEmail("");
    setPhone("");
    setFiles([]);
    setRawFiles([]);
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-white px-5 py-8 text-center shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-heading">{copy.success}</p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mt-4"
          onClick={() => setStatus("idle")}
        >
          OK
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6"
      noValidate
    >
      <h2 className="text-lg font-bold uppercase tracking-[0.06em] text-heading sm:text-xl">
        {copy.title}
      </h2>
      <Input
        id="commercial-email"
        label={copy.email}
        name="email"
        type="email"
        required
        value={email}
        error={errors.email}
        onBlur={handleBlur}
        onChange={(e) => setEmail(e.target.value)}
      />
      <PhoneInput
        id="commercial-phone"
        label={copy.phone}
        name="phone"
        required
        value={phone}
        error={errors.phone}
        onBlur={handleBlur}
        onValueChange={setPhone}
      />
      <FileUpload
        label={copy.filesLabel}
        hint={copy.filesHint}
        browseLabel={copy.filesBrowse}
        dragLabel={copy.filesDrag}
        maxSizeLabel={copy.filesMaxSize}
        removeLabel={copy.filesRemove}
        typeError={copy.errors.fileType}
        sizeError={copy.errors.fileSize}
        onFilesChange={(next, raw) => {
          setFiles(next);
          setRawFiles(raw);
        }}
      />
      <Button type="submit" size="lg" className="mt-1 w-full">
        {copy.submit}
      </Button>
    </form>
  );
}
