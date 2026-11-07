import type { ReactNode } from "react";
import Box from "@mui/material/Box";

// Ширины боковых панелей. Шапка берёт те же значения, чтобы её зоны стояли точно над панелями.
export const LEFT_PANEL_WIDTH = "17rem";
export const RIGHT_PANEL_WIDTH = "20rem";

type SidePanelProps = {
  // id текста подписи панели в базе; подпись подставляет TextBinder.
  labelTextId: string;
  // С какой стороны страницы стоит панель: от этого зависит, с какой стороны линия-разделитель.
  side: "left" | "right";
  children: ReactNode;
};

// Боковая панель — отдельная колонка от шапки до низа страницы, без скруглений и отступов рамки.
export function SidePanel({ labelTextId, side, children }: SidePanelProps) {
  return (
    <Box
      component="aside"
      data-text-aria={labelTextId}
      sx={{
        width: side === "left" ? LEFT_PANEL_WIDTH : RIGHT_PANEL_WIDTH,
        flexShrink: 0,
        alignSelf: "stretch",
        bgcolor: "background.paper",
        borderColor: "divider",
        borderLeft: side === "right" ? 1 : 0,
        borderRight: side === "left" ? 1 : 0,
        p: 2,
      }}
    >
      {children}
    </Box>
  );
}
