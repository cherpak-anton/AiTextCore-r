import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SiteFrame } from "@/components/site/SiteFrame";
import { ToolButton, type Tool } from "@/components/site/Tool";
import type { Locale } from "@/lib/locale";

// Шаблон страницы книги: шапка в трёх зонах, левая панель (оглавление), правая панель (обсуждение).
// Инструменты передаёт страница списками. Заголовки панелей — часть структуры шаблона.
type BookTemplateProps = {
  locale: Locale;
  // Адрес страницы: по нему берутся её тексты из базы.
  path?: string;
  headerStart?: Tool[];
  headerCenter?: Tool[];
  headerEnd?: Tool[];
  leftTools?: Tool[];
  rightTools?: Tool[];
};

export function BookTemplate({
  locale,
  path = "/template/book",
  headerStart = [],
  headerCenter = [],
  headerEnd = [],
  leftTools = [],
  rightTools = [],
}: BookTemplateProps) {
  return (
    <SiteFrame
      path={path}
      locale={locale}
      headerStart={headerStart.map((tool) => (
        <ToolButton key={tool.id} tool={tool} />
      ))}
      headerCenter={headerCenter.map((tool) => (
        <ToolButton key={tool.id} tool={tool} />
      ))}
      headerEnd={headerEnd.map((tool) => (
        <ToolButton key={tool.id} tool={tool} />
      ))}
      leftPanel={{
        labelTextId: "book.tocLabel",
        content: (
          <Stack spacing={1}>
            <Typography
              data-text="book.tocLabel"
              sx={{
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "text.secondary",
              }}
            />
            {leftTools.map((tool) => (
              <ToolButton key={tool.id} tool={tool} />
            ))}
          </Stack>
        ),
      }}
      rightPanel={{
        labelTextId: "book.discussionLabel",
        content: (
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography data-text="book.discussionLabel" sx={{ fontSize: "0.95rem" }} />
              <Button type="button" color="inherit" data-text-aria="book.help" sx={{ minWidth: 0, px: 0.75, fontSize: "0.8rem" }}>
                ?
              </Button>
            </Stack>
            <Box sx={{ borderTop: 1, borderColor: "divider" }} />
            {rightTools.map((tool) => (
              <ToolButton key={tool.id} tool={tool} />
            ))}
          </Stack>
        ),
      }}
    >
      {null}
    </SiteFrame>
  );
}
