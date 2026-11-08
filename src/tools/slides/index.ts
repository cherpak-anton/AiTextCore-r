import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "slides",
  textId: "window.slides",
  icon: "🖼",
  kind: "window",
  zone: "none",
  defaultVisible: false,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/slides/[chapterId]"
  },
  visibleWhen: "editor"
};

export default tool;
