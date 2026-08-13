"use client";

import { useState, type FormEvent, type FocusEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { FileUpload } from "@/components/ui/FileUpload";
import { Input } from "@/components/ui/Input";
import type { Dictionary } from "@/data/dictionary";
import {
  validateLeadFields,
  type LeadFieldErrors,
} from "@/lib/validation";
import type { FilePayload, LeadFormData } from "@/types/form";
import { cn } from "@/lib/utils";

const INITIAL_STATE: Omit<LeadFormData, "files"> & { phone: string } = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

const fieldControlClass =
  "w-full rounded-md border border-border bg-white px-3.5 py-3 text-foreground shadow-sm placeholder:text-muted/80 transition-[border-color,box-shadow] focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/45 focus-visible:ring-offset-1";

export interface LeadCaptureFormProps {
  copy: Dictionary["leadForm"];
}

function WarehouseIllustration() {
  return (
    <svg viewBox="0 0 220 180" className="h-full w-full" aria-hidden>
      <rect x="20" y="70" width="180" height="90" fill="none" stroke="#7eb6d4" strokeWidth="2" />
      <path d="M20 70 110 20l90 50" fill="none" stroke="#7eb6d4" strokeWidth="2" />
      <rect x="40" y="100" width="40" height="40" fill="none" stroke="#7eb6d4" strokeWidth="1.6" />
      <rect x="90" y="95" width="40" height="45" fill="none" stroke="#7eb6d4" strokeWidth="1.6" />
      <rect x="140" y="105" width="40" height="35" fill="none" stroke="#7eb6d4" strokeWidth="1.6" />
      <path d="M40 120h40M90 117h40M140 122h40" stroke="#7eb6d4" strokeWidth="1.2" />
    </svg>
  );
}

export function LeadCaptureForm({ copy }: LeadCaptureFormProps) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [city, setCity] = useState(copy.cities[0]?.id ?? "");
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

    console.info("lead-capture", { ...form, city, files }, {
      fileCount: rawFiles.length,
    });
    setStatus("success");
  }

  function resetForm() {
    setForm(INITIAL_STATE);
    setCity(copy.cities[0]?.id ?? "");
    setFiles([]);
    setRawFiles([]);
    setErrors({});
    setStatus("idle");
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <ScrollReveal>
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-accent-alt">
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 text-center text-2xl font-bold uppercase tracking-[0.08em] text-heading sm:text-3xl">
            {copy.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-base leading-relaxed text-muted">
            {copy.subtitle}
          </p>

          <div className="relative mt-10 overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
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
                  className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_180px]"
                  noValidate
                >
                  <div className="flex flex-col gap-4">
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
                    <Input
                      label={copy.email}
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      error={errors.email}
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, email: e.target.value }))
                      }
                    />
                    <Input
                      label={copy.phone}
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      error={errors.phone}
                      onBlur={handleBlur}
                      placeholder="+380…"
                      onChange={(e) =>
                        setForm((s) => ({ ...s, phone: e.target.value }))
                      }
                    />
                    <Input
                      label={copy.company}
                      name="company"
                      value={form.company}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, company: e.target.value }))
                      }
                    />
                    <fieldset>
                      <legend className="mb-2 text-sm font-medium tracking-tight text-foreground">
                        {copy.citiesLabel}
                      </legend>
                      <div className="flex flex-col gap-2">
                        {copy.cities.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setCity(item.id)}
                            className={cn(
                              "h-10 rounded-md px-3 text-sm font-bold uppercase tracking-wide transition-colors",
                              city === item.id
                                ? "bg-accent text-accent-fg"
                                : "bg-surface text-heading hover:bg-accent/40",
                            )}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  <div className="flex flex-col gap-4">
                    <label className="flex flex-col gap-1.5 text-sm">
                      <span className="font-medium tracking-tight text-foreground">
                        {copy.message}
                      </span>
                      <textarea
                        name="message"
                        rows={4}
                        className={fieldControlClass}
                        value={form.message}
                        onChange={(e) =>
                          setForm((s) => ({ ...s, message: e.target.value }))
                        }
                      />
                    </label>
                    <FileUpload
                      label={copy.filesLabel}
                      hint={copy.filesHint}
                      browseLabel={copy.filesBrowse}
                      dragLabel={copy.filesDrag}
                      maxSizeLabel={copy.filesMaxSize}
                      typeError={copy.errors.fileType}
                      sizeError={copy.errors.fileSize}
                      onFilesChange={handleFilesChange}
                    />
                    <Button type="submit" size="lg" className="mt-auto w-full">
                      {copy.submit}
                    </Button>
                  </div>

                  <div className="hidden items-end lg:flex">
                    <WarehouseIllustration />
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
