import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { pageTexts } from "@/db/schema";
import { DEFAULT_LOCALE, type Locale } from "@/lib/locale";

// Языки, для которых в базе есть тексты: из них строится выбор языка на сайте.
export async function getReadyLocales(): Promise<Locale[]> {
  const rows = await db.selectDistinct({ locale: pageTexts.locale }).from(pageTexts);
  return rows.map((row) => row.locale).sort();
}

// Адрес «страницы», где лежат тексты, общие для всего сайта (шапка, подписи).
export const COMMON_PATH = "_common";

// Тексты страницы для языка: общие (_common) плюс свои для адреса страницы.
// Если на языке нет ни одной строки, берётся язык по умолчанию.
export async function getPageTexts(path: string, locale: Locale): Promise<Record<string, string>> {
  const rows = await db
    .select()
    .from(pageTexts)
    .where(and(inArray(pageTexts.path, [COMMON_PATH, path]), eq(pageTexts.locale, locale)));

  const common = rows.find((row) => row.path === COMMON_PATH)?.texts ?? {};
  const own = rows.find((row) => row.path === path)?.texts ?? {};
  const merged = { ...common, ...own };

  if (Object.keys(merged).length === 0 && locale !== DEFAULT_LOCALE) {
    return getPageTexts(path, DEFAULT_LOCALE);
  }
  return merged;
}
