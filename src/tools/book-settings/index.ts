import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "book-settings",
  textId: "book.settings",
  icon: "🛠",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "none"
  },
  visibleWhen: "can-manage-writers"
};

export default tool;
