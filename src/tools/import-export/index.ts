import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "import-export",
  textId: "book.importExport",
  icon: "📤",
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
