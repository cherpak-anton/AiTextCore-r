import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "people",
  textId: "book.people",
  icon: "📇",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/people"
  },
  visibleWhen: "people-exist"
};

export default tool;
