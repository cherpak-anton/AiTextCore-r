import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "library-ask",
  textId: "library.ask",
  icon: "🔎",
  kind: "page",
  zone: "none",
  defaultVisible: true,
  pages: [
    "/library"
  ],
  action: {
    type: "none"
  },
  visibleWhen: "signed-in-ai-books"
};

export default tool;
