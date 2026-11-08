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

// Раскладывает тексты по элементам: data-text — текст, data-text-aria — aria-label,
// data-text-placeholder — placeholder. Меняет только то, что отличается, — иначе зациклится на собственных правках.
function applyTexts(texts: TextMap) {
  document.querySelectorAll<HTMLElement>("[data-text]").forEach((element) => {
    const value = texts[element.dataset.text ?? ""];
    if (value !== undefined && element.textContent !== value) {
      element.textContent = value;
    }
  });
  document.querySelectorAll<HTMLElement>("[data-text-aria]").forEach((element) => {
    const value = texts[element.dataset.textAria ?? ""];
    if (value !== undefined && element.getAttribute("aria-label") !== value) {
      element.setAttribute("aria-label", value);
    }
  });
  document.querySelectorAll<HTMLInputElement>("[data-text-placeholder]").forEach((element) => {
    const value = texts[element.dataset.textPlaceholder ?? ""];
    if (value !== undefined && element.placeholder !== value) {
      element.placeholder = value;
    }
  });
}

// Раскладывает тексты страницы по элементам. Сами элементы в HTML пустые: текст приходит из базы через /api/texts.
// Виды панелей появляются по действиям пользователя, поэтому скрипт следит за новыми элементами и заполняет их.
export function TextBinder({ path, locale }: TextBinderProps) {
  useEffect(() => {
    let cancelled = false;
    let observer: MutationObserver | null = null;

    document.documentElement.lang = locale;

    loadTexts(path, locale)
      .then((texts) => {
        if (cancelled) {
          return;
        }
        applyTexts(texts);
        observer = new MutationObserver(() => applyTexts(texts));
        observer.observe(document.body, { childList: true, subtree: true });
      })
      .catch((error: unknown) => {
        console.error(error);
      });

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [path, locale]);

  return null;
}
