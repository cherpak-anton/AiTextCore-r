import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "cabinet-menu",
  textId: "cabinet.menu",
  icon: "⋮",
  kind: "page",
  zone: "end",
  defaultVisible: true,
  pages: [
    "/cabinets/[id]"
  ],
  action: {
    type: "none"
  }
};

export default tool;
