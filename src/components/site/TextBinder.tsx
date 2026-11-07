"use client";

import { useEffect } from "react";

type TextBinderProps = {
  path: string;
  locale: string;
};

type TextMap = Record<string, string>;

// Запрос текстов один на пару «адрес + язык». Повторные монтирования (React Strict Mode в dev)
// получают тот же промис, а не новый запрос. Ошибка сбрасывает запись, чтобы можно было повторить.
const requests = new Map<string, Promise<TextMap>>();

function loadTexts(path: string, locale: string): Promise<TextMap> {
  const key = `${locale}|${path}`;
  const cached = requests.get(key);
  if (cached) {
    return cached;
  }

  const params = new URLSearchParams({ path, locale });
  const request = fetch(`/api/texts?${params.toString()}`, { cache: "no-store" }).then((response) => {
    if (!response.ok) {
      throw new Error(`Texts request failed: ${response.status}`);
    }
    return response.json() as Promise<TextMap>;
  });

  request.catch(() => requests.delete(key));
  requests.set(key, request);
  return request;
}

// Раскладывает тексты страницы по элементам:
// data-text="id" — текст, data-text-aria="id" — aria-label, data-text-placeholder="id" — placeholder.
// Сами элементы в HTML пустые: текст приходит из базы через /api/texts.
export function TextBinder({ path, locale }: TextBinderProps) {
  useEffect(() => {
    let cancelled = false;

    document.documentElement.lang = locale;

    loadTexts(path, locale)
      .then((texts) => {
        if (cancelled) {
          return;
        }
        document.querySelectorAll<HTMLElement>("[data-text]").forEach((element) => {
          const value = texts[element.dataset.text ?? ""];
          if (value !== undefined) {
            element.textContent = value;
          }
        });
        document.querySelectorAll<HTMLElement>("[data-text-aria]").forEach((element) => {
          const value = texts[element.dataset.textAria ?? ""];
          if (value !== undefined) {
            element.setAttribute("aria-label", value);
          }
        });
        document.querySelectorAll<HTMLInputElement>("[data-text-placeholder]").forEach((element) => {
          const value = texts[element.dataset.textPlaceholder ?? ""];
          if (value !== undefined) {
            element.placeholder = value;
          }
        });
      })
      .catch((error: unknown) => {
        console.error(error);
      });

    return () => {
      cancelled = true;
    };
  }, [path, locale]);

  return null;
}
