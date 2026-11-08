import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "bookmark",
  textId: "book.bookmark",
  icon: "🔖",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "none"
  },
  visibleWhen: "saved-position"
};

export default tool;
