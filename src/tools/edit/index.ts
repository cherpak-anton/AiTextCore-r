import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "edit",
  textId: "book.edit",
  icon: "✏️",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "none"
  },
  visibleWhen: "editor"
};

export default tool;
