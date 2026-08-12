import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  id,
  label,
  error,
  className,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="flex w-full flex-col gap-1.5 text-sm">
      {label ? (
        <span className="font-medium tracking-tight text-foreground">
          {label}
        </span>
      ) : null}
      <input
        id={inputId}
        className={cn(
          "h-12 w-full rounded-md border border-border bg-white px-3.5 text-foreground shadow-sm",
          "placeholder:text-muted/80",
          "transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/15 focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus-visible:ring-red-500/30",
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
