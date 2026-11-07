import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "@/lib/locale";
import { getPageTexts } from "@/lib/texts";

// Отдаёт словарь «id → текст» для страницы и языка. Его читает браузерный скрипт TextBinder.
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") ?? "/";
  const locale = request.nextUrl.searchParams.get("locale");

  if (!isLocale(locale) || path.length > 200) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const texts = await getPageTexts(path, locale);
  return NextResponse.json(texts, { headers: { "Cache-Control": "no-store" } });
}
