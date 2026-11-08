import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "learn",
  textId: "book.learn",
  icon: "У",
  kind: "page",
  zone: "none",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "none"
  },
  visibleWhen: "signed-in-own-ai"
};

export default tool;
