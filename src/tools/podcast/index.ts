import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "podcast",
  textId: "window.podcast",
  icon: "🎙",
  kind: "window",
  zone: "none",
  defaultVisible: false,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/podcast/[chapterId]"
  }
};

export default tool;
