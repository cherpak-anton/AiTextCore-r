import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import { WindowStoreProvider } from "@/components/shell/WindowStore";
import { type CatalogItem, ToolSettingsList } from "@/components/shell/ToolVisibility";
import { CORE_CATALOG, coreEnd, coreStart } from "@/components/site/CoreTools";
import { PanelSlot } from "@/components/site/PanelState";
import { SiteHeader } from "@/components/site/SiteHeader";
import { TextBinder } from "@/components/site/TextBinder";
import type { Locale } from "@/lib/locale";

// Боковая панель окна: подпись и набор видов. Показан один вид; по действиям пользователя он меняется.
export type SidePanelContent = {
  labelTextId: string;
  views: Record<string, ReactNode>;
};

type SiteFrameProps = {
  // Адрес страницы: по нему берутся её тексты и её настройки инструментов.
  path: string;
  locale: Locale;
  // Постоянные инструменты окна. Выключаются только для титульной.
  withCore?: boolean;
  // Языки, для которых есть тексты (для переключателя языка).
  readyLocales?: string[];
  // Каталог инструментов самой страницы (с признаком видимости по умолчанию).
  pageCatalog?: CatalogItem[];
  // Инструменты страницы по зонам. Закреплённые стоят у линий и не уходят в прокрутку.
  headerStart?: ReactNode;
  headerStartPinned?: ReactNode;
  headerCenter?: ReactNode;
  headerEnd?: ReactNode;
  headerEndPinned?: ReactNode;
  leftPanel?: SidePanelContent;
  rightPanel?: SidePanelContent;
  children: ReactNode;
};

// Ширина содержимого страницы без панелей — как у титульной.
const NARROW = 1088;

// Одно окно страницы: шапка, две боковые панели и содержимое. Состояние окна — общее (WindowStore).
export function SiteFrame({
  path,
  locale,
  withCore = true,
  readyLocales = [],
  pageCatalog = [],
  headerStart,
  headerStartPinned,
  headerCenter,
  headerEnd,
  headerEndPinned,
  leftPanel,
  rightPanel,
  children,
}: SiteFrameProps) {
  const hasPanels = Boolean(leftPanel || rightPanel);
  const firstView = (panel?: SidePanelContent) => (panel ? (Object.keys(panel.views)[0] ?? null) : null);

  // Полный каталог страницы: постоянные инструменты и инструменты страницы. Для списка настроек.
  const catalog = withCore ? [...CORE_CATALOG, ...pageCatalog] : pageCatalog;
  // Настройки инструментов — вид правой панели; есть у всех страниц с постоянными инструментами.
  const rightViews = rightPanel
    ? withCore
      ? { ...rightPanel.views, settings: <ToolSettingsList scope={path} catalog={catalog} /> }
      : rightPanel.views
    : undefined;

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TextBinder path={path} locale={locale} />
      <Box
        component="a"
        href="#main-content"
        data-text="site.skipToContent"
        sx={{
          position: "absolute",
          left: 16,
          top: -80,
          zIndex: 1300,
          px: 2,
          py: 1,
          borderRadius: 2,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          "&:focus": { top: 16 },
        }}
      />
      <WindowStoreProvider pageDefaults={{ "left.view": firstView(leftPanel), "right.view": firstView(rightPanel) }}>
        <SiteHeader
          start={withCore ? <>{coreStart(path)}{headerStart}</> : headerStart}
          startPinned={headerStartPinned}
          center={headerCenter}
          end={withCore ? <>{headerEnd}{coreEnd(path, locale, readyLocales)}</> : headerEnd}
          endPinned={headerEndPinned}
          contentMaxWidth={hasPanels ? "none" : NARROW}
          hasLeft={Boolean(leftPanel)}
          hasRight={Boolean(rightPanel)}
        />
        <Box sx={{ flex: 1, display: "flex", alignItems: "stretch", minHeight: 0 }}>
          {leftPanel && <PanelSlot side="left" labelTextId={leftPanel.labelTextId} views={leftPanel.views} />}
          <Box
            component="main"
            id="main-content"
            sx={{
              flex: 1,
              minWidth: 0,
              maxWidth: hasPanels ? "none" : NARROW,
              width: "100%",
              mx: hasPanels ? 0 : "auto",
              px: { xs: 2.5, md: 3 },
              py: { xs: 3, md: 4 },
            }}
          >
            {children}
          </Box>
          {rightPanel && rightViews && (
            <PanelSlot side="right" labelTextId={rightPanel.labelTextId} views={rightViews} />
          )}
        </Box>
      </WindowStoreProvider>
    </Box>
  );
}
