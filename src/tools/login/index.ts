import type { ToolMeta } from "@/tools/types";

const tool: ToolMeta = {
  id: "login",
  textId: "site.login",
  icon: "Войти",
  kind: "behavioral",
  zone: "end",
  defaultVisible: true,
  pages: "all",
  action: {
    type: "link",
    href: "/login"
  },
  visibleWhen: "guest-not-landing"
};

export default tool;
