import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("bg-white", className)}
    >
      <ol className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-1.5 px-4 py-4 text-sm text-muted sm:px-6">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const body = (
            <>
              {item.icon ? (
                <span className="inline-flex shrink-0" aria-hidden>
                  {item.icon}
                </span>
              ) : null}
              <span
                className={cn(
                  item.icon && "sr-only",
                  isLast && !item.icon && "font-medium text-heading",
                )}
              >
                {item.label}
              </span>
            </>
          );

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? (
                <span aria-hidden className="text-border">
                  /
                </span>
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-heading"
                >
                  {body}
                </Link>
              ) : (
                <span
                  className="inline-flex items-center gap-1.5"
                  aria-current={isLast ? "page" : undefined}
                >
                  {body}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
