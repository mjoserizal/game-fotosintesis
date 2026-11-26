"use client";

import { useCallback, useEffect, useState } from "react";

type StorageSetter<T> = (value: T | ((previous: T) => T)) => void;

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  revive?: (value: unknown) => T | null,
): [T, StorageSetter<T>, boolean] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        const parsed: unknown = JSON.parse(raw);
        const revived = revive ? revive(parsed) : (parsed as T);
        if (revived !== null) setStoredValue(revived);
      }
    } catch {
      void 0;
    }
    setHydrated(true);
  }, [key, revive]);

  const setValue = useCallback<StorageSetter<T>>(
    (value) => {
      setStoredValue((previous) => {
        const next =
          typeof value === "function"
            ? (value as (current: T) => T)(previous)
            : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          void 0;
        }
        return next;
      });
    },
    [key],
  );

  return [storedValue, setValue, hydrated];
}
