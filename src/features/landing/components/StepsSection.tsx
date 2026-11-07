import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Три шага: структура фиксирована, тексты приходят по id steps.title и steps.N.
const STEP_INDEXES = [0, 1, 2];

export function StepsSection() {
  return (
    <Box component="section" id="how-it-works" aria-labelledby="steps-title" sx={{ py: 4, borderTop: 1, borderColor: "divider" }}>
      <Typography id="steps-title" component="h2" variant="h2" data-text="steps.title" sx={{ fontSize: "1.4rem", mb: 2 }} />
      <Box component="ol" sx={{ m: 0, pl: 2.6, display: "grid", gap: 1, fontSize: "1.05rem", lineHeight: 1.6 }}>
        {STEP_INDEXES.map((index) => (
          <Typography component="li" key={index} data-text={`steps.${index}`} sx={{ fontSize: "inherit" }} />
        ))}
      </Box>
    </Box>
  );
}
