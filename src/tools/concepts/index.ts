import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "concepts",
  textId: "window.concepts",
  icon: "🧩",
  kind: "window",
  zone: "none",
  defaultVisible: false,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/concepts/[chapterId]"
  }
};

export default tool;
