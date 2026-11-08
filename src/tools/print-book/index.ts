import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "print-book",
  textId: "window.printBook",
  icon: "🖨",
  kind: "window",
  zone: "none",
  defaultVisible: false,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/print"
  }
};

export default tool;
