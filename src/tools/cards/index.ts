import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "cards",
  textId: "window.cards",
  icon: "🎯",
  kind: "window",
  zone: "none",
  defaultVisible: false,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/cards/[chapterId]"
  }
};

export default tool;
