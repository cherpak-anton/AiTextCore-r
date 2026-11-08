import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "settings",
  textId: "site.settings",
  icon: "⚙",
  kind: "permanent",
  zone: "end",
  defaultVisible: true,
  pages: "all",
  action: {
    type: "view",
    side: "right",
    view: "settings"
  }
};

export default tool;
