import { getAltKategoriLabel, tumDavalar } from "@/data";
import { KATEGORILER } from "@/data/kategoriler";
import type { DavaTuru } from "@/lib/types";

export interface DavaAramaSonucu {
  dava: DavaTuru;
  kategoriAdi: string;
  altKategoriAdi: string;
  score: number;
}

function normalizeText(value: string): string {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/[\u00e7]/g, "c")
    .replace(/[\u011f]/g, "g")
    .replace(/[\u0131i]/g, "i")
    .replace(/[\u00f6]/g, "o")
    .replace(/[\u015f]/g, "s")
    .replace(/[\u00fc]/g, "u")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string): string[] {
  return normalizeText(value)
    .split(" ")
    .filter((token) => token.length > 1);
}

function scoreMatch(haystack: string, query: string, tokens: string[]): number {
  if (!haystack) return 0;

  let score = 0;

  if (haystack === query) score += 140;
  if (haystack.startsWith(query)) score += 90;
  if (haystack.includes(query)) score += 60;

  for (const token of tokens) {
    if (haystack === token) score += 35;
    else if (haystack.startsWith(token)) score += 18;
    else if (haystack.includes(token)) score += 10;
  }

  return score;
}

export function searchDavalar(query: string, limit = 12): DavaAramaSonucu[] {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return [];

  const tokens = tokenize(query);

  return tumDavalar
    .map((dava) => {
      const kategori = KATEGORILER.find((item) => item.id === dava.kategori);
      const kategoriAdi = kategori?.ad ?? dava.kategori;
      const altKategoriAdi = getAltKategoriLabel(dava.kategori, dava.altKategori);

      const alanlar = [
        { value: normalizeText(dava.ad), weight: 1 },
        { value: normalizeText(kategoriAdi), weight: 0.45 },
        { value: normalizeText(altKategoriAdi), weight: 0.45 },
        { value: normalizeText(`${dava.maddeNo}`), weight: 0.35 },
        { value: normalizeText(dava.id), weight: 0.25 },
      ];

      const score = alanlar.reduce((toplam, alan) => {
        return toplam + scoreMatch(alan.value, normalizedQuery, tokens) * alan.weight;
      }, 0);

      return {
        dava,
        kategoriAdi,
        altKategoriAdi,
        score,
      };
    })
    .filter((sonuc) => sonuc.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.dava.maddeNo - b.dava.maddeNo;
    })
    .slice(0, limit);
}

export function searchKategoriIds(query: string): string[] {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return [];

  const tokens = tokenize(query);

  return KATEGORILER
    .map((kategori) => ({
      id: kategori.id,
      score:
        scoreMatch(normalizeText(kategori.ad), normalizedQuery, tokens) +
        scoreMatch(normalizeText(kategori.aciklama), normalizedQuery, tokens) * 0.5,
    }))
    .filter((kategori) => kategori.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((kategori) => kategori.id);
}
