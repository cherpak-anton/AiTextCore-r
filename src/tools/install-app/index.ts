import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "install-app",
  textId: "user.installApp",
  icon: "📲",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "all"
  ],
  action: {
    type: "none"
  },
  visibleWhen: "install-available"
};

export default tool;
