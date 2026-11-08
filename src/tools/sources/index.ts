import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "sources",
  textId: "book.sources",
  icon: "📜",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/sources"
  }
};

export default tool;
