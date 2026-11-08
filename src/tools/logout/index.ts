import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "logout",
  textId: "user.logout",
  icon: "🚪",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "all"
  ],
  action: {
    type: "none"
  },
  visibleWhen: "signed-in"
};

export default tool;
