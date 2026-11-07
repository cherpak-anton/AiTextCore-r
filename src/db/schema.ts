import { jsonb, pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

// Тексты сайта: одна строка на пару «адрес страницы + язык».
// Внутри — словарь «id → текст»; браузерный скрипт раскладывает их по элементам с data-text="id".
// Адрес "_common" — тексты, общие для всех страниц (шапка, подписи).
export const pageTexts = pgTable(
  "page_texts",
  {
    path: text("path").notNull(),
    locale: text("locale").notNull(),
    texts: jsonb("texts").$type<Record<string, string>>().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.path, table.locale] })],
);
