"use client";

import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { useVar } from "@/components/shell/WindowStore";

// Поисковая строка как инструмент: её запрос — переменная окна «search.query».
// Подпись-подсказку заполняет TextBinder по data-text-placeholder.
export function SearchField() {
  const [query, setQuery] = useVar<string>("search.query", "");

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        flexShrink: 0,
        width: 240,
        height: "1.9rem",
        px: 1.25,
        border: 1,
        borderColor: "divider",
        borderRadius: 999,
      }}
    >
      <InputBase
        type="search"
        fullWidth
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        inputProps={{ "data-text-placeholder": "site.search", "data-text-aria": "site.search" }}
        sx={{ fontSize: "0.9rem" }}
      />
    </Box>
  );
}
