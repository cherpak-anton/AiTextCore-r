"use client";

import type { ReactNode } from "react";
import { useVar } from "@/components/shell/WindowStore";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { ViewButton } from "@/components/site/PanelState";
import { SearchField } from "@/components/site/SearchField";
import { ToolButton } from "@/components/site/Tool";
import type { Locale } from "@/lib/locale";
import { TOOLS } from "@/tools";
import type { ToolMeta, ToolZone } from "@/tools/types";

// Выбор пользователя по инструментам: видимость и место. Пусто — действует дефолт из папки инструмента.
export type ToolOverride = { visible?: boolean; zone?: ToolZone };
export type ToolLayout = Record<string, ToolOverride>;

// Переключатели панелей — часть структуры окна (стоят у линий), в раскладку не входят.
export const STRUCTURAL_TOOLS = new Set(["hide-left", "hide-right"]);

export const ZONES: ToolZone[] = ["start", "center", "end", "left-panel", "right-panel"];

export function effectiveZone(tool: ToolMeta, layout: ToolLayout): ToolZone {
  return layout[tool.id]?.zone ?? tool.zone;
}

export function effectiveVisible(tool: ToolMeta, layout: ToolLayout): boolean {
  return layout[tool.id]?.visible ?? tool.defaultVisible;
}

// Как инструмент выглядит. Особые инструменты — свой компонент, остальные — по метаданным.
function renderTool(tool: ToolMeta, locale: Locale, readyLocales: string[]): ReactNode {
  switch (tool.id) {
    case "brand":
      return <ToolButton key={tool.id} tool={{ id: tool.id, textId: tool.textId, icon: tool.icon, href: "/", variant: "brand" }} />;
    case "search":
      return <SearchField key={tool.id} />;
    case "language":
      return <LanguageSwitcher key={tool.id} current={locale} ready={readyLocales} />;
  }

  if (tool.action.type === "view") {
    return (
      <ViewButton key={tool.id} side={tool.action.side} view={tool.action.view} icon={tool.icon} textId={tool.textId} />
    );
  }

  // Ссылка — только если адрес полный. Адреса с [id] подставит окно страницы (пока не подключено).
  const href = tool.action.type === "link" ? tool.action.href : undefined;
  const variant = tool.id === "project" ? "pill" : "icon";
  return <ToolButton key={tool.id} tool={{ id: tool.id, textId: tool.textId, icon: tool.icon, href, variant }} />;
}

// Инструменты одной зоны окна: дефолт + выбор пользователя. Инструмент, который пользователь
// перенёс в зону, показывается на любой странице; без переноса — только на своих страницах по дефолту.
export function ToolHost({
  zone,
  pageKey,
  locale,
  readyLocales,
}: {
  zone: ToolZone;
  pageKey: string;
  locale: Locale;
  readyLocales: string[];
}) {
  const [layout] = useVar<ToolLayout>("tools.layout", {});

  const shown = TOOLS.filter((tool) => {
    if (STRUCTURAL_TOOLS.has(tool.id)) return false;
    if (!effectiveVisible(tool, layout)) return false;
    if (effectiveZone(tool, layout) !== zone) return false;
    if (layout[tool.id]?.zone !== undefined) return true;
    return tool.pages === "all" || tool.pages.includes(pageKey);
  });

  return <>{shown.map((tool) => renderTool(tool, locale, readyLocales))}</>;
}
