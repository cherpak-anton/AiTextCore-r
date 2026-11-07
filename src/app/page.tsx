import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AppLink from "@/components/AppLink";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { SiteFrame } from "@/components/site/SiteFrame";
import { FeaturesSection } from "@/features/landing/components/FeaturesSection";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { StepsSection } from "@/features/landing/components/StepsSection";
import { getUiLocale } from "@/lib/locale";
import { getPageTexts, getReadyLocales } from "@/lib/texts";

// Адрес этой страницы: по нему в базе лежат её тексты.
const PAGE_PATH = "/";

// Заголовок и описание для поисковиков и превью ссылок — из той же базы.
export async function generateMetadata(): Promise<Metadata> {
  const texts = await getPageTexts(PAGE_PATH, await getUiLocale());

  return {
    title: texts["hero.title"],
    description: texts["hero.description"],
  };
}

const NAVIGATION = [
  { href: "#features", textId: "nav.features" },
  { href: "#how-it-works", textId: "nav.howItWorks" },
];

// Страница собирает свою шапку из инструментов; тексты раскладывает TextBinder из базы.
export default async function Home() {
  const locale = await getUiLocale();
  const readyLocales = await getReadyLocales();

  return (
    <SiteFrame
      path={PAGE_PATH}
      locale={locale}
      headerStart={
        <>
          <Typography
            component={AppLink}
            href="/"
            sx={{ color: "accentText", fontWeight: 700, fontSize: "1.35rem", whiteSpace: "nowrap" }}
          >
            AiTextCore
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ display: { xs: "none", sm: "flex" } }}>
            {NAVIGATION.map((item) => (
              <Button
                key={item.href}
                component={AppLink}
                href={item.href}
                color="inherit"
                data-text={item.textId}
                sx={{ color: "text.secondary" }}
              />
            ))}
          </Stack>
        </>
      }
      headerEnd={
        <>
          <Button
            component={AppLink}
            href="/library"
            variant="outlined"
            color="inherit"
            data-text="site.library"
            sx={{ px: 1.5, borderColor: "divider", color: "text.primary" }}
          />
          <LanguageSwitcher current={locale} ready={readyLocales} />
        </>
      }
    >
      <HeroSection />
      <FeaturesSection />
      <StepsSection />

      <Box component="footer" sx={{ borderTop: 1, borderColor: "divider", pt: 2, pb: 1 }}>
        <Typography variant="body2" color="text.secondary" data-text="footer" />
      </Box>
    </SiteFrame>
  );
}
