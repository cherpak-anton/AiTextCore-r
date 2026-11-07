import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AppLink from "@/components/AppLink";

// Инструмент шапки или панели. Страница задаёт список инструментов, шаблон сам их не содержит.
// variant: "icon" — значок; "pill" — кнопка в скруглённой рамке с текстом; "brand" — логотип.
export type Tool = {
  // Уникальный id внутри списка.
  id: string;
  // id текста подписи в базе (подставляет TextBinder).
  textId: string;
  // Значок, короткий текст или логотип.
  icon: string;
  // Если задан — инструмент является ссылкой.
  href?: string;
  variant?: "icon" | "pill" | "brand";
};

const ICON = { minWidth: 0, px: 1, fontSize: "1.05rem" } as const;
const PILL = {
  minWidth: 0,
  px: 1.8,
  py: 0.4,
  fontSize: "0.85rem",
  borderRadius: 999,
  border: 1,
  borderColor: "divider",
  bgcolor: "background.paper",
  color: "text.primary",
  textTransform: "none",
  whiteSpace: "nowrap",
} as const;

export function ToolButton({ tool }: { tool: Tool }) {
  const variant = tool.variant ?? "icon";

  if (variant === "brand") {
    return (
      <Box
        component={tool.href ? AppLink : "span"}
        href={tool.href}
        data-text-aria={tool.textId}
        sx={{ color: "accentText", fontWeight: 700, fontSize: "1.5rem", whiteSpace: "nowrap", textDecoration: "none" }}
      >
        {tool.icon}
      </Box>
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
