import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "merge",
  textId: "window.merge",
  icon: "🔀",
  kind: "window",
  zone: "none",
  defaultVisible: false,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/merge"
  },
  visibleWhen: "draft-owner"
};

export default tool;
