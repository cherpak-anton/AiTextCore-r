import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "cabinet",
  textId: "site.cabinet",
  icon: "🗄️",
  kind: "permanent",
  zone: "end",
  defaultVisible: true,
  pages: "all",
  action: {
    type: "none"
  },
  visibleWhen: "signed-in-with-cabinet"
};

export default tool;
