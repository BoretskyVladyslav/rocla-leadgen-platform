"use client";

import { useState, type FormEvent, type FocusEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { FileUpload } from "@/components/ui/FileUpload";
import { Input } from "@/components/ui/Input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import type { Dictionary } from "@/data/dictionary";
import {
  validateLeadFields,
  type LeadFieldErrors,
} from "@/lib/validation";
import type { FilePayload, LeadFormData } from "@/types/form";

const VIBER_HREF = "viber://chat?number=%2B380981540982";
const TELEGRAM_HREF = "https://t.me/+380981540982";

const INITIAL_STATE: Omit<LeadFormData, "files"> & { phone: string } = {
  fullName: "",
  email: "",
  phone: "",
};

export interface LeadCaptureFormProps {
  copy: Dictionary["leadForm"];
}

export function LeadCaptureForm({ copy }: LeadCaptureFormProps) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [files, setFiles] = useState<FilePayload[]>([]);
  const [rawFiles, setRawFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleFilesChange(next: FilePayload[], raw: File[]) {
    setFiles(next);
    setRawFiles(raw);
  }

  function validateField(field: keyof LeadFieldErrors) {
    const next = validateLeadFields(
      {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
      },
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
      {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
      },
      copy.errors,
    );
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    console.info("lead-capture", { ...form, files }, {
      fileCount: rawFiles.length,
    });
    setStatus("success");
  }

  function resetForm() {
    setForm(INITIAL_STATE);
    setFiles([]);
    setRawFiles([]);
    setErrors({});
    setStatus("idle");
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <ScrollReveal>
          <h2 className="section-heading">{copy.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-base leading-relaxed text-muted">
            {copy.subtitle}
          </p>

          <div className="relative mx-auto mt-10 max-w-xl overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-[24rem] flex-col items-center justify-center gap-4 text-center"
                >
                  <span className="badge-status">OK</span>
                  <h3 className="text-2xl font-bold tracking-tight text-heading">
                    {copy.successTitle}
                  </h3>
                  <p className="max-w-sm text-sm leading-relaxed text-muted">
                    {copy.successBody}
                  </p>
                  <Button
                    type="button"
                    onClick={resetForm}
                    className="mt-2 w-auto px-6"
                  >
                    {copy.successReset}
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  noValidate
                >
                  <Input
                    label={copy.fullName}
                    name="fullName"
                    required
                    value={form.fullName}
                    error={errors.fullName}
                    onBlur={handleBlur}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, fullName: e.target.value }))
                    }
                  />
                  <PhoneInput
                    label={copy.phone}
                    name="phone"
                    required
                    value={form.phone}
                    error={errors.phone}
                    onBlur={handleBlur}
                    onValueChange={(phone) =>
                      setForm((s) => ({ ...s, phone }))
                    }
                  />
                  <Input
                    label={copy.email}
                    name="email"
                    type="email"
                    value={form.email}
                    error={errors.email}
                    onBlur={handleBlur}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, email: e.target.value }))
                    }
                  />
                  <div className="flex flex-col gap-2">
                    <FileUpload
                      label={copy.filesLabel}
                      hint={copy.filesHint}
                      browseLabel={copy.filesBrowse}
                      dragLabel={copy.filesDrag}
                      maxSizeLabel={copy.filesMaxSize}
                      removeLabel={copy.filesRemove}
                      typeError={copy.errors.fileType}
                      sizeError={copy.errors.fileSize}
                      onFilesChange={handleFilesChange}
                    />
                    <p className="text-sm text-muted">
                      {copy.messengerHint}{" "}
                      <a
                        href={VIBER_HREF}
                        className="font-semibold text-heading underline decoration-accent underline-offset-2 hover:text-accent-alt"
                      >
                        {copy.messengerViber}
                      </a>
                      {" / "}
                      <a
                        href={TELEGRAM_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-heading underline decoration-accent underline-offset-2 hover:text-accent-alt"
                      >
                        {copy.messengerTelegram}
                      </a>
                    </p>
                  </div>
                  <Button type="submit" size="lg" className="mt-2 w-full">
                    {copy.submit}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
