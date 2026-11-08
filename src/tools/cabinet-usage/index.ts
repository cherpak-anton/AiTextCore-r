import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "cabinet-usage",
  textId: "cabinet.usage",
  icon: "📊",
  kind: "page",
  zone: "none",
  defaultVisible: true,
  pages: [
    "/cabinets/[id]"
  ],
  action: {
    type: "none"
  },
  visibleWhen: "owner"
};

export default tool;
