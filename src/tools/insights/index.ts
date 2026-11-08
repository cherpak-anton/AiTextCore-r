import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "insights",
  textId: "book.insights",
  icon: "📊",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/insights"
  },
  visibleWhen: "editor"
};

export default tool;
