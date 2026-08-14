"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Dictionary } from "@/data/dictionary";
import { cn } from "@/lib/utils";

export interface WarehouseContactsProps {
  copy: Dictionary["branches"];
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.5 3.8h2.4c.5 0 .9.3 1 .8l.8 2.6c.1.5 0 1-.4 1.3L8.9 10c1.3 2.4 3.3 4.4 5.7 5.7l1.5-1.4c.3-.4.8-.5 1.3-.4l2.6.8c.5.1.8.5.8 1v2.4c0 .6-.5 1.1-1.1 1.1C12.2 19.2 4.8 11.8 4.8 4.9c0-.6.5-1.1 1.1-1.1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.6" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s6.5-5.4 6.5-10.2A6.5 6.5 0 0 0 12 4.3a6.5 6.5 0 0 0-6.5 6.5C5.5 15.6 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.8" r="2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 8v4l2.5 2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function mapsUrls(city: string, address: string) {
  const query = encodeURIComponent(`${city}, ${address}`);
  return {
    embed: `https://maps.google.com/maps?q=${query}&z=16&output=embed`,
    open: `https://www.google.com/maps/search/?api=1&query=${query}`,
  };
}

export function WarehouseContacts({ copy }: WarehouseContactsProps) {
  const [selectedId, setSelectedId] = useState(copy.warehouses[0]?.id ?? "");
  const selected =
    copy.warehouses.find((w) => w.id === selectedId) ?? copy.warehouses[0];

  if (!selected) return null;

  const telHref = `tel:${selected.phone.replace(/[^\d+]/g, "")}`;
  const maps = mapsUrls(selected.city, selected.address);

  return (
    <section id="contact" className="scroll-mt-20 bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <ScrollReveal>
          <h2 className="section-heading">{copy.title}</h2>
        </ScrollReveal>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[16rem_minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-serif text-2xl font-bold uppercase tracking-[0.14em] text-heading">
                {copy.brand}
              </p>
              <div className="mt-4 flex flex-col gap-2 text-sm text-neutral-700">
                <a href={telHref} className="font-semibold hover:text-amber-600">
                  {selected.phone}
                </a>
                <a
                  href={`mailto:${selected.email}`}
                  className="hover:text-amber-600"
                >
                  {selected.email}
                </a>
              </div>
            </div>

            <ul
              className="flex flex-row flex-wrap gap-2 lg:flex-col lg:flex-nowrap"
              role="tablist"
              aria-label={copy.title}
            >
              {copy.warehouses.map((warehouse) => {
                const active = warehouse.id === selected.id;
                return (
                  <li
                    key={warehouse.id}
                    className="min-w-[7.5rem] flex-1 lg:min-w-0 lg:flex-none"
                  >
                    <button
                      type="button"
                      role="tab"
                      id={`branch-tab-${warehouse.id}`}
                      aria-selected={active}
                      aria-controls="branch-panel"
                      onClick={() => setSelectedId(warehouse.id)}
                      className={cn(
                        "w-full rounded-xl px-4 py-2.5 text-center text-sm tracking-wide transition-colors lg:text-left",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2",
                        active
                          ? "bg-[#FFCC00] font-bold text-neutral-900 shadow-xs"
                          : "border border-neutral-200 bg-white font-semibold text-neutral-700 hover:border-amber-300",
                      )}
                    >
                      {warehouse.city}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            id="branch-panel"
            role="tabpanel"
            aria-labelledby={`branch-tab-${selected.id}`}
            className="flex flex-col justify-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs sm:p-6"
          >
            <p className="flex items-start gap-3 text-sm sm:text-base">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <span>
                <span className="font-bold text-heading">{copy.addressLabel}: </span>
                {selected.city}, {selected.address}
              </span>
            </p>
            <p className="flex items-start gap-3 text-sm sm:text-base">
              <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <span>
                <span className="font-bold text-heading">{copy.hoursLabel}: </span>
                {copy.hoursPrefix}: {selected.hours}
              </span>
            </p>
            <p className="flex items-start gap-3 text-sm sm:text-base">
              <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <span>
                <span className="font-bold text-heading">{copy.phoneLabel}: </span>
                <a href={telHref} className="text-heading hover:text-amber-600">
                  {selected.phone}
                </a>
              </span>
            </p>
            <p className="flex items-start gap-3 text-sm sm:text-base">
              <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <span>
                <span className="font-bold text-heading">{copy.emailLabel}: </span>
                <a
                  href={`mailto:${selected.email}`}
                  className="text-heading hover:text-amber-600"
                >
                  {selected.email}
                </a>
              </span>
            </p>

            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <a
                href={telHref}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#FFCC00] px-5 text-xs font-bold tracking-wide text-neutral-900 uppercase transition-colors hover:bg-amber-400 sm:text-sm"
              >
                {copy.callCta}
              </a>
              <a
                href={`mailto:${selected.email}`}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 text-xs font-bold tracking-wide text-neutral-900 uppercase transition-colors hover:border-amber-400 sm:text-sm"
              >
                {copy.emailCta}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-xs">
              <iframe
                key={selected.id}
                title={`${selected.city}, ${selected.address}`}
                src={maps.embed}
                className="h-64 w-full lg:h-[22rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={maps.open}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-sm font-semibold text-neutral-700 underline decoration-amber-400 underline-offset-4 hover:text-neutral-900"
            >
              {copy.mapsCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
