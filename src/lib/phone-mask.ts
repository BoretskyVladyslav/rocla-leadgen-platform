const UA_PREFIX = "380";
const LOCAL_DIGITS = 9;

export const UA_PHONE_PLACEHOLDER = "+380 (XX) XXX-XX-XX";

/** Digits of the national number (9) after country code 380. */
export function uaPhoneLocalDigits(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith(UA_PREFIX)) digits = digits.slice(UA_PREFIX.length);
  else if (digits.startsWith("0")) digits = digits.slice(1);
  return digits.slice(0, LOCAL_DIGITS);
}

/** Formats as +380 (XX) XXX-XX-XX while typing. */
export function formatUaPhoneMask(value: string): string {
  const local = uaPhoneLocalDigits(value);
  if (local.length === 0) return "";

  let result = `+380 (${local.slice(0, 2)}`;
  if (local.length >= 2) result += ")";
  if (local.length > 2) result += ` ${local.slice(2, 5)}`;
  if (local.length > 5) result += `-${local.slice(5, 7)}`;
  if (local.length > 7) result += `-${local.slice(7, 9)}`;
  return result;
}
