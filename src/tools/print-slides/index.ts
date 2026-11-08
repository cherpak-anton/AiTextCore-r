import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "print-slides",
  textId: "window.printSlides",
  icon: "🖨",
  kind: "window",
  zone: "none",
  defaultVisible: false,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/slides/print"
  }
};

export default tool;
