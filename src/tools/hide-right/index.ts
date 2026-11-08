import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "hide-right",
  textId: "site.hideRight",
  icon: "›",
  kind: "permanent",
  zone: "right-panel",
  defaultVisible: true,
  pages: "all",
  action: {
    type: "none"
  }
};

export default tool;
