import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "new-book",
  textId: "cabinet.newBook",
  icon: "＋",
  kind: "page",
  zone: "end",
  defaultVisible: true,
  pages: [
    "/cabinets/[id]"
  ],
  action: {
    type: "none"
  },
  visibleWhen: "can-write-shelf"
};

export default tool;
