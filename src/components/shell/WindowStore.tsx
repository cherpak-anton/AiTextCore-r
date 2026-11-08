"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

// Состояние окна: переменные, которыми обмениваются инструменты. Инструменты читают и меняют
// их по ключам вроде "right.view" или "search.query". Хранятся в памяти клиента и в браузере
// (localStorage), позже — в базе по пользователю.
export type WindowVars = Record<string, unknown>;

const STORAGE_KEY = "aitextcore.window.v1";

// Значения по умолчанию для всех окон.
export const DEFAULT_VARS: WindowVars = {
  "left.open": true,
  "left.width": 272,
  "right.open": true,
  "right.width": 320,
  "search.query": "",
  "project.current": "personal",
};

type Store = {
  vars: WindowVars;
  setVar: (key: string, value: unknown) => void;
};

const StoreContext = createContext<Store | null>(null);

// Одно состояние на окно. pageDefaults — значения, которые страница задаёт сама (например, вид панели);
// сохранённое в браузере их перекрывает.
export function WindowStoreProvider({ children, pageDefaults }: { children: ReactNode; pageDefaults?: WindowVars }) {
  const [vars, setVars] = useState<WindowVars>(() => ({ ...DEFAULT_VARS, ...pageDefaults }));
  const [loaded, setLoaded] = useState(false);

  // После загрузки страницы поднимаем сохранённое состояние из браузера.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setVars((current) => ({ ...current, ...(JSON.parse(raw) as WindowVars) }));
      }
    } catch {
      // Хранилище недоступно: работаем со значениями по умолчанию.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(vars));
    } catch {
      // Хранилище недоступно: состояние живёт только в памяти.
    }
  }, [vars, loaded]);

  const setVar = useCallback((key: string, value: unknown) => {
    setVars((current) => ({ ...current, [key]: value }));
  }, []);

  const store = useMemo(() => ({ vars, setVar }), [vars, setVar]);
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

// Переменная окна: значение и функция для его смены. fallback — если в окне значения ещё нет.
export function useVar<T>(key: string, fallback: T): [T, (value: T) => void] {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useVar must be used inside WindowStoreProvider.");
  }
  const value = (store.vars[key] ?? fallback) as T;
  return [value, (next: T) => store.setVar(key, next)];
}
