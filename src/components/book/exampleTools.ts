import type { Tool } from "@/components/site/Tool";

// Инструменты из примера старого проекта: шапка в трёх зонах.
// Список задаёт страница, сам шаблон инструментов не содержит.
export const HEADER_START: Tool[] = [
  { id: "hide-left", textId: "tool.hideLeft", icon: "‹" },
  { id: "brand", textId: "site.brand", icon: "AiTextCore", href: "/", variant: "brand" },
  { id: "project", textId: "book.project", icon: "🗄️ ▾", variant: "pill" },
  { id: "search", textId: "site.search", icon: "🔎" },
  { id: "library", textId: "site.library", icon: "📚", href: "/library" },
  { id: "cabinet", textId: "book.cabinet", icon: "🗄️" },
];

export const HEADER_CENTER: Tool[] = [
  { id: "translate", textId: "book.translate", icon: "🔤" },
  { id: "menu", textId: "book.menu", icon: "⋮" },
  { id: "language", textId: "lang.choose", icon: "🌐 EN", variant: "pill" },
];

export const HEADER_END: Tool[] = [
  { id: "hide-right", textId: "tool.hideRight", icon: "›" },
  { id: "discussion", textId: "book.discussion", icon: "💬" },
  { id: "reader", textId: "book.reader", icon: "🎧" },
  { id: "history", textId: "book.history", icon: "🕐" },
  { id: "ai", textId: "book.ai", icon: "🔌" },
  { id: "notifications", textId: "site.notifications", icon: "🔔" },
  { id: "user", textId: "site.user", icon: "T" },
];
