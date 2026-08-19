"use client";

import { ChevronRight } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import type { Dictionary } from "@/data/dictionary";
import { PAGE_CONTAINER } from "@/lib/layout";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

export interface ProductTabsProps {
  product: Product;
  copy: Dictionary["product"];
}

type TabId = "description" | "specifications" | "delivery";

export function ProductTabs({ product, copy }: ProductTabsProps) {
  const [active, setActive] = useState<TabId>("description");
  const [expanded, setExpanded] = useState(false);
  const extraId = useId();
  const paragraphs =
    product.descriptionParagraphs && product.descriptionParagraphs.length > 0
      ? product.descriptionParagraphs
      : product.description
        ? [product.description]
        : [];
  const bullets = product.descriptionBullets ?? [];
  const specs = product.specs ?? [];
  const deliveryBullets = copy.deliveryBullets ?? [];
  const preview = paragraphs[0];
  const rest = paragraphs.slice(1);
  const hasExtra = rest.length > 0 || bullets.length > 0;

  return (
    <section className="py-10 md:py-14 xl:pt-[30px] xl:pb-[22px]">
      <div className={PAGE_CONTAINER}>
        <div
          role="tablist"
          aria-label={copy.tabs.description}
          className="flex flex-wrap items-end gap-2.5"
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
          <TabButton
            id="delivery"
            active={active === "delivery"}
            onClick={() => setActive("delivery")}
          >
            {copy.tabs.delivery}
          </TabButton>
        </div>

        <div
          className={cn(
            "h-auto overflow-visible rounded-b-2xl rounded-tr-2xl border border-gray-200 bg-white shadow-sm",
            active !== "description" && "rounded-tl-2xl",
          )}
        >
          <div className="px-5 py-6 sm:px-8 sm:py-7">
            {active === "description" ? (
              <div
                role="tabpanel"
                id="panel-description"
                aria-labelledby="tab-description"
              >
                {preview ? (
                  <p className="text-[15px] leading-relaxed text-gray-600">
                    {preview}
                  </p>
                ) : null}
                {hasExtra ? (
                  <div
                    id={extraId}
                    className={cn(
                      "mt-4 space-y-4",
                      expanded ? "block" : "hidden",
                    )}
                    hidden={!expanded}
                  >
                    {rest.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 48)}
                        className="text-[15px] leading-relaxed text-gray-600"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {bullets.length > 0 ? (
                      <ul className="list-disc space-y-2 pl-5 text-[15px] text-gray-800">
                        {bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : null}
                {hasExtra ? (
                  <button
                    type="button"
                    className="mt-4 inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-[#0284c7] hover:underline"
                    aria-expanded={expanded}
                    aria-controls={extraId}
                    onClick={() => setExpanded((prev) => !prev)}
                  >
                    {expanded ? copy.tabs.readLess : copy.tabs.readMore}
                    {expanded ? null : (
                      <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                    )}
                  </button>
                ) : null}
              </div>
            ) : null}

            {active === "specifications" ? (
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
                        className="grid grid-cols-[1fr_auto] gap-4 border-b border-gray-100 px-2 py-3 text-sm odd:bg-gray-50"
                      >
                        <dt className="font-medium text-gray-500">{spec.label}</dt>
                        <dd className="text-right font-semibold tabular-nums text-gray-900">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-sm text-gray-500">{copy.imagePlaceholder}</p>
                )}
              </div>
            ) : null}

            {active === "delivery" ? (
              <div
                role="tabpanel"
                id="panel-delivery"
                aria-labelledby="tab-delivery"
              >
                {deliveryBullets.length > 0 ? (
                  <ul className="list-disc space-y-2 pl-5 text-[15px] text-gray-800">
                    {deliveryBullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">{copy.imagePlaceholder}</p>
                )}
              </div>
            ) : null}
          </div>
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
        "shrink-0 whitespace-nowrap px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors",
        active
          ? "relative z-10 -mb-px rounded-t-lg border-t border-x border-gray-200 bg-white text-gray-900"
          : "rounded-t-lg border border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900",
      )}
    >
      {children}
    </button>
  );
}
