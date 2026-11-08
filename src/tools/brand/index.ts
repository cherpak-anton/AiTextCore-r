import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "brand",
  textId: "site.brand",
  icon: "AiTextCore",
  kind: "permanent",
  zone: "start",
  defaultVisible: true,
  pages: "all",
  action: {
    type: "link",
    href: "/"
  }
};

export default tool;
