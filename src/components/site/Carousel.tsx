"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Box from "@mui/material/Box";

// Карусель с прокруткой по горизонтали. Внизу посередине — точки: по одной на страницу прокрутки,
// текущая подсвечена. Нажатие на точку прокручивает к ней. Точек нет, если прокручивать нечего.
export function Carousel({ children, gap }: { children: ReactNode; gap: number }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const measure = () => {
      const page = el.clientWidth || 1;
      const count = el.scrollWidth > el.clientWidth ? Math.ceil(el.scrollWidth / page) : 0;
      setPages(count);
      setIndex(Math.min(Math.max(0, count - 1), Math.round(el.scrollLeft / page)));
    };

    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);

    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, []);

  const goTo = (page: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: page * el.clientWidth, behavior: "smooth" });
  };

  return (
    <Box sx={{ position: "relative", flex: 1, minWidth: 0, display: "flex" }}>
      <Box
        ref={scroller}
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          gap,
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          // Место под точки, чтобы они не закрывали инструменты.
          pb: pages > 1 ? "0.5rem" : 0,
        }}
      >
        {children}
      </Box>
      {pages > 1 && (
        <Box
          sx={{
            position: "absolute",
            bottom: "0.15rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "4px",
          }}
        >
          {Array.from({ length: pages }, (_, page) => (
            <Box
              key={page}
              component="button"
              type="button"
              onClick={() => goTo(page)}
              aria-current={page === index ? "true" : undefined}
              sx={{
                width: 5,
                height: 5,
                p: 0,
                border: 0,
                borderRadius: "50%",
                bgcolor: page === index ? "primary.main" : "divider",
                cursor: "pointer",
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
