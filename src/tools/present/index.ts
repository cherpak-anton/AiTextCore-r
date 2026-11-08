import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "present",
  textId: "window.present",
  icon: "🖥",
  kind: "window",
  zone: "none",
  defaultVisible: false,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/present"
  }
};

export default tool;
