import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "library",
  textId: "site.library",
  icon: "📚",
  kind: "permanent",
  zone: "end",
  defaultVisible: true,
  pages: "all",
  action: {
    type: "link",
    href: "/library"
  }
};

export default tool;
