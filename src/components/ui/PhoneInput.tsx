"use client";

import {
  useId,
  useRef,
  type ChangeEvent,
  type FocusEvent,
  type InputHTMLAttributes,
  type MouseEvent,
} from "react";
import { cn } from "@/lib/utils";
import {
  applyUaPhoneLocalInput,
  formatUaPhoneLocalPart,
  formatUaPhoneMask,
  UA_PHONE_PLACEHOLDER,
  UA_PHONE_PREFIX,
} from "@/lib/phone-mask";

export interface PhoneInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "onChange"
  > {
  label?: string;
  error?: string;
  compact?: boolean;
  value: string;
  onValueChange: (value: string) => void;
}

export function PhoneInput({
  id,
  label,
  error,
  compact,
  value,
  onValueChange,
  placeholder = UA_PHONE_PLACEHOLDER,
  className,
  onBlur,
  onFocus,
  onMouseDown,
  disabled,
  ...props
}: PhoneInputProps) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingCaret = useRef<number | null>(null);

  const localValue = formatUaPhoneLocalPart(value);

  function placeCaretAtOperator() {
    const el = inputRef.current;
    if (!el) return;
    const caret = localValue.startsWith("(") ? 1 : 0;
    el.setSelectionRange(caret, caret);
  }

  function handleFocus(event: FocusEvent<HTMLInputElement>) {
    requestAnimationFrame(() => placeCaretAtOperator());
    onFocus?.(event);
  }

  function handleMouseDown(event: MouseEvent<HTMLInputElement>) {
    onMouseDown?.(event);
    requestAnimationFrame(() => {
      const el = inputRef.current;
      if (!el) return;
      if (localValue.length === 0 || (el.selectionStart ?? 0) <= 0) {
        placeCaretAtOperator();
      }
    });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextRaw = event.target.value;
    const caret = event.target.selectionStart ?? nextRaw.length;
    const { localFormatted, caret: nextCaret } = applyUaPhoneLocalInput(
      localValue,
      nextRaw,
      caret,
    );
    pendingCaret.current = nextCaret;
    onValueChange(formatUaPhoneMask(localFormatted));
    requestAnimationFrame(() => {
      const el = inputRef.current;
      if (!el || pendingCaret.current == null) return;
      el.setSelectionRange(pendingCaret.current, pendingCaret.current);
      pendingCaret.current = null;
    });
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col text-sm",
        compact ? "gap-1" : "gap-1.5",
      )}
    >
      {label ? (
        <label
          htmlFor={inputId}
          className="font-medium tracking-tight text-foreground"
        >
          {label}
        </label>
      ) : null}
      <div
        className={cn(
          "flex h-12 w-full items-center overflow-hidden rounded-lg border border-border bg-white shadow-sm",
          "transition-[border-color,box-shadow] focus-within:border-accent focus-within:ring-2 focus-within:ring-accent",
          error &&
            "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/40",
          disabled && "opacity-50",
          className,
        )}
      >
        <span
          className="shrink-0 select-none pl-3.5 pr-1 font-medium text-foreground"
          aria-hidden
        >
          {UA_PHONE_PREFIX}
        </span>
        <input
          ref={inputRef}
          id={inputId}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          disabled={disabled}
          placeholder={placeholder}
          value={localValue}
          aria-invalid={error ? true : undefined}
          className={cn(
            "h-full min-w-0 flex-1 bg-transparent pr-3.5 text-foreground outline-none",
            "placeholder:text-muted/80",
            "disabled:cursor-not-allowed",
          )}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={onBlur}
          onMouseDown={handleMouseDown}
          {...props}
        />
      </div>
      {compact ? (
        error ? (
          <span className="text-xs text-red-600">{error}</span>
        ) : null
      ) : (
        <div className="relative min-h-[1.25rem]">
          {error ? (
            <span className="absolute inset-x-0 top-0 text-xs text-red-600">
              {error}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}
