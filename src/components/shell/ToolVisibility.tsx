"use client";

import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useVar } from "@/components/shell/WindowStore";

// Видимость инструментов. У каждой страницы (scope) есть дефолтный набор: что видно и где.
// Пользователь может убрать или вернуть любой инструмент — его выбор хранится в состоянии окна
// по адресу страницы и не мешает другим страницам.

// Элемент каталога инструментов страницы: что это и видно ли по умолчанию.
export type CatalogItem = {
  id: string;
  textId: string;
  defaultVisible?: boolean;
};

// Выбор пользователя по страницам: { [id инструмента]: true | false }.
function useOverrides(scope: string) {
  return useVar<Record<string, boolean>>(`tools.${scope}`, {});
}

// Показывает инструмент, если он видим: по выбору пользователя или по умолчанию.
export function ToolVisible({
  scope,
  id,
  defaultVisible = true,
  children,
}: {
  scope: string;
  id: string;
  defaultVisible?: boolean;
  children: ReactNode;
}) {
  const [overrides] = useOverrides(scope);
  const visible = overrides[id] ?? defaultVisible;
  return visible ? <>{children}</> : null;
}

// Список инструментов страницы с галочками: открыт как вид правой панели (настройки инструментов).
export function ToolSettingsList({ scope, catalog }: { scope: string; catalog: CatalogItem[] }) {
  const [overrides, setOverrides] = useOverrides(scope);

  return (
    <Stack spacing={1}>
      {catalog.map((item) => {
        const checked = overrides[item.id] ?? item.defaultVisible ?? true;
        return (
          <Box key={item.id} component="label" sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setOverrides({ ...overrides, [item.id]: !checked })}
            />
            <Typography data-text={item.textId} sx={{ fontSize: "0.9rem" }} />
          </Box>
        );
      })}
    </Stack>
  );
}
