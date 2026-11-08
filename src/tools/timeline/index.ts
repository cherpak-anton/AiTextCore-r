import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "timeline",
  textId: "book.timeline",
  icon: "📅",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/timeline"
  },
  visibleWhen: "events-exist"
};

export default tool;
