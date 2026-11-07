import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import { LEFT_PANEL_WIDTH, RIGHT_PANEL_WIDTH, SidePanel } from "@/components/site/SidePanel";
import { SiteHeader } from "@/components/site/SiteHeader";
import { TextBinder } from "@/components/site/TextBinder";
import type { Locale } from "@/lib/locale";

export type SidePanelContent = {
  // id текста подписи панели в базе.
  labelTextId: string;
  // Инструменты панели: страница вставляет свои.
  content: ReactNode;
};

type SiteFrameProps = {
  // Адрес страницы: по нему браузерный скрипт берёт её тексты из базы.
  path: string;
  locale: Locale;
  // Инструменты шапки: три зоны — слева, по центру и справа. Без них шапка пустая.
  headerStart?: ReactNode;
  headerCenter?: ReactNode;
  headerEnd?: ReactNode;
  leftPanel?: SidePanelContent;
  rightPanel?: SidePanelContent;
  children: ReactNode;
};

// Ширина содержимого страницы без панелей — как у титульной.
const NARROW = 1088;

// Стандартный шаблон рабочей панели сайта: шапка сверху, колонки панелей от неё до низа страницы,
// содержимое посередине. Шаблон задаёт только каркас, инструменты передаёт страница.
export function SiteFrame({
  path,
  locale,
  headerStart,
  headerCenter,
  headerEnd,
  leftPanel,
  rightPanel,
  children,
}: SiteFrameProps) {
  const hasPanels = Boolean(leftPanel || rightPanel);

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
      <SiteHeader
        start={headerStart}
        center={headerCenter}
        end={headerEnd}
        contentMaxWidth={hasPanels ? "none" : NARROW}
        leftWidth={leftPanel ? LEFT_PANEL_WIDTH : undefined}
        rightWidth={rightPanel ? RIGHT_PANEL_WIDTH : undefined}
      />
      <Box sx={{ flex: 1, display: "flex", alignItems: "stretch", minHeight: 0 }}>
        {leftPanel && (
          <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "stretch" }}>
            <SidePanel labelTextId={leftPanel.labelTextId} side="left">
              {leftPanel.content}
            </SidePanel>
          </Box>
        )}
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
        {rightPanel && (
          <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "stretch" }}>
            <SidePanel labelTextId={rightPanel.labelTextId} side="right">
              {rightPanel.content}
            </SidePanel>
          </Box>
        )}
      </Box>
    </Box>
  );
}
