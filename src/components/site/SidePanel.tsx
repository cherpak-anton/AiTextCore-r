import type { ReactNode } from "react";
import Box from "@mui/material/Box";

type SidePanelProps = {
  // id текста подписи панели в базе; подпись подставляет TextBinder.
  labelTextId: string;
  // С какой стороны страницы стоит панель: от этого зависит, с какой стороны линия-разделитель.
  side: "left" | "right";
  // Текущая ширина панели в px: её меняет перетаскивание границы (см. PanelState).
  width: number;
  children: ReactNode;
};

// Боковая панель — отдельная колонка от шапки до низа страницы, без скруглений.
// Линия-разделитель у текста — полной высоты, цвета divider (как --rule в старом проекте).
export function SidePanel({ labelTextId, side, width, children }: SidePanelProps) {
  return (
    <Box
      component="aside"
      data-text-aria={labelTextId}
      sx={{
        width,
        flexShrink: 0,
        alignSelf: "stretch",
        bgcolor: "background.paper",
        borderLeft: side === "right" ? "1px solid" : "none",
        borderRight: side === "left" ? "1px solid" : "none",
        // Цвет задаём последним: короткая запись границы выше иначе сбрасывает его.
        borderColor: "divider",
        p: 2,
      }}
    >
      {children}
    </Box>
  );
}
