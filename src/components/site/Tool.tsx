import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AppLink from "@/components/AppLink";
import { PanelToggle, ViewButton } from "@/components/site/PanelState";
import { ICON, PILL } from "@/components/site/toolStyles";

// Инструмент шапки или панели. Страница задаёт список инструментов, шаблон сам их не содержит.
// variant: "icon" — значок; "pill" — кнопка в рамке с текстом; "brand" — логотип;
// "toggle" — символ свернуть панель стороны (side).
// action — инструмент показывает вид в панели стороны (меняет состояние окна).
export type Tool = {
  // Уникальный id внутри списка.
  id: string;
  // id текста подписи в базе (подставляет TextBinder).
  textId: string;
  // Значок, короткий текст или логотип.
  icon: string;
  // Если задан — инструмент является ссылкой.
  href?: string;
  variant?: "icon" | "pill" | "brand" | "toggle";
  // Для "toggle": какую боковую панель сворачивает символ.
  side?: "left" | "right";
  // Для действия: какой вид показать в панели какой стороны.
  action?: { side: "left" | "right"; view: string };
  // Закреплённый инструмент стоит у разделительной линии и не уходит в прокрутку.
  pinned?: boolean;
  // Видно ли по умолчанию на этой странице. Пользователь может переопределить (см. ToolVisibility).
  defaultVisible?: boolean;
};

export function ToolButton({ tool }: { tool: Tool }) {
  const variant = tool.variant ?? "icon";

  if (variant === "brand") {
    return (
      <Box
        component={tool.href ? AppLink : "span"}
        href={tool.href}
        data-text-aria={tool.textId}
        sx={{
          color: "accentText",
          fontWeight: 700,
          fontSize: "1.5rem",
          whiteSpace: "nowrap",
          textDecoration: "none",
          display: "inline-flex",
          flexShrink: 0,
          alignItems: "center",
          minHeight: "40px",
          mr: "0.5rem",
        }}
      >
        {tool.icon}
      </Box>
    );
  }

  if (variant === "toggle" && tool.side) {
    return <PanelToggle side={tool.side} textId={tool.textId} />;
  }

  if (tool.action) {
    return (
      <ViewButton side={tool.action.side} view={tool.action.view} icon={tool.icon} textId={tool.textId} />
    );
  }

  const sx = variant === "pill" ? PILL : ICON;

  if (tool.href) {
    return (
      <Button component={AppLink} href={tool.href} color="inherit" data-text-aria={tool.textId} sx={sx}>
        {tool.icon}
      </Button>
    );
  }
  return (
    <Button type="button" color="inherit" data-text-aria={tool.textId} sx={sx}>
      {tool.icon}
    </Button>
  );
}
