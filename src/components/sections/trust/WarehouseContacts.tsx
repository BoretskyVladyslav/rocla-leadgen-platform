"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Dictionary } from "@/data/dictionary";
import { cn } from "@/lib/utils";
import { PAGE_CONTAINER } from "@/lib/layout";

export interface WarehouseContactsProps {
  copy: Dictionary["branches"];
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
    <section id="contact" className="scroll-mt-20 bg-white py-10 md:py-14">
      <div className={PAGE_CONTAINER}>
        <ScrollReveal>
          <h2 className="section-heading">{copy.title}</h2>
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="font-sans text-2xl font-extrabold uppercase tracking-tight md:text-3xl">
              <span className="text-amber-500">{copy.brand.slice(0, 1)}</span>
              <span className="text-neutral-900">{copy.brand.slice(1)}</span>
            </p>
            <p className="mt-1 text-sm text-neutral-500">{copy.subtitle}</p>
            <div className="mt-3 flex flex-col gap-1 text-sm font-semibold text-neutral-800">
              <a href={telHref} className="hover:text-amber-600">
                {selected.phone}
              </a>
              <a href={`mailto:${selected.email}`} className="hover:text-amber-600">
                {selected.email}
              </a>
            </div>

            <ul
              className="mt-4 space-y-2"
              role="tablist"
              aria-label={copy.title}
            >
              {copy.warehouses.map((warehouse) => {
                const active = warehouse.id === selected.id;
                return (
                  <li key={warehouse.id}>
                    <button
                      type="button"
                      role="tab"
                      id={`branch-tab-${warehouse.id}`}
                      aria-selected={active}
                      aria-controls="branch-panel"
                      onClick={() => setSelectedId(warehouse.id)}
                      className={cn(
                        "w-full rounded-lg px-4 py-2.5 text-left text-sm font-bold transition-all",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2",
                        active
                          ? "bg-accent text-accent-fg shadow-xs"
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
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
              className="mt-4"
            >
              <p className="mt-2 text-sm font-semibold text-neutral-800">
                {copy.officeLabel} {selected.city}, {selected.address}
              </p>
              <p className="mt-1 text-xs text-neutral-600">
                {copy.hoursLabel} {copy.hoursPrefix}: {selected.hours}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="relative h-full min-h-[350px] w-full overflow-hidden rounded-2xl border border-neutral-200 shadow-xs sm:min-h-[380px] lg:min-h-[420px]">
              <iframe
                key={selected.id}
                title={`${selected.city}, ${selected.address}`}
                src={maps.embed}
                className="h-full w-full border-0 grayscale invert hue-rotate-180 saturate-[180%] brightness-90 contrast-110"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={maps.open}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-3 bottom-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-amber-600 shadow-xs hover:underline"
              >
                {copy.mapsCta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
