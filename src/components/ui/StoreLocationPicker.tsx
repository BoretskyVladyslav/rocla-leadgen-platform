"use client";

import type { Warehouse } from "@/data/dictionary";
import { cn } from "@/lib/utils";

export interface StoreLocationPickerProps {
  hint: string;
  officeLabel: string;
  hoursLabel: string;
  warehouses: Warehouse[];
  selectedId: string | null;
  onSelect: (warehouse: Warehouse) => void;
  className?: string;
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20V6l8-3 8 3v14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9 20v-6h6v6M9 10h.01M12 10h.01M15 10h.01M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
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

export function formatWarehouseValue(warehouse: Warehouse) {
  return `${warehouse.city}, ${warehouse.address}`;
}

export function StoreLocationPicker({
  hint,
  officeLabel,
  hoursLabel,
  warehouses,
  selectedId,
  onSelect,
  className,
}: StoreLocationPickerProps) {
  const selected = warehouses.find((w) => w.id === selectedId) ?? null;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
        {hint}
      </p>
      <ul className="flex flex-wrap gap-2" role="listbox" aria-label={hint}>
        {warehouses.map((warehouse) => {
          const active = warehouse.id === selectedId;
          return (
            <li key={warehouse.id} role="option" aria-selected={active}>
              <button
                type="button"
                onClick={() => onSelect(warehouse)}
                className={cn(
                  "inline-flex h-9 items-center rounded-lg border px-3 text-sm font-bold tracking-wide transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                  active
                    ? "border-accent bg-accent text-accent-fg"
                    : "border-border bg-white text-heading hover:border-accent",
                )}
              >
                {warehouse.city}
              </button>
            </li>
          );
        })}
      </ul>

      {selected ? (
        <div
          className="rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-relaxed text-muted"
          role="status"
        >
          <p className="flex items-start gap-2 text-heading">
            <BuildingIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-alt" />
            <span>
              <span className="font-bold">{officeLabel}:</span>{" "}
              {selected.city}, {selected.address}
            </span>
          </p>
          <p className="mt-2 flex items-start gap-2">
            <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-alt" />
            <span>
              <span className="font-bold text-heading">{hoursLabel}:</span>{" "}
              {selected.hours}
            </span>
          </p>
        </div>
      ) : null}
    </div>
  );
}
