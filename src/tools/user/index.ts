import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "user",
  textId: "site.user",
  icon: "T",
  kind: "permanent",
  zone: "end",
  defaultVisible: true,
  pages: "all",
  action: {
    type: "none"
  },
  visibleWhen: "signed-in"
};

export default tool;
