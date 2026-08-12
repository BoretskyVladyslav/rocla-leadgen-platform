export const LOCALES = ["uk", "ru"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "uk";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function resolveLocale(value: string | undefined): Locale {
  if (value && isLocale(value)) {
    return value;
  }
  return DEFAULT_LOCALE;
}
