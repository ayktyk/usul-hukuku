import type { DavaTuru } from "@/lib/types";
import type { DavaKategorisi } from "@/lib/types";
import { bolum01AsliyeHukuk } from "./bolum01-asliye-hukuk";
import { bolum02SulhHukuk } from "./bolum02-sulh-hukuk";
import { bolum03IsMahkemesi } from "./bolum03-is-mahkemesi";
import { bolum04AileMahkemesi } from "./bolum04-aile-mahkemesi";

export const tumDavalar: DavaTuru[] = [
  ...bolum01AsliyeHukuk,
  ...bolum02SulhHukuk,
  ...bolum03IsMahkemesi,
  ...bolum04AileMahkemesi,
];

const ALT_KATEGORI_ADLARI: Partial<Record<DavaKategorisi, Record<string, string>>> = {
  "asliye-hukuk": {
    tasinmaz: "Tasinmaz Davalari",
    tazminat: "Tazminat Davalari",
    "borclar-hukuku": "Borclar Hukuku / Sozlesme Davalari",
    "kisilik-haklari": "Kisilik Haklari ve Nufus Davalari",
    "miras-hukuku": "Miras Hukuku",
    soybagi: "Soybagi Davalari",
  },
  "sulh-hukuk": {
    "kira-hukuku": "Kira Hukukundan Dogan Davalar",
    "ortakligin-giderilmesi": "Ortakligin Giderilmesi",
    zilyetlik: "Zilyetlik Davalari",
    "vesayet-kayyim": "Vesayet ve Kayyim Isleri",
    "miras-isleri": "Miras Isleri",
    "cekismesiz-yargi": "Cekismesiz Yargi Isleri",
    "kat-mulkiyeti": "Kat Mulkiyeti Davalari",
  },
  "is-mahkemesi": {
    "iscilik-alacaklari": "Iscilik Alacagi Davalari",
    "is-guvencesi": "Is Guvencesi Davalari",
    "is-kazasi": "Is Kazasi ve Meslek Hastaligi Davalari",
    "sosyal-guvenlik": "Sosyal Guvenlik Davalari",
    "diger-is-davalari": "Diger Is Davalari",
  },
  "aile-mahkemesi": {
    bosanma: "Bosanma Davalari",
    nafaka: "Nafaka Davalari",
    "velayet-cocuk": "Velayet ve Cocukla Ilgili Davalar",
    "mal-rejimi": "Mal Rejimi Davalari",
    "soybagi-evlat-edinme": "Soybagi ve Evlat Edinme",
    "diger-aile": "Diger Aile Hukuku Davalari",
  },
};

export function getDavaById(id: string): DavaTuru | undefined {
  return tumDavalar.find((dava) => dava.id === id);
}

export function getDavalarByKategori(kategori: DavaKategorisi): DavaTuru[] {
  return tumDavalar
    .filter((dava) => dava.kategori === kategori)
    .sort((a, b) => a.maddeNo - b.maddeNo);
}

export function getAltKategoriLabel(
  kategori: DavaKategorisi,
  altKategori: string,
): string {
  return ALT_KATEGORI_ADLARI[kategori]?.[altKategori] ?? altKategori;
}

export function getAltKategorilerByKategori(kategori: DavaKategorisi): Array<{
  id: string;
  ad: string;
  davalar: DavaTuru[];
}> {
  const gruplar = new Map<string, DavaTuru[]>();

  for (const dava of getDavalarByKategori(kategori)) {
    const mevcut = gruplar.get(dava.altKategori) ?? [];
    mevcut.push(dava);
    gruplar.set(dava.altKategori, mevcut);
  }

  return Array.from(gruplar.entries())
    .map(([id, davalar]) => ({
      id,
      ad: getAltKategoriLabel(kategori, id),
      davalar,
    }))
    .sort((a, b) => a.davalar[0].maddeNo - b.davalar[0].maddeNo);
}
