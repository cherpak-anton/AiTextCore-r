import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "follow",
  textId: "book.follow",
  icon: "🔔",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "none"
  },
  visibleWhen: "signed-in-non-editor"
};

export default tool;
