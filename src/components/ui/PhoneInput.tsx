"use client";

import {
  useRef,
  type ChangeEvent,
  type InputHTMLAttributes,
} from "react";
import { Input } from "@/components/ui/Input";
import {
  applyUaPhoneMaskInput,
  UA_PHONE_PLACEHOLDER,
} from "@/lib/phone-mask";

export interface PhoneInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  label?: string;
  error?: string;
  value: string;
  onValueChange: (value: string) => void;
}

export function PhoneInput({
  label,
  error,
  value,
  onValueChange,
  placeholder = UA_PHONE_PLACEHOLDER,
  ...props
}: PhoneInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingCaret = useRef<number | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextRaw = event.target.value;
    const caret = event.target.selectionStart ?? nextRaw.length;
    const { formatted, caret: nextCaret } = applyUaPhoneMaskInput(
      value,
      nextRaw,
      caret,
    );
    pendingCaret.current = nextCaret;
    onValueChange(formatted);
    requestAnimationFrame(() => {
      const el = inputRef.current;
      if (!el || pendingCaret.current == null) return;
      el.setSelectionRange(pendingCaret.current, pendingCaret.current);
      pendingCaret.current = null;
    });
  }

  return (
    <Input
      ref={inputRef}
      label={label}
      error={error}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
}
