import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Виды панелей книги. Содержимое видов — не часть шаблона: страница сама решает, что показать.
// Шаблон книги (/template/book) использует только пустые виды — одну сетку без подписей.

// Виды правой панели. Инструменты шапки (💬 🎧 🕐 🔌) выбирают один из них (см. action в exampleTools).
export const RIGHT_VIEWS = [
  { id: "discussion", textId: "book.discussion" },
  { id: "reader", textId: "book.reader" },
  { id: "history", textId: "book.history" },
  { id: "ai", textId: "book.ai" },
];

// Заголовок вида панели: подпись из базы и линия.
export function PanelHeading({ textId }: { textId: string }) {
  return (
    <Stack spacing={1}>
      <Typography data-text={textId} sx={{ fontSize: "0.95rem" }} />
      <Box sx={{ borderTop: 1, borderColor: "divider" }} />
    </Stack>
  );
}

// Заголовок оглавления: капсом, как «TABLE OF CONTENTS» в старом проекте.
export function TocHeading() {
  return (
    <Typography
      data-text="book.tocLabel"
      sx={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "text.secondary" }}
    />
  );
}

// Набор видов правой панели с заголовками.
export function bookRightViews(): Record<string, React.ReactNode> {
  return Object.fromEntries(RIGHT_VIEWS.map((view) => [view.id, <PanelHeading key={view.id} textId={view.textId} />]));
}
