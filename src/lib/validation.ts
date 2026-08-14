export function isValidFullName(value: string): boolean {
  return value.trim().length >= 2;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Ukrainian-friendly: +380… or 0… with optional spaces/dashes/parentheses. */
export function isValidUaPhone(value: string): boolean {
  const digits = value.replace(/[\s\-()]/g, "");
  return /^(?:\+?380\d{9}|0\d{9})$/.test(digits);
}

export type LeadFieldErrors = {
  fullName?: string;
  email?: string;
  phone?: string;
};

export type CallbackFieldErrors = {
  fullName?: string;
  phone?: string;
};

export function validateCallbackFields(
  values: { fullName: string; phone: string },
  messages: { fullName: string; phone: string },
): CallbackFieldErrors {
  const errors: CallbackFieldErrors = {};
  if (!isValidFullName(values.fullName)) errors.fullName = messages.fullName;
  if (!isValidUaPhone(values.phone)) errors.phone = messages.phone;
  return errors;
}

export function validateLeadFields(
  values: { fullName: string; email: string; phone: string },
  messages: { fullName: string; email: string; phone: string },
): LeadFieldErrors {
  const errors: LeadFieldErrors = {};
  if (!isValidFullName(values.fullName)) errors.fullName = messages.fullName;
  if (values.email.trim() && !isValidEmail(values.email)) {
    errors.email = messages.email;
  }
  if (!isValidUaPhone(values.phone)) errors.phone = messages.phone;
  return errors;
}
