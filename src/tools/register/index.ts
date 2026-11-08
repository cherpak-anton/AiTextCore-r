import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "register",
  textId: "site.register",
  icon: "Регистрация",
  kind: "behavioral",
  zone: "end",
  defaultVisible: true,
  pages: "all",
  action: {
    type: "link",
    href: "/register"
  },
  visibleWhen: "guest-not-landing"
};

export default tool;
