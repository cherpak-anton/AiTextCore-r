import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "shelf-menu",
  textId: "shelf.menu",
  icon: "⋮",
  kind: "page",
  zone: "none",
  defaultVisible: true,
  pages: [
    "/cabinets/[id]"
  ],
  action: {
    type: "none"
  }
};

export default tool;
