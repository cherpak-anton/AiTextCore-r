"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useVar } from "@/components/shell/WindowStore";
import { SidePanel } from "@/components/site/SidePanel";
import { ICON } from "@/components/site/toolStyles";

// Боковые панели окна. Их состояние (открыта ли, какой вид, ширина) — переменные окна (WindowStore).
// Инструменты меняют эти переменные; содержимое панелей и зоны шапки берутся из них.
export type Side = "left" | "right";

// Ширины по умолчанию — как --toc-rail-width (17rem) и --discussion-rail-width (20rem) в старом проекте.
export const DEFAULT_LEFT_WIDTH = 272;
export const DEFAULT_RIGHT_WIDTH = 320;
// Границы перетаскивания — как в ResizeHandle.tsx старого проекта.
const MIN_PANEL_WIDTH = 180;
const MIN_MAIN_CONTENT_PX = 75.6;

// Переменные одной панели: открыта, вид, ширина.
function usePanel(side: Side) {
  const [open, setOpen] = useVar<boolean>(`${side}.open`, true);
  const [view, setView] = useVar<string | null>(`${side}.view`, null);
  const [width, setWidth] = useVar<number>(
    `${side}.width`,
    side === "left" ? DEFAULT_LEFT_WIDTH : DEFAULT_RIGHT_WIDTH,
  );
  return { open, setOpen, view, setView, width, setWidth };
}

// Зона шапки над боковой панелью: её ширина = ширине панели, линия на границе панели.
// Линия идёт не на всю высоту, а с отступом сверху и снизу, как в старом проекте (0.35rem).
export function WindowZone({ side, children }: { side: Side; children: ReactNode }) {
  const { width } = usePanel(side);
  const line = {
    content: '""',
    position: "absolute",
    top: "0.35rem",
    bottom: "0.35rem",
    width: "1px",
    bgcolor: "divider",
  } as const;

  return (
    <Box
      sx={{
        position: "relative",
        width,
        flexShrink: 0,
        alignSelf: "stretch",
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        pl: side === "left" ? 2.5 : 0,
        pr: side === "left" ? 0 : 2.5,
        "&::after": side === "left" ? { ...line, right: 0 } : undefined,
        "&::before": side === "right" ? { ...line, left: 0 } : undefined,
      }}
    >
      {children}
    </Box>
  );
}

// Область нажатия символа свернуть/раскрыть: больше самого рисунка, чтобы по нему легко попасть.
const TOGGLE_HIT = {
  minWidth: 0,
  flexShrink: 0,
  width: "1.5rem",
  height: "1.75rem",
  p: 0,
  borderRadius: "4px",
  color: "text.secondary",
  "&:hover": { color: "text.primary", bgcolor: "background.default" },
} as const;

// Символ свернуть/раскрыть панель стороны — нарисованный шеврон (SVG).
// Направление по состоянию: открыта — шеврон к краю, свёрнута — от края.
export function PanelToggle({ side, textId }: { side: Side; textId: string }) {
  const { open, setOpen } = usePanel(side);
  const rotation = (side === "left") === open ? 0 : 180;

  return (
    <Button type="button" data-text-aria={textId} onClick={() => setOpen(!open)} sx={TOGGLE_HIT}>
      <Box
        component="svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        sx={{ width: 20, height: 20, transform: `rotate(${rotation}deg)`, transition: "transform 150ms ease" }}
      >
        <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </Box>
    </Button>
  );
}

// Инструмент, который показывает вид в панели стороны. Подсвечен, когда этот вид открыт.
// Повторное нажатие на открытый вид закрывает панель.
export function ViewButton({ side, view, icon, textId }: { side: Side; view: string; icon: string; textId: string }) {
  const { open, setOpen, view: current, setView } = usePanel(side);
  const active = open && current === view;

  const onClick = () => {
    if (open && current === view) {
      setOpen(false);
    } else {
      setView(view);
      setOpen(true);
    }
  };

  return (
    <Button
      type="button"
      color="inherit"
      data-text-aria={textId}
      onClick={onClick}
      sx={{ ...ICON, bgcolor: active ? "action.selected" : undefined, color: active ? "primary.main" : undefined }}
    >
      {icon}
    </Button>
  );
}

// Боковая панель окна: её содержимое — выбранный вид из набора. Сворачивается с анимацией,
// ширину меняет перетаскиванием границы у внутреннего края.
export function PanelSlot({
  side,
  labelTextId,
  views,
}: {
  side: Side;
  labelTextId: string;
  views: Record<string, ReactNode>;
}) {
  const { open, view, width, setWidth } = usePanel(side);
  const other = usePanel(side === "left" ? "right" : "left");
  const current = view && views[view] !== undefined ? view : Object.keys(views)[0];

  const away = side === "left" ? "translateX(-100%)" : "translateX(100%)";
  const motion = "200ms ease";
  // Во время перетаскивания анимация выключена: панель следует за мышью сразу, без задержки.
  const [dragging, setDragging] = useState(false);

  // Перетаскивание границы: ширина растёт в сторону окна, не меньше MIN и не больше, чем оставляет тексту.
  const startResize = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
    const startX = event.clientX;
    const startWidth = width;
    const max = Math.max(MIN_PANEL_WIDTH, window.innerWidth - MIN_MAIN_CONTENT_PX - other.width);

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const onMove = (moveEvent: globalThis.MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      const signed = side === "left" ? delta : -delta;
      setWidth(Math.min(max, Math.max(MIN_PANEL_WIDTH, startWidth + signed)));
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      setDragging(false);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <Box
      sx={{
        display: { xs: "none", lg: "flex" },
        flexShrink: 0,
        alignItems: "stretch",
        width: open ? width : 0,
        overflow: "hidden",
        transition: dragging ? "none" : `width ${motion}`,
        "@media (prefers-reduced-motion: reduce)": { transition: "none" },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width,
          flexShrink: 0,
          display: "flex",
          transform: open ? "none" : away,
          transition: `transform ${motion}`,
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}
      >
        <SidePanel labelTextId={labelTextId} side={side} width={width}>
          {current !== undefined ? views[current] : null}
        </SidePanel>
        {open && (
          <Box
            role="separator"
            aria-orientation="vertical"
            onMouseDown={startResize}
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              [side === "left" ? "right" : "left"]: 0,
              width: "6px",
              cursor: "col-resize",
              zIndex: 1,
              "&:hover": { bgcolor: "action.hover" },
            }}
          />
        )}
      </Box>
    </Box>
  );
}
