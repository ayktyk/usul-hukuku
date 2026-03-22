"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * localStorage'a otomatik persist eden state hook'u.
 * SSR'da defaultValue kullanilir, hydration sonrasi localStorage'dan okunur.
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);

  // Hydration sonrasi localStorage'dan oku
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored) as T);
      }
    } catch {
      // localStorage unavailable or invalid JSON
    }
  }, [key]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = next instanceof Function ? next(prev) : next;
        try {
          localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // localStorage unavailable
        }
        return resolved;
      });
    },
    [key],
  );

  const remove = useCallback(() => {
    setValue(defaultValue);
    try {
      localStorage.removeItem(key);
    } catch {
      // localStorage unavailable
    }
  }, [key, defaultValue]);

  return [value, set, remove] as const;
}
