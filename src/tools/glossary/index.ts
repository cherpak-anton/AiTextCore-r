import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "glossary",
  textId: "book.glossary",
  icon: "📖",
  kind: "menu",
  zone: "menu",
  defaultVisible: true,
  pages: [
    "/books/[id]"
  ],
  action: {
    type: "window",
    page: "/books/[id]/glossary"
  }
};

export default tool;
