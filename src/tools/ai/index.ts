import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "ai",
  textId: "site.ai",
  icon: "🤖",
  kind: "permanent",
  zone: "end",
  defaultVisible: true,
  pages: "all",
  action: {
    type: "view",
    side: "right",
    view: "ai"
  },
  visibleWhen: "own-ai-connected"
};

export default tool;
