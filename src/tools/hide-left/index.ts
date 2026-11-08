import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "hide-left",
  textId: "site.hideLeft",
  icon: "‹",
  kind: "permanent",
  zone: "left-panel",
  defaultVisible: true,
  pages: "all",
  action: {
    type: "none"
  }
};

export default tool;
