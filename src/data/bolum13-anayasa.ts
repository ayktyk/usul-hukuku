// Bolum 13: Anayasa Mahkemesi Bireysel Basvuru — Madde 430

import type { DavaTuru } from "@/lib/types";

const bireyselBasvuru: DavaTuru = {
  id: "anayasa-bireysel-basvuru",
  maddeNo: 430,
  ad: "Anayasa Mahkemesi Bireysel Basvuru (Adil Yargilanma, Ifade/Mulkiyet/Kisi Ozgurlugu Ihlalleri, Uzun Yargilama)",
  kategori: "anayasa-mahkemesi",
  altKategori: "bireysel-basvuru",
  gorevliMahkeme: {
    mahkeme: "Anayasa Mahkemesi",
    yasalDayanak: "Anayasa m.148/3, 6216 sy. K. m.45-51",
    aciklama:
      "Herkes, Anayasa ile guvenve altina alinmis temel hak ve ozgurluklerinden, Avrupa Insan Haklari Sozlesmesi kapsamindaki herhangi birinin kamu gucu tarafindan ihlal edildigini iddia ederek bireysel basvuruda bulunabilir.",
    ozelDurum:
      "Yasama islemleri ile duzenlcyici idari islemler aleyhine dogrudan bireysel basvuru yapilamaz. Olagan kanun yollarinin tukenmis olmasi gerekir.",
  },
  yetkiliMahkeme: {
    genelYetki: "Anayasa Mahkemesi (Ankara)",
    kesinYetki: "Anayasa Mahkemesi — KESIN YETKI",
    kesinYetkiMi: true,
    yasalDayanak: "6216 sy. K. m.45",
    aciklama:
      "Bireysel basvurular yalnizca Anayasa Mahkemesi'ne yapilir. Basvuru formu mahkeme veya cezaevi araciligiyla da gonderilebilir.",
  },
  harclar: {
    basvuruHarci: 2000,
    kararIlamHarci: "maktu",
    aciklama:
      "Bireysel basvuru harci her yil guncellenir. 2025 yili icin yaklasik 2.000 TL'dir. Adli yardim talep edilebilir.",
  },
  masraflar: {
    tebligatMasrafi: 0,
    toplamTahmini: 2500,
    aciklama:
      "Basvuru harci disinda ozel masraf yoktur. Avukat ucreti ve harc toplamini kapsar.",
  },
  ozelVekaletname: {
    gerekliMi: true,
    neden:
      "Bireysel basvuru sahsa siki sikiya bagli haklardan olup, ozel vekaletname gerektirir.",
    yasalDayanak: "6216 sy. K. m.47",
    icerik: [
      "Anayasa Mahkemesi'ne bireysel basvuruda bulunma",
      "Basvuruyu takip etme",
    ],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Yerlesim yeri adresi", zorunlu: true },
    {
      bilgi: "Ihlal edildigi iddia edilen temel hak veya ozgurluk",
      zorunlu: true,
    },
    {
      bilgi: "Olagan kanun yollarinin tuketildigini gosteren bilgi (kesinlesme tarihi)",
      zorunlu: true,
    },
    {
      bilgi: "Ihlale neden olan kamu gucu islemi (mahkeme karari, idari islem vb.)",
      zorunlu: true,
    },
  ],
  gerekliBelgeler: [
    {
      belge: "Bireysel basvuru formu",
      zorunlu: true,
      nereden: "Anayasa Mahkemesi web sitesi",
    },
    {
      belge: "Kesinlesmis mahkeme karari",
      zorunlu: true,
      aciklama: "Olagan kanun yollarinin tuketildigini gosteren karar",
    },
    { belge: "Kimlik fotokopisi", zorunlu: true },
    {
      belge: "Ozel vekaletname (vekil ile basvuruluyorsa)",
      zorunlu: true,
    },
    {
      belge: "Ihlale iliskin diger belgeler (dilekce, bildirim, tutanak vb.)",
      zorunlu: false,
    },
    {
      belge: "Basvuru harci dekont",
      zorunlu: true,
    },
  ],
  yargilamaUsulu: "ozel",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Bireysel basvurularda arabuluculuk uygulanmaz.",
  },
  zamanasimi: {
    sure: "30 gun",
    yasalDayanak: "6216 sy. K. m.47/5",
    aciklama:
      "Bireysel basvuru, olagan kanun yollarinin tuketildigi tarihten, kanun yolu ongorulmemisse ihlalin ogrenildigi tarihten itibaren 30 gun icinde yapilmalidir.",
    baslangic: "Olagan kanun yolu kararinin kesinlesme/teblig tarihi",
  },
  pratikNot:
    "Basvuru formunda ihlal iddialari acik ve somut sekilde yazilmali, anayasal haklarla iliskilendirilmelidir. Basvuru incelemesi dosya uzerinden yapilir. Mahkeme ihlal tespit ederse yeniden yargilama veya tazminata hukmedebilir. Pilot karar usulune dikkat edilmelidir.",
  hmkMaddeleri: [],
  ozelKanunlar: [
    "Anayasa m.148/3",
    "6216 sy. AYM Kurulusu ve Yargilama Usulleri K. m.45-51",
    "AYM Ic Tuzuk m.59-84",
  ],
};

export const bolum13Anayasa: DavaTuru[] = [bireyselBasvuru];
