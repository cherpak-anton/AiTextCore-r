import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { monoFont, serifFont, systemFont } from "@/lib/fonts";

// Структура героя фиксирована; все тексты приходят из базы по data-text.
// Две наложенные карточки: фраза о книге и диалог читателя с ней.
export function HeroSection() {
  return (
    <Box
      component="section"
      aria-labelledby="landing-title"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.15fr) minmax(0, 0.85fr)" },
        columnGap: { md: 6 },
        alignItems: "start",
        pt: { xs: 4, md: 7 },
        pb: { xs: 6, md: 6 },
      }}
    >
      <Box sx={{ gridColumn: 1 }}>
        <Typography
          data-text="hero.eyebrow"
          sx={{
            fontFamily: monoFont,
            fontSize: "0.72rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "accentText",
          }}
        />
        <Typography
          id="landing-title"
          component="h1"
          variant="h1"
          data-text="hero.title"
          sx={{ mt: 1.25, fontSize: { xs: "2.1rem", md: "3.4rem" }, lineHeight: 1.08, textWrap: "balance" }}
        />
        <Typography
          color="text.secondary"
          data-text="hero.description"
          sx={{ mt: 2.5, fontSize: "1.08rem", maxWidth: "48ch", lineHeight: 1.6 }}
        />
        <Box sx={{ mt: 3.5 }}>
          <Button
            variant="contained"
            size="large"
            href="#how-it-works"
            data-text="hero.primaryAction"
            sx={{ px: 3, py: 1.25, fontSize: "1.02rem" }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          gridColumn: { xs: 1, md: 2 },
          position: "relative",
          minHeight: { xs: "auto", md: 272 },
          mt: { xs: 2, md: 2 },
        }}
      >
        <Box
          aria-hidden="true"
          data-text="hero.leafBack"
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            top: 0,
            right: 0,
            width: "82%",
            p: "1.1rem 1.2rem",
            borderRadius: 1,
            border: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
            transform: "rotate(2.5deg)",
            color: "text.secondary",
            fontFamily: serifFont,
            lineHeight: 1.55,
          }}
        />
        <Box
          sx={{
            position: { xs: "relative", md: "absolute" },
            top: { md: "6.5rem" },
            left: 0,
            width: { xs: "100%", md: "88%" },
            p: "1.1rem 1.2rem",
            borderRadius: 1,
            border: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
            transform: { md: "rotate(-1.5deg)" },
            fontFamily: serifFont,
            lineHeight: 1.55,
          }}
        >
          <Typography component="span" data-text="hero.leafFront" sx={{ display: "block", whiteSpace: "pre-line" }} />
          <Typography
            component="span"
            data-text="hero.leafCaption"
            sx={{ display: "block", mt: 0.75, fontFamily: systemFont, fontSize: "0.75rem", color: "accentText" }}
          />
        </Box>
      </Box>
    </Box>
  );
}
