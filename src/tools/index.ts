import type { ToolMeta } from "@/tools/types";
import brand from "./brand";
import project from "./project";
import search from "./search";
import library from "./library";
import cabinet from "./cabinet";
import discussion from "./discussion";
import reader from "./reader";
import ai from "./ai";
import settings from "./settings";
import language from "./language";
import notifications from "./notifications";
import user from "./user";
import help from "./help";
import login from "./login";
import register from "./register";
import hide_left from "./hide-left";
import hide_right from "./hide-right";
import translate from "./translate";
import book_menu from "./book-menu";
import history from "./history";
import calendar_reminder from "./calendar-reminder";
import print from "./print";
import people from "./people";
import timeline from "./timeline";
import sources from "./sources";
import glossary from "./glossary";
import notes from "./notes";
import insights from "./insights";
import profile from "./profile";
import ai_items from "./ai-items";
import bookmark from "./bookmark";
import edit from "./edit";
import access from "./access";
import book_settings from "./book-settings";
import import_export from "./import-export";
import delete_book from "./delete-book";
import info from "./info";
import follow from "./follow";
import save_offline from "./save-offline";
import learn from "./learn";
import chat from "./chat";
import check_memory from "./check-memory";
import lesson from "./lesson";
import present from "./present";
import print_book from "./print-book";
import print_slides from "./print-slides";
import slides from "./slides";
import cards from "./cards";
import concepts from "./concepts";
import map from "./map";
import podcast from "./podcast";
import merge from "./merge";
import new_book from "./new-book";
import cabinet_menu from "./cabinet-menu";
import cabinet_usage from "./cabinet-usage";
import storage from "./storage";
import shelf_menu from "./shelf-menu";
import library_ask from "./library-ask";
import tell from "./tell";
import messages from "./messages";
import invitations from "./invitations";
import install_app from "./install-app";
import logout from "./logout";

// Реестр всех инструментов сайта (один объект на инструмент).
export const TOOLS: ToolMeta[] = [
  brand,
  project,
  search,
  library,
  cabinet,
  discussion,
  reader,
  ai,
  settings,
  language,
  notifications,
  user,
  help,
  login,
  register,
  hide_left,
  hide_right,
  translate,
  book_menu,
  history,
  calendar_reminder,
  print,
  people,
  timeline,
  sources,
  glossary,
  notes,
  insights,
  profile,
  ai_items,
  bookmark,
  edit,
  access,
  book_settings,
  import_export,
  delete_book,
  info,
  follow,
  save_offline,
  learn,
  chat,
  check_memory,
  lesson,
  present,
  print_book,
  print_slides,
  slides,
  cards,
  concepts,
  map,
  podcast,
  merge,
  new_book,
  cabinet_menu,
  cabinet_usage,
  storage,
  shelf_menu,
  library_ask,
  tell,
  messages,
  invitations,
  install_app,
  logout,
];

export const TOOLS_BY_ID: Record<string, ToolMeta> = Object.fromEntries(TOOLS.map((tool) => [tool.id, tool]));

export type { ToolMeta } from "@/tools/types";
