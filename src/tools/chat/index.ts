import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "chat",
  textId: "book.chat",
  icon: "💭",
  kind: "page",
  zone: "end",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "view",
    side: "right",
    view: "chat"
  },
  visibleWhen: "own-ai-connected"
};

export default tool;
