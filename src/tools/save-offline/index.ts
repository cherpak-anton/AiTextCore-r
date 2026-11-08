import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "save-offline",
  textId: "book.saveOffline",
  icon: "💾",
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
