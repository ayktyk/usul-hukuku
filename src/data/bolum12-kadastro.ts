// Bolum 12: Kadastro Mahkemesi — Madde 429

import type { DavaTuru } from "@/lib/types";
import { BASVURMA_HARCI, TEBLIGAT_MASRAFI, KESF_UCRETI, BILIRKISI_UCRETI } from "./harclar";

const kadastroTespitineItiraz: DavaTuru = {
  id: "kadastro-tespitine-itiraz",
  maddeNo: 429,
  ad: "Kadastro Tespitine Itiraz, Sinir, Olcu, Orman Kadastrosu ve Tescil Davalari",
  kategori: "kadastro",
  altKategori: "kadastro",
  gorevliMahkeme: {
    mahkeme: "Kadastro Mahkemesi",
    yasalDayanak: "3402 sy. Kadastro K. m.25",
    aciklama:
      "Kadastro mahkemesi, kadastro islemleri sirasinda veya sonrasinda ortaya cikan uyusmazliklari cozmekle gorevlidir. Kadastro mahkemesi bulunmayan yerlerde asliye hukuk mahkemesi kadastro mahkemesi sifatiyla bakar.",
    ozelDurum:
      "Orman kadastrosu uyusmazliklari icin de kadastro mahkemesi gorevlidir (6831 sy. Orman K.).",
  },
  yetkiliMahkeme: {
    genelYetki: "Tasinmazin bulundugu yer mahkemesi",
    kesinYetki: "Tasinmazin bulundugu yer — KESIN YETKI (3402 sy. K.)",
    kesinYetkiMi: true,
    yasalDayanak: "3402 sy. Kadastro K. m.25, HMK m.12",
    aciklama:
      "Kadastro davalarinda kesin yetkili mahkeme tasinmazin bulundugu yer kadastro mahkemesidir.",
  },
  harclar: {
    basvuruHarci: BASVURMA_HARCI,
    kararIlamHarci: "maktu",
    aciklama:
      "Kadastro davalari maktu harca tabidir. Kadastro tespitine itiraz harci maktu olarak alinir.",
  },
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
    bilirkisiUcreti: BILIRKISI_UCRETI,
    kesfUcreti: KESF_UCRETI,
    toplamTahmini: 10000,
    aciklama:
      "Kadastro davalarinda kesif, bilirkisi (harita muhendisi/ziraat muhendisi), fen bilirkisi ucretleri yuksek olabilir.",
  },
  ozelVekaletname: {
    gerekliMi: true,
    neden:
      "Tasinmaz ayni ile ilgili oldugundan ozel vekaletname gereklidir.",
    yasalDayanak: "HMK m.74",
    icerik: [
      "Kadastro tespitine itiraz davasi acma ve takip etme",
      "Tescil talep etme",
      "Sulh ve feragat",
    ],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Yerlesim yeri adresi", zorunlu: true },
    {
      bilgi: "Tasinmazin ada/parsel numarasi ve konumu",
      zorunlu: true,
    },
    {
      bilgi: "Kadastro tespitinin icerik ve tarihi",
      zorunlu: true,
      aciklama: "Aski ilan tarihi onemlidir",
    },
    {
      bilgi: "Itiraz gerekceleri (sinir, olcu, mulkiyet iddiasi)",
      zorunlu: true,
    },
  ],
  gerekliBelgeler: [
    {
      belge: "Kadastro tutanagi ve haritasi",
      zorunlu: true,
      nereden: "Kadastro Mudurlugu",
    },
    {
      belge: "Tapu kaydi veya vergi kaydı",
      zorunlu: true,
      nereden: "Tapu Mudurlugu / Belediye",
    },
    {
      belge: "Aski ilan tutanagi",
      zorunlu: true,
      nereden: "Kadastro Mudurlugu",
      aciklama: "Itiraz suresini belirler",
    },
    {
      belge: "Taniklar listesi",
      zorunlu: false,
      aciklama: "Zilyetlik ve kullanim durumunu gosteren taniklar",
    },
    {
      belge: "Hava fotograflari / uydu goruntuleri",
      zorunlu: false,
      aciklama: "Sinir ve olcu uyusmazliklarinda",
    },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Kadastro davalarinda arabuluculuk uygulanmaz.",
  },
  zamanasimi: {
    sure: "Aski ilan suresinde 30 gun",
    yasalDayanak: "3402 sy. Kadastro K. m.11",
    aciklama:
      "Kadastro tespitine itiraz, tutanaklarin aski ilaninin yapildigi tarihten itibaren 30 gun icinde yapilmalidir. Bu sure gectikten sonra kadastro tespiti kesinlesir.",
    baslangic: "Aski ilan tarihi",
  },
  pratikNot:
    "Kadastro tespiti kesinlestikten sonra genel mahkemelerde tapu iptali ve tescil davasi acilabilir. Orman vasfindaki tasinmazlarda hak dusurucusu sure islemez. Kadastro davalarinda yargilama suratli yapilir; durusma araliklarini kisa tutmak esastir.",
  hmkMaddeleri: ["HMK m.12"],
  ozelKanunlar: [
    "3402 sy. Kadastro K.",
    "6831 sy. Orman K.",
  ],
};

export const bolum12Kadastro: DavaTuru[] = [kadastroTespitineItiraz];
