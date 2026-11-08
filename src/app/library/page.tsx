import { BookTemplate } from "@/components/book/BookTemplate";
import { HEADER_CENTER, HEADER_END, HEADER_START } from "@/components/book/exampleTools";
import { TocHeading, bookRightViews } from "@/components/book/bookViews";
import { getUiLocale } from "@/lib/locale";
import { getReadyLocales } from "@/lib/texts";

// Библиотека: окно книги с постоянными инструментами, инструментами страницы и видами панелей.
export default async function LibraryPage() {
  const locale = await getUiLocale();
  const readyLocales = await getReadyLocales();

  return (
    <BookTemplate
      locale={locale}
      readyLocales={readyLocales}
      path="/library"
      headerStart={HEADER_START}
      headerCenter={HEADER_CENTER}
      headerEnd={HEADER_END}
      leftViews={{ toc: <TocHeading /> }}
      rightViews={bookRightViews()}
    />
  );
}
