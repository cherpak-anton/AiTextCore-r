import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "profile",
  textId: "book.profile",
  icon: "🧭",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/profile"
  },
  visibleWhen: "editor"
};

export default tool;
