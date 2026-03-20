import type { DavaTuru } from "@/lib/types";
import type { DavaKategorisi } from "@/lib/types";
import { bolum01AsliyeHukuk } from "./bolum01-asliye-hukuk";
import { bolum02SulhHukuk } from "./bolum02-sulh-hukuk";
import { bolum03IsMahkemesi } from "./bolum03-is-mahkemesi";
import { bolum04AileMahkemesi } from "./bolum04-aile-mahkemesi";
import { bolum05Tuketici } from "./bolum05-tuketici";
import { bolum06Ticaret } from "./bolum06-ticaret";
import { bolum07Icra } from "./bolum07-icra";
import { bolum08IdariYargi } from "./bolum08-idari-yargi";
import { bolum09FikriSinai } from "./bolum09-fikri-sinai";
import { bolum10Ceza } from "./bolum10-ceza";
import { bolum11ArabuluculukTahkim } from "./bolum11-arabuluculuk-tahkim";
import { bolum12Kadastro } from "./bolum12-kadastro";
import { bolum13Anayasa } from "./bolum13-anayasa";
import { bolum14Aihm } from "./bolum14-aihm";
import { bolum15Yabancilar } from "./bolum15-yabancilar";
import { bolum16NoterDiger } from "./bolum16-noter-diger";

export const tumDavalar: DavaTuru[] = [
  ...bolum01AsliyeHukuk,
  ...bolum02SulhHukuk,
  ...bolum03IsMahkemesi,
  ...bolum04AileMahkemesi,
  ...bolum05Tuketici,
  ...bolum06Ticaret,
  ...bolum07Icra,
  ...bolum08IdariYargi,
  ...bolum09FikriSinai,
  ...bolum10Ceza,
  ...bolum11ArabuluculukTahkim,
  ...bolum12Kadastro,
  ...bolum13Anayasa,
  ...bolum14Aihm,
  ...bolum15Yabancilar,
  ...bolum16NoterDiger,
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
  "tuketici-mahkemesi": {
    "ayipli-mal": "Ayipli Mal Davalari",
    "ayipli-hizmet": "Ayipli Hizmet Davalari",
    "bankacilik-finans": "Bankacilik ve Finans Uyusmazliklari",
    sigorta: "Sigorta Uyusmazliklari",
    "diger-tuketici": "Diger Tuketici Davalari",
  },
  "ticaret-mahkemesi": {
    "sirketler-hukuku": "Sirketler Hukuku Davalari",
    "ticari-alacak": "Ticari Alacak ve Sozlesme Davalari",
    "kiymetli-evrak": "Kiymetli Evrak Davalari",
    "sigorta-hukuku": "Sigorta Hukuku Davalari",
    "iflas-konkordato": "Iflas ve Konkordato",
    "deniz-ticareti": "Deniz Ticareti Davalari",
    "bankacilik-finans": "Bankacilik ve Finans Davalari",
  },
  "icra-mahkemesi": {
    "takip-turleri": "Icra Takip Turleri",
    "icra-davalari": "Icra Mahkemesi Davalari",
    "icra-ceza": "Icra Ceza Davalari",
  },
  "idari-yargi": {
    "idare-davalari": "Idare Mahkemesi Davalari",
    "vergi-davalari": "Vergi Mahkemesi Davalari",
  },
  "fikri-sinai": {
    "marka-hukuku": "Marka Hukuku",
    "patent-faydali-model": "Patent ve Faydali Model",
    "tasarim-telif": "Tasarim ve Telif Hukuku",
    "ticaret-unvani-haksiz-rekabet": "Ticaret Unvani ve Haksiz Rekabet",
  },
  "ceza-mahkemesi": {
    "kisilere-karsi-suclar": "Kisilere Karsi Suclar",
    "malvarligina-karsi-suclar": "Malvarligina Karsi Suclar",
    "topluma-karsi-suclar-ozel-usuller": "Topluma Karsi Suclar ve Ozel Usuller",
  },
  "arabuluculuk-tahkim": {
    arabuluculuk: "Arabuluculuk Surecleri",
    tahkim: "Tahkim Davalari",
  },
  kadastro: {
    kadastro: "Kadastro Davalari",
  },
  "anayasa-mahkemesi": {
    "bireysel-basvuru": "Bireysel Basvuru",
  },
  aihm: {
    "bireysel-basvuru": "AIHM Basvurulari",
  },
  "yabancilar-hukuku": {
    "yabancilar-idare": "Yabancilar Hukuku ve Idari Basvurular",
    "tanima-tenfiz-lahey": "Tanima, Tenfiz ve Lahey Davalari",
  },
  "noter-diger": {
    ihtarnameler: "Ihtarnameler",
    sozlesmeler: "Sozlesmeler",
    "diger-islemler": "Diger Hazirlik ve Koruma Islemleri",
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
