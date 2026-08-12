"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { FileUpload } from "@/components/ui/FileUpload";
import { Input } from "@/components/ui/Input";
import type { FilePayload, ProductOrderFormData } from "@/types/form";

export interface ProductOrderFormProps {
  productSlug: string;
  variantId?: string;
}

const fieldControlClass =
  "w-full rounded-md border border-border bg-white px-3.5 py-3 text-foreground shadow-sm placeholder:text-muted/80 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/15 focus-visible:ring-offset-1";

export function ProductOrderForm({
  productSlug,
  variantId,
}: ProductOrderFormProps) {
  const [form, setForm] = useState<
    Omit<ProductOrderFormData, "files" | "productSlug" | "variantId">
  >({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    quantity: 1,
  });
  const [files, setFiles] = useState<FilePayload[]>([]);
  const [rawFiles, setRawFiles] = useState<File[]>([]);

  function handleFilesChange(next: FilePayload[], raw: File[]) {
    setFiles(next);
    setRawFiles(raw);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: ProductOrderFormData = {
      ...form,
      productSlug,
      variantId,
      files,
    };

    console.info("product-order", payload, {
      fileCount: rawFiles.length,
    });
  }

  return (
    <section id="order" className="bg-surface-muted">
      <div className="mx-auto w-full max-w-xl px-4 py-16 sm:px-6 lg:py-20">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-accent-alt">
          Order
        </p>
        <h2 className="mt-3 text-center text-2xl font-bold uppercase tracking-[0.08em] text-heading sm:text-3xl">
          Request a quote
        </h2>
        <p className="mt-3 text-center text-base leading-relaxed text-muted">
          Attach corporate requisites or drawings (.pdf, .jpg, .png) with your
          inquiry.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-5 border-2 border-accent bg-white p-6 sm:p-8"
        >
          <Input
            label="Full name"
            name="fullName"
            required
            value={form.fullName}
            onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
          />
          <Input
            label="Company"
            name="company"
            value={form.company}
            onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
          />
          <Input
            label="Quantity"
            name="quantity"
            type="number"
            min={1}
            value={form.quantity ?? 1}
            onChange={(e) =>
              setForm((s) => ({
                ...s,
                quantity: Number(e.target.value) || 1,
              }))
            }
          />
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium tracking-tight text-foreground">
              Notes
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
            label="Corporate requisites"
            hint="Accepted: .pdf, .jpg, .png"
            onFilesChange={handleFilesChange}
          />
          <Button type="submit" size="lg" className="mt-2 w-full">
            Send order inquiry
          </Button>
        </form>
      </div>
    </section>
  );
}
