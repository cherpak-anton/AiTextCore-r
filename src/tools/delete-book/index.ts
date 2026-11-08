import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "delete-book",
  textId: "book.delete",
  icon: "🗑",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "none"
  },
  visibleWhen: "owner-no-chapters"
};

export default tool;
