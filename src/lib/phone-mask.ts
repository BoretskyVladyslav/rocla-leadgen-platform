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

function digitsBeforeCaret(value: string, caret: number): number {
  let count = 0;
  const end = Math.max(0, Math.min(caret, value.length));
  for (let i = 0; i < end; i += 1) {
    if (/\d/.test(value[i]!)) count += 1;
  }
  return count;
}

function prefixDigitOffset(value: string): number {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith(UA_PREFIX)) return UA_PREFIX.length;
  if (digits.startsWith("0")) return 1;
  return 0;
}

/** Local digit index (0..9) before caret in a (possibly partially) formatted value. */
function localDigitIndexBeforeCaret(value: string, caret: number): number {
  return Math.max(0, digitsBeforeCaret(value, caret) - prefixDigitOffset(value));
}

/** Map a local digit index (0..localLength) to a caret position in the formatted string. */
export function caretFromDigitIndex(formatted: string, digitIndex: number): number {
  if (!formatted) return 0;
  if (digitIndex <= 0) {
    const open = formatted.indexOf("(");
    return open >= 0 ? open + 1 : formatted.length;
  }

  let seen = 0;
  for (let i = 0; i < formatted.length; i += 1) {
    if (/\d/.test(formatted[i]!)) {
      seen += 1;
      // Skip country-code digits in the formatted string (+380 ...)
      if (seen <= UA_PREFIX.length) continue;
      const localSeen = seen - UA_PREFIX.length;
      if (localSeen === digitIndex) return i + 1;
    }
  }
  return formatted.length;
}

/**
 * Applies UA phone mask while preserving a sensible caret.
 * If the user deleted only a mask character (length down, digit count same),
 * removes the digit before the caret so backspace through `)` / `-` works.
 */
export function applyUaPhoneMaskInput(
  prevFormatted: string,
  nextRaw: string,
  caret: number,
): { formatted: string; caret: number } {
  const prevLocal = uaPhoneLocalDigits(prevFormatted);
  const nextLocal = uaPhoneLocalDigits(nextRaw);
  const deletedChars = Math.max(0, prevFormatted.length - nextRaw.length);
  const digitCountUnchanged =
    prevFormatted.replace(/\D/g, "").length === nextRaw.replace(/\D/g, "").length &&
    deletedChars > 0;

  let local = nextLocal;
  let targetDigitIndex = localDigitIndexBeforeCaret(nextRaw, caret);

  if (digitCountUnchanged && prevLocal.length > 0) {
    // Caret in nextRaw is where the browser left it after deleting a mask char.
    // Delete the local digit that sat just before that caret in the previous value.
    const prevCaret = Math.min(caret + deletedChars, prevFormatted.length);
    const deleteIndex = Math.max(
      0,
      localDigitIndexBeforeCaret(prevFormatted, prevCaret) - 1,
    );
    local = prevLocal.slice(0, deleteIndex) + prevLocal.slice(deleteIndex + 1);
    targetDigitIndex = deleteIndex;
  } else {
    targetDigitIndex = Math.min(targetDigitIndex, local.length);
  }

  const formatted = formatUaPhoneMask(local);
  return {
    formatted,
    caret: caretFromDigitIndex(formatted, targetDigitIndex),
  };
}
