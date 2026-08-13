"use client";

import { useState, type ReactNode } from "react";
import type { Dictionary } from "@/data/dictionary";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

export interface ProductTabsProps {
  product: Product;
  copy: Dictionary["product"];
}

type TabId = "description" | "specifications";

export function ProductTabs({ product, copy }: ProductTabsProps) {
  const [active, setActive] = useState<TabId>("description");
  const paragraphs =
    product.descriptionParagraphs && product.descriptionParagraphs.length > 0
      ? product.descriptionParagraphs
      : product.description
        ? [product.description]
        : [];
  const bullets = product.descriptionBullets ?? [];
  const specs = product.specs ?? [];

  return (
    <section className="bg-surface-muted">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div
          role="tablist"
          aria-label={copy.specifications}
          className="flex gap-2 border-b border-border"
        >
          <TabButton
            id="description"
            active={active === "description"}
            onClick={() => setActive("description")}
          >
            {copy.tabs.description}
          </TabButton>
          <TabButton
            id="specifications"
            active={active === "specifications"}
            onClick={() => setActive("specifications")}
          >
            {copy.tabs.specifications}
          </TabButton>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-white p-6 shadow-sm sm:p-8">
          {active === "description" ? (
            <div
              role="tabpanel"
              id="panel-description"
              aria-labelledby="tab-description"
              className="flex flex-col gap-4"
            >
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-base leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
              {bullets.length > 0 ? (
                <ul className="mt-2 list-disc space-y-2 pl-5 text-base text-foreground">
                  {bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : (
            <div
              role="tabpanel"
              id="panel-specifications"
              aria-labelledby="tab-specifications"
            >
              {specs.length > 0 ? (
                <dl className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
                  {specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="grid grid-cols-[1fr_auto] gap-4 border-b border-border py-3 text-sm"
                    >
                      <dt className="font-medium text-muted">{spec.label}</dt>
                      <dd className="text-right font-semibold text-foreground">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-sm text-muted">{copy.imagePlaceholder}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function TabButton({
  id,
  active,
  onClick,
  children,
}: {
  id: TabId;
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      id={`tab-${id}`}
      aria-selected={active}
      aria-controls={`panel-${id}`}
      onClick={onClick}
      className={cn(
        "-mb-px border-b-2 px-4 py-3 text-sm font-bold uppercase tracking-wide transition-colors",
        active
          ? "border-accent text-heading"
          : "border-transparent text-muted hover:text-heading",
      )}
    >
      {children}
    </button>
  );
}
