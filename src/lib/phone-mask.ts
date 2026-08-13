const UA_PREFIX = "380";
const LOCAL_DIGITS = 9;

export const UA_PHONE_PREFIX = "+380";
export const UA_PHONE_PLACEHOLDER = "(XX) XXX-XX-XX";
export const UA_PHONE_FULL_PLACEHOLDER = "+380 (XX) XXX-XX-XX";

/** Digits of the national number (9) after country code 380. */
export function uaPhoneLocalDigits(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith(UA_PREFIX)) digits = digits.slice(UA_PREFIX.length);
  else if (digits.startsWith("0")) digits = digits.slice(1);
  return digits.slice(0, LOCAL_DIGITS);
}

/** Formats the editable local part as (XX) XXX-XX-XX. */
export function formatUaPhoneLocalPart(value: string): string {
  const local = uaPhoneLocalDigits(value);
  if (local.length === 0) return "";

  let result = `(${local.slice(0, 2)}`;
  if (local.length >= 2) result += ")";
  if (local.length > 2) result += ` ${local.slice(2, 5)}`;
  if (local.length > 5) result += `-${local.slice(5, 7)}`;
  if (local.length > 7) result += `-${local.slice(7, 9)}`;
  return result;
}

/** Formats as +380 (XX) XXX-XX-XX while typing. */
export function formatUaPhoneMask(value: string): string {
  const local = formatUaPhoneLocalPart(value);
  if (!local) return "";
  return `${UA_PHONE_PREFIX} ${local}`;
}

function digitsBeforeCaret(value: string, caret: number): number {
  let count = 0;
  const end = Math.max(0, Math.min(caret, value.length));
  for (let i = 0; i < end; i += 1) {
    if (/\d/.test(value[i]!)) count += 1;
  }
  return count;
}

/** Map a local digit index (0..localLength) to a caret in the local formatted part. */
export function caretFromLocalDigitIndex(
  formattedLocal: string,
  digitIndex: number,
): number {
  if (!formattedLocal) return 0;
  if (digitIndex <= 0) {
    const open = formattedLocal.indexOf("(");
    return open >= 0 ? open + 1 : 0;
  }

  let seen = 0;
  for (let i = 0; i < formattedLocal.length; i += 1) {
    if (/\d/.test(formattedLocal[i]!)) {
      seen += 1;
      if (seen === digitIndex) return i + 1;
    }
  }
  return formattedLocal.length;
}

/**
 * Applies local UA phone mask while preserving caret.
 * Operates on the editable `(XX) XXX-XX-XX` segment only.
 */
export function applyUaPhoneLocalInput(
  prevLocalFormatted: string,
  nextRaw: string,
  caret: number,
): { localFormatted: string; caret: number } {
  const prevLocal = uaPhoneLocalDigits(prevLocalFormatted);
  const nextLocal = uaPhoneLocalDigits(nextRaw);
  const deletedChars = Math.max(0, prevLocalFormatted.length - nextRaw.length);
  const digitCountUnchanged =
    prevLocalFormatted.replace(/\D/g, "").length ===
      nextRaw.replace(/\D/g, "").length && deletedChars > 0;

  let local = nextLocal;
  let targetDigitIndex = digitsBeforeCaret(nextRaw, caret);

  if (digitCountUnchanged && prevLocal.length > 0) {
    const prevCaret = Math.min(caret + deletedChars, prevLocalFormatted.length);
    const deleteIndex = Math.max(0, digitsBeforeCaret(prevLocalFormatted, prevCaret) - 1);
    local = prevLocal.slice(0, deleteIndex) + prevLocal.slice(deleteIndex + 1);
    targetDigitIndex = deleteIndex;
  } else {
    targetDigitIndex = Math.min(targetDigitIndex, local.length);
  }

  const localFormatted = formatUaPhoneLocalPart(local);
  return {
    localFormatted,
    caret: caretFromLocalDigitIndex(localFormatted, targetDigitIndex),
  };
}

/** @deprecated Prefer applyUaPhoneLocalInput for hard-prefix UI. */
export function applyUaPhoneMaskInput(
  prevFormatted: string,
  nextRaw: string,
  caret: number,
): { formatted: string; caret: number } {
  const prevLocal = formatUaPhoneLocalPart(prevFormatted);
  const { localFormatted, caret: nextCaret } = applyUaPhoneLocalInput(
    prevLocal,
    nextRaw.startsWith("+380") ? nextRaw.slice(4).trimStart() : nextRaw,
    caret,
  );
  return {
    formatted: localFormatted ? `${UA_PHONE_PREFIX} ${localFormatted}` : "",
    caret: nextCaret + (localFormatted ? UA_PHONE_PREFIX.length + 1 : 0),
  };
}
