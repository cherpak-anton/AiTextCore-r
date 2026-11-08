import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "reader",
  textId: "site.reader",
  icon: "🎧",
  kind: "permanent",
  zone: "end",
  defaultVisible: true,
  pages: "all",
  action: {
    type: "view",
    side: "right",
    view: "reader"
  }
};

export default tool;
