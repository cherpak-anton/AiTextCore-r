import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Четыре карточки возможностей: структура фиксирована, тексты приходят по id features.N.*
const FEATURE_INDEXES = [0, 1, 2, 3];

export function FeaturesSection() {
  return (
    <Box component="section" id="features" aria-labelledby="features-title" sx={{ py: 4, borderTop: 1, borderColor: "divider" }}>
      <Typography
        id="features-title"
        component="h2"
        variant="h2"
        data-text="features.title"
        sx={{ fontSize: "1.4rem", mb: 2 }}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
          gap: 2,
        }}
      >
        {FEATURE_INDEXES.map((index) => (
          <Box
            key={index}
            sx={{ p: "1.1rem", borderRadius: 1, border: 1, borderColor: "divider", bgcolor: "background.paper" }}
          >
            <Typography
              component="span"
              aria-hidden="true"
              data-text={`features.${index}.icon`}
              sx={{ display: "block", fontSize: "1.6rem", lineHeight: 1.2 }}
            />
            <Typography component="h3" data-text={`features.${index}.title`} sx={{ fontSize: "1.05rem", mt: 1, mb: 0.5 }} />
            <Typography
              color="text.secondary"
              data-text={`features.${index}.text`}
              sx={{ fontSize: "0.95rem", lineHeight: 1.55 }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
