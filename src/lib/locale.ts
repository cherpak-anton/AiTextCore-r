import { cookies } from "next/headers";

// Код языка: "ru", "en", "pt-br" и т. п. Какие языки готовы, решает база (см. getReadyLocales).
export type Locale = string;

export const LOCALE_COOKIE = "ui-language";
export const DEFAULT_LOCALE: Locale = "ru";

const LOCALE_PATTERN = /^[a-z]{2,3}(-[a-z0-9]{2,8})?$/i;

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && LOCALE_PATTERN.test(value);
}

export async function getUiLocale(): Promise<Locale> {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
