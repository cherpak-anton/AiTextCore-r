import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "access",
  textId: "book.access",
  icon: "🔑",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "none"
  },
  visibleWhen: "can-manage-readers"
};

export default tool;
