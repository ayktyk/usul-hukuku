"use client";

import { useDeferredValue, useEffect, useState } from "react";
import type { DavaKategorisi } from "@/lib/types";

interface DavaAramaSonucu {
  id: string;
  ad: string;
  maddeNo: number;
  kategoriAdi: string;
  altKategoriAdi: string;
  gorevliMahkeme: string;
}

interface SearchResponse {
  davaSonuclari: DavaAramaSonucu[];
  kategoriIds: string[];
}

export type SearchMode = "all" | "title" | "article";

interface UseSearchOptions {
  mode: SearchMode;
  kategori: DavaKategorisi | null;
}

const EMPTY_RESPONSE: SearchResponse = {
  davaSonuclari: [],
  kategoriIds: [],
};

/**
 * Server-side arama API'sine istekte bulunan hook.
 * Debounce icin useDeferredValue kullanir, AbortController ile iptal yapar.
 */
export function useSearch(query: string, options: UseSearchOptions) {
  const [sonuclar, setSonuclar] = useState<SearchResponse>(EMPTY_RESPONSE);
  const [yukleniyor, setYukleniyor] = useState(false);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const trimmed = deferredQuery.trim();

    if (!trimmed) {
      setSonuclar(EMPTY_RESPONSE);
      setYukleniyor(false);
      return;
    }

    const controller = new AbortController();
    setYukleniyor(true);

    const params = new URLSearchParams({
      q: trimmed,
      mode: options.mode,
    });

    if (options.kategori) {
      params.set("kategori", options.kategori);
    }

    void fetch(`/api/search?${params.toString()}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Arama istegi basarisiz oldu.");
        }
        return (await response.json()) as SearchResponse;
      })
      .then((data) => {
        setSonuclar(data);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setSonuclar(EMPTY_RESPONSE);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setYukleniyor(false);
        }
      });

    return () => controller.abort();
  }, [deferredQuery, options.mode, options.kategori]);

  const aramaAktif = deferredQuery.trim().length > 0;

  return { sonuclar, yukleniyor, aramaAktif, deferredQuery };
}
