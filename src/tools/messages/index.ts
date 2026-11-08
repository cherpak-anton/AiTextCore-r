import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "messages",
  textId: "user.messages",
  icon: "✉️",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "all"
  ],
  action: {
    type: "window",
    page: "/messages"
  },
  visibleWhen: "signed-in"
};

export default tool;
