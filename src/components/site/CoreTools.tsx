import type { ReactNode } from "react";
import type { CatalogItem } from "@/components/shell/ToolVisibility";
import { ToolVisible } from "@/components/shell/ToolVisibility";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { ViewButton } from "@/components/site/PanelState";
import { SearchField } from "@/components/site/SearchField";
import { ToolButton } from "@/components/site/Tool";
import type { Locale } from "@/lib/locale";

// Постоянные инструменты окна: одинаковы на всех рабочих страницах (как в эталоне старого проекта,
// SiteTemplate.tsx). Страница их не меняет: добавляет свои и может отключить любой из этих.
// Инструменты связаны переменными окна: 💬 🎧 🤖 и ⚙ показывают вид правой панели, поиск пишет
// запрос в «search.query», переключатели панелей меняют «left.open» и «right.open».

// Каталог постоянных инструментов: что это, его подпись и видно ли по умолчанию.
export const CORE_CATALOG: CatalogItem[] = [
  { id: "brand", textId: "site.brand", defaultVisible: true },
  { id: "project", textId: "site.project", defaultVisible: true },
  { id: "search", textId: "site.search", defaultVisible: true },
  { id: "library", textId: "site.library", defaultVisible: true },
  { id: "discussion", textId: "site.discussion", defaultVisible: true },
  { id: "reader", textId: "site.reader", defaultVisible: true },
  { id: "ai", textId: "site.ai", defaultVisible: true },
  { id: "language", textId: "lang.choose", defaultVisible: true },
  { id: "notifications", textId: "site.notifications", defaultVisible: true },
  { id: "user", textId: "site.user", defaultVisible: true },
  { id: "settings", textId: "site.settings", defaultVisible: true },
];

// Зона шапки слева (до панели): логотип, проект, поиск.
export function coreStart(scope: string): ReactNode {
  return (
    <>
      <ToolVisible scope={scope} id="brand">
        <ToolButton tool={{ id: "brand", textId: "site.brand", icon: "AiTextCore", href: "/", variant: "brand" }} />
      </ToolVisible>
      <ToolVisible scope={scope} id="project">
        <ToolButton tool={{ id: "project", textId: "site.project", icon: "🗄️ ▾", variant: "pill" }} />
      </ToolVisible>
      <ToolVisible scope={scope} id="search">
        <SearchField />
      </ToolVisible>
    </>
  );
}

// Зона шапки справа (над правой панелью): библиотека, виды правой панели, язык, уведомления, аватар.
export function coreEnd(scope: string, locale: Locale, readyLocales: string[]): ReactNode {
  return (
    <>
      <ToolVisible scope={scope} id="library">
        <ToolButton tool={{ id: "library", textId: "site.library", icon: "📚", href: "/library" }} />
      </ToolVisible>
      <ToolVisible scope={scope} id="discussion">
        <ViewButton side="right" view="discussion" icon="💬" textId="site.discussion" />
      </ToolVisible>
      <ToolVisible scope={scope} id="reader">
        <ViewButton side="right" view="reader" icon="🎧" textId="site.reader" />
      </ToolVisible>
      <ToolVisible scope={scope} id="ai">
        <ViewButton side="right" view="ai" icon="🤖" textId="site.ai" />
      </ToolVisible>
      <ToolVisible scope={scope} id="settings">
        <ViewButton side="right" view="settings" icon="⚙" textId="site.settings" />
      </ToolVisible>
      <ToolVisible scope={scope} id="language">
        <LanguageSwitcher current={locale} ready={readyLocales} />
      </ToolVisible>
      <ToolVisible scope={scope} id="notifications">
        <ToolButton tool={{ id: "notifications", textId: "site.notifications", icon: "🔔" }} />
      </ToolVisible>
      <ToolVisible scope={scope} id="user">
        <ToolButton tool={{ id: "user", textId: "site.user", icon: "T" }} />
      </ToolVisible>
    </>
  );
}
