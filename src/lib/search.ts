import { getAltKategoriLabel, tumDavalar } from "@/data";
import { KATEGORILER } from "@/data/kategoriler";
import type { DavaTuru } from "@/lib/types";

export interface DavaAramaSonucu {
  dava: DavaTuru;
  kategoriAdi: string;
  altKategoriAdi: string;
  score: number;
}

const TOKEN_EXPANSIONS: Record<string, string[]> = {
  aym: ["anayasa", "anayasa mahkemesi", "bireysel basvuru"],
  aihm: ["avrupa insan haklari", "strasbourg"],
  sgk: ["sosyal guvenlik", "sigortalilik"],
  zmss: ["trafik sigortasi", "zorunlu mali sorumluluk"],
  ubgt: ["ulusal bayram genel tatil"],
  agi: ["asgari gecim indirimi"],
  kdv: ["katma deger vergisi"],
  hagb: ["hukumun aciklanmasinin geri birakilmasi"],
  iik: ["icra iflas"],
  hmk: ["hukuk muhakemeleri"],
  tmk: ["turk medeni kanunu"],
  tck: ["turk ceza kanunu"],
  yidk: ["yeniden inceleme ve degerlendirme kurulu", "turkpatent"],
  gasp: ["yagma"],
  deport: ["sinir disi"],
  tahliye: ["kiralanan tasinmaz tahliyesi"],
  mesai: ["fazla calisma"],
  kidem: ["kidem tazminati"],
  ihbar: ["ihbar tazminati"],
};

const QUERY_EXPANSIONS: Record<string, string[]> = {
  "ise iade": ["feshin gecersizligi", "ise baslatmama"],
  "is kazasi": ["meslek hastaligi", "is goremezlik"],
  "sosyal guvenlik": ["sgk", "sigortalilik"],
  "tuketici hakem heyeti": ["hakem heyeti kararina itiraz"],
  "marka davasi": ["marka tecavuzu", "marka hukumsuzlugu"],
  "patent davasi": ["patent tecavuzu", "patent hukumsuzlugu"],
  "ceza davasi": ["uzlastirma", "seri muhakeme", "hagb"],
  "tanima tenfiz": ["yabanci mahkeme", "lahey"],
  "deger kaybi": ["trafik kazasi deger kaybi"],
};

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

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

function buildPhraseVariants(query: string): string[] {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return [];

  return unique([
    normalizedQuery,
    ...(QUERY_EXPANSIONS[normalizedQuery] ?? []).map(normalizeText),
    ...tokenize(query)
      .flatMap((token) => TOKEN_EXPANSIONS[token] ?? [])
      .map(normalizeText),
  ]).filter(Boolean);
}

function buildTokenVariants(query: string): string[] {
  const baseTokens = tokenize(query);

  return unique([
    ...baseTokens,
    ...baseTokens.flatMap((token) =>
      (TOKEN_EXPANSIONS[token] ?? []).flatMap((expansion) => tokenize(expansion)),
    ),
    ...(QUERY_EXPANSIONS[normalizeText(query)] ?? []).flatMap((expansion) =>
      tokenize(expansion),
    ),
  ]);
}

function maxDistanceForToken(token: string): number {
  if (token.length >= 8) return 2;
  if (token.length >= 4) return 1;
  return 0;
}

function boundedEditDistance(a: string, b: string, maxDistance: number): number | null {
  if (Math.abs(a.length - b.length) > maxDistance) return null;
  if (a === b) return 0;

  const prev = new Array(b.length + 1).fill(0).map((_, index) => index);

  for (let i = 1; i <= a.length; i += 1) {
    let bestInRow = i;
    let diagonal = i - 1;
    prev[0] = i;

    for (let j = 1; j <= b.length; j += 1) {
      const temp = prev[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;

      prev[j] = Math.min(
        prev[j] + 1,
        prev[j - 1] + 1,
        diagonal + cost,
      );

      diagonal = temp;
      bestInRow = Math.min(bestInRow, prev[j]);
    }

    if (bestInRow > maxDistance) return null;
  }

  return prev[b.length] <= maxDistance ? prev[b.length] : null;
}

function scorePhraseMatch(haystack: string, queryPhrases: string[]): number {
  if (!haystack) return 0;

  let score = 0;

  for (const phrase of queryPhrases) {
    if (!phrase) continue;
    if (haystack === phrase) score += 140;
    else if (haystack.startsWith(phrase)) score += 90;
    else if (haystack.includes(phrase)) score += 60;
  }

  return score;
}

function scoreTokenMatch(haystack: string, tokens: string[]): number {
  if (!haystack) return 0;

  const haystackTokens = haystack.split(" ");
  let score = 0;

  for (const token of tokens) {
    if (!token) continue;

    if (haystack === token) {
      score += 35;
      continue;
    }

    if (haystack.startsWith(token)) {
      score += 18;
      continue;
    }

    if (haystack.includes(token)) {
      score += 10;
      continue;
    }

    const maxDistance = maxDistanceForToken(token);
    if (!maxDistance) continue;

    for (const haystackToken of haystackTokens) {
      const distance = boundedEditDistance(haystackToken, token, maxDistance);
      if (distance === null) continue;

      score += distance === 1 ? 8 : 5;
      break;
    }
  }

  return score;
}

export function searchDavalar(query: string, limit = 12): DavaAramaSonucu[] {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return [];

  const queryPhrases = buildPhraseVariants(query);
  const tokenVariants = buildTokenVariants(query);

  return tumDavalar
    .map((dava) => {
      const kategori = KATEGORILER.find((item) => item.id === dava.kategori);
      const kategoriAdi = kategori?.ad ?? dava.kategori;
      const altKategoriAdi = getAltKategoriLabel(dava.kategori, dava.altKategori);

      const alanlar = [
        { value: normalizeText(dava.ad), weight: 1 },
        { value: normalizeText(kategoriAdi), weight: 0.45 },
        { value: normalizeText(altKategoriAdi), weight: 0.45 },
        { value: normalizeText(dava.gorevliMahkeme.mahkeme), weight: 0.35 },
        { value: normalizeText(dava.ozelKanunlar?.join(" ") ?? ""), weight: 0.2 },
        { value: normalizeText(`${dava.maddeNo}`), weight: 0.35 },
        { value: normalizeText(dava.id), weight: 0.25 },
      ];

      const score = alanlar.reduce((toplam, alan) => {
        const phraseScore = scorePhraseMatch(alan.value, queryPhrases);
        const tokenScore = scoreTokenMatch(alan.value, tokenVariants);
        return toplam + (phraseScore + tokenScore) * alan.weight;
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

  const queryPhrases = buildPhraseVariants(query);
  const tokenVariants = buildTokenVariants(query);

  return KATEGORILER
    .map((kategori) => ({
      id: kategori.id,
      score:
        scorePhraseMatch(normalizeText(kategori.ad), queryPhrases) +
        scoreTokenMatch(normalizeText(kategori.ad), tokenVariants) +
        (scorePhraseMatch(normalizeText(kategori.aciklama), queryPhrases) +
          scoreTokenMatch(normalizeText(kategori.aciklama), tokenVariants)) *
          0.5,
    }))
    .filter((kategori) => kategori.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((kategori) => kategori.id);
}
