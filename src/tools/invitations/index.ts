import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "invitations",
  textId: "user.invitations",
  icon: "📨",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "all"
  ],
  action: {
    type: "window",
    page: "/invitations"
  },
  visibleWhen: "signed-in"
};

export default tool;
