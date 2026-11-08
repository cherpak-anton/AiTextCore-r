import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "map",
  textId: "window.map",
  icon: "🗺",
  kind: "window",
  zone: "none",
  defaultVisible: false,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/map"
  }
};

export default tool;
