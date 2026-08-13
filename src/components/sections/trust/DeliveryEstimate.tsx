"use client";

import { useState, type FormEvent } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/data/dictionary";

export interface DeliveryEstimateProps {
  copy: Dictionary["delivery"];
}

function BoxStack({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 200"
      fill="none"
      aria-hidden
    >
      <rect x="28" y="118" width="72" height="54" fill="#c4a574" stroke="#8d6e3d" strokeWidth="2" />
      <rect x="44" y="70" width="72" height="54" fill="#d4b483" stroke="#8d6e3d" strokeWidth="2" />
      <rect x="60" y="22" width="72" height="54" fill="#e0c496" stroke="#8d6e3d" strokeWidth="2" />
      <path d="M28 145h72M44 97h72M60 49h72" stroke="#8d6e3d" strokeWidth="1.5" />
    </svg>
  );
}

export function DeliveryEstimate({ copy }: DeliveryEstimateProps) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.info("delivery-estimate", { from, to });
    setStatus("success");
    setFrom("");
    setTo("");
  }

  return (
    <section className="relative overflow-hidden bg-surface-muted">
      <BoxStack className="pointer-events-none absolute bottom-0 left-0 hidden h-48 w-36 opacity-80 sm:block" />
      <BoxStack className="pointer-events-none absolute right-0 bottom-0 hidden h-48 w-36 scale-x-[-1] opacity-80 sm:block" />
      <div className="relative mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:py-16">
        <ScrollReveal>
          <h2 className="text-center text-2xl font-bold uppercase tracking-[0.08em] text-heading sm:text-3xl">
            {copy.title}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            noValidate
          >
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder={copy.from}
              required
              className="h-12 flex-1 rounded-md border border-border bg-white px-3.5 text-foreground shadow-sm placeholder:text-muted/80 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45"
            />
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder={copy.to}
              required
              className="h-12 flex-1 rounded-md border border-border bg-white px-3.5 text-foreground shadow-sm placeholder:text-muted/80 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45"
            />
            <div className="sm:w-44">
              <Button type="submit" size="lg" className="h-12 w-full">
                {copy.submit}
              </Button>
            </div>
          </form>
          {status === "success" ? (
            <p className="mt-3 text-center text-sm font-semibold text-heading">
              {copy.success}
            </p>
          ) : null}
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {copy.partners.map((name) => (
              <li
                key={name}
                className="text-xs font-bold uppercase tracking-[0.18em] text-muted/70"
              >
                {name}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
