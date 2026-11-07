import type { ReactNode } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";

type SiteHeaderProps = {
  // Три зоны шапки: слева, по центру и справа. Шаблон сам не добавляет ни одного элемента:
  // страница передаёт свои инструменты.
  start?: ReactNode;
  center?: ReactNode;
  end?: ReactNode;
  // Ширина шапки: число (ограничить по центру) или "none" (на всю ширину, когда есть панели).
  contentMaxWidth: number | "none";
  // Если заданы — левая и правая зоны имеют эту ширину и стоят точно над боковыми панелями.
  // Линии между зонами тогда совпадают с границами панелей.
  leftWidth?: string;
  rightWidth?: string;
};

// Вертикальный разделитель между зонами шапки: 1 px, цвет границы, с отступом сверху и снизу.
function Divider() {
  return <Box sx={{ width: "1px", alignSelf: "stretch", my: "5.6px", bgcolor: "divider", flexShrink: 0 }} />;
}

// Шаблон шапки сайта: каркас из трёх зон с разделителями.
export function SiteHeader({ start, center, end, contentMaxWidth, leftWidth, rightWidth }: SiteHeaderProps) {
  const aligned = leftWidth !== undefined || rightWidth !== undefined;

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Toolbar
        component="div"
        disableGutters={aligned}
        sx={{
          width: "100%",
          maxWidth: contentMaxWidth,
          minHeight: "2.75rem",
          mx: "auto",
          px: aligned ? 0 : { xs: 2, md: 2.5 },
          gap: 0,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            minWidth: 0,
            flexShrink: 0,
            width: leftWidth,
            pl: aligned ? 2.5 : 0,
            pr: 2,
            // Линия справа от левой зоны совпадает с границей левой панели.
            borderRight: aligned && leftWidth ? 1 : 0,
            borderColor: "divider",
          }}
        >
          {start}
        </Stack>
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
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            flexShrink: 0,
            width: rightWidth,
            pl: 2,
            pr: aligned ? 2.5 : 0,
            // Линия слева от правой зоны совпадает с границей правой панели.
            borderLeft: aligned && rightWidth ? 1 : 0,
            borderColor: "divider",
          }}
        >
          {end}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
