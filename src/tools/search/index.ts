import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "search",
  textId: "site.search",
  icon: "🔎",
  kind: "permanent",
  zone: "start",
  defaultVisible: true,
  pages: "all",
  action: {
    type: "link",
    href: "/library"
  }
};

export default tool;
