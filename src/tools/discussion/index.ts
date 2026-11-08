import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "discussion",
  textId: "site.discussion",
  icon: "💬",
  kind: "permanent",
  zone: "end",
  defaultVisible: true,
  pages: "all",
  action: {
    type: "view",
    side: "right",
    view: "discussion"
  }
};

export default tool;
