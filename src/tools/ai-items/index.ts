import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "ai-items",
  textId: "book.aiItems",
  icon: "🤖",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/ai"
  },
  visibleWhen: "editor-ai-items"
};

export default tool;
