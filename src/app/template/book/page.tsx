import { BookTemplate } from "@/components/book/BookTemplate";
import { getUiLocale } from "@/lib/locale";
import { getReadyLocales } from "@/lib/texts";

// Шаблон окна книги: постоянные инструменты окна и пустые зоны для инструментов страницы.
export default async function BookTemplatePage() {
  const locale = await getUiLocale();
  const readyLocales = await getReadyLocales();

  return <BookTemplate locale={locale} readyLocales={readyLocales} />;
}
