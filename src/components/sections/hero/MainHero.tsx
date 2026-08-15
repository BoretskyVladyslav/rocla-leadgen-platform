"use client";

import { useState, type FormEvent, type FocusEvent } from "react";
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

function HighlightedTitle({
  title,
  highlights,
}: {
  title: string;
  highlights: string[];
}) {
  type Chunk = { text: string; accent: boolean };
  let chunks: Chunk[] = [{ text: title, accent: false }];

  for (const highlight of highlights) {
    const next: Chunk[] = [];
    for (const chunk of chunks) {
      if (chunk.accent) {
        next.push(chunk);
        continue;
      }
      const parts = chunk.text.split(highlight);
      parts.forEach((part, index) => {
        if (part) next.push({ text: part, accent: false });
        if (index < parts.length - 1) {
          next.push({ text: highlight, accent: true });
        }
      });
    }
    chunks = next;
  }

  return (
    <>
      {chunks.map((chunk, index) =>
        chunk.accent ? (
          <span key={`${chunk.text}-${index}`} className="text-amber-500">
            {chunk.text}
          </span>
        ) : (
          <span key={`${chunk.text}-${index}`}>{chunk.text}</span>
        ),
      )}
    </>
  );
}

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
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:items-stretch lg:gap-x-10 lg:gap-y-8 lg:py-16">
        <ScrollReveal className="order-1 flex flex-col gap-3 lg:col-start-1 lg:row-start-1">
          <h1 className="max-w-3xl text-3xl font-bold uppercase tracking-tight text-heading sm:text-4xl lg:text-5xl lg:leading-[1.08]">
            <HighlightedTitle
              title={copy.title}
              highlights={copy.titleHighlights}
            />
          </h1>
          <p className="text-base font-semibold leading-relaxed text-muted sm:text-lg">
            {copy.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal
          delay={0.1}
          className="relative order-3 mx-auto h-full w-full min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-none"
        >
          <MediaImage
            src={copy.imageSrc}
            alt={copy.imageAlt}
            aspect={false}
            fit="cover"
            priority
            objectPosition="object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-full min-h-[320px] rounded-none border border-gray-200 bg-surface shadow-sm sm:min-h-[420px] lg:min-h-[640px]"
          />
        </ScrollReveal>

        <ScrollReveal className="order-4 lg:col-start-1 lg:row-start-2 lg:self-end">
          <form
            id="hero-form"
            onSubmit={handleSubmit}
            className="scroll-mt-24"
            noValidate
          >
            {status === "success" ? (
              <p className="px-2 py-3 text-sm font-semibold text-heading">
                {copy.success}
              </p>
            ) : (
              <div className="flex flex-col gap-4 items-center justify-between md:flex-row">
                <div className="w-full md:flex-1">
                  <Input
                    id="hero-fullName"
                    name="fullName"
                    required
                    placeholder={copy.name}
                    aria-label={copy.name}
                    value={fullName}
                    error={errors.fullName}
                    onBlur={handleBlur}
                    onChange={(e) => setFullName(e.target.value)}
                    className="rounded-none"
                  />
                </div>
                <div className="w-full md:flex-1">
                  <PhoneInput
                    id="hero-phone"
                    name="phone"
                    required
                    aria-label={copy.phone}
                    value={phone}
                    error={errors.phone}
                    onBlur={handleBlur}
                    onValueChange={setPhone}
                    className="rounded-none"
                  />
                </div>
                <div className="w-full md:flex-1">
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 w-full rounded-none bg-[#FFCC00] font-bold tracking-wide uppercase hover:bg-amber-400"
                  >
                    {copy.submit}
                  </Button>
                  <div className="relative min-h-[1.25rem]" />
                </div>
              </div>
            )}
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
