import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "lesson",
  textId: "window.lesson",
  icon: "🎓",
  kind: "window",
  zone: "none",
  defaultVisible: false,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/lesson/[chapterId]"
  }
};

export default tool;
