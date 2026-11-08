import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "notifications",
  textId: "site.notifications",
  icon: "🔔",
  kind: "permanent",
  zone: "end",
  defaultVisible: true,
  pages: "all",
  action: {
    type: "none"
  },
  visibleWhen: "signed-in"
};

export default tool;
