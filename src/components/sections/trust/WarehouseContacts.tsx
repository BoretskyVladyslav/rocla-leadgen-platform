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

function GearsGraphic() {
  return (
    <svg
      className="h-auto w-full max-w-[220px] text-[#8eb8d4]"
      viewBox="0 0 220 180"
      fill="none"
      aria-hidden
    >
      <circle cx="78" cy="92" r="42" stroke="currentColor" strokeWidth="3" />
      <circle cx="78" cy="92" r="16" stroke="currentColor" strokeWidth="3" />
      {[0, 45, 90, 135].map((deg) => (
        <rect
          key={deg}
          x="70"
          y="42"
          width="16"
          height="18"
          rx="3"
          fill="currentColor"
          transform={`rotate(${deg} 78 92)`}
        />
      ))}
      <circle cx="148" cy="58" r="28" stroke="currentColor" strokeWidth="3" />
      <circle cx="148" cy="58" r="10" stroke="currentColor" strokeWidth="3" />
      {[15, 75, 135].map((deg) => (
        <rect
          key={deg}
          x="142"
          y="24"
          width="12"
          height="14"
          rx="2"
          fill="currentColor"
          transform={`rotate(${deg} 148 58)`}
        />
      ))}
      <circle cx="156" cy="128" r="22" stroke="currentColor" strokeWidth="3" />
      <circle cx="156" cy="128" r="8" stroke="currentColor" strokeWidth="3" />
      {[30, 90, 150].map((deg) => (
        <rect
          key={deg}
          x="151"
          y="102"
          width="10"
          height="12"
          rx="2"
          fill="currentColor"
          transform={`rotate(${deg} 156 128)`}
        />
      ))}
    </svg>
  );
}

export function WarehouseContacts({ copy }: WarehouseContactsProps) {
  const [selectedId, setSelectedId] = useState(copy.warehouses[0]?.id ?? "");
  const selected =
    copy.warehouses.find((w) => w.id === selectedId) ?? copy.warehouses[0];

  if (!selected) return null;

  const telHref = `tel:${selected.phone.replace(/[^\d+]/g, "")}`;

  return (
    <section id="contact" className="scroll-mt-20 bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <ScrollReveal>
          <h2 className="section-heading">{copy.title}</h2>
        </ScrollReveal>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[13.5rem_1fr_auto] lg:gap-12">
          <ul
            className="flex flex-row flex-wrap gap-2 lg:flex-col lg:flex-nowrap"
            role="tablist"
            aria-label={copy.title}
          >
            {copy.warehouses.map((warehouse) => {
              const active = warehouse.id === selected.id;
              return (
                <li key={warehouse.id} className="min-w-[7.5rem] flex-1 lg:min-w-0 lg:flex-none">
                  <button
                    type="button"
                    role="tab"
                    id={`branch-tab-${warehouse.id}`}
                    aria-selected={active}
                    aria-controls="branch-panel"
                    onClick={() => setSelectedId(warehouse.id)}
                    className={cn(
                      "relative w-full rounded-md bg-accent px-4 py-2.5 text-center text-sm font-bold tracking-wide text-accent-fg transition-shadow",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-alt focus-visible:ring-offset-2",
                      active
                        ? "shadow-[inset_4px_0_0_0_#c1121f] lg:text-left"
                        : "opacity-85 hover:opacity-100 lg:text-left",
                    )}
                  >
                    {warehouse.city}
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            id="branch-panel"
            role="tabpanel"
            aria-labelledby={`branch-tab-${selected.id}`}
            className="flex flex-col justify-center gap-4 py-2 text-sm leading-relaxed text-muted sm:text-base"
          >
            <p className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-alt" />
              <span>
                <span className="font-bold text-heading">{copy.phoneLabel}: </span>
                <a href={telHref} className="text-heading hover:text-accent-alt">
                  {selected.phone}
                </a>
              </span>
            </p>
            <p className="flex items-start gap-3">
              <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-alt" />
              <span>
                <span className="font-bold text-heading">{copy.emailLabel}: </span>
                <a
                  href={`mailto:${selected.email}`}
                  className="text-heading hover:text-accent-alt"
                >
                  {selected.email}
                </a>
              </span>
            </p>
            <p className="flex items-start gap-3">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-alt" />
              <span>
                <span className="font-bold text-heading">{copy.addressLabel}: </span>
                {selected.city}, {selected.address}
              </span>
            </p>
            <p className="flex items-start gap-3">
              <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-alt" />
              <span>
                <span className="font-bold text-heading">{copy.hoursLabel}: </span>
                {selected.hours}
              </span>
            </p>
          </div>

          <div className="hidden justify-self-end lg:block">
            <GearsGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}
