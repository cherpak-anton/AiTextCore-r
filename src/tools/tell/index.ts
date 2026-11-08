import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "tell",
  textId: "user.tell",
  icon: "🗣",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "all"
  ],
  action: {
    type: "window",
    page: "/tell"
  },
  visibleWhen: "signed-in"
};

export default tool;
