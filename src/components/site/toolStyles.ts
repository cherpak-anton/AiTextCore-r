// Общие стили инструментов шапки. Один источник для обычных и клиентских кнопок.

// Круглая кнопка-значок шапки: 1.9rem, как .header-icon-btn в старом проекте.
export const ICON = {
  minWidth: 0,
  flexShrink: 0,
  width: "1.9rem",
  height: "1.9rem",
  p: 0,
  borderRadius: "50%",
  fontSize: "1rem",
  lineHeight: 1,
  color: "text.primary",
  "&:hover": { bgcolor: "background.default" },
} as const;

// Переключатель в скруглённой рамке: как .project-switcher-trigger в старом проекте.
export const PILL = {
  minWidth: 0,
  flexShrink: 0,
  maxWidth: "11rem",
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
  "&:hover": { bgcolor: "background.default" },
} as const;
