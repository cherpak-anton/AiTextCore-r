import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { ThemeProvider } from "@mui/material/styles";
import { getUiLocale } from "@/lib/locale";
import theme from "@/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "AiTextCore",
  description: "Книги, с которыми можно разговаривать, учиться и исследовать.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getUiLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
