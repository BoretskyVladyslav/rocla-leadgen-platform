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
import { cn } from "@/lib/utils";

const INITIAL_STATE: Omit<LeadFormData, "files"> & { phone: string } = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

const fieldControlClass =
  "w-full rounded-md border border-border bg-white px-3.5 py-3 text-foreground shadow-sm placeholder:text-muted/80 transition-[border-color,box-shadow] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export interface LeadCaptureFormProps {
  copy: Dictionary["leadForm"];
}

export function LeadCaptureForm({ copy }: LeadCaptureFormProps) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [city, setCity] = useState("");
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
    setCity("");
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
                  className="grid gap-8 lg:grid-cols-2"
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
                      label={copy.company}
                      name="company"
                      value={form.company}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, company: e.target.value }))
                      }
                    />
                    <Input
                      label={copy.citiesLabel}
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <div>
                      <p className="mb-2 text-sm font-medium tracking-tight text-foreground">
                        {copy.citiesHint}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {copy.cities.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setCity(item.label)}
                            className={cn(
                              "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
                              city === item.label
                                ? "border-accent bg-accent text-accent-fg"
                                : "border-gray-200 bg-gray-50 text-heading hover:border-accent hover:bg-accent/20",
                            )}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5 text-sm">
                      <label
                        htmlFor="lead-message"
                        className="font-medium tracking-tight text-foreground"
                      >
                        {copy.message}
                      </label>
                      <textarea
                        id="lead-message"
                        name="message"
                        rows={4}
                        className={fieldControlClass}
                        value={form.message}
                        onChange={(e) =>
                          setForm((s) => ({ ...s, message: e.target.value }))
                        }
                      />
                    </div>
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
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
