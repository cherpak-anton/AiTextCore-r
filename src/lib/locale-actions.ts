"use server";

import { cookies } from "next/headers";
import { isLocale, LOCALE_COOKIE } from "@/lib/locale";
import { getReadyLocales } from "@/lib/texts";

// Выбор языка: принимаем только язык, для которого в базе уже есть тексты.
export async function setUiLanguage(formData: FormData) {
  const locale = formData.get("locale");
  if (!isLocale(locale)) {
    throw new Error("Unsupported interface language.");
  }

  const ready = await getReadyLocales();
  if (!ready.includes(locale)) {
    throw new Error("Interface language is not translated yet.");
  }

  (await cookies()).set(LOCALE_COOKIE, locale, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}
