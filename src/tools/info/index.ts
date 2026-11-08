import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "info",
  textId: "book.info",
  icon: "ℹ️",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "none"
  }
};

export default tool;
