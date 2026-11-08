import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "calendar-reminder",
  textId: "book.calendarReminder",
  icon: "📅",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "none"
  },
  visibleWhen: "signed-in"
};

export default tool;
