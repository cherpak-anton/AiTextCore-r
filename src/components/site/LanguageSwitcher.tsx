"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { setUiLanguage } from "@/lib/locale-actions";
import { languageFlag, nativeLanguageName, UI_LANGUAGES } from "@/lib/ui-languages";

type LanguageSwitcherProps = {
  current: string;
  // Языки, для которых в базе уже есть тексты.
  ready: string[];
};

// 🌐 Выбор языка, как в старом проекте: кнопка с текущим языком открывает список с поиском.
// Готовые языки можно выбрать, остальные показаны, но недоступны.
// Подписи (заголовок, поиск, группы) заполняет TextBinder по data-text / data-text-aria / data-text-placeholder.
export function LanguageSwitcher({ current, ready }: LanguageSwitcherProps) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const readySet = new Set(ready);
  const query = filter.trim().toLowerCase();
  const matches = (code: string) => !query || `${code} ${nativeLanguageName(code)}`.toLowerCase().includes(query);
  const languages = [...new Set([current, ...ready, ...UI_LANGUAGES])].filter(matches);
  const readyLanguages = languages.filter((code) => readySet.has(code));
  const soonLanguages = languages.filter((code) => !readySet.has(code));

  function choose(code: string) {
    setOpen(false);
    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("locale", code);
      try {
        await setUiLanguage(formData);
        router.refresh();
      } catch {
        setError("Не удалось сменить язык.");
      }
    });
  }

  const optionSx = {
    display: "flex",
    alignItems: "center",
    gap: 1,
    width: "100%",
    px: 1.5,
    py: 1,
    border: 0,
    bgcolor: "transparent",
    color: "text.primary",
    textAlign: "left",
    font: "inherit",
    cursor: "pointer",
    "&:hover:not(:disabled)": { bgcolor: "action.hover" },
    "&:disabled": { color: "text.disabled", cursor: "default" },
  } as const;

  return (
    <Box ref={rootRef} sx={{ position: "relative" }}>
      <Button
        type="button"
        variant="outlined"
        color="inherit"
        aria-haspopup="listbox"
        aria-expanded={open}
        data-text-aria="lang.choose"
        onClick={() => setOpen((value) => !value)}
        disabled={pending}
        sx={{ minWidth: 0, px: 1.5, borderColor: "divider", color: "text.primary" }}
      >
        <span aria-hidden="true">{languageFlag(current)}&nbsp;</span>
        {current.toUpperCase()}
      </Button>

      <Paper
        elevation={4}
        hidden={!open}
        role="listbox"
        sx={{
          position: "absolute",
          top: "calc(100% + 8px)",
          right: 0,
          zIndex: 1200,
          width: 280,
          maxHeight: 420,
          overflowY: "auto",
          border: 1,
          borderColor: "divider",
          p: 1,
        }}
      >
        <InputBase
          fullWidth
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          inputProps={{ "data-text-placeholder": "lang.search", "data-text-aria": "lang.search" }}
          sx={{ px: 1.5, py: 0.75, mb: 1, border: 1, borderColor: "divider", borderRadius: 1, fontSize: "0.95rem" }}
        />

        <Box sx={{ mb: 1 }} hidden={readyLanguages.length === 0}>
          <Typography variant="caption" color="text.secondary" sx={{ px: 1.5, display: "block" }} data-text="lang.ready" />
          {readyLanguages.map((code) => (
            <Box
              key={code}
              component="button"
              type="button"
              role="option"
              aria-selected={code === current}
              lang={code}
              onClick={() => choose(code)}
              sx={{ ...optionSx, fontWeight: code === current ? 700 : 400 }}
            >
              <span aria-hidden="true">{languageFlag(code)}</span>
              {nativeLanguageName(code)}
              <Typography component="span" variant="caption" color="text.secondary">
                {code}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box hidden={soonLanguages.length === 0}>
          <Typography variant="caption" color="text.secondary" sx={{ px: 1.5, display: "block" }} data-text="lang.soon" />
          {soonLanguages.map((code) => (
            <Box
              key={code}
              component="button"
              type="button"
              role="option"
              aria-selected={false}
              aria-disabled="true"
              disabled
              lang={code}
              sx={optionSx}
            >
              <span aria-hidden="true">{languageFlag(code)}</span>
              {nativeLanguageName(code)}
              <Typography component="span" variant="caption" color="text.secondary">
                {code}
              </Typography>
            </Box>
          ))}
        </Box>

        {error && (
          <Typography role="alert" color="error" variant="caption" sx={{ display: "block", px: 1.5, pt: 1 }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
