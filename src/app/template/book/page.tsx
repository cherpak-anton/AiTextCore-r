import { BookTemplate } from "@/components/book/BookTemplate";
import { HEADER_CENTER, HEADER_END, HEADER_START } from "@/components/book/exampleTools";
import { getUiLocale } from "@/lib/locale";

// Шаблон страницы книги: /template/book
export default async function BookTemplatePage() {
  return (
    <BookTemplate
      locale={await getUiLocale()}
      headerStart={HEADER_START}
      headerCenter={HEADER_CENTER}
      headerEnd={HEADER_END}
    />
  );
}
