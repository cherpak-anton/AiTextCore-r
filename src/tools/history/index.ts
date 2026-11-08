import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "history",
  textId: "book.history",
  icon: "🕐",
  kind: "page",
  zone: "end",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "view",
    side: "right",
    view: "history"
  },
  visibleWhen: "chapters-exist"
};

export default tool;
