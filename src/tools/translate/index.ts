import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "translate",
  textId: "book.translate",
  icon: "🔤",
  kind: "page",
  zone: "center",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "none"
  },
  visibleWhen: "editor-or-own-ai"
};

export default tool;
