"use client";

import { createTheme } from "@mui/material/styles";
import { systemFont } from "@/lib/fonts";

// Цвета перенесены из старого проекта (AiTextCore-legacy/src/app/globals.css):
// светло-серый фон, белые панели, синий акцент, системный шрифт.
// Тёмная тема включается по системной настройке, как в старом проекте.

declare module "@mui/material/styles" {
  interface Palette {
    // Синий текст-акцент: в тёмной теме светлее заливки, иначе не проходит контраст.
    accentText: string;
  }
  interface PaletteOptions {
    accentText?: string;
  }
}

const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#1263cf", contrastText: "#ffffff" },
        background: { default: "#f0f2f5", paper: "#ffffff" },
        text: { primary: "#050505", secondary: "#65676b" },
        divider: "#dadde1",
        accentText: "#1263cf",
      },
    },
    dark: {
      palette: {
        primary: { main: "#1f6fd8", contrastText: "#ffffff" },
        background: { default: "#18191a", paper: "#242526" },
        text: { primary: "#e4e6eb", secondary: "#b0b3b8" },
        divider: "#3e4042",
        accentText: "#6aacff",
      },
    },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: systemFont,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    button: { fontWeight: 600, textTransform: "none" },
  },
});

export default theme;
