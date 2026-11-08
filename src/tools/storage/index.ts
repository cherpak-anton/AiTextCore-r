import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "storage",
  textId: "cabinet.storage",
  icon: "💾",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "/cabinets/[id]"
  ],
  action: {
    type: "window",
    page: "/cabinets/[id]/storage"
  },
  visibleWhen: "owner"
};

export default tool;
