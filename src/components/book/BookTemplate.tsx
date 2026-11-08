import type { ReactNode } from "react";
import { type CatalogItem, ToolVisible } from "@/components/shell/ToolVisibility";
import { SiteFrame } from "@/components/site/SiteFrame";
import { ToolButton, type Tool } from "@/components/site/Tool";
import type { Locale } from "@/lib/locale";

// Шаблон страницы книги: одно окно — шапка, левая и правая панели. Постоянные инструменты окна
// добавляет SiteFrame; здесь — инструменты страницы, виды панелей и языки.
type BookTemplateProps = {
  locale: Locale;
  // Адрес страницы: по нему берутся её тексты и её настройки инструментов.
  path?: string;
  // Языки, для которых есть тексты (для переключателя языка).
  readyLocales?: string[];
  headerStart?: Tool[];
  headerCenter?: Tool[];
  headerEnd?: Tool[];
  // Виды панелей. Без них панели пустые.
  leftViews?: Record<string, ReactNode>;
  rightViews?: Record<string, ReactNode>;
};

// Инструменты страницы: каждый виден по умолчанию или по выбору пользователя.
function renderTools(tools: Tool[], scope: string) {
  return tools.map((tool) => (
    <ToolVisible key={tool.id} scope={scope} id={tool.id} defaultVisible={tool.defaultVisible ?? true}>
      <ToolButton tool={tool} />
    </ToolVisible>
  ));
}

// Каталог инструментов страницы для настроек: всё, что страница может показать.
function catalogOf(tools: Tool[]): CatalogItem[] {
  return tools.map((tool) => ({ id: tool.id, textId: tool.textId, defaultVisible: tool.defaultVisible ?? true }));
}

export function BookTemplate({
  locale,
  path = "/template/book",
  readyLocales = [],
  headerStart = [],
  headerCenter = [],
  headerEnd = [],
  leftViews = { toc: null },
  rightViews = { discussion: null },
}: BookTemplateProps) {
  const pageTools = [...headerStart, ...headerCenter, ...headerEnd];

  return (
    <SiteFrame
      path={path}
      locale={locale}
      readyLocales={readyLocales}
      pageCatalog={catalogOf(pageTools)}
      headerStart={renderTools(headerStart, path)}
      headerCenter={renderTools(headerCenter, path)}
      headerEnd={renderTools(headerEnd, path)}
      leftPanel={{ labelTextId: "book.tocLabel", views: leftViews }}
      rightPanel={{ labelTextId: "book.discussionLabel", views: rightViews }}
    >
      {null}
    </SiteFrame>
  );
}
