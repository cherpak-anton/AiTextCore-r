import type { Tool } from "@/components/site/Tool";

// Инструменты, которые добавляет страница книги. Постоянные инструменты окна — логотип, проект,
// поиск, 📚, 💬 🎧 🤖, язык, уведомления, аватар — в CoreTools.tsx: одинаковы на всех страницах.
export const HEADER_START: Tool[] = [];

export const HEADER_CENTER: Tool[] = [
  { id: "translate", textId: "book.translate", icon: "🔤" },
  { id: "menu", textId: "book.menu", icon: "⋮" },
];

export const HEADER_END: Tool[] = [];
