import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "print",
  textId: "book.print",
  icon: "🖨",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/print"
  }
};

export default tool;
