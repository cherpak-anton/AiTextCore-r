import type { ReactNode } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { Carousel } from "@/components/site/Carousel";
import { PanelToggle, WindowZone } from "@/components/site/PanelState";

type SiteHeaderProps = {
  // Зоны шапки: инструменты страницы. Закреплённые (start/endPinned) стоят у разделительных линий
  // и не уходят в прокрутку; остальные (start/end) прокручиваются, когда не хватает места.
  start?: ReactNode;
  startPinned?: ReactNode;
  center?: ReactNode;
  end?: ReactNode;
  endPinned?: ReactNode;
  // Ширина шапки: число (ограничить по центру) или "none" (на всю ширину, когда есть панели).
  contentMaxWidth: number | "none";
  // Есть ли боковые панели: тогда крайние зоны стоят над ними. Символы свёртки — часть окна.
  hasLeft?: boolean;
  hasRight?: boolean;
};

// Вертикальный разделитель между зонами (когда зон над панелями нет): с отступом сверху и снизу.
function Divider() {
  return <Box sx={{ width: "1px", alignSelf: "stretch", my: "0.35rem", bgcolor: "divider", flexShrink: 0 }} />;
}

// Шаблон шапки сайта: три зоны. Над панелями крайние зоны — части окна:
// ширина и линии берутся из окна, у края стоит символ свёртки своей панели.
export function SiteHeader({
  start,
  startPinned,
  center,
  end,
  endPinned,
  contentMaxWidth,
  hasLeft = false,
  hasRight = false,
}: SiteHeaderProps) {
  const aligned = hasLeft || hasRight;

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Toolbar
        component="div"
        disableGutters={aligned}
        sx={{
          width: "100%",
          maxWidth: contentMaxWidth,
          // Высота шапки как в старом проекте: строка 40px плюс отступы 0.1rem, итого 44px с линией. Задаём для всех размеров экрана,
          // иначе тема MUI на широком экране ставит 64px.
          minHeight: { xs: "2.7rem", sm: "2.7rem" },
          py: "0.1rem",
          mx: "auto",
          px: aligned ? 0 : { xs: 2, md: 2.5 },
          gap: 0,
        }}
      >
        {hasLeft ? (
          <WindowZone side="left">
            <Carousel gap={1.8}>{start}</Carousel>
            <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}>{startPinned}</Box>
            <PanelToggle side="left" textId="tool.hideLeft" />
          </WindowZone>
        ) : (
          <Stack direction="row" spacing={2} sx={{ alignItems: "center", minWidth: 0, flexShrink: 0, pr: 2 }}>
            {start}
            {startPinned}
          </Stack>
        )}

        {!aligned && <Divider />}

        <Box
          sx={{
            flexGrow: 1,
            minWidth: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            px: 2,
          }}
        >
          {center}
        </Box>

        {!aligned && <Divider />}

        {hasRight ? (
          <WindowZone side="right">
            <PanelToggle side="right" textId="tool.hideRight" />
            <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}>{endPinned}</Box>
            <Carousel gap={0.6}>{end}</Carousel>
          </WindowZone>
        ) : (
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexShrink: 0, pl: 2 }}>
            {end}
            {endPinned}
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
