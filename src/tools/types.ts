// Объект инструмента: метаданные одного инструмента сайта. Один инструмент — одна папка src/tools/<id>/.
export type ToolKind = "permanent" | "behavioral" | "page" | "menu" | "window";

export type ToolZone = "start" | "center" | "end" | "left-panel" | "right-panel" | "menu" | "none";

// Что делает инструмент при нажатии.
export type ToolAction =
  | { type: "link"; href: string }
  | { type: "view"; side: "left" | "right"; view: string }
  | { type: "window"; page: string }
  | { type: "none" };

export type ToolMeta = {
  // Идентификатор (имя папки, ключ в реестре).
  id: string;
  // id текста подписи в базе.
  textId: string;
  // Значок или короткий текст.
  icon: string;
  kind: ToolKind;
  // Где инструмент стоит по умолчанию. Пользователь может переставить его в любую зону (5.17).
  zone: ToolZone;
  // Видно ли по умолчанию на страницах, где он есть.
  defaultVisible: boolean;
  // Где показывается по умолчанию: "all" или список адресов страниц. Это дефолт, не ограничение:
  // пользователь может поставить инструмент на любую страницу (см. REQUIREMENTS 5.17).
  pages: "all" | string[];
  action: ToolAction;
  // Условие показа (поведенческие инструменты): гость, вошедший, редактор и т. п. Пусто — без условия.
  visibleWhen?: string;
};
