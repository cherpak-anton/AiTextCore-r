import { BookTemplate } from "@/components/book/BookTemplate";
import { HEADER_CENTER, HEADER_END, HEADER_START } from "@/components/book/exampleTools";
import { getUiLocale } from "@/lib/locale";

// Библиотека: тот же шаблон страницы, что и /template/book, с инструментами из примера.
export default async function LibraryPage() {
  return (
    <BookTemplate
      locale={await getUiLocale()}
      path="/library"
      headerStart={HEADER_START}
      headerCenter={HEADER_CENTER}
      headerEnd={HEADER_END}
    />
  );
}
