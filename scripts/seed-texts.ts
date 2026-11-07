// Загружает тексты из JSON в базу: одна строка на пару «адрес страницы + язык».
// Запуск: npm run db:seed-texts (после npm run db:push).
import { readFileSync } from "node:fs";
import { db } from "../src/db/index";
import { pageTexts } from "../src/db/schema";

process.loadEnvFile(".env");

const SOURCES = [
  { path: "_common", locale: "ru", file: "src/content/common.ru.json" },
  { path: "_common", locale: "en", file: "src/content/common.en.json" },
  { path: "/", locale: "ru", file: "src/content/home.ru.json" },
  { path: "/", locale: "en", file: "src/content/home.en.json" },
  { path: "/template/book", locale: "ru", file: "src/content/template-book.ru.json" },
  { path: "/template/book", locale: "en", file: "src/content/template-book.en.json" },
  { path: "/library", locale: "ru", file: "src/content/template-book.ru.json" },
  { path: "/library", locale: "en", file: "src/content/template-book.en.json" },
];

async function main() {
  for (const source of SOURCES) {
    const texts = JSON.parse(readFileSync(source.file, "utf8")) as Record<string, string>;
    await db
      .insert(pageTexts)
      .values({ path: source.path, locale: source.locale, texts })
      .onConflictDoUpdate({
        target: [pageTexts.path, pageTexts.locale],
        set: { texts, updatedAt: new Date() },
      });
    console.log(`${source.path} [${source.locale}]: ${Object.keys(texts).length} текстов`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
