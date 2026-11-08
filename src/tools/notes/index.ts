import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "notes",
  textId: "book.notes",
  icon: "📝",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/notes"
  },
  visibleWhen: "own-notes-exist"
};

export default tool;
