"use client";

import { useId, forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ id, label, error, className, ...props }, ref) {
    const reactId = useId();
    const inputId = id ?? reactId;

    return (
      <div className="flex w-full flex-col gap-1.5 text-sm">
        {label ? (
          <label
            htmlFor={inputId}
            className="font-medium tracking-tight text-foreground"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-12 w-full rounded-lg border border-border bg-white px-3.5 text-foreground shadow-sm",
            "placeholder:text-muted/80",
            "transition-[border-color,box-shadow] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent",
            "focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/40",
            className,
          )}
          aria-invalid={error ? true : undefined}
          {...props}
        />
        <div className="relative min-h-[1.25rem]">
          {error ? (
            <span className="absolute inset-x-0 top-0 text-xs text-red-600">
              {error}
            </span>
          ) : null}
        </div>
      </div>
    );
  },
);
