import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "help",
  textId: "site.help",
  icon: "❓",
  kind: "permanent",
  zone: "end",
  defaultVisible: true,
  pages: "all",
  action: {
    type: "none"
  }
};

export default tool;
