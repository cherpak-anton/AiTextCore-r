import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "project",
  textId: "site.project",
  icon: "🗄️ ▾",
  kind: "permanent",
  zone: "start",
  defaultVisible: true,
  pages: "all",
  action: {
    type: "none"
  },
  visibleWhen: "signed-in-with-cabinet"
};

export default tool;
