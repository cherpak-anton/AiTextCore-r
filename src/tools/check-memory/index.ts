import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "check-memory",
  textId: "book.checkMemory",
  icon: "🎯",
  kind: "page",
  zone: "none",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/cards/[chapterId]"
  },
  visibleWhen: "signed-in-non-editor-ai"
};

export default tool;
