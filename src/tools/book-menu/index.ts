import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "book-menu",
  textId: "book.menu",
  icon: "⋮",
  kind: "page",
  zone: "center",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "none"
  }
};

export default tool;
