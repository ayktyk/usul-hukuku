// Bolum 1: Asliye Hukuk Mahkemesi — Madde 1-41
// Tasinmaz (Gayrimenkul) Davalari (1-23) + Tazminat Davalari (24-41)

import type {
  DavaTuru,
  GorevliMahkeme,
  YetkiliMahkeme,
  HarcBilgisi,
  MasrafBilgisi,
  ArabuluculukBilgisi,
  OzelVekaletnameBilgisi,
} from "@/lib/types";

import {
  BASVURMA_HARCI,
  NISPI_HARC_ORANI,
  TEBLIGAT_MASRAFI,
  BILIRKISI_UCRETI,
  KESF_UCRETI,
  TANIK_UCRETI,
} from "./harclar";

// ---------------------------------------------------------------------------
// Ortak alanlar — tekrar eden yapilari DRY tutmak icin
// ---------------------------------------------------------------------------

/** Asliye Hukuk Mahkemesi gorevli mahkeme bilgisi */
const ASLIYE_HUKUK_GOREV: GorevliMahkeme = {
  mahkeme: "Asliye Hukuk Mahkemesi",
  yasalDayanak: "HMK m.2",
  aciklama:
    "Malvarligi ve sahis varligina iliskin davalarda genel gorevli mahkeme Asliye Hukuk Mahkemesidir.",
};

/** Tasinmaz davalari icin kesin yetkili mahkeme (HMK m.12) */
const TASINMAZ_KESIN_YETKI: YetkiliMahkeme = {
  genelYetki: "Tasinmazin bulundugu yer mahkemesi",
  kesinYetki: "Tasinmazin bulundugu yer (HMK m.12)",
  kesinYetkiMi: true,
  yasalDayanak: "HMK m.12",
  aciklama:
    "Tasinmazin aynina iliskin davalarda tasinmazin bulundugu yer mahkemesi kesin yetkilidir. Yetki sozlesmesiyle degistirilemez.",
};

/** Tazminat davalari icin genel yetki + haksiz fiil ozel yetki */
const TAZMINAT_GENEL_YETKI: YetkiliMahkeme = {
  genelYetki: "Davalinin yerlesim yeri (HMK m.6)",
  ozelYetki: [
    "Haksiz fiilin islendigi yer (HMK m.16)",
    "Zararin meydana geldigi yer (HMK m.16)",
    "Zarar gorenin yerlesim yeri (HMK m.16)",
  ],
  kesinYetkiMi: false,
  yasalDayanak: "HMK m.6, m.16",
  aciklama:
    "Tazminat davalarinda davalinin yerlesim yeri genel yetkili, haksiz fiil halleri icin ozel yetki kurallari da uygulanir.",
};

/** Nispi harcli dava — tasinmaz ve tazminat davalari icin */
const NISPI_HARC_BILGISI: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "nispi",
  nispiOran: NISPI_HARC_ORANI * 1000, // Binde cinsinden
  pesinHarcOran: 0.25,
  aciklama:
    "Nispi harca tabi. Dava degerinin binde 68,31'i uzerinden nispi harc, bunun 1/4'u pesin harc olarak alinir.",
};

/** Maktu harcli dava — tespit davalari icin */
const MAKTU_HARC_BILGISI: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "maktu",
  aciklama:
    "Maktu harca tabi. Basvurma harci ve maktu karar-ilam harci alinir.",
};

/** Tasinmaz davalari icin tipik masraf yapisı */
const TASINMAZ_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  bilirkisiUcreti: BILIRKISI_UCRETI,
  kesfUcreti: KESF_UCRETI,
  tanikUcreti: TANIK_UCRETI * 3,
  toplamTahmini: 8500,
  aciklama:
    "Tasinmaz davalarinda kesif ve bilirkisi incelemesi genelde zorunludur. Tebligat sayisi davalilara gore degisir.",
};

/** Tazminat davalari icin tipik masraf yapisi */
const TAZMINAT_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 2,
  bilirkisiUcreti: BILIRKISI_UCRETI,
  tanikUcreti: TANIK_UCRETI * 3,
  toplamTahmini: 4500,
  aciklama:
    "Tazminat davalarinda bilirkisi incelemesi buyuk olasilikla gerekecektir. Kesif gerektirmeyebilir.",
};

/** Arabuluculuk — zorunlu degil, ihtiyari */
const ARABULUCULUK_YOK: ArabuluculukBilgisi = {
  davaSarti: false,
  ihtiyari: true,
  aciklama:
    "Arabuluculuk dava sarti degildir. Taraflar isterlerse ihtiyari arabuluculuga basvurabilir.",
};

/** Arabuluculuk — komsuluk davalari icin zorunlu (01.09.2023 itibariyla) */
const ARABULUCULUK_KOMSULUK: ArabuluculukBilgisi = {
  davaSarti: true,
  ihtiyari: false,
  yasalDayanak: "6325 sy. K. m.18/B",
  aciklama:
    "01.09.2023 tarihinden itibaren komsuluk hukukundan kaynaklanan uyusmazliklarda arabuluculuk dava sartidir.",
};

/** Standart ozel vekaletname — tasinmaz ve tazminat davalari icin */
const STANDART_VEKALETNAME: OzelVekaletnameBilgisi = {
  gerekliMi: false,
  neden:
    "Genel dava vekaletnamesi yeterlidir. Ancak sulh, feragat, kabul islemleri icin ozel yetki gerekir.",
  yasalDayanak: "HMK m.74",
};

/** Tapu islemleri icin ozel vekaletname gerekliligi */
const TAPU_VEKALETNAME: OzelVekaletnameBilgisi = {
  gerekliMi: true,
  neden:
    "Tapu iptali ve tescil davasinda, mahkeme karari dogrudan tapuya tescil imkani verdiginden ozel yetki onem tasir.",
  yasalDayanak: "HMK m.74, Tapu Kanunu m.26",
  icerik: [
    "Tapu iptali ve tescil davasi acma ve takip etme",
    "Sulh, feragat ve kabul",
    "Tapu tescil islemleri yaptirma",
  ],
};

// ---------------------------------------------------------------------------
// 1.1. TASINMAZ (GAYRIMENKUL) DAVALARI — Madde 1-23
// ---------------------------------------------------------------------------

/** Madde 1: Tapu iptali ve tescil davasi */
const tapuIptaliVeTescil: DavaTuru = {
  id: "tapu-iptali-tescil",
  maddeNo: 1,
  ad: "Tapu iptali ve tescil davasi (yolsuz tescil, hukuki sebep gecersizligi)",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TASINMAZ_KESIN_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: TASINMAZ_MASRAF,

  ozelVekaletname: TAPU_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin tapudaki bilgileri (ada, parsel, pafta)", zorunlu: true },
    { bilgi: "Tasinmazin adresi", zorunlu: true },
    {
      bilgi: "Yolsuz tescilin sebebi (sahte belge, hile, gabin vb.)",
      zorunlu: true,
      aciklama: "Tescil isleminin neden gecersiz oldugunu gosteren olgular",
    },
    { bilgi: "Tasinmazin tahmini degeri", zorunlu: true, aciklama: "Harc hesabi icin" },
    {
      bilgi: "Tapu kayit gecmisi ve devir tarihi",
      zorunlu: false,
      aciklama: "Tapu sicil mudurlugunden alinabilir",
    },
  ],

  gerekliBelgeler: [
    { belge: "Tapu kaydi (guncel)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Tasinmaza ait kadastro paftasi", zorunlu: true, nereden: "Kadastro Mudurlugu" },
    { belge: "Satis senedi veya devir belgesi", zorunlu: true, aciklama: "Gecersizligi ileri surulen islem" },
    { belge: "Veraset ilami (miras nedeniylese)", zorunlu: false, nereden: "Sulh Hukuk Mahkemesi / Noter" },
    { belge: "Taniklarin listesi ve adresleri", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,

  pratikNot:
    "Tapu iptali ve tescil davasi ayni hakka iliskin oldugundan zamanasimiuna tabi degildir. " +
    "Dava acilirken tasinmaz uzerine ihtiyati tedbir (satis yasagi) talep edilmelidir. " +
    "HMK m.389 uyarinca tedbir karari UYAP'tan tapuya bildirilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12", "HMK m.119", "HMK m.389"],
  ozelKanunlar: ["TMK m.1023-1025", "Tapu Kanunu m.26"],
};

/** Madde 2: Muris muvazaasi nedeniyle tapu iptali ve tescil */
const murisMuvazaasiMiras: DavaTuru = {
  id: "muris-muvazaasi-tapu-iptali",
  maddeNo: 2,
  ad: "Muris muvazaasi nedeniyle tapu iptali ve tescil",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TASINMAZ_KESIN_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: TASINMAZ_MASRAF,

  ozelVekaletname: TAPU_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Murisin (miras birakanin) kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Tum mirascilar listesi", zorunlu: true },
    { bilgi: "Tasinmazin tapudaki bilgileri (ada, parsel)", zorunlu: true },
    {
      bilgi: "Muvazaali islemin detaylari (gercekte satis mi bağıs mi)",
      zorunlu: true,
      aciklama: "Muris tarafindan yapilan devrin gercek amaci",
    },
    { bilgi: "Tasinmazin tahmini degeri", zorunlu: true, aciklama: "Harc hesabi icin" },
  ],

  gerekliBelgeler: [
    { belge: "Veraset ilami", zorunlu: true, nereden: "Sulh Hukuk Mahkemesi / Noter" },
    { belge: "Tapu kaydi (guncel)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Miras birakanin olum belgesi", zorunlu: true, nereden: "Nufus Mudurlugu / e-Devlet" },
    { belge: "Devir tarihindeki tapu kaydi", zorunlu: true, nereden: "Tapu Sicil Mudurlugu" },
    {
      belge: "Nufus kayit ornegi (aile nufus tablosu)",
      zorunlu: true,
      nereden: "e-Devlet",
      aciklama: "Mirascilari gostermek icin",
    },
    { belge: "Taniklarin listesi ve adresleri", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,

  pratikNot:
    "Muris muvazaasi davasinda 01.04.1974 tarihli Yargitay IBK karari esas alinir. " +
    "Miras birakanin gercek iradesi satis degil bagis ise ve diger mirascilardan mal kacirma amaci varsa muvazaa kabul edilir. " +
    "Zamanasimiuna tabi degildir. Miras payina isabet eden kisim icin tescil talep edilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12", "HMK m.119"],
  ozelKanunlar: ["TMK m.706", "TBK m.19 (muvazaa)", "01.04.1974 tarihli YIBK"],
};

/** Madde 3: Vekalet gorevinin kotuye kullanilmasi nedeniyle tapu iptali ve tescil */
const vekaletKotuyeKullanma: DavaTuru = {
  id: "vekalet-kotuye-kullanma-tapu-iptali",
  maddeNo: 3,
  ad: "Vekalet gorevinin kotuye kullanilmasi nedeniyle tapu iptali ve tescil",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TASINMAZ_KESIN_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: TASINMAZ_MASRAF,

  ozelVekaletname: TAPU_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin tapudaki bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Vekilin (vekaleti kotuye kullanan kisinin) kimlik bilgileri", zorunlu: true },
    {
      bilgi: "Vekaletname tarihi ve icerigi",
      zorunlu: true,
      aciklama: "Hangi yetkiyi kapsadigi ve sinirlarini",
    },
    { bilgi: "Kotuye kullanma eylemi detaylari", zorunlu: true },
    { bilgi: "Tasinmazin tahmini degeri", zorunlu: true, aciklama: "Harc hesabi icin" },
  ],

  gerekliBelgeler: [
    { belge: "Vekaletname ornegi", zorunlu: true, nereden: "Noterden" },
    { belge: "Tapu kaydi (guncel)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Devir islemi belgeleri", zorunlu: true, nereden: "Tapu Sicil Mudurlugu" },
    { belge: "Vekaletname ile yapilan islemlerin listesi", zorunlu: true },
    { belge: "Banka dekontlari veya odeme kayitlari", zorunlu: false, aciklama: "Bedel odenip odenmedigini gostermek icin" },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,

  pratikNot:
    "Vekil, vekalet verenin cikarlarini korumak zorundadir (TBK m.506). Vekilin yetkisini asarak veya " +
    "vekalet verenin zararina islem yapmasi halinde tapu iptali talep edilebilir. " +
    "Ucuncu kisinin iyi niyeti arastirılmalıdır (TMK m.1023).",
  hmkMaddeleri: ["HMK m.2", "HMK m.12", "HMK m.119"],
  ozelKanunlar: ["TBK m.502-514 (vekalet)", "TMK m.1023-1025"],
};

/** Madde 4: Sahte vekaletname ile yapilan satislarda tapu iptali ve tescil */
const sahteVekaletnameTapu: DavaTuru = {
  id: "sahte-vekaletname-tapu-iptali",
  maddeNo: 4,
  ad: "Sahte vekaletname ile yapilan satislarda tapu iptali ve tescil",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TASINMAZ_KESIN_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    ...TASINMAZ_MASRAF,
    bilirkisiUcreti: BILIRKISI_UCRETI * 2,
    toplamTahmini: 12000,
    aciklama:
      "Sahte vekaletname tespiti icin yazi ve imza bilirkisi incelemesi gerekir. Ayrica kesif masrafi doğabilir.",
  },

  ozelVekaletname: TAPU_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin tapudaki bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Sahte vekaletname ile islem yapan kisinin bilgileri", zorunlu: true },
    { bilgi: "Sahte vekaletname tarihi ve noterlik bilgileri", zorunlu: true },
    { bilgi: "Tasinmazin tahmini degeri", zorunlu: true, aciklama: "Harc hesabi icin" },
  ],

  gerekliBelgeler: [
    { belge: "Sahte oldugu iddia edilen vekaletname sureti", zorunlu: true, nereden: "Noterden / Tapu Sicil Mudurlugu" },
    { belge: "Tapu kaydi (guncel)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Gercek vekaletname (varsa)", zorunlu: false, nereden: "Noterden" },
    { belge: "Imza ornekleri", zorunlu: true, aciklama: "Bilirkisi imza karsilastirmasi icin" },
    { belge: "Suc duyurusu veya ceza sorusturma evraklari", zorunlu: false, aciklama: "Resmi belgede sahtecilik sucu" },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,

  pratikNot:
    "Sahte vekaletname ile yapilan islem bastan itibaren gecersizdir. TMK m.1024 uyarinca iyi niyet korunmaz. " +
    "Ayrica TCK m.204 (resmi belgede sahtecilik) kapsaminda suc duyurusunda bulunulmalidir. " +
    "Hukuk ve ceza davasi birlikte yurutulmelidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12", "HMK m.119", "HMK m.389"],
  ozelKanunlar: ["TMK m.1023-1025", "TCK m.204 (resmi belgede sahtecilik)", "Noterlik Kanunu"],
};

/** Madde 5: Elatmanin (mudahalenin) onlenmesi davasi */
const elatmaninOnlenmesi: DavaTuru = {
  id: "elatmanin-onlenmesi",
  maddeNo: 5,
  ad: "Elatmanin (mudahalenin) onlenmesi davasi",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TASINMAZ_KESIN_YETKI,

  harclar: MAKTU_HARC_BILGISI,
  masraflar: TASINMAZ_MASRAF,

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin tapudaki bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Mudahale eden kisinin kimlik bilgileri", zorunlu: true },
    {
      bilgi: "Mudahalenin turune iliskin aciklama",
      zorunlu: true,
      aciklama: "Fiili mudahale mi, hukuki mudahale mi",
    },
    { bilgi: "Mudahalenin baslama tarihi", zorunlu: false },
  ],

  gerekliBelgeler: [
    { belge: "Tapu kaydi (guncel)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Kadastro paftasi / harita", zorunlu: true, nereden: "Kadastro Mudurlugu" },
    { belge: "Mudahaleyi gosteren fotograflar", zorunlu: false },
    { belge: "Ihtarname (cekilmisse)", zorunlu: false, nereden: "Noterden" },
    { belge: "Taniklarin listesi ve adresleri", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,

  pratikNot:
    "Elatmanin onlenmesi ayni hakka iliskindir, zamanasimiuna tabi degildir. " +
    "Maktu harca tabidir. Ecrimisil (haksiz isgal tazminati) talebi eklenmisse o kisim nispi harca tabidir. " +
    "Kesif zorunludur; hakim tasinmazi yerinde gormelidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12", "HMK m.119"],
  ozelKanunlar: ["TMK m.683 (mulkiyet hakki)", "TMK m.995 (haksiz zilyetlik)"],
};

/** Madde 6: Ecrimisil (haksiz isgal tazminati) davasi */
const ecrimisil: DavaTuru = {
  id: "ecrimisil-haksiz-isgal",
  maddeNo: 6,
  ad: "Ecrimisil (haksiz isgal tazminati) davasi",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TASINMAZ_KESIN_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: TASINMAZ_MASRAF,

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin tapudaki bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Haksiz isgal eden kisinin bilgileri", zorunlu: true },
    { bilgi: "Isgalin baslangic ve bitis tarihi", zorunlu: true, aciklama: "Ecrimisil hesabi icin donemi belirlemek gerekir" },
    { bilgi: "Tasinmazin kullanim amaci ve kira emsal degeri", zorunlu: false },
  ],

  gerekliBelgeler: [
    { belge: "Tapu kaydi (guncel)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Kadastro paftasi / harita", zorunlu: true, nereden: "Kadastro Mudurlugu" },
    { belge: "Kira emsal arastirma raporu", zorunlu: false, aciklama: "Bolgedeki emsal kira bedelleri" },
    { belge: "Ihtarname (cekilmisse)", zorunlu: false, nereden: "Noterden" },
    { belge: "Taniklarin listesi ve adresleri", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "5 yil (geriye donuk en fazla 5 yillik ecrimisil talep edilebilir)",
    yasalDayanak: "TBK m.146 (genel zamanasimiı)",
    aciklama: "Ecrimisil alacagi kisisel hak niteligindedir ve 5 yillik genel zamanasimiuna tabidir.",
  },

  pratikNot:
    "Ecrimisil, haksiz isgal suresince malik veya hak sahibinin yoksun kaldigi gelir tazminatidir. " +
    "Bilirkisi, tasinmazin kira emsal degerini belirler. Geriye donuk en fazla 5 yil talep edilebilir. " +
    "Elatmanin onlenmesi davasi ile birlikte acilabilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12", "HMK m.107 (belirsiz alacak)"],
  ozelKanunlar: ["TMK m.995 (kotuniyet tazminati)", "TBK m.146"],
};

/** Madde 7: Gecit hakki (zorunlu gecit) davasi */
const gecitHakki: DavaTuru = {
  id: "gecit-hakki-zorunlu-gecit",
  maddeNo: 7,
  ad: "Gecit hakki (zorunlu gecit) davasi",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TASINMAZ_KESIN_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    ...TASINMAZ_MASRAF,
    toplamTahmini: 10000,
    aciklama:
      "Kesif, fen bilirkisi ve deger bilirkisi incelemesi zorunludur. Uygun gecit guzergahinin tespiti icin birden fazla kesif yapilabilir.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Gecit hakki talep edilen tasinmazin bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Gecit verilmesi istenen komsunun/tasinmazin bilgileri", zorunlu: true },
    { bilgi: "Yola cikisi olmayan tasinmazin kullanim durumu", zorunlu: true },
    { bilgi: "Talep edilen gecit genisligi ve amaci", zorunlu: false },
  ],

  gerekliBelgeler: [
    { belge: "Tapu kaydi (guncel — her iki tasinmaz icin)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Kadastro paftasi / harita", zorunlu: true, nereden: "Kadastro Mudurlugu" },
    { belge: "Imar plani ve yol durumu", zorunlu: false, nereden: "Belediye Imar Mudurlugu" },
    { belge: "Fotograflar (tasinmazin genel gorunumu)", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,

  pratikNot:
    "TMK m.747 uyarinca yola cikisi olmayan tasinmaz maliki, komsu tasinmazdan uygun bir gecit hakki talep edebilir. " +
    "Gecit hakki karsiliginda tam bir bedel odenmesi gerekir. Hakim en az zarar verecek guzergahi belirler. " +
    "Tum komsulara dava acilmalidir; eksik hasim bozma sebebidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12", "HMK m.119"],
  ozelKanunlar: ["TMK m.747 (zorunlu gecit hakki)"],
};

/** Madde 8: Mecra hakki (su, elektrik, dogalgaz hatti gecirme) davasi */
const mecraHakki: DavaTuru = {
  id: "mecra-hakki",
  maddeNo: 8,
  ad: "Mecra hakki (su, elektrik, dogalgaz hatti gecirme) davasi",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TASINMAZ_KESIN_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    ...TASINMAZ_MASRAF,
    toplamTahmini: 10000,
    aciklama: "Fen bilirkisi ve deger bilirkisi incelemesi zorunludur. Mecranin guzergahi icin kesif yapilir.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mecra hakki talep edilen tasinmazin bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Mecranin turu (su, elektrik, dogalgaz, kanal)", zorunlu: true },
    { bilgi: "Komsunun/tasinmaz malikinin bilgileri", zorunlu: true },
    { bilgi: "Mecra icin alternatif guzergah bilgisi", zorunlu: false },
  ],

  gerekliBelgeler: [
    { belge: "Tapu kaydi (guncel — her iki tasinmaz icin)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Kadastro paftasi / harita", zorunlu: true, nereden: "Kadastro Mudurlugu" },
    { belge: "Belediye/kurum yazisi (altyapi plani)", zorunlu: false, nereden: "Belediye / TEDAS / Dogalgaz sirketi" },
    { belge: "Fotograflar (mevcut altyapi durumu)", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,

  pratikNot:
    "TMK m.744 uyarinca, ihtiyac sahibi tasinmaz maliki komsundan mecra gecirme hakki talep edebilir. " +
    "Tam bedel karsiliginda mecra hakki kurulur ve tapuya tescil edilir. " +
    "En az zarar verecek guzergah secilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12", "HMK m.119"],
  ozelKanunlar: ["TMK m.744 (mecra hakki)", "TMK m.745"],
};

/** Madde 9: Ust hakki (irtifak) davasi */
const ustHakki: DavaTuru = {
  id: "ust-hakki-irtifak",
  maddeNo: 9,
  ad: "Ust hakki (irtifak) davasi",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TASINMAZ_KESIN_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: TASINMAZ_MASRAF,

  ozelVekaletname: TAPU_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin tapudaki bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Ust hakki sozlesmesi detaylari", zorunlu: true },
    { bilgi: "Karsi tarafin kimlik bilgileri", zorunlu: true },
    { bilgi: "Ust hakkinin suresi ve kapsamı", zorunlu: false },
  ],

  gerekliBelgeler: [
    { belge: "Tapu kaydi (guncel)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Ust hakki sozlesmesi", zorunlu: true, nereden: "Noterden veya tapudan" },
    { belge: "Kadastro paftasi", zorunlu: true, nereden: "Kadastro Mudurlugu" },
    { belge: "Insaat ruhsati ve yapi bilgileri (varsa)", zorunlu: false, nereden: "Belediye" },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,

  pratikNot:
    "TMK m.726 vd. ust hakki, baskasinin arazisi uzerinde insaat yapma veya mevcut yapiyi koruma hakkidir. " +
    "Bagimsiz ve surekli ust hakki tapuya tasinmaz olarak kaydedilir. " +
    "Suresi en fazla 100 yil olabilir (TMK m.836).",
  hmkMaddeleri: ["HMK m.2", "HMK m.12"],
  ozelKanunlar: ["TMK m.726", "TMK m.826-836 (ust hakki)"],
};

/** Madde 10: Kaynak hakki davasi */
const kaynakHakki: DavaTuru = {
  id: "kaynak-hakki",
  maddeNo: 10,
  ad: "Kaynak hakki davasi",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TASINMAZ_KESIN_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: TASINMAZ_MASRAF,

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Kaynagin bulundugu tasinmazin bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Kaynak hakki talebinin dayanagi", zorunlu: true },
    { bilgi: "Karsi tarafin bilgileri", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Tapu kaydi (guncel)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Kadastro paftasi", zorunlu: true, nereden: "Kadastro Mudurlugu" },
    { belge: "Kaynak kullanim belgesi (varsa)", zorunlu: false, nereden: "DSI / Belediye" },
    { belge: "Fotograflar (kaynagin durumu)", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,

  pratikNot:
    "TMK m.756-761 uyarinca kaynak hakki, tasinmaz mulkiyetinin bir parcasi olarak duzenlenmistir. " +
    "Kaynak irtifaki kurulmasi icin tapuya tescil gerekir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12"],
  ozelKanunlar: ["TMK m.756-761 (kaynak ve yer altı sulari)"],
};

/** Madde 11: Intifa hakkina iliskin davalar */
const intifaHakki: DavaTuru = {
  id: "intifa-hakki",
  maddeNo: 11,
  ad: "Intifa hakkina iliskin davalar",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TASINMAZ_KESIN_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: TASINMAZ_MASRAF,

  ozelVekaletname: TAPU_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin tapudaki bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Intifa hakki sahibinin bilgileri", zorunlu: true },
    { bilgi: "Intifa hakkinin kurulus sekli (sozlesme, mahkeme karari, kanun)", zorunlu: true },
    { bilgi: "Uyusmazligin konusu", zorunlu: true, aciklama: "Intifa hakkinin kurulmasi, kullanimi veya sona ermesi mi" },
  ],

  gerekliBelgeler: [
    { belge: "Tapu kaydi (guncel)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Intifa hakki sozlesmesi (varsa)", zorunlu: false, nereden: "Noterden veya tapudan" },
    { belge: "Kadastro paftasi", zorunlu: true, nereden: "Kadastro Mudurlugu" },
    { belge: "Veraset ilami (miras yoluyla intifa varsa)", zorunlu: false, nereden: "Sulh Hukuk Mahkemesi" },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,

  pratikNot:
    "TMK m.794-822 intifa hakkini duzenler. Intifa hakki sahibi tasinmazi kullanma ve gelirlerinden yararlanma hakkina sahiptir. " +
    "Intifa hakki kisiye bagli olup devredilemez; olumle sona erer (tuzel kisilerde en fazla 100 yil). " +
    "Ciplak mulkiyet sahibinin haklari korunur.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12"],
  ozelKanunlar: ["TMK m.794-822 (intifa hakki)"],
};

/** Madde 12: Sukna (oturma) hakki davasi */
const suknaHakki: DavaTuru = {
  id: "sukna-oturma-hakki",
  maddeNo: 12,
  ad: "Sukna (oturma) hakki davasi",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TASINMAZ_KESIN_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: TASINMAZ_MASRAF,

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin tapudaki bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Oturma hakki sahibinin bilgileri", zorunlu: true },
    { bilgi: "Oturma hakkinin dayanagi", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Tapu kaydi (guncel)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Oturma hakkini gosteren belge", zorunlu: true },
    { belge: "Kadastro paftasi", zorunlu: false, nereden: "Kadastro Mudurlugu" },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,

  pratikNot:
    "TMK m.823-825 sukna (oturma) hakkini duzenler. Oturma hakki, bir binada veya onun bir bolumunde oturma yetkisi verir. " +
    "Devredilemez ve miras yoluyla gecmez. Intifa hakki hukumleri kiyasen uygulanir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12"],
  ozelKanunlar: ["TMK m.823-825 (oturma hakki)"],
};

/** Madde 13: Sufa (onalim) hakki davasi */
const sufaHakki: DavaTuru = {
  id: "sufa-onalim-hakki",
  maddeNo: 13,
  ad: "Sufa (onalim) hakki davasi",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TASINMAZ_KESIN_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: TASINMAZ_MASRAF,

  ozelVekaletname: TAPU_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Paydas oldugu tasinmazin bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Satis islemi yapan paydasin bilgileri", zorunlu: true },
    { bilgi: "Alisci ucuncu kisinin bilgileri", zorunlu: true },
    { bilgi: "Satis bedeli ve tarihi", zorunlu: true },
    { bilgi: "Satisin oğrenilme tarihi", zorunlu: true, aciklama: "3 aylik hak dusuru sure icin kritik" },
  ],

  gerekliBelgeler: [
    { belge: "Tapu kaydi (guncel)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Satis senedi / tapu devir belgesi", zorunlu: true, nereden: "Tapu Sicil Mudurlugu" },
    { belge: "Satis bedelini depo edecek banka dekontu", zorunlu: true, aciklama: "Dava ile birlikte bedel depo edilmelidir" },
    { belge: "Noterden bildirim (gonderildiyse)", zorunlu: false, aciklama: "TMK m.733 noter bildirimi" },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "Satisin ogrenilmesinden itibaren 3 ay, her halde satisin uzerinden 2 yil (hak dusuru sure)",
    yasalDayanak: "TMK m.733/4",
    aciklama:
      "Onalim hakki hak dusuru sureye tabidir, zamanasimiuna degil. 3 aylik sure, satisin yazili bildiriminden itibaren baslar.",
  },

  pratikNot:
    "TMK m.732 uyarinca paylı mulkiyette bir payin ucuncu kisiye satilmasi halinde diger paydaslarin onalim hakki vardir. " +
    "Dava ile birlikte satis bedelinin depo edilmesi veya teminat gosterilmesi zorunludur. " +
    "3 aylik hak dusuru sure satisin bildirilmesiyle baslar. Bildirim noter araciligi ile yapilmamissa sure baslamaz.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12", "HMK m.119"],
  ozelKanunlar: ["TMK m.732-733 (onalim hakki)"],
};

/** Madde 14: Muhdesatin (yapi/dikili sey) aidiyetinin tespiti davasi */
const muhdesatAidiyeti: DavaTuru = {
  id: "muhdesat-aidiyeti-tespiti",
  maddeNo: 14,
  ad: "Muhdesatin (yapi/dikili sey) aidiyetinin tespiti davasi",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TASINMAZ_KESIN_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: TASINMAZ_MASRAF,

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin tapudaki bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Muhdesatin (yapi/agac) tanimi ve konumu", zorunlu: true },
    { bilgi: "Muhdesati kimin yaptirdigi/diktigi", zorunlu: true },
    { bilgi: "Muhdesatin tahmini degeri", zorunlu: true, aciklama: "Harc hesabi icin" },
  ],

  gerekliBelgeler: [
    { belge: "Tapu kaydi (guncel)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Kadastro paftasi", zorunlu: true, nereden: "Kadastro Mudurlugu" },
    { belge: "Insaat ruhsati / yapi kullanma izin belgesi", zorunlu: false, nereden: "Belediye" },
    { belge: "Muhdesatin yapim masraflarini gosteren belgeler", zorunlu: false },
    { belge: "Taniklarin listesi ve adresleri", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,

  pratikNot:
    "Muhdesat aidiyeti tespiti davasi genellikle ortakligin giderilmesi, kamulastirma veya miras paylasimindan once acilir. " +
    "Amac, tasinmaz uzerindeki yapi veya dikili seyin kime ait oldugunu tespit ettirmektir. " +
    "Hukuki yarari bulunan herkes acabilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12", "HMK m.106 (tespit davasi)"],
  ozelKanunlar: ["TMK m.718 (butunleyici parca)", "TMK m.722-724 (haksiz yapi)"],
};

/** Madde 15: Tapuya serh verilmesi veya serhin kaldirilmasi davasi */
const tapuyaSerhDavasi: DavaTuru = {
  id: "tapuya-serh-verilmesi-kaldirilmasi",
  maddeNo: 15,
  ad: "Tapuya serh verilmesi veya serhin kaldirilmasi davasi",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TASINMAZ_KESIN_YETKI,

  harclar: MAKTU_HARC_BILGISI,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 2,
    toplamTahmini: 2000,
    aciklama: "Genellikle bilirkisi ve kesif gerektirmez. Tebligat ve yargilama giderleri.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin tapudaki bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Serhin turu ve icerigi", zorunlu: true },
    { bilgi: "Karsi tarafin bilgileri", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Tapu kaydi (guncel)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Serh belgesi veya kaydi", zorunlu: true, nereden: "Tapu Sicil Mudurlugu" },
    { belge: "Serhin dayanagi belge (sozlesme, mahkeme karari vb.)", zorunlu: true },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,

  pratikNot:
    "TMK m.1010 vd. tapu sicilinde serh islemlerini duzenler. Kisisel haklarin serhi (TMK m.1009), " +
    "tasarruf yetkisi kisitlamalari (TMK m.1010) ve gecici tescil serhi (TMK m.1011) gibi farkli serh turleri mevcuttur.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12"],
  ozelKanunlar: ["TMK m.1009-1013 (tapu sicili serhleri)"],
};

/** Madde 16: Komsuluk hukukundan dogan davalar */
const komsulukHukuku: DavaTuru = {
  id: "komsuluk-hukuku-davasi",
  maddeNo: 16,
  ad: "Komsuluk hukukundan dogan davalar",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TASINMAZ_KESIN_YETKI,

  harclar: MAKTU_HARC_BILGISI,
  masraflar: TASINMAZ_MASRAF,

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin tapudaki bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Komsu tasinmaz bilgileri ve malikinin bilgileri", zorunlu: true },
    { bilgi: "Uyusmazligin konusu (gurultu, koku, su akisi, dal taskinligi vb.)", zorunlu: true },
    { bilgi: "Uyusmazligin baslama tarihi ve suresi", zorunlu: false },
  ],

  gerekliBelgeler: [
    { belge: "Tapu kaydi (guncel)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Kadastro paftasi", zorunlu: true, nereden: "Kadastro Mudurlugu" },
    { belge: "Fotograflar / video kayitlari", zorunlu: false },
    { belge: "Belediye veya muhtarlik sikayet dilekceleri (varsa)", zorunlu: false },
    { belge: "Taniklarin listesi ve adresleri", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_KOMSULUK,

  pratikNot:
    "TMK m.737 vd. komsuluk hakkini duzenler. 01.09.2023 tarihinden itibaren komsuluk hukukundan " +
    "kaynaklanan uyusmazliklarda arabuluculuk dava sartidir (6325 sy. K. m.18/B). " +
    "Arabuluculuk son tutanagi olmadan dava acilamaz.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12"],
  ozelKanunlar: ["TMK m.737-750 (komsuluk hukuku)", "6325 sy. K. m.18/B (arabuluculuk dava sarti)"],
};

/** Madde 17: Sinir tespiti ve sinir uyusmazliklari davalari */
const sinirTespiti: DavaTuru = {
  id: "sinir-tespiti-uyusmazligi",
  maddeNo: 17,
  ad: "Sinir tespiti ve sinir uyusmazliklari davalari",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TASINMAZ_KESIN_YETKI,

  harclar: MAKTU_HARC_BILGISI,
  masraflar: {
    ...TASINMAZ_MASRAF,
    toplamTahmini: 9000,
    aciklama:
      "Harita muhendisi bilirkisi ve kesif zorunludur. Kadastro haritasi ve uydu goruntuleri incelenebilir.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin tapudaki bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Komsu tasinmaz bilgileri ve malikinin bilgileri", zorunlu: true },
    { bilgi: "Sinir uyusmazliginin detaylari", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Tapu kaydi (guncel — her iki tasinmaz icin)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Kadastro paftasi", zorunlu: true, nereden: "Kadastro Mudurlugu" },
    { belge: "Aplikasyon (yer gosterme) krokisi", zorunlu: false, nereden: "TKGM / Lisansli harita burosu" },
    { belge: "Fotograflar (sinir durumu)", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,

  pratikNot:
    "TMK m.719 sinir uyusmazliklarini duzenler. Sinirin kadinastro planina gore belirlenmesi esastir. " +
    "Kadastro planinda belirsizlik varsa zilyetlik ve diger delillerle sinir tespit edilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12"],
  ozelKanunlar: ["TMK m.719 (sinir uyusmazligi)"],
};

/** Madde 18: Kamulastirma bedel (artirim) davasi */
const kamulastirmaBedel: DavaTuru = {
  id: "kamulastirma-bedel-artirim",
  maddeNo: 18,
  ad: "Kamulastirma bedel (artirim) davasi",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: {
    ...ASLIYE_HUKUK_GOREV,
    aciklama:
      "Kamulastirma bedel uyusmazliklari Asliye Hukuk Mahkemesinde gorulur (2942 sy. K. m.37).",
    yasalDayanak: "2942 sy. K. m.37, HMK m.2",
  },
  yetkiliMahkeme: {
    genelYetki: "Tasinmazin bulundugu yer mahkemesi",
    kesinYetki: "Tasinmazin bulundugu yer (2942 sy. K. m.37)",
    kesinYetkiMi: true,
    yasalDayanak: "2942 sy. K. m.37",
    aciklama: "Kamulastirma davalarinda tasinmazin bulundugu yer mahkemesi kesin yetkilidir.",
  },

  harclar: {
    ...NISPI_HARC_BILGISI,
    aciklama:
      "Kamulastirma bedel artirim davasi nispi harca tabidir. Harc, artirim talep edilen bedel farki uzerinden hesaplanir.",
  },
  masraflar: {
    ...TASINMAZ_MASRAF,
    bilirkisiUcreti: BILIRKISI_UCRETI * 2,
    toplamTahmini: 12000,
    aciklama:
      "Tasinmaz degerleme bilirkisi, kesif ve gerekirse imar bilirkisi incelemesi yapilir. Birden fazla bilirkisi raporu alinabilir.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin tapudaki bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Kamulastirmayi yapan idare", zorunlu: true },
    { bilgi: "Idare tarafindan belirlenen bedel", zorunlu: true },
    { bilgi: "Kamulastirma karari / tebligat tarihi", zorunlu: true, aciklama: "30 gunluk dava acma suresi icin kritik" },
    { bilgi: "Tasinmazin tahmini gercek degeri", zorunlu: false },
  ],

  gerekliBelgeler: [
    { belge: "Tapu kaydi (guncel)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Kamulastirma karari", zorunlu: true, nereden: "Kamulastirmayi yapan idare" },
    { belge: "Bedel tespit tutanagi", zorunlu: true, nereden: "Kamulastirmayi yapan idare" },
    { belge: "Kadastro paftasi ve imar durumu", zorunlu: true, nereden: "Belediye / Kadastro Mudurlugu" },
    { belge: "Emsal satis bilgileri (bolgedeki)", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "30 gun (dava acma suresi — hak dusuru)",
    yasalDayanak: "2942 sy. K. m.14",
    aciklama:
      "Kamulastirma isleminin tebliginden itibaren 30 gun icinde bedel artirim davasi acilmalidir. Bu sure hak dusuru suredir.",
    baslangic: "Kamulastirma isleminin tasinmaz malikine teblig tarihi",
  },

  pratikNot:
    "2942 sayili Kamulastirma Kanunu m.10 uyarinca idare, bedeli mahkeme araciligi ile tespit ettirir. " +
    "Malik, belirlenen bedeli dusuk bulursa 30 gun icinde bedel artirim davasi acmalidir. " +
    "Sure hak dusuru suredir, kacirildığında telafisi yoktur.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12", "HMK m.119"],
  ozelKanunlar: ["2942 sy. Kamulastirma Kanunu m.10, m.14, m.37"],
};

/** Madde 19: Kamulastirmasiz el atma (fiili/hukuki) nedeniyle tazminat davasi */
const kamulastirmasizElAtma: DavaTuru = {
  id: "kamulastirmasiz-el-atma-tazminat",
  maddeNo: 19,
  ad: "Kamulastirmasiz el atma (fiili/hukuki) nedeniyle tazminat davasi",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: {
    ...ASLIYE_HUKUK_GOREV,
    aciklama:
      "Kamulastirmasiz el atma davalari Asliye Hukuk Mahkemesinde gorulur. Fiili el atma halinde adli yargi, hukuki el atma halinde AYM karari ile idari yarginin gorevli olabilecegi tartismali olmakla birlikte uygulamada adli yargi kabul edilmektedir.",
  },
  yetkiliMahkeme: TASINMAZ_KESIN_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    ...TASINMAZ_MASRAF,
    bilirkisiUcreti: BILIRKISI_UCRETI * 2,
    toplamTahmini: 12000,
    aciklama:
      "Tasinmaz degerleme ve imar bilirkisi incelemesi zorunludur. Birden fazla kesif ve bilirkisi raporu alinabilir.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin tapudaki bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "El atan idarenin bilgileri", zorunlu: true },
    { bilgi: "El atmanin turu (fiili mi hukuki mi)", zorunlu: true, aciklama: "Fiili: yol, park yapimi; Hukuki: imar planinda kamu alani" },
    { bilgi: "El atmanin baslama tarihi", zorunlu: true },
    { bilgi: "Tasinmazin tahmini degeri", zorunlu: true, aciklama: "Harc hesabi icin" },
  ],

  gerekliBelgeler: [
    { belge: "Tapu kaydi (guncel)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Kadastro paftasi ve imar plan ornegi", zorunlu: true, nereden: "Belediye / Kadastro Mudurlugu" },
    { belge: "Imar durumu belgesi", zorunlu: true, nereden: "Belediye Imar Mudurlugu" },
    { belge: "Fotograflar (el atma durumu)", zorunlu: false },
    { belge: "Belediye/idareye yapilan basvurular", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,

  pratikNot:
    "Kamulastirmasiz el atma, idarenin kamulastirma usulune uymadan ozel mulkiyete el koymasidir. " +
    "Fiili el atmalarda zamanasimiı islememektedir (AYM 2010/83 E.). " +
    "Hukuki el atma: imar planinda kamu alani olarak gosterilip 5 yil icerisinde kamulastirma yapilmamasi. " +
    "Uzlasma proseduru (2942 sy. K. ek m.1) dava oncesi tukenmesi gereken yoldur.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12"],
  ozelKanunlar: [
    "2942 sy. Kamulastirma Kanunu ek m.1 (uzlasma)",
    "Anayasa m.46 (kamulastirma)",
    "AYM 2010/83 E. karari",
  ],
};

/** Madde 20: Kamulastirma kararinin iptali davasi */
const kamulastirmaIptali: DavaTuru = {
  id: "kamulastirma-karari-iptali",
  maddeNo: 20,
  ad: "Kamulastirma kararinin iptali davasi",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: {
    mahkeme: "Idare Mahkemesi / Asliye Hukuk Mahkemesi",
    yasalDayanak: "2942 sy. K. m.14, 2577 sy. IYUK",
    aciklama:
      "Kamulastirma isleminin iptali icin idari yargi (Idare Mahkemesi) gorevlidir. Ancak bedele iliskin uyusmazliklar Asliye Hukuk Mahkemesinde gorulur.",
    ozelDurum:
      "Kamulastirma isleminin 'idari islem' yonu iptal davasi, 'bedel' yonu adli yargidadir. Iki ayri dava acilmasi gerekebilir.",
  },
  yetkiliMahkeme: {
    genelYetki: "Tasinmazin bulundugu yer mahkemesi",
    kesinYetki: "Tasinmazin bulundugu yer (2942 sy. K. m.37)",
    kesinYetkiMi: true,
    yasalDayanak: "2942 sy. K. m.37",
    aciklama: "Kamulastirma davasinda tasinmazin bulundugu yer mahkemesi kesin yetkilidir.",
  },

  harclar: MAKTU_HARC_BILGISI,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 2,
    bilirkisiUcreti: BILIRKISI_UCRETI,
    toplamTahmini: 5000,
    aciklama: "Idari yargida yargilama giderleri nispeten dusuktur.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin tapudaki bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Kamulastirmayi yapan idare", zorunlu: true },
    { bilgi: "Kamulastirma karari tarihi ve numarasi", zorunlu: true },
    { bilgi: "Iptal sebebi (kamu yarari yoklugu, yetki asimi vb.)", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Kamulastirma karari", zorunlu: true, nereden: "Kamulastirmayi yapan idare" },
    { belge: "Tapu kaydi (guncel)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Tebligat belgesi", zorunlu: true, aciklama: "Dava acma suresi icin" },
    { belge: "Kamu yarari kararı ve onay yazisi", zorunlu: false, nereden: "Ilgili idare" },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "30 gun (dava acma suresi)",
    yasalDayanak: "2942 sy. K. m.14",
    aciklama: "Kamulastirma isleminin tebliginden itibaren 30 gun icinde iptal davasi acilmalidir.",
    baslangic: "Kamulastirma isleminin teblig tarihi",
  },

  pratikNot:
    "Kamulastirma isleminin iptali icin hem idari yargi hem adli yargiya basvuru gerekebilir. " +
    "Idari yargi: islemin hukuka aykiriligi (kamu yarari yoklugu, yetki, sekil). " +
    "Adli yargi: bedel uyusmazligi. Yurutmenin durdurulmasi talep edilmelidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12"],
  ozelKanunlar: ["2942 sy. Kamulastirma Kanunu m.14", "2577 sy. IYUK m.2, m.7"],
};

/** Madde 21: Acele kamulastirma islemlerine itiraz */
const aceleKamulastirmaItiraz: DavaTuru = {
  id: "acele-kamulastirma-itiraz",
  maddeNo: 21,
  ad: "Acele kamulastirma islemlerine itiraz",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: {
    ...ASLIYE_HUKUK_GOREV,
    aciklama:
      "Acele kamulastirmada bedel tespiti Asliye Hukuk Mahkemesinde yapilir (2942 sy. K. m.27).",
    yasalDayanak: "2942 sy. K. m.27",
  },
  yetkiliMahkeme: {
    genelYetki: "Tasinmazin bulundugu yer mahkemesi",
    kesinYetki: "Tasinmazin bulundugu yer (2942 sy. K. m.37)",
    kesinYetkiMi: true,
    yasalDayanak: "2942 sy. K. m.37",
    aciklama: "Tasinmazin bulundugu yer mahkemesi kesin yetkilidir.",
  },

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    ...TASINMAZ_MASRAF,
    toplamTahmini: 10000,
    aciklama: "Bilirkisi ve kesif masraflari ortaya cikar. Islem acil nitelikte oldugu icin hizli degerlemeler yapilir.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin tapudaki bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Acele kamulastirma karari ve Cumhurbaskani karari", zorunlu: true },
    { bilgi: "Kamulastirmayi yapan idare", zorunlu: true },
    { bilgi: "El koyma tarihi", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Acele kamulastirma (el koyma) karari", zorunlu: true, nereden: "Kamulastirmayi yapan idare" },
    { belge: "Tapu kaydi (guncel)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Cumhurbaskani (Bakanlar Kurulu) karari", zorunlu: true, nereden: "Resmi Gazete" },
    { belge: "Kadastro paftasi", zorunlu: true, nereden: "Kadastro Mudurlugu" },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,

  pratikNot:
    "2942 sy. K. m.27 acele kamulastirmayi duzenler. Cumhurbaskani karari ile tasinmaza el konulur, " +
    "bedel sonradan mahkemece tespit edilir. Idari islem yonunden ayrica iptal davasi acilabilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12"],
  ozelKanunlar: ["2942 sy. Kamulastirma Kanunu m.27 (acele kamulastirma)"],
};

/** Madde 22: Taskin yapi nedeniyle tescil veya yikim davasi */
const taskinYapi: DavaTuru = {
  id: "taskin-yapi-tescil-yikim",
  maddeNo: 22,
  ad: "Taskin yapi nedeniyle tescil veya yikim davasi",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TASINMAZ_KESIN_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    ...TASINMAZ_MASRAF,
    toplamTahmini: 11000,
    aciklama:
      "Harita muhendisi ve insaat bilirkisi incelemesi, kesif zorunludur. Taskinlik miktarinin tespiti yapilir.",
  },

  ozelVekaletname: TAPU_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin tapudaki bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Taskin yapinin durumu (ne kadar alan isgal ediyor)", zorunlu: true },
    { bilgi: "Komsu tasinmaz malikinin bilgileri", zorunlu: true },
    { bilgi: "Yapinin ne zaman yapildigi", zorunlu: false },
  ],

  gerekliBelgeler: [
    { belge: "Tapu kaydi (guncel — her iki tasinmaz icin)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Kadastro paftasi", zorunlu: true, nereden: "Kadastro Mudurlugu" },
    { belge: "Insaat ruhsati (varsa)", zorunlu: false, nereden: "Belediye" },
    { belge: "Fotograflar (taskin yapi)", zorunlu: false },
    { belge: "Aplikasyon krokisi", zorunlu: false, nereden: "Lisansli harita burosu" },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,

  pratikNot:
    "TMK m.725 taskin yapiyi duzenler. Yapi maliki iyiniyetli ve arazi degeri yapi degerinden acikcasiz fazlaysa " +
    "uygun bir bedel karsiliginda tasinmaz parcasinin tescilini talep edebilir. " +
    "Iyiniyet yoksa komsu yikim talep edebilir. Komsunun uzun sure sessiz kalmasi hakkini kaybettirebilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12", "HMK m.119"],
  ozelKanunlar: ["TMK m.725 (taskin yapi)", "TMK m.722-724 (haksiz yapi)"],
};

/** Madde 23: Kat karsiligi insaat sozlesmesinden dogan uyusmazliklar */
const katKarsiligiInsaat: DavaTuru = {
  id: "kat-karsiligi-insaat-uyusmazligi",
  maddeNo: 23,
  ad: "Kat karsiligi insaat sozlesmesinden dogan uyusmazliklar",
  kategori: "asliye-hukuk",
  altKategori: "tasinmaz",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri (HMK m.6)",
    ozelYetki: [
      "Sozlesmenin ifa yeri (HMK m.10)",
      "Tasinmazin bulundugu yer (HMK m.12)",
    ],
    kesinYetki: "Tasinmazin bulundugu yer (HMK m.12) — tasinmazin aynina iliskin talep iceriyorsa kesin yetki",
    kesinYetkiMi: true,
    yasalDayanak: "HMK m.6, m.10, m.12",
    aciklama:
      "Kat karsiligi insaat sozlesmesi karmasik niteliktedir. Tasinmazin aynina iliskin talepler (tescil, fesih) icin " +
      "HMK m.12 kesin yetki, alacak talepleri icin genel/ozel yetki kurallari uygulanir.",
  },

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
    bilirkisiUcreti: BILIRKISI_UCRETI * 2,
    kesfUcreti: KESF_UCRETI,
    tanikUcreti: TANIK_UCRETI * 3,
    toplamTahmini: 15000,
    aciklama:
      "Insaat bilirkisi, deger bilirkisi ve kesif zorunludur. Seviye tespiti, gecikme zammi hesaplari yapilir.",
  },

  ozelVekaletname: TAPU_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin tapudaki bilgileri (ada, parsel)", zorunlu: true },
    { bilgi: "Kat karsiligi insaat sozlesmesi detaylari", zorunlu: true },
    { bilgi: "Muteahhidin / arsa sahibinin bilgileri", zorunlu: true },
    { bilgi: "Insaat seviyesi ve teslim durumu", zorunlu: true },
    { bilgi: "Gecikme suresi (varsa)", zorunlu: false },
  ],

  gerekliBelgeler: [
    { belge: "Kat karsiligi insaat sozlesmesi (noter onayli)", zorunlu: true, nereden: "Noterden" },
    { belge: "Tapu kaydi (guncel)", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Insaat ruhsati ve yapi kullanma izni", zorunlu: false, nereden: "Belediye" },
    { belge: "Mimari proje ve teknik sartname", zorunlu: false },
    { belge: "Ihtarname (sozlesmenin feshi oncesi)", zorunlu: false, nereden: "Noterden" },
    { belge: "Fotograflar (insaat durumu)", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "10 yil (sozlesmeden doğan genel zamanasimiı)",
    yasalDayanak: "TBK m.146",
    aciklama: "Sozlesmeden doğan alacaklar genel zamanasimiına (10 yil) tabidir.",
  },

  pratikNot:
    "Kat karsiligi insaat sozlesmesi karma bir sozlesme olup esser sozlesmesi ve tasinmaz satisi unsurlarini icerir. " +
    "Resmi sekilde (noter veya tapu) yapilmadikca gecersizdir. " +
    "Muteahhidin teslim borcu, arsa sahibinin tapu devir borcu vardir. " +
    "Gecikme halinde cezai sart ve tazminat talep edilebilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12", "HMK m.119"],
  ozelKanunlar: ["TBK m.470 vd. (eser sozlesmesi)", "TMK m.706 (resmi sekil)", "Imar Kanunu m.21"],
};

// ---------------------------------------------------------------------------
// 1.2. TAZMINAT DAVALARI — Madde 24-41
// ---------------------------------------------------------------------------

/** Madde 24: Maddi tazminat davasi */
const maddiTazminat: DavaTuru = {
  id: "maddi-tazminat",
  maddeNo: 24,
  ad: "Maddi tazminat davasi",
  kategori: "asliye-hukuk",
  altKategori: "tazminat",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TAZMINAT_GENEL_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: TAZMINAT_MASRAF,

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Zarara neden olan olay ve tarihi", zorunlu: true },
    { bilgi: "Zarar veren kisinin/kurumun bilgileri", zorunlu: true },
    { bilgi: "Ugranilan maddi zararin detayli dokumu", zorunlu: true },
    { bilgi: "Zararin belgeli tutari veya tahmini deger", zorunlu: true, aciklama: "Harc hesabi icin" },
  ],

  gerekliBelgeler: [
    { belge: "Zarari gosteren belgeler (fatura, makbuz, rapor)", zorunlu: true },
    { belge: "Olay tutanagi / kaza raporu (varsa)", zorunlu: false },
    { belge: "Tedavi belgeleri (saglik zarari varsa)", zorunlu: false },
    { belge: "Fotograflar (zararin gorsel kaniti)", zorunlu: false },
    { belge: "Taniklarin listesi ve adresleri", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "Haksiz fiil: 2 yil (ogrenme) / 10 yil (fiil); Sozlesmeden: 10 yil",
    yasalDayanak: "TBK m.72 (haksiz fiil), TBK m.146 (sozlesme)",
    aciklama:
      "Haksiz fiilden dogan tazminat talebi, zararin ve failin ogrenilmesinden itibaren 2 yil, her halde fiilden itibaren 10 yil. " +
      "Ceza zamanasimiı daha uzunsa o uygulanir (TBK m.72/1).",
    baslangic: "Zararin ve failin ogrenildigi tarih",
  },

  pratikNot:
    "TBK m.49 vd. haksiz fiil sorumlulugunu duzenler. Dava degeri tam belirlenemiyorsa HMK m.107 belirsiz alacak davasi acilabilir. " +
    "Maddi zarar: fiili zarar + yoksun kalinan kar (TBK m.50). Ispat yuku davacidadir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16", "HMK m.107"],
  ozelKanunlar: ["TBK m.49-76 (haksiz fiil)", "TBK m.112 (borca aykirilik)"],
};

/** Madde 25: Manevi tazminat davasi */
const maneviTazminat: DavaTuru = {
  id: "manevi-tazminat",
  maddeNo: 25,
  ad: "Manevi tazminat davasi",
  kategori: "asliye-hukuk",
  altKategori: "tazminat",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TAZMINAT_GENEL_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    ...TAZMINAT_MASRAF,
    toplamTahmini: 3500,
    aciklama: "Manevi tazminatta bilirkisi genellikle gerekmez; hakimin takdiri esastir.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Zarara neden olan olay ve tarihi", zorunlu: true },
    { bilgi: "Zarar veren kisinin/kurumun bilgileri", zorunlu: true },
    { bilgi: "Manevi zararin niteligi ve etkisi", zorunlu: true, aciklama: "Ruhsal cilesinin, onur kirilmasinin vs. aciklamasi" },
    { bilgi: "Talep edilen manevi tazminat tutari", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Olaya iliskin belgeler (tutanak, rapor)", zorunlu: true },
    { belge: "Saglik / psikolojik rapor (varsa)", zorunlu: false },
    { belge: "Tanik listesi ve adresleri", zorunlu: false },
    { belge: "Medyada yer alan haberler (itibar zarari varsa)", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "Haksiz fiil: 2 yil (ogrenme) / 10 yil (fiil)",
    yasalDayanak: "TBK m.72",
    aciklama: "Maddi tazminat ile ayni zamanasimiına tabidir.",
    baslangic: "Zararin ve failin ogrenildigi tarih",
  },

  pratikNot:
    "TBK m.56 manevi tazminati duzenler. Manevi tazminat miktari hakimin takdirine baglidir. " +
    "Taraflarin sosyal ve ekonomik durumu, kusurun agirligı, olayin niteligi dikkate alinir. " +
    "Manevi tazminat bolunemez; kismi dava acilamaz (Yargitay yerlesik ictihat).",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16"],
  ozelKanunlar: ["TBK m.56 (manevi tazminat)", "TBK m.58 (kisilik hakki ihlali)"],
};

/** Madde 26: Destekten yoksun kalma tazminati davasi */
const destektenYoksunKalma: DavaTuru = {
  id: "destekten-yoksun-kalma-tazminati",
  maddeNo: 26,
  ad: "Destekten yoksun kalma tazminati davasi",
  kategori: "asliye-hukuk",
  altKategori: "tazminat",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TAZMINAT_GENEL_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    ...TAZMINAT_MASRAF,
    bilirkisiUcreti: BILIRKISI_UCRETI * 2,
    toplamTahmini: 8000,
    aciklama:
      "Aktuer bilirkisi (destekten yoksun kalma hesabi) ve kusur bilirkisi incelemesi zorunludur.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Olen kisinin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Olum sebebi ve olayin detaylari", zorunlu: true },
    { bilgi: "Olenin gelir durumu (son brut ucret veya kazanc)", zorunlu: true },
    { bilgi: "Aile yapisı (es, cocuklar, bakmakla yukumlu oldugu kisiler)", zorunlu: true },
    { bilgi: "Davalinin bilgileri (sorumlu kisi/kurum)", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Olum belgesi / defin ruhsati", zorunlu: true, nereden: "Nufus Mudurlugu / Hastane" },
    { belge: "Veraset ilami", zorunlu: true, nereden: "Sulh Hukuk Mahkemesi / Noter" },
    { belge: "Nufus kayit ornegi (aile tablosu)", zorunlu: true, nereden: "e-Devlet" },
    { belge: "Olenin gelir belgeleri (maas bordrosu, vergi beyannamesi)", zorunlu: true },
    { belge: "Olay tutanagi / kaza raporu", zorunlu: true },
    { belge: "SGK hizmet dokumu (olenin)", zorunlu: false, nereden: "e-Devlet" },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "2 yil (ogrenme) / 10 yil (fiil) — ceza zamanasimiı daha uzunsa o uygulanir",
    yasalDayanak: "TBK m.72",
    baslangic: "Olum tarihinde zarar ve fail biliniyorsa o tarih",
  },

  pratikNot:
    "TBK m.53/3 destekten yoksun kalma tazminatini duzenler. Destek, fiilen ve surekli olarak bakim saglamaktir; " +
    "mirascilık sart degildir (sigortali/sigortasiz farketmez). " +
    "Aktuer hesabi zorunludur. TRH-2010 yasam tablosu ve progresif rant yontemi kullanilir. " +
    "Belirsiz alacak davasi (HMK m.107) acilebilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16", "HMK m.107"],
  ozelKanunlar: ["TBK m.53 (olum halinde tazminat)", "TBK m.55 (tazminatin belirlenmesi)"],
};

/** Madde 27: Is goremezlik (gecici/kalici) tazminati davasi */
const isGoremezlikTazminati: DavaTuru = {
  id: "is-goremezlik-tazminati",
  maddeNo: 27,
  ad: "Is goremezlik (gecici/kalici) tazminati davasi",
  kategori: "asliye-hukuk",
  altKategori: "tazminat",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TAZMINAT_GENEL_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    ...TAZMINAT_MASRAF,
    bilirkisiUcreti: BILIRKISI_UCRETI * 2,
    toplamTahmini: 9000,
    aciklama:
      "Adli tip / saglik bilirkisi (maluliyet orani tespiti) ve aktuer bilirkisi (hesaplama) zorunludur.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Yaralamanin/sakatlanmanin sebebi ve tarihi", zorunlu: true },
    { bilgi: "Davalinin bilgileri (sorumlu kisi/kurum)", zorunlu: true },
    { bilgi: "Tedavi sureci ve mevcut saglik durumu", zorunlu: true },
    { bilgi: "Gelir durumu (is goremezlik oncesi kazanc)", zorunlu: true },
    { bilgi: "SGK maluliyet orani (belirlendiyse)", zorunlu: false },
  ],

  gerekliBelgeler: [
    { belge: "Saglik kurulu raporu (maluliyet orani)", zorunlu: true, nereden: "Universite hastanesi / Devlet hastanesi" },
    { belge: "Tedavi belgeleri ve epikrizler", zorunlu: true },
    { belge: "Olay tutanagi / kaza raporu", zorunlu: true },
    { belge: "Gelir belgesi (maas bordrosu, vergi beyannamesi)", zorunlu: true },
    { belge: "SGK hizmet dokumu", zorunlu: false, nereden: "e-Devlet" },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "2 yil (ogrenme) / 10 yil (fiil) — ceza zamanasimiı daha uzunsa o uygulanir",
    yasalDayanak: "TBK m.72",
    baslangic: "Zararin ogrenildigi tarih (kesin rapor tarihi olabilir)",
  },

  pratikNot:
    "TBK m.54 bedensel zararlari duzenler. Tedavi giderleri, kazanc kaybi, calisma gucunun azalmasindan dogan kayiplar " +
    "ve ekonomik gelecegin sarsılmasından dogan kayiplar talep edilebilir. " +
    "Kalici is goremezlik oranini uzman hekim bilirkisi belirler. Aktuer hesabi zorunludur.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16", "HMK m.107"],
  ozelKanunlar: ["TBK m.54 (bedensel zarar)", "TBK m.55 (tazminatin belirlenmesi)"],
};

/** Madde 28: Haksiz fiilden dogan tazminat davalari */
const haksizFiilTazminat: DavaTuru = {
  id: "haksiz-fiil-tazminat",
  maddeNo: 28,
  ad: "Haksiz fiilden dogan tazminat davalari",
  kategori: "asliye-hukuk",
  altKategori: "tazminat",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TAZMINAT_GENEL_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: TAZMINAT_MASRAF,

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Haksiz fiilin tanimi, yeri ve tarihi", zorunlu: true },
    { bilgi: "Failin (davalinin) kimlik bilgileri", zorunlu: true },
    { bilgi: "Ugranilan zararin detayi ve tutari", zorunlu: true },
    { bilgi: "Illiyet bagini gosteren olgular", zorunlu: true, aciklama: "Zarar ile fiil arasindaki nedensellik" },
  ],

  gerekliBelgeler: [
    { belge: "Olay tutanagi / resmi kayit", zorunlu: true },
    { belge: "Zarar belgesi (fatura, rapor, ekspertiz)", zorunlu: true },
    { belge: "Tanik listesi ve adresleri", zorunlu: false },
    { belge: "Fotograflar / video kayitlari", zorunlu: false },
    { belge: "Ceza sorusturmasi evraklari (varsa)", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "2 yil (ogrenme) / 10 yil (fiil)",
    yasalDayanak: "TBK m.72",
    aciklama:
      "Zarar gorenin zarari ve tazminat yukumlusunu ogrendigi tarihten itibaren 2 yil, her halde fiilin islendigi tarihten itibaren 10 yil. " +
      "Fiil ayni zamanda suc teskil ediyorsa ceza zamanasimiı uygulanir.",
    baslangic: "Zararin ve failin ogrenildigi tarih",
  },

  pratikNot:
    "Haksiz fiil unsurlari: fiil, hukuka aykirilik, zarar, illiyet bagi, kusur (TBK m.49). " +
    "Ispat yuku davacidadir. Muterafik kusur varsa tazminat indirilir (TBK m.52). " +
    "Ceza davasindaki beraat hukuk hakimini baglamaz (TBK m.74).",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16", "HMK m.107"],
  ozelKanunlar: ["TBK m.49-76 (haksiz fiillerden dogan borclar)"],
};

/** Madde 29: Vekaletsiz is gormeden dogan tazminat davasi */
const vekaletsizIsGorme: DavaTuru = {
  id: "vekaletsiz-is-gorme-tazminat",
  maddeNo: 29,
  ad: "Vekaletsiz is gormeden dogan tazminat davasi",
  kategori: "asliye-hukuk",
  altKategori: "tazminat",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri (HMK m.6)",
    ozelYetki: ["Isin goruldugu yer (HMK m.10)"],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, m.10",
    aciklama: "Genel yetki kurali ile ifa yeri ozel yetki kurali birlikte uygulanir.",
  },

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    ...TAZMINAT_MASRAF,
    toplamTahmini: 4000,
    aciklama: "Bilirkisi incelemesi gerekebilir. Masraf miktari isin niteligi ve degerine gore degisir.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Vekaletsiz gorulmus isin tanimi ve tarihi", zorunlu: true },
    { bilgi: "Karsi tarafin bilgileri", zorunlu: true },
    { bilgi: "Yapilan masraflar veya ugranilan zarar", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Yapilan masraflara iliskin belgeler", zorunlu: true },
    { belge: "Isin yapildigini gosteren belgeler/tanıklar", zorunlu: true },
    { belge: "Tanik listesi", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "10 yil (genel zamanasimiı)",
    yasalDayanak: "TBK m.146",
    aciklama: "Vekaletsiz is gormeden dogan alacak 10 yillik genel zamanasimiına tabidir.",
  },

  pratikNot:
    "TBK m.526-531 vekaletsiz is gormeyi duzenler. Baskasinin isini onun bilgisi veya izni olmadan goren kisi, " +
    "is sahibinin menfaatine uygun davranmak zorundadir. Is sahibinin menfaatine uygun gorulen is icin masraf talep edilebilir. " +
    "Is sahibinin iradesi veya menfaatine aykiri davranan kisi zarari tazmin eder.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.10"],
  ozelKanunlar: ["TBK m.526-531 (vekaletsiz is gorme)"],
};

/** Madde 30: Sebepsiz zenginlesmeden dogan iade/tazminat davasi */
const sebepsizZenginlesme: DavaTuru = {
  id: "sebepsiz-zenginlesme-iade",
  maddeNo: 30,
  ad: "Sebepsiz zenginlesmeden dogan iade/tazminat davasi",
  kategori: "asliye-hukuk",
  altKategori: "tazminat",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri (HMK m.6)",
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6",
    aciklama: "Genel yetki kurali uygulanir.",
  },

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    ...TAZMINAT_MASRAF,
    toplamTahmini: 3500,
    aciklama: "Bilirkisi incelemesi gerekebilir. Zenginlesme miktarinin tespiti yapilir.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Sebepsiz zenginlesmenin olusma sekli ve tarihi", zorunlu: true },
    { bilgi: "Davalinin bilgileri", zorunlu: true },
    { bilgi: "Iade talep edilen tutar veya malvarliginin degeri", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Odeme/devir belgesi (banka dekontu, makbuz)", zorunlu: true },
    { belge: "Hukuki sebebin bulunmadigini gosteren belgeler", zorunlu: true },
    { belge: "Ihtarname (gonderildiyse)", zorunlu: false, nereden: "Noterden" },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "2 yil (ogrenme) / 10 yil (zenginlesme)",
    yasalDayanak: "TBK m.82",
    aciklama:
      "Sebepsiz zenginlesme iade alacagi, hak sahibinin geri isteme hakkini ogrenmesinden itibaren 2 yil, " +
      "her halde zenginlesmenin gerceklesmesinden itibaren 10 yil gecmekle zamanasimiına ugrar.",
    baslangic: "Hak sahibinin geri isteme hakkini ogrendigi tarih",
  },

  pratikNot:
    "TBK m.77-82 sebepsiz zenginlesmeyi duzenler. Gecerli bir sebep olmaksizin baskasinin zararina zenginlesen kisi, " +
    "bu zenginlesmeyi geri vermekle yukumludur. Sebepsiz zenginlesme davasinda tali (ikincil) nitelik onemlidir: " +
    "baska bir hukuki koruma yolu varsa oncelikle o kullanilmalidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6"],
  ozelKanunlar: ["TBK m.77-82 (sebepsiz zenginlesme)"],
};

/** Madde 31: Adam calistıranin sorumluluguna dayali tazminat davasi */
const adamCalistiranSorumluluk: DavaTuru = {
  id: "adam-calistiran-sorumluluk-tazminat",
  maddeNo: 31,
  ad: "Adam calistiranin sorumluluguna dayali tazminat davasi",
  kategori: "asliye-hukuk",
  altKategori: "tazminat",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TAZMINAT_GENEL_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: TAZMINAT_MASRAF,

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Zarara neden olan olay ve tarihi", zorunlu: true },
    { bilgi: "Calisani (fiili faili) bilgileri", zorunlu: true },
    { bilgi: "Adam calistiranin (isverenin) bilgileri", zorunlu: true },
    { bilgi: "Calisanin gorevi sirasinda zarar verdigi bilgisi", zorunlu: true },
    { bilgi: "Ugranilan zararin tutari", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Olay tutanagi / rapor", zorunlu: true },
    { belge: "Zarar belgeleri (fatura, rapor, ekspertiz)", zorunlu: true },
    { belge: "Calisanin is sozlesmesi veya SGK kaydı", zorunlu: false, aciklama: "Istihdam iliskisini ispatlamak icin" },
    { belge: "Tanik listesi", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "2 yil (ogrenme) / 10 yil (fiil)",
    yasalDayanak: "TBK m.72",
    baslangic: "Zararin ve sorumlunun ogrenildigi tarih",
  },

  pratikNot:
    "TBK m.66 adam calistiranin sorumlulugunu duzenler. Adam calistiran, calisaninin gorevini yerine getirirken " +
    "verdigi zarardan sorumlulugu karinesi ile sorumlulmustur (kurtuluskaniti sistemi). " +
    "Calisanin secimi, talimat verilmesi ve gozetimde gerekli ozeni gosterdigini ispatlarsa sorumluluktan kurtulabilir. " +
    "Calisanla birlikte davalı gosterilebilir (muteselsisl sorumluluk).",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16"],
  ozelKanunlar: ["TBK m.66 (adam calistiranin sorumlulugu)"],
};

/** Madde 32: Yapi malikinin sorumlulugu davasi */
const yapiMalikiSorumluluk: DavaTuru = {
  id: "yapi-maliki-sorumluluk-tazminat",
  maddeNo: 32,
  ad: "Yapi malikinin sorumlulugu davasi",
  kategori: "asliye-hukuk",
  altKategori: "tazminat",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: {
    ...TAZMINAT_GENEL_YETKI,
    ozelYetki: [
      "Haksiz fiilin islendigi yer (HMK m.16)",
      "Zararin meydana geldigi yer (HMK m.16)",
      "Zarar gorenin yerlesim yeri (HMK m.16)",
      "Yapinin bulundugu yer (HMK m.12 — ayni hakka iliskiinse)",
    ],
  },

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    ...TAZMINAT_MASRAF,
    bilirkisiUcreti: BILIRKISI_UCRETI * 2,
    kesfUcreti: KESF_UCRETI,
    toplamTahmini: 10000,
    aciklama: "Insaat bilirkisi ve kesif zorunludur. Yapinin bakim ve kusur durumu incelenir.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Zarara neden olan yapinin adresi ve bilgileri", zorunlu: true },
    { bilgi: "Yapi malikinin bilgileri", zorunlu: true },
    { bilgi: "Olayin tarihi ve detaylari (yapinin cökmesi, parcalanmasi vb.)", zorunlu: true },
    { bilgi: "Ugranilan zararin tutari", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Olay tutanagi / rapor", zorunlu: true },
    { belge: "Zarar belgeleri (fatura, rapor, ekspertiz)", zorunlu: true },
    { belge: "Yapinin tapu kaydi", zorunlu: true, nereden: "Tapu ve Kadastro Mudurlugu / e-Devlet" },
    { belge: "Fotograflar (yapi ve zarar)", zorunlu: false },
    { belge: "Belediye yapi denetim raporlari (varsa)", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "2 yil (ogrenme) / 10 yil (fiil)",
    yasalDayanak: "TBK m.72",
    baslangic: "Zararin ogrenildigi tarih",
  },

  pratikNot:
    "TBK m.69 yapi malikinin sorumlulugunu duzenler. Yapi maliki, yapinin yapim bozuklugu veya bakim eksikliginden " +
    "dogan zararlardan kusursuz olarak sorumludur. Kurtuluş kaniti yok (ağır — kesin sorumluluk). " +
    "Malik, zarara sebep olan ucuncu kisiye rucu edebilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16"],
  ozelKanunlar: ["TBK m.69 (yapi malikinin sorumlulugu)"],
};

/** Madde 33: Hayvan sahibinin sorumlulugu davasi */
const hayvanSahibiSorumluluk: DavaTuru = {
  id: "hayvan-sahibi-sorumluluk-tazminat",
  maddeNo: 33,
  ad: "Hayvan sahibinin sorumlulugu davasi",
  kategori: "asliye-hukuk",
  altKategori: "tazminat",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TAZMINAT_GENEL_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    ...TAZMINAT_MASRAF,
    toplamTahmini: 4000,
    aciklama: "Bilirkisi incelemesi gerekebilir. Saglik zarari varsa saglik raporu masrafi eklenir.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Olayin tarihi, yeri ve detaylari", zorunlu: true },
    { bilgi: "Hayvan sahibinin bilgileri", zorunlu: true },
    { bilgi: "Hayvanin cinsi ve ozellikleri", zorunlu: true },
    { bilgi: "Ugranilan zararin detayi ve tutari", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Olay tutanagi / rapor (polis, jandarma)", zorunlu: true },
    { belge: "Saglik raporu (bedensel zarar varsa)", zorunlu: false },
    { belge: "Zarar belgeleri (fatura, ekspertiz)", zorunlu: true },
    { belge: "Tanik listesi", zorunlu: false },
    { belge: "Fotograflar", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "2 yil (ogrenme) / 10 yil (fiil)",
    yasalDayanak: "TBK m.72",
    baslangic: "Zararin ve hayvan sahibinin ogrenildigi tarih",
  },

  pratikNot:
    "TBK m.67 hayvan sahibinin sorumlulugunu duzenler. Hayvan sahibi veya hayvan uzerinde fiilen hakimiyet kullanan kisi, " +
    "hayvanin verdigi zarardan kurtuluskaniti sistemiyle sorumludur. " +
    "Gerekli ozenin gosterildigini ispatlarsa sorumluluktan kurtulabilir. " +
    "Sahipsiz hayvanlarda belediye sorumlu olabilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16"],
  ozelKanunlar: ["TBK m.67-68 (hayvan sahibinin sorumlulugu)"],
};

/** Madde 34: Tehlike sorumluluguna dayali tazminat davasi */
const tehlikeSorumlulugu: DavaTuru = {
  id: "tehlike-sorumlulugu-tazminat",
  maddeNo: 34,
  ad: "Tehlike sorumluluguna dayali tazminat davasi",
  kategori: "asliye-hukuk",
  altKategori: "tazminat",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: TAZMINAT_GENEL_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    ...TAZMINAT_MASRAF,
    bilirkisiUcreti: BILIRKISI_UCRETI * 2,
    toplamTahmini: 8000,
    aciklama: "Teknik bilirkisi incelemesi zorunludur. Ozel uzmanlik alanina gore bilirkisi ucreti degisebilir.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tehlikeli faaliyetin niteligi", zorunlu: true },
    { bilgi: "Isletme/faaliyet sahibinin bilgileri", zorunlu: true },
    { bilgi: "Olayin tarihi ve detaylari", zorunlu: true },
    { bilgi: "Ugranilan zararin tutari", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Olay tutanagi / rapor", zorunlu: true },
    { belge: "Zarar belgeleri", zorunlu: true },
    { belge: "Tehlikeli faaliyetin ruhsat/izin belgeleri", zorunlu: false },
    { belge: "Saglik raporlari (bedensel zarar varsa)", zorunlu: false },
    { belge: "Tanik listesi", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "2 yil (ogrenme) / 10 yil (fiil)",
    yasalDayanak: "TBK m.72",
    baslangic: "Zararin ogrenildigi tarih",
  },

  pratikNot:
    "TBK m.71 tehlike sorumlulugunu duzenler. Onemli olcude tehlike arz eden bir isletmenin faaliyetinden zarar dogdugunda, " +
    "isletme sahibi kusursuz olarak (kesin olarak) sorumludur. Kurtulus kaniti yoktur. " +
    "Yalnizca mucbir sebep, zarar gorenin veya ucuncu kisinin agir kusuru illiyet bagini keser.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16"],
  ozelKanunlar: ["TBK m.71 (tehlike sorumlulugu)"],
};

/** Madde 35: Motorlu arac kazalarindan dogan tazminat davasi */
const motorluAracKazaTazminat: DavaTuru = {
  id: "motorlu-arac-kaza-tazminat",
  maddeNo: 35,
  ad: "Motorlu arac kazalarindan dogan tazminat davasi",
  kategori: "asliye-hukuk",
  altKategori: "tazminat",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri (HMK m.6)",
    ozelYetki: [
      "Kazanin meydana geldigi yer (HMK m.16)",
      "Davacinin (zarar gorenin) yerlesim yeri (HMK m.16)",
      "Sigortacinin merkez veya subesi (2918 sy. K.)",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, m.16, 2918 sy. KTK m.110",
    aciklama:
      "Motorlu arac kazalarindan dogan tazminat davasinda genis yetki secenegi vardir. " +
      "Sigorta sirketi de ilgili mahkemede dava edilebilir.",
  },

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    ...TAZMINAT_MASRAF,
    bilirkisiUcreti: BILIRKISI_UCRETI * 2,
    toplamTahmini: 9000,
    aciklama:
      "Kusur bilirkisi (trafik), aktuer bilirkisi (hesaplama), arac deger bilirkisi incelemesi gerekebilir.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Kaza tarihi, yeri ve sekli", zorunlu: true },
    { bilgi: "Karsi taraf (surucu, arac sahibi, sigorta) bilgileri", zorunlu: true },
    { bilgi: "Arac bilgileri (plaka, ruhsat)", zorunlu: true },
    { bilgi: "Sigorta police bilgileri (ZMSS, kasko)", zorunlu: true },
    { bilgi: "Ugranilan zararin detayi ve tutari", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Kaza tespit tutanagi", zorunlu: true, nereden: "Trafik polisi / jandarma" },
    { belge: "Sigorta police ornegi (ZMSS)", zorunlu: true, nereden: "Sigorta sirketi / SBM" },
    { belge: "Arac ruhsati fotokopisi", zorunlu: true },
    { belge: "Saglik raporlari (yaralanma varsa)", zorunlu: false },
    { belge: "Arac hasar fotoğraflari", zorunlu: false },
    { belge: "Ekspertiz raporu", zorunlu: false },
    { belge: "Sigorta sirketine basvuru ve ret cevabi", zorunlu: false, aciklama: "Sigorta sirketine onceden basvuru yapilmalidir" },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "2 yil (ogrenme) / 10 yil (fiil) — KTK m.109: 2 yil / 10 yil",
    yasalDayanak: "2918 sy. KTK m.109, TBK m.72",
    aciklama:
      "KTK m.109 ozel zamanasimiı duzenlenmistir. Ceza zamanasimiı daha uzunsa o uygulanir.",
    baslangic: "Kaza tarihi / zararin ogrenildigi tarih",
  },

  pratikNot:
    "2918 sy. KTK m.85 vd. motorlu arac isletme sorumlulugunu duzenler. Isletenin kusursuz sorumlulugu vardir (tehlike sorumlulugu). " +
    "ZMSS sigortacisina dogrudan dava acilabilir. Sigortaciya basvuru zorunlulugu (KTK m.97) kontrol edilmelidir. " +
    "Sigorta Tahkim Komisyonuna da basvuru mumkundur.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16", "HMK m.107"],
  ozelKanunlar: [
    "2918 sy. KTK m.85-90 (sorumluluk)",
    "2918 sy. KTK m.97 (sigortaciya basvuru)",
    "2918 sy. KTK m.109 (zamanasimiı)",
  ],
};

/** Madde 36: Trafik kazasi nedeniyle maddi ve manevi tazminat davasi */
const trafikKazasiTazminat: DavaTuru = {
  id: "trafik-kazasi-maddi-manevi-tazminat",
  maddeNo: 36,
  ad: "Trafik kazasi nedeniyle maddi ve manevi tazminat davasi",
  kategori: "asliye-hukuk",
  altKategori: "tazminat",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri (HMK m.6)",
    ozelYetki: [
      "Kazanin meydana geldigi yer (HMK m.16)",
      "Davacinin yerlesim yeri (HMK m.16)",
      "Sigortacinin merkez veya subesi",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, m.16, 2918 sy. KTK m.110",
    aciklama: "Madde 35 ile ayni yetki kurallari gecerlidir.",
  },

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    ...TAZMINAT_MASRAF,
    bilirkisiUcreti: BILIRKISI_UCRETI * 2,
    toplamTahmini: 10000,
    aciklama:
      "Kusur bilirkisi, aktuer bilirkisi, gerekirse adli tip / saglik bilirkisi incelemesi yapilir.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Kaza tarihi, yeri ve olusum sekli", zorunlu: true },
    { bilgi: "Karsi taraf (surucu, malik, sigorta) bilgileri", zorunlu: true },
    { bilgi: "Yaralamanin niteligi ve tedavi sureci", zorunlu: true },
    { bilgi: "Maddi zarar detayi (arac hasari, tedavi giderleri, kazanc kaybi)", zorunlu: true },
    { bilgi: "Manevi zarar gecrekceleri", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Kaza tespit tutanagi", zorunlu: true, nereden: "Trafik polisi / jandarma" },
    { belge: "Saglik raporlari ve tedavi belgeleri", zorunlu: true },
    { belge: "Sigorta police ornegi (ZMSS)", zorunlu: true, nereden: "Sigorta sirketi / SBM" },
    { belge: "Arac ruhsati fotokopisi", zorunlu: true },
    { belge: "Gelir belgesi (kazanc kaybi varsa)", zorunlu: false },
    { belge: "Sigorta basvurusu ve cevabi", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "2 yil (ogrenme) / 10 yil (fiil)",
    yasalDayanak: "2918 sy. KTK m.109, TBK m.72",
    baslangic: "Kaza tarihi",
  },

  pratikNot:
    "Trafik kazasindan doğan maddi ve manevi tazminat birlikte talep edilebilir. " +
    "ZMSS sigortacisina doğrudan dava acilabiblir; ancak manevi tazminat ZMSS kapsaminda degildir. " +
    "Cismani zararlarda sigortaciya basvuru zorunludur (KTK m.97). " +
    "Sigorta Tahkim Komisyonuna da basvuru mumkundur (opsiyonel).",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16", "HMK m.107"],
  ozelKanunlar: [
    "2918 sy. KTK m.85-90, m.97, m.109",
    "TBK m.49-56 (haksiz fiil + manevi tazminat)",
  ],
};

/** Madde 37: Deger kaybi tazminati davasi (arac) */
const degerKaybiTazminati: DavaTuru = {
  id: "deger-kaybi-tazminati-arac",
  maddeNo: 37,
  ad: "Deger kaybi tazminati davasi (arac)",
  kategori: "asliye-hukuk",
  altKategori: "tazminat",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri (HMK m.6)",
    ozelYetki: [
      "Kazanin meydana geldigi yer (HMK m.16)",
      "Davacinin yerlesim yeri (HMK m.16)",
      "Sigortacinin merkez veya subesi",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, m.16",
    aciklama: "Trafik kazasindan dogan tazminat davalariyla ayni yetki kurallari gecerlidir.",
  },

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    ...TAZMINAT_MASRAF,
    bilirkisiUcreti: BILIRKISI_UCRETI,
    toplamTahmini: 5000,
    aciklama: "Arac deger kaybi hesaplamasi icin ekspertiz bilirkisi incelemesi yapilir.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Kaza tarihi ve yeri", zorunlu: true },
    { bilgi: "Arac bilgileri (plaka, marka, model, model yili, km)", zorunlu: true },
    { bilgi: "Hasar detaylari ve onarim durumu", zorunlu: true },
    { bilgi: "Karsi taraf ve sigorta bilgileri", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Kaza tespit tutanagi", zorunlu: true, nereden: "Trafik polisi / jandarma" },
    { belge: "Arac ruhsati fotokopisi", zorunlu: true },
    { belge: "Onarim faturasi / ekspertiz raporu", zorunlu: true },
    { belge: "Tramer kaydi", zorunlu: true, nereden: "SBM (Sigorta Bilgi ve Gozetim Merkezi)" },
    { belge: "Sigorta police ornegi (ZMSS)", zorunlu: true, nereden: "Sigorta sirketi / SBM" },
    { belge: "Sigorta sirketine deger kaybi basvurusu ve cevabi", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "2 yil (ogrenme) / 10 yil (fiil)",
    yasalDayanak: "2918 sy. KTK m.109, TBK m.72",
    baslangic: "Kaza tarihi",
  },

  pratikNot:
    "Deger kaybi, aracin kazadan onceki piyasa degeri ile kazadan sonraki piyasa degeri arasindaki farktir. " +
    "ZMSS sigortacisina doğrudan talep edilebilir. Sigortaci reddederse dava veya tahkim yoluna basvurulur. " +
    "Sigorta Tahkim Komisyonu uygulamada yaygindir ve hizli sonuc alinir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16"],
  ozelKanunlar: [
    "2918 sy. KTK m.85, m.97, m.109",
    "Karayollari Motorlu Araclar Zorunlu Mali Sorumluluk Sigortasi Genel Sartlari",
  ],
};

/** Madde 38: Malpraktis (tibbi uygulama hatasi) tazminati davasi */
const malpraktisTazminat: DavaTuru = {
  id: "malpraktis-tibbi-hata-tazminat",
  maddeNo: 38,
  ad: "Malpraktis (tibbi uygulama hatasi) tazminati davasi",
  kategori: "asliye-hukuk",
  altKategori: "tazminat",

  gorevliMahkeme: {
    mahkeme: "Asliye Hukuk Mahkemesi",
    yasalDayanak: "HMK m.2",
    aciklama:
      "Ozel hastane ve ozel hekime karsi acilan malpraktis davalari Asliye Hukuk Mahkemesinde gorulur. " +
      "Kamu hastanesinde gerceklesen tibbi hata icin idari yargi (tam yargi davasi) gorevlidir.",
    ozelDurum:
      "DIKKAT: Kamu hastanesinde gerceklesen tibbi hatalar icin Idare Mahkemesine tam yargi davasi acilmalidir. " +
      "Bu dosya yalnizca OZEL saglik kuruluslarindaki malpraktis icin gecerlidir.",
  },
  yetkiliMahkeme: TAZMINAT_GENEL_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
    bilirkisiUcreti: BILIRKISI_UCRETI * 3,
    tanikUcreti: TANIK_UCRETI * 2,
    toplamTahmini: 15000,
    aciklama:
      "Adli Tip Kurumu veya universite hastanesinden bilirkisi raporu alinir. " +
      "Birden fazla bilirkisi heyeti gerekebilir. ATK 2. veya 3. Ihtisas Kurulu gorusü alinir.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tedavinin yapildigi saglik kurulusu ve tarih", zorunlu: true },
    { bilgi: "Tedaviyi yapan hekim/hekimlerin bilgileri", zorunlu: true },
    { bilgi: "Tibbi hatanin niteligi ve sonuclari", zorunlu: true },
    { bilgi: "Mevcut saglik durumu", zorunlu: true },
    { bilgi: "Tedavi giderleri ve diger maddi zararlar", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Tum tibbi kayitlar (epikriz, ameliyat notu, lab sonuclari)", zorunlu: true, nereden: "Saglik kurulusu" },
    { belge: "Goruntuleme kayitlari (rontgen, MR, BT)", zorunlu: true, nereden: "Saglik kurulusu" },
    { belge: "Tedavi faturalari ve odemeler", zorunlu: true },
    { belge: "Saglik kurulu raporu (maluliyet)", zorunlu: false, nereden: "Universite hastanesi" },
    { belge: "Aydinlatilmis onam formu (imzalanmissa)", zorunlu: false, nereden: "Saglik kurulusu" },
    { belge: "Sikayette bulunulduysa Il Saglik Mudurlugu kararı", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "Haksiz fiil: 2/10 yil; Sozlesme (vekalet): 5 yil; Ceza zamanasimiı daha uzunsa o uygulanir",
    yasalDayanak: "TBK m.72, TBK m.147 (vekalet), TCK m.66 (ceza zamanasimiı)",
    aciklama:
      "Hekim-hasta iliskisi vekalet sozlesmesi niteligi tasir. Vekalet sozlesmesinden dogan alacak 5 yil. " +
      "Ayni zamanda haksiz fiil sorumlulugu da uygulanir. Suc teskil ediyorsa ceza zamanasimiı uygulanir.",
    baslangic: "Tibbi hatanin ogrenildigi tarih (kesin taninin konuldugu tarih olabilir)",
  },

  pratikNot:
    "Tibbi malpraktis davasinda hekimin kusuru aranir (TBK m.506 vekalet sozlesmesi ozeni). " +
    "Hastane ise adam calistiran sifatiyla kusursuz sorumludur (TBK m.66). " +
    "Aydinlatilmis onam (bilgilendirme ve riza) alinmamissa hekim kusursuz da olsa sorumlu tutulabilir. " +
    "Kamu hastanesinde gerceklesen hata icin idari yargi (Idare Mahkemesi — tam yargi davasi) gorevlidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16", "HMK m.107"],
  ozelKanunlar: [
    "TBK m.49 (haksiz fiil)",
    "TBK m.66 (adam calistiran)",
    "TBK m.502-514 (vekalet sozlesmesi)",
    "1219 sy. Tababet Kanunu",
    "Hasta Haklari Yonetmeligi",
  ],
};

/** Madde 39: Avukat hatasi (vekil sorumlulugu) tazminati davasi */
const avukatHatasiTazminat: DavaTuru = {
  id: "avukat-hatasi-vekil-sorumluluk-tazminat",
  maddeNo: 39,
  ad: "Avukat hatasi (vekil sorumlulugu) tazminati davasi",
  kategori: "asliye-hukuk",
  altKategori: "tazminat",

  gorevliMahkeme: ASLIYE_HUKUK_GOREV,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri (HMK m.6)",
    ozelYetki: [
      "Sozlesmenin ifa yeri (avukatin burosu) (HMK m.10)",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, m.10",
    aciklama: "Genel yetki kurali ile ifa yeri ozel yetki kurali birlikte uygulanir.",
  },

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    ...TAZMINAT_MASRAF,
    toplamTahmini: 5000,
    aciklama:
      "Bilirkisi (avukat meslektaslarindan olusan heyet) incelemesi zorunludur. " +
      "Avukatin mesleki ozen yukumlulugune uyup uymadigı arastirilir.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Avukatin bilgileri (ad, baro, sicil)", zorunlu: true },
    { bilgi: "Vekalet sozlesmesinin detaylari", zorunlu: true },
    { bilgi: "Avukatin kusurlu davranisinin niteligi", zorunlu: true, aciklama: "Sure kacirma, yanlis islem, ihmal vb." },
    { bilgi: "Ugranilan zararin tutari ve hesaplama sekli", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Vekaletname ve avukatlik sozlesmesi", zorunlu: true },
    { belge: "Ilgili dava dosyasi evraklari", zorunlu: true, aciklama: "Avukatin kusurunu gosterecek belgeler" },
    { belge: "Avukata yapilan odeme makbuzlari", zorunlu: false },
    { belge: "Baro sikayet basvurusu ve sonucu (varsa)", zorunlu: false },
    { belge: "Zarari gosteren belgeler", zorunlu: true },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "5 yil (vekalet sozlesmesi zamanasimiı)",
    yasalDayanak: "TBK m.147/5",
    aciklama:
      "Vekalet sozlesmesinden doğan alacak 5 yillik zamanasimiına tabidir. Haksiz fiil niteligi tasirsa TBK m.72 de uygulanabilir.",
    baslangic: "Zararin ogrenildigi tarih",
  },

  pratikNot:
    "Avukat, vekaleti ozenle ifa etmekle yukumludur (TBK m.506, Av. K. m.34). " +
    "Avukatin mesleki sorumluluk sigortasi kapsaminda sigorta sirketine de dava acilabilir. " +
    "Avukatin kusuru: sure kacirma, kanun yoluna basvurmama, yanlis mahkemede dava acma, delilleri sunmama vb. " +
    "Baro disiplin sorusturmasiyla birlikte yurutulecek olup, tazminat davasinda baroya bildirim yapilabilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.10"],
  ozelKanunlar: [
    "1136 sy. Avukatlik Kanunu m.34, m.40",
    "TBK m.502-514 (vekalet sozlesmesi)",
    "Avukatlik Mesleki Sorumluluk Sigortasi",
  ],
};

/** Madde 40: Hekimin hukuki sorumlulugundan kaynakli tazminat davasi */
const hekimSorumlulukTazminat: DavaTuru = {
  id: "hekim-hukuki-sorumluluk-tazminat",
  maddeNo: 40,
  ad: "Hekimin hukuki sorumlulugundan kaynakli tazminat davasi",
  kategori: "asliye-hukuk",
  altKategori: "tazminat",

  gorevliMahkeme: {
    mahkeme: "Asliye Hukuk Mahkemesi",
    yasalDayanak: "HMK m.2",
    aciklama:
      "Ozel saglik kurulusunda calisan veya serbest calisan hekime karsi acilan dava Asliye Hukuk Mahkemesinde gorulur.",
    ozelDurum:
      "Kamu hastanesinde gorev yapan hekimlere dogrudan dava acilamaz; idareye (hastaneye) Idare Mahkemesinde tam yargi davasi acilir.",
  },
  yetkiliMahkeme: TAZMINAT_GENEL_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 2,
    bilirkisiUcreti: BILIRKISI_UCRETI * 3,
    toplamTahmini: 13000,
    aciklama:
      "ATK Ihtisas Kurulu veya universite hastanesi bilirkisi raporu alinir. Birden fazla rapor gerekebilir.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Hekimin bilgileri ve gorev yaptigi kurum", zorunlu: true },
    { bilgi: "Tedavinin tarihi ve niteligi", zorunlu: true },
    { bilgi: "Iddia edilen hatanin detaylari", zorunlu: true },
    { bilgi: "Mevcut saglik durumu ve maluliyet", zorunlu: true },
    { bilgi: "Ugranilan maddi ve manevi zarar", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Tum tibbi kayitlar (epikriz, ameliyat notu)", zorunlu: true, nereden: "Saglik kurulusu" },
    { belge: "Goruntuleme kayitlari (MR, BT, rontgen)", zorunlu: true, nereden: "Saglik kurulusu" },
    { belge: "Aydinlatilmis onam formu", zorunlu: false, nereden: "Saglik kurulusu" },
    { belge: "Tedavi faturalari", zorunlu: true },
    { belge: "Saglik kurulu raporu (maluliyet orani)", zorunlu: false, nereden: "Universite hastanesi" },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "Vekalet: 5 yil; Haksiz fiil: 2/10 yil; Ceza zamanasimiı varsa o uygulanir",
    yasalDayanak: "TBK m.72, TBK m.147/5",
    baslangic: "Hatanin ogrenildigi tarih",
  },

  pratikNot:
    "Madde 38 (malpraktis) ile benzer olmakla birlikte, bu dava turu ozellikle hekimin sahsi sorumluluguna odaklanir. " +
    "Hekim-hasta iliskisi vekalet sozlesmesi (eser sozlesmesi degil) niteligindedir. " +
    "Hekim sonucu degil, ozeni taahhut eder. Komplikasyon ile malpraktis ayrimi yapilmalidir. " +
    "Kamu hekimi icin idareye tam yargi davasi acilir; hekim ancak idarenin rucusuyla sorumlu olur.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16", "HMK m.107"],
  ozelKanunlar: [
    "TBK m.502-514 (vekalet sozlesmesi)",
    "1219 sy. Tababet Kanunu",
    "Hasta Haklari Yonetmeligi",
  ],
};

/** Madde 41: Hastanenin kusursuz sorumluluguna dayali tazminat davasi */
const hastaneKusursuzSorumluluk: DavaTuru = {
  id: "hastane-kusursuz-sorumluluk-tazminat",
  maddeNo: 41,
  ad: "Hastanenin kusursuz sorumluluguna dayali tazminat davasi",
  kategori: "asliye-hukuk",
  altKategori: "tazminat",

  gorevliMahkeme: {
    mahkeme: "Asliye Hukuk Mahkemesi",
    yasalDayanak: "HMK m.2",
    aciklama:
      "Ozel hastane aleyhine acilan dava Asliye Hukuk Mahkemesinde gorulur (adam calistiran sorumlulugu).",
    ozelDurum:
      "Kamu hastanesi aleyhine Idare Mahkemesinde tam yargi davasi acilir. Bu dosya yalnizca OZEL hastaneler icindir.",
  },
  yetkiliMahkeme: TAZMINAT_GENEL_YETKI,

  harclar: NISPI_HARC_BILGISI,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
    bilirkisiUcreti: BILIRKISI_UCRETI * 3,
    toplamTahmini: 15000,
    aciklama:
      "ATK Ihtisas Kurulu veya universite hastanesi bilirkisi raporu zorunludur. " +
      "Birden fazla bilirkisi heyeti gorusü alinabilir.",
  },

  ozelVekaletname: STANDART_VEKALETNAME,

  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Hastanenin adi ve adresi", zorunlu: true },
    { bilgi: "Tedaviyi yapan hekim/hekimlerin bilgileri", zorunlu: true },
    { bilgi: "Tedavinin tarihi ve niteligi", zorunlu: true },
    { bilgi: "Iddia edilen hatanin detaylari", zorunlu: true },
    { bilgi: "Ugranilan maddi ve manevi zarar tutari", zorunlu: true },
  ],

  gerekliBelgeler: [
    { belge: "Tum tibbi kayitlar (epikriz, ameliyat notu, hemsiresire gozlem formu)", zorunlu: true, nereden: "Hastane" },
    { belge: "Goruntuleme kayitlari", zorunlu: true, nereden: "Hastane" },
    { belge: "Aydinlatilmis onam formu", zorunlu: false, nereden: "Hastane" },
    { belge: "Tedavi faturalari ve odemeler", zorunlu: true },
    { belge: "Saglik kurulu raporu (maluliyet)", zorunlu: false, nereden: "Universite hastanesi" },
    { belge: "Il Saglik Mudurlugu sikayet basvurusu (varsa)", zorunlu: false },
  ],

  yargilamaUsulu: "yazili",
  arabuluculuk: ARABULUCULUK_YOK,
  zamanasimi: {
    sure: "Haksiz fiil: 2/10 yil; Sozlesme: 5 yil; Ceza zamanasimiı daha uzunsa o uygulanir",
    yasalDayanak: "TBK m.72, TBK m.147",
    baslangic: "Hatanin ogrenildigi tarih",
  },

  pratikNot:
    "Ozel hastane, istihdam ettigi hekimlerin verdigi zarardan adam calistiran sifatiyla kusursuz sorumludur (TBK m.66). " +
    "Hastane, kurtulus kaniti gostererek sorumluluktan kurtulabilir (ozeni gosterdigini ispatlarsa). " +
    "Ancak uygulamada kurtulus kaniti kabul edilen cok azdir. " +
    "Organizasyon kusuru (yetersiz ekipman, personel eksikligi, enfeksiyon kontrolu) ayrica sorumluluk doğurur. " +
    "Hastane ve hekim birlikte davalı gosterilebilir (muteselsisl sorumluluk).",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16", "HMK m.107"],
  ozelKanunlar: [
    "TBK m.66 (adam calistiran sorumlulugu)",
    "TBK m.502-514 (vekalet sozlesmesi — hastane-hasta iliskisi)",
    "1219 sy. Tababet Kanunu",
    "Ozel Hastaneler Yonetmeligi",
    "Hasta Haklari Yonetmeligi",
  ],
};

// ---------------------------------------------------------------------------
// EXPORT — Tum dava turleri tek dizide
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Ortak tanimlar — Bolum 1 Part 2: Asliye Hukuk (madde 42-79)
// ---------------------------------------------------------------------------

/** Asliye Hukuk Mahkemesi gorev bilgisi (HMK m.2) */
const asliyeHukukGorev: GorevliMahkeme = {
  mahkeme: "Asliye Hukuk Mahkemesi",
  yasalDayanak: "HMK m.2",
  aciklama:
    "Dava konusunun deger veya tutarina bakilmaksizin malvarligina iliskin davalarda ve sahis varligina iliskin davalarda gorevli mahkeme, aksine bir duzenleme bulunmadikca asliye hukuk mahkemesidir.",
};

/** Asliye Hukuk — soybagi davalari icin ozel gorev (Aile Mahkemesi olmayan yerlerde) */
const asliyeHukukSoybagGorev: GorevliMahkeme = {
  mahkeme: "Asliye Hukuk Mahkemesi (Aile Mahkemesi sifatiyla)",
  yasalDayanak: "4787 sy. Kanun m.4, HMK m.2",
  aciklama:
    "Soybagi davalari kural olarak aile mahkemesinin gorevine girer. Aile mahkemesi kurulmamis yerlerde asliye hukuk mahkemesi aile mahkemesi sifatiyla bakar.",
  ozelDurum:
    "Aile mahkemesi bulunan yerlerde gorevli mahkeme aile mahkemesidir.",
};

/** Genel yetki — davalinin yerlesim yeri (HMK m.6) */
const genelYetki: YetkiliMahkeme = {
  genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
  kesinYetkiMi: false,
  yasalDayanak: "HMK m.6",
  aciklama:
    "Genel yetkili mahkeme, davalinin dava tarihindeki yerlesim yeri mahkemesidir.",
};

/** Sozlesme davalari yetkisi — ifa yeri + genel yetki */
const sozlesmeYetkisi: YetkiliMahkeme = {
  genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
  ozelYetki: ["Sozlesmenin ifa yeri mahkemesi (HMK m.10)"],
  kesinYetkiMi: false,
  yasalDayanak: "HMK m.6, m.10",
  aciklama:
    "Sozlesmeden dogan davalarda, sozlesmenin ifa edilecegi yer mahkemesinde de dava acilabilir.",
};

/** Miras davalari yetkisi — kesin yetki */
const mirasKesinYetki: YetkiliMahkeme = {
  genelYetki: "Mirasbirakanin son yerlesim yeri mahkemesi (HMK m.11)",
  kesinYetki:
    "Mirasbirakanin son yerlesim yeri — KESIN YETKI (HMK m.11/1)",
  kesinYetkiMi: true,
  yasalDayanak: "HMK m.11",
  aciklama:
    "Miras hukukundan dogan davalarda kesin yetkili mahkeme, mirasbirakanin olumundeki son yerlesim yeri mahkemesidir. Taraflar anlasmayla degistiremez.",
};

/** Soybagi davalari yetkisi */
const soybagYetkisi: YetkiliMahkeme = {
  genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
  ozelYetki: [
    "Davacinin yerlesim yeri mahkemesi (TMK m.283, m.284)",
    "Cocugun oturma yeri mahkemesi",
  ],
  kesinYetkiMi: false,
  yasalDayanak: "HMK m.6, TMK m.283, m.284",
  aciklama:
    "Soybagi davalarinda davalinin veya davacinin yerlesim yeri mahkemesi yetkilidir.",
};

/** Nispi harcli davalar icin harc bilgisi */
const nispiHarc: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "nispi",
  nispiOran: NISPI_HARC_ORANI * 1000, // binde cinsinden
  pesinHarcOran: 0.25,
  aciklama:
    "Nispi harca tabi dava. Dava degerinin binde 68,31'i oraninda harc hesaplanir. Pesinharcolarakbunun 1/4'u dava acilirken odenir.",
};

/** Maktu harcli davalar icin harc bilgisi */
const maktuHarc: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "maktu",
  aciklama:
    "Maktu harca tabi dava. Basvurma harci ve maktu karar ilam harci odenir.",
};

/** Standart masraf bilgisi (tebligat + tanik) */
const standartMasraf: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  tanikUcreti: TANIK_UCRETI * 3,
  toplamTahmini: 1500,
  aciklama: "Tebligat, gider avansi ve tanik masraflari dahil tahmini tutar.",
};

/** Bilirkisi gerektiren davalar icin masraf */
const bilirkisiMasraf: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  bilirkisiUcreti: BILIRKISI_UCRETI,
  tanikUcreti: TANIK_UCRETI * 3,
  toplamTahmini: 5000,
  aciklama:
    "Tebligat, bilirkisi ucreti, gider avansi ve tanik masraflari dahil tahmini tutar.",
};

/** Kesif + bilirkisi gerektiren davalar icin masraf */
const kesfiBilirkisiMasraf: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  bilirkisiUcreti: BILIRKISI_UCRETI,
  kesfUcreti: KESF_UCRETI,
  tanikUcreti: TANIK_UCRETI * 3,
  toplamTahmini: 9000,
  aciklama:
    "Tebligat, bilirkisi, kesif, gider avansi ve tanik masraflari dahil tahmini tutar.",
};

/** Arabuluculuk — zorunlu degil */
const arabuluculukYok: ArabuluculukBilgisi = {
  davaSarti: false,
  ihtiyari: true,
  aciklama: "Dava sarti olarak arabuluculuk zorunlu degildir. Ihtiyari arabuluculuga basvurulabilir.",
};

// ---------------------------------------------------------------------------
// 1.3. Borclar Hukuku / Sozlesme Davalari (madde 42-54)
// ---------------------------------------------------------------------------

const alacakDavasi: DavaTuru = {
  id: "alacak-davasi-genel",
  maddeNo: 42,
  ad: "Alacak Davasi (Genel Borc Iliskileri)",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: sozlesmeYetkisi,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Yerlesim yeri adresi", zorunlu: true },
    { bilgi: "Alacagin miktar ve kaynagi (sozlesme, fatura vb.)", zorunlu: true },
    { bilgi: "Davalinin kimlik ve adres bilgileri", zorunlu: true },
    { bilgi: "Odeme yapilip yapilmadigi ve kalan bakiye", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Sozlesme veya borc belgesi", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Fatura veya odeme belgeleri", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Ihtarname (cekilmisse)", zorunlu: false, nereden: "Noter" },
    { belge: "Banka hesap dokumleri", zorunlu: false, nereden: "Banka" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "10 yil",
    yasalDayanak: "TBK m.146",
    aciklama: "Kanunda aksine bir hukum bulunmadikca her alacak 10 yillik zamanasimisuresine tabidir.",
    baslangic: "Alacagin muaccel oldugu tarih",
  },
  pratikNot:
    "Belirsiz alacak davasi (HMK m.107) olarak da acilabilir. Likit alacaklarda icra takibi yoluyla itirazin iptali daha avantajli olabilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.10", "HMK m.107", "HMK m.119"],
  ozelKanunlar: ["TBK m.83-98", "TBK m.146"],
};

const itirazinIptaliDavasi: DavaTuru = {
  id: "itirazin-iptali",
  maddeNo: 43,
  ad: "Itirazin Iptali Davasi",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
    ozelYetki: [
      "Icra takibinin yapildigi yer mahkemesi (IIK m.67)",
      "Sozlesmenin ifa yeri mahkemesi (HMK m.10)",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, m.10, IIK m.67",
    aciklama:
      "Itirazin iptali davasi genel yetkili mahkemede veya icra takibinin yapildigi yer mahkemesinde acilabilir.",
  },
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Icra dosya numarasi ve icra dairesi", zorunlu: true },
    { bilgi: "Alacagin miktar ve kaynagi", zorunlu: true },
    { bilgi: "Borckunun itiraz dilekcesininyazilartarihi", zorunlu: true },
    { bilgi: "Davalinin kimlik ve adres bilgileri", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Icra dosyasi sureti (odeme emri ve itiraz dilekces)", zorunlu: true, nereden: "Icra dairesi" },
    { belge: "Alacaga dayanak belgeler (sozlesme, fatura vb.)", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Ihtarname (varsa)", zorunlu: false, nereden: "Noter" },
    { belge: "Banka hesap dokumleri", zorunlu: false, nereden: "Banka" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "1 yil (itirazin tebliginden itibaren)",
    yasalDayanak: "IIK m.67/1",
    aciklama:
      "Alacakli, itirazin tebliginden itibaren 1 yil icinde itirazin iptali davasi acmak zorundadir. Bu sure hak dusurucudur.",
    baslangic: "Itirazin alacakliya teblig edildigi tarih",
  },
  pratikNot:
    "Icra inkar tazminati (%20) talep edilebilir. 1 yillik hak dusurucusureicindetakip sirasindaki alacak tutari uzerinden dava acilmalidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.10"],
  ozelKanunlar: ["IIK m.67", "IIK m.68"],
};

const menfiTespitDavasi: DavaTuru = {
  id: "menfi-tespit",
  maddeNo: 44,
  ad: "Menfi Tespit Davasi (Borclu Olmadiginin Tespiti)",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
    ozelYetki: [
      "Icra takibinin yapildigi yer mahkemesi (IIK m.72)",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, IIK m.72",
    aciklama:
      "Menfi tespit davasi icra takibinden once veya sonra acilabilir. Icra takibinden sonra acilirsa takibin yapildigi icra dairesinin bulundugu yer mahkemesinde de acilabilir.",
  },
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Borclu olunmadigi iddia edilen miktar", zorunlu: true },
    { bilgi: "Borcun kaynagi ve neden borclu olunmadigi", zorunlu: true },
    { bilgi: "Icra takibi varsa dosya numarasi", zorunlu: false },
    { bilgi: "Davalinin kimlik ve adres bilgileri", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Borclu olunmadigini gosteren belgeler", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Icra dosyasi sureti (takip varsa)", zorunlu: false, nereden: "Icra dairesi" },
    { belge: "Odeme belgeleri (dekont, makbuz vb.)", zorunlu: false, nereden: "Muvekkil/Banka" },
    { belge: "Sozlesme veya senet sureti", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "Takipten once: genel zamanasiminatabidir. Takipten sonra: icra takibi kesinlesene kadar.",
    yasalDayanak: "IIK m.72, TBK m.146",
    aciklama:
      "Menfi tespit davasi icra takibinden once veya sonra acilabilir. Borcun odenmesindensonra istirdat davasina donusur.",
  },
  pratikNot:
    "Icra takibinden sonra acilirsa %15 teminat yatirilmasi ile icranin durdurulmasi talep edilebilir (IIK m.72/3). Takipten once acilirsa ihtiyati tedbir ile takibin engellenmesi istenebilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.106"],
  ozelKanunlar: ["IIK m.72"],
};

const istirdatDavasi: DavaTuru = {
  id: "istirdat-davasi",
  maddeNo: 45,
  ad: "Istirdat (Geri Alma) Davasi",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
    ozelYetki: [
      "Icra takibinin yapildigi yer mahkemesi (IIK m.72/7)",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, IIK m.72/7",
    aciklama:
      "Istirdat davasi, paranin odendigi veya icra takibinin yapildigi yer mahkemesinde acilabilir.",
  },
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Geri alinmak istenen tutar", zorunlu: true },
    { bilgi: "Odemenin yapildigi tarih ve sekli", zorunlu: true },
    { bilgi: "Borcun mevcut olmadigina dair gerekce", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Odeme belgesi (dekont, makbuz)", zorunlu: true, nereden: "Muvekkil/Banka" },
    { belge: "Icra dosyasi sureti (icra yoluyla odenmisse)", zorunlu: false, nereden: "Icra dairesi" },
    { belge: "Borcun olmadigini kanitlayan belgeler", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Sozlesme sureti (varsa)", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "1 yil (paranin odenmesinden itibaren)",
    yasalDayanak: "IIK m.72/7",
    aciklama:
      "Istirdat davasi, paranin tamamen odendigi tarihten itibaren 1 yil icinde acilmalidir.",
    baslangic: "Paranin odendigi tarih",
  },
  pratikNot:
    "Menfi tespit davasi sirasinda borc odenmisse dava istirdat davasina donusur (IIK m.72/6). Sebepsiz zenginlesme hukumlerinden farklidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6"],
  ozelKanunlar: ["IIK m.72"],
};

const sozlesmeninFeshiDavasi: DavaTuru = {
  id: "sozlesmenin-feshi",
  maddeNo: 46,
  ad: "Sozlesmenin Feshi Davasi",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: sozlesmeYetkisi,
  harclar: maktuHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Sozlesmenin tarihi, turu ve taraflari", zorunlu: true },
    { bilgi: "Fesih gerekceleri ve ihlal edilen hukumler", zorunlu: true },
    { bilgi: "Karsitarafa ihtar cekilip cekilmedigi", zorunlu: true },
    { bilgi: "Ugranilanmaddi zarar (varsa)", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Sozlesme asliveya sureti", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Ihtarname (cekilmisse)", zorunlu: false, nereden: "Noter" },
    { belge: "Ihlali gosteren belgeler (tutanak, yazisma vb.)", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "10 yil",
    yasalDayanak: "TBK m.146",
    aciklama: "Sozlesmesel haklar 10 yillik genel zamanasimisuresine tabidir.",
    baslangic: "Fesih hakkinin dogdugu tarih",
  },
  pratikNot:
    "Donme (TBK m.123-125) veya fesih (TBK m.126) ayrimi yapilmalidir. Donme gecehalide etki eder, fesih ileriye donuktur. Tazminat talebi varsa nispi harc alinir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.10"],
  ozelKanunlar: ["TBK m.117-126", "TBK m.146"],
};

const sozlesmeninUyarlanmasi: DavaTuru = {
  id: "sozlesmenin-uyarlanmasi",
  maddeNo: 47,
  ad: "Sozlesmenin Uyarlanmasi Davasi (Asiri Ifa Guclugu)",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: sozlesmeYetkisi,
  harclar: maktuHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Sozlesme bilgileri (tarih, tur, taraflar)", zorunlu: true },
    { bilgi: "Asiri ifa guclugune yol acan olagin ustuluk olay", zorunlu: true },
    { bilgi: "Mevcut edim dengesindeki bozulmanin boyutu", zorunlu: true },
    { bilgi: "Talep edilen uyarlama icerik", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Sozlesme asli veya sureti", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Asiri ifa guclugunu kanitlayan belgeler (piyasa verileri, enflasyon vb.)", zorunlu: true, nereden: "Muvekkil/Resmi kurumlar" },
    { belge: "Taraflararasi yazismalar", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Bilirkisi raporu (onceden yaptirildiysa)", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "10 yil",
    yasalDayanak: "TBK m.146",
    aciklama: "Sozlesmesel haklar genel zamanasimisuresine tabidir.",
    baslangic: "Asiri ifa guclugu kosullarinin olustu tarih",
  },
  pratikNot:
    "TBK m.138 kosullari: (1) Sozlesme yapildiktan sonra taraflarin ongorsemedigi olaganustu hal, (2) Borcludan kaynaklanmayan neden, (3) Edim dengesinin asiri bozulmasi, (4) Borclu henuz edimini ifa etmemis veya ifanin asiri guclesmesinden dogan haklarini sakli tutarak ifa etmis olmalidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.10"],
  ozelKanunlar: ["TBK m.138"],
};

const kiraDisTahliye: DavaTuru = {
  id: "kira-disi-tahliye",
  maddeNo: 48,
  ad: "Kira Disi Tahliye Davalari (Haksiz Isgal)",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
    ozelYetki: [
      "Tasinmazin bulundugu yer mahkemesi (HMK m.12)",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, m.12",
    aciklama:
      "Kira iliskisi olmaksizin haksiz isgale dayanan tahliye davalarinda tasinmazin bulundugu yer mahkemesi de yetkilidir. Ayni hakka dayaniyorsa kesin yetkidir.",
  },
  harclar: maktuHarc,
  masraflar: kesfiBilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin adresi ve tapu bilgileri", zorunlu: true },
    { bilgi: "Haksiz isgalin baslangic tarihi ve durumu", zorunlu: true },
    { bilgi: "Ecrimisil (haksiz isgal tazminati) talebi", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Tapu senedi veya kaydi", zorunlu: true, nereden: "Tapu mudurlugu / e-Devlet" },
    { belge: "Ihtarname (cekilmisse)", zorunlu: false, nereden: "Noter" },
    { belge: "Haksiz isgali gosteren fotograflar, tutanaklar", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "Mulkiyet hakkina dayanildigi surece zamanasimiislemez",
    yasalDayanak: "TMK m.683",
    aciklama: "Mulkiyet hakkina dayanan elatmanin onlenmesi davalari zamanasimina tabi degildir. Ecrimisil icin 5 yillik zamanasimivardir.",
  },
  pratikNot:
    "Kira iliskisine dayanan tahliye davalari sulh hukuk mahkemesinin gorevindedir. Bu dava turu kira sozlesmesi bulunmayan haksiz isgal hallerini kapsar.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.12"],
  ozelKanunlar: ["TMK m.683", "TBK m.77"],
};

const eserSozlesmesi: DavaTuru = {
  id: "eser-sozlesmesi",
  maddeNo: 49,
  ad: "Eser Sozlesmesinden Dogan Uyusmazliklar",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: sozlesmeYetkisi,
  harclar: nispiHarc,
  masraflar: kesfiBilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Sozlesme bilgileri (taraflar, tarih, bedel)", zorunlu: true },
    { bilgi: "Eserdeki ayip veya eksiklikler", zorunlu: true },
    { bilgi: "Odenen ve kalan bedel miktari", zorunlu: true },
    { bilgi: "Teslim tarihi ve fiili teslim durumu", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Eser sozlesmesi", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Odeme belgeleri (dekont, makbuz)", zorunlu: true, nereden: "Muvekkil/Banka" },
    { belge: "Ayip ihbar bildirimi (ihtarname)", zorunlu: false, nereden: "Noter" },
    { belge: "Fotograflar, teknik raporlar", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Taraflar arasi yazismalar", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "5 yil (tasinmazlar icin); 2 yil (tasinirlar icin) — ayip halinde",
    yasalDayanak: "TBK m.478",
    aciklama: "Eser sozlesmesinde ayip nedeniyle haklarin dusme suresi: tasinirlarda 2, tasinmazlarda 5 yildir. Isverenhakkinin kotuniyet olmasi halinde 20 yildir.",
    baslangic: "Eserin teslim tarihi",
  },
  pratikNot:
    "Ayip ihbari TBK m.474 uyarinca makul sure icinde yapilmalidir. Eserin kabulunden sonra gizli ayiplar icin sureler farklidir. Tuketiciye yonelik eserlerde tuketici mahkemesi gorevli olabilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.10"],
  ozelKanunlar: ["TBK m.470-486"],
};

const vekaletSozlesmesi: DavaTuru = {
  id: "vekalet-sozlesmesi",
  maddeNo: 50,
  ad: "Vekalet Sozlesmesinden Dogan Davalar",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: sozlesmeYetkisi,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Vekalet sozlesmesinin konusu ve taraflari", zorunlu: true },
    { bilgi: "Vekilin yukumluluklerini ihlal ettigi iddiasi", zorunlu: true },
    { bilgi: "Ugranilanmaddi zarar miktari", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Vekalet sozlesmesi veya vekaletname", zorunlu: true, nereden: "Muvekkil/Noter" },
    { belge: "Zarari gosteren belgeler", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Yazismalar ve talimatlar", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Hesap dokumu (alinan/odenen paralar)", zorunlu: false, nereden: "Banka" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "5 yil",
    yasalDayanak: "TBK m.147/5",
    aciklama: "Vekalet sozlesmesinden dogan alacaklar 5 yillik zamanasimisuresine tabidir.",
    baslangic: "Zararin ogrenildigi veya sozlesmenin sona erdigi tarih",
  },
  pratikNot:
    "Vekilin ozen yuekuemluelueue TBK m.506 uyarinca vardir. Avukat hatasi nedeniyle acilan davalarda 1136 sy. Avukatlik Kanunu hukumleri de dikkate alinir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.10"],
  ozelKanunlar: ["TBK m.502-514", "TBK m.147/5"],
};

const ariyetSozlesmesi: DavaTuru = {
  id: "ariyet-sozlesmesi",
  maddeNo: 51,
  ad: "Ariyet (Odunc) Sozlesmesinden Dogan Davalar",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: sozlesmeYetkisi,
  harclar: nispiHarc,
  masraflar: standartMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Odunc verilen sey (tasinir/tasinmaz)", zorunlu: true },
    { bilgi: "Odunc verilme tarihi ve iade suresi", zorunlu: true },
    { bilgi: "Davalinin kimlik ve adres bilgileri", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Ariyet sozlesmesi (varsa)", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Odunc verilen seyin degerini gosteren belgeler", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Ihtarname (iade talep edilmisse)", zorunlu: false, nereden: "Noter" },
    { belge: "Tanik listesi", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "10 yil",
    yasalDayanak: "TBK m.146",
    aciklama: "Ariyet sozlesmesinden dogan iade borcu genel zamanasimisuersine tabidir.",
    baslangic: "Iade talebinin yapildigi tarih",
  },
  pratikNot:
    "Ariyet kullanim oduncudur ve bedelsizdir (TBK m.379). Tuketim oduncu (karz) ile karistirilmamalidir. Karz da paranin odunc verilmesidir (TBK m.386).",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.10"],
  ozelKanunlar: ["TBK m.379-385"],
};

const bagislamaVaadindenDonme: DavaTuru = {
  id: "bagislama-vaadinden-donme",
  maddeNo: 52,
  ad: "Bagislama Vaadinden Donme Davasi",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: genelYetki,
  harclar: nispiHarc,
  masraflar: standartMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Bagislama vaadi konusu ve bedeli", zorunlu: true },
    { bilgi: "Donme nedeni (TBK m.295)", zorunlu: true },
    { bilgi: "Bagis alanin kimlik bilgileri", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Bagislama sozlesmesi/vaadi (yazili)", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Donme nedenini kanitlayan belgeler", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Ihtarname (cekilmisse)", zorunlu: false, nereden: "Noter" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "1 yil (donme nedeninin ogrenilmesinden itibaren)",
    yasalDayanak: "TBK m.297",
    aciklama: "Bagislamadan donme hakki, donme sebebinin ogrenilmesinden itibaren 1 yil icinde kullanilmalidir.",
    baslangic: "Donme sebebinin ogrenildigi tarih",
  },
  pratikNot:
    "Bagislama vaadi yazili sekle tabidir (TBK m.289). Bagislamadan donme sebepleri: agir nankorluk, yardim yukumlulugunun yerine getirilmemesi, sozlesme kosullarinin ihlali (TBK m.295).",
  hmkMaddeleri: ["HMK m.2", "HMK m.6"],
  ozelKanunlar: ["TBK m.285-298"],
};

const culpaInContrahendo: DavaTuru = {
  id: "culpa-in-contrahendo",
  maddeNo: 53,
  ad: "Sozlesme Oncesi (Culpa in Contrahendo) Sorumluluk Davalari",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: genelYetki,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Sozlesme gorusmeleri sureci ve taraflar", zorunlu: true },
    { bilgi: "Karsi tarafin kusurlu davranisi", zorunlu: true },
    { bilgi: "Ugranilanmaddi zarar (olumsuz/menfi zarar)", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Sozlesme gorusmelerine iliskin yazismalar", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Yapilan masraflari gosteren belgeler", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Kusurlu davranisi kanitlayan deliller", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Tanik bilgileri", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "10 yil",
    yasalDayanak: "TBK m.146",
    aciklama: "Sozlesme oncesi sorumlulukta genel zamanasimiuygulanir.",
    baslangic: "Zararin ogrenildigi tarih",
  },
  pratikNot:
    "Culpa in contrahendo haksiz fiile degil guven ilkesine dayanan bir sorumluluk turudur. Ispatlanacak zarar menfi zararin (olumsuz zarar: sozlesmenin kurulacagina guvenilerek yapilan masraflar ve kacirilan firsatlar) dir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6"],
  ozelKanunlar: ["TBK m.114", "TMK m.2"],
};

const cezaiSartDavasi: DavaTuru = {
  id: "cezai-sart-indirilmesi",
  maddeNo: 54,
  ad: "Cezai Sartin Indirilmesi/Iptali Talebi Davalari",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: sozlesmeYetkisi,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Sozlesme bilgileri ve cezai sart maddesi", zorunlu: true },
    { bilgi: "Cezai sartin asiri olduguna dair gerekce", zorunlu: true },
    { bilgi: "Fiili zarar miktari (karsilastirma icin)", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Sozlesme asli (cezai sart maddesi gorunecek)", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Karsi tarafin zarar miktarini gosteren belgeler", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Emsal sozlesmeler (asirilik karsilastirmasi icin)", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "10 yil",
    yasalDayanak: "TBK m.146",
    aciklama: "Sozlesmesel iliskiden dogan talepler genel zamanasimisuersine tabidir.",
  },
  pratikNot:
    "Hakim asiri gordugu cezai sarti re'sen indirir (TBK m.182/3). Tacirler arasinda cezai sart indirimi talep edilemez (TTK m.22). Ticari davalarda bu kural dikkate alinmalidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.10"],
  ozelKanunlar: ["TBK m.179-182", "TTK m.22"],
};

// ---------------------------------------------------------------------------
// 1.4. Kisilik Haklari ve Nufus Davalari (madde 55-65)
// ---------------------------------------------------------------------------

const kisilikHaklariTazminat: DavaTuru = {
  id: "kisilik-haklari-tazminat",
  maddeNo: 55,
  ad: "Kisilik Haklarina Saldiri Nedeniyle Tazminat Davalari",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
    ozelYetki: [
      "Haksiz fiilin islendigiveya zararin meydana geldigi yer (HMK m.16)",
      "Davacinin yerlesim yeri mahkemesi (HMK m.16)",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, m.16",
    aciklama:
      "Kisilik haklarina saldiri haksiz fiil niteliginde oldugundan HMK m.16 uyarinca secimlik yetki kurallari uygulanir.",
  },
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir. Ancak sulh ve feragat icin ozel yetki gerekir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Kisilik hakkina yapilan saldirinin niteligi ve tarihi", zorunlu: true },
    { bilgi: "Talep edilen maddi ve manevi tazminat miktari", zorunlu: true },
    { bilgi: "Saldiriyi gerceklestiren kisinin bilgileri", zorunlu: true },
    { bilgi: "Taniklar", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Saldiriyi kanitlayan deliller (yayin, goruntu, mesaj vb.)", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Zarari kanitlayan belgeler (saglik raporu, gelir kaybi vb.)", zorunlu: false, nereden: "Muvekkil/Hastane" },
    { belge: "Ihtarname (gonderilmisse)", zorunlu: false, nereden: "Noter" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "2 yil (ogrenme) / 10 yil (fiil)",
    yasalDayanak: "TBK m.72",
    aciklama:
      "Haksiz fiilden dogan tazminat davasi, zarari ve tazminat yukumlusunun ogrenildigi tarihten itibaren 2, her halde fiilin islendigitarihten itibaren 10 yil icinde zamanasiminaugar.",
    baslangic: "Zararin ve sorumlunun ogrenildigi tarih",
  },
  pratikNot:
    "TMK m.24-25 uyarinca saldirinin durdurulmasi, onlenmesi ve tespit davalari da acilabilir. Manevi tazminat istenmese bile saldirinin tespiti istenebilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16"],
  ozelKanunlar: ["TMK m.24-25", "TBK m.49-58", "TBK m.72"],
};

const adSoyadDegistirme: DavaTuru = {
  id: "ad-soyad-degistirme",
  maddeNo: 56,
  ad: "Ad ve Soyadi Degistirme/Duzeltme Davasi",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davacinin yerlesim yeri mahkemesi",
    kesinYetkiMi: false,
    yasalDayanak: "5490 sy. Kanun m.36",
    aciklama:
      "Nufus kayitlarina iliskin davalarda davacinin yerlesim yeri mahkemesi yetkilidir.",
  },
  harclar: maktuHarc,
  masraflar: standartMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mevcut ad/soyad", zorunlu: true },
    { bilgi: "Talep edilen yeni ad/soyad", zorunlu: true },
    { bilgi: "Degistirme nedeni (hakli sebep)", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Degistirme nedenini destekleyen belgeler", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Tanik listesi (sosyal cevre tarafindan yeni ad ile tanindigi)", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "basit",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Nufus davalari arabuluculuga elverissiz degildir.",
  },
  pratikNot:
    "TMK m.27 uyarinca hakli sebep varsa ad degistirme talep edilebilir. Karar kesinlestikten sonra nufus mudurluune bildirilir. Gazete ilani kaldirildiri (7 Subat 2024).",
  hmkMaddeleri: ["HMK m.2", "HMK m.316", "HMK m.382-388"],
  ozelKanunlar: ["TMK m.27", "5490 sy. Nufus Hizmetleri Kanunu m.36"],
};

const yasDuzeltme: DavaTuru = {
  id: "yas-duzeltme",
  maddeNo: 57,
  ad: "Yas Duzeltme (Kucultme/Buyultme) Davasi",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davacinin yerlesim yeri mahkemesi",
    kesinYetkiMi: false,
    yasalDayanak: "5490 sy. Kanun m.36",
    aciklama: "Nufus kayitlarina iliskin davalarda davacinin yerlesim yeri mahkemesi yetkilidir.",
  },
  harclar: maktuHarc,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
    bilirkisiUcreti: BILIRKISI_UCRETI,
    toplamTahmini: 4500,
    aciklama: "Kemik yasi tespiti icin Adli Tip bilirkisisi ucreti dahil tahmini tutar.",
  },
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mevcut dogum tarihi (nufus kaydindaki)", zorunlu: true },
    { bilgi: "Gercek dogum tarihi iddiasi", zorunlu: true },
    { bilgi: "Duzeltme nedeni ve deliller", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Hastane dogum kaydi (varsa)", zorunlu: false, nereden: "Hastane/Saglik bakanligi" },
    { belge: "Okul kayitlari", zorunlu: false, nereden: "Okul" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "basit",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Nufus davalari arabuluculuga elverissiz degildir.",
  },
  pratikNot:
    "Yas duzeltme davasi bir kez acilabilir (5490 sy. K. m.36/1-b). Kemik yasi tespitiicin Adli Tip Kurumuna sevk yapilir. Nufus mudurlugu davada taraf olarak yer alir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.316", "HMK m.382-388"],
  ozelKanunlar: ["5490 sy. Nufus Hizmetleri Kanunu m.36"],
};

const cinsiyetDegistirme: DavaTuru = {
  id: "cinsiyet-degistirme-izni",
  maddeNo: 58,
  ad: "Cinsiyet Degistirme Izni Davasi",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davacinin yerlesim yeri mahkemesi",
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, TMK m.40",
    aciklama: "Cinsiyet degistirme izni davasinda davacinin yerlesim yeri mahkemesi yetkilidir.",
  },
  harclar: maktuHarc,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 2,
    bilirkisiUcreti: BILIRKISI_UCRETI,
    toplamTahmini: 4000,
    aciklama: "Saglik kurulu raporu ve bilirkisi ucreti dahil tahmini tutar.",
  },
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Yerlesim yeri adresi", zorunlu: true },
    { bilgi: "Transseksuel yapiya sahip olduguna dair beyan", zorunlu: true },
    { bilgi: "Medeni hal (evli ise evlilik bosanma ile sonlanmis olmali)", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Resmi saglik kurulu raporu (transseksuel yapi)", zorunlu: true, nereden: "Egitim ve arastirma hastanesi" },
    { belge: "Psikiyatri raporu", zorunlu: true, nereden: "Hastane" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "basit",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Kisilik haklarina iliskin dava, arabuluculuga elverissiz degildir.",
  },
  pratikNot:
    "TMK m.40 kosullari: 18 yasini doldurmus, evli olmamak, transseksuel yapida oldugunu resmi saglik kurulu raporuyla belgelemek, ureme yeteneginden surekli olarak yoksun bulunmak. Once izin karari, sonra ameliyat, sonra nufus duzeltme karari.",
  hmkMaddeleri: ["HMK m.2", "HMK m.316", "HMK m.382-388"],
  ozelKanunlar: ["TMK m.40"],
};

const nufusKaydiDuzeltme: DavaTuru = {
  id: "nufus-kaydi-duzeltme",
  maddeNo: 59,
  ad: "Nufus Kaydinin Duzeltilmesi Davasi",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davacinin yerlesim yeri mahkemesi",
    kesinYetkiMi: false,
    yasalDayanak: "5490 sy. Kanun m.36",
    aciklama: "Nufus kayitlarina iliskin davalarda davacinin yerlesim yeri mahkemesi yetkilidir.",
  },
  harclar: maktuHarc,
  masraflar: standartMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Duzeltilmesi istenen kayit (ad, soyad, dogum yeri, anne-baba adi vb.)", zorunlu: true },
    { bilgi: "Dogru bilgi ve kaynagi", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Duzeltmeyi destekleyen belgeler (hastane kaydi, okul kaydi vb.)", zorunlu: true, nereden: "Ilgili kurum" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "basit",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Nufus davalari arabuluculuga elverissiz degildir.",
  },
  pratikNot:
    "Nufus mudurlugu hasim (davali) olarak gosterilir. C. Savcisinin davaya katilimi zorunludur (5490 m.36/1-a).",
  hmkMaddeleri: ["HMK m.2", "HMK m.316", "HMK m.382-388"],
  ozelKanunlar: ["5490 sy. Nufus Hizmetleri Kanunu m.35-36"],
};

const gaiplikKarari: DavaTuru = {
  id: "gaiplik-karari",
  maddeNo: 60,
  ad: "Gaiplik Karari Verilmesi Davasi",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Gaip hakkinda bilinen son yerlesim yeri mahkemesi",
    kesinYetkiMi: false,
    yasalDayanak: "TMK m.32, HMK m.6",
    aciklama: "Gaiplik karari, gaip hakkinda bilinen son yerlesim yeri mahkemesinden istenir.",
  },
  harclar: maktuHarc,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 2,
    diger: [{ ad: "Gazete ilan masrafi", tutar: 3000 }],
    toplamTahmini: 4500,
    aciklama: "Tebligat, gazete ilani (en az 2 ilan 6 aylik araliklarla) masraflari dahil.",
  },
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Gaip kisinin kimlik bilgileri", zorunlu: true },
    { bilgi: "Son haber alinma tarihi ve yeri", zorunlu: true },
    { bilgi: "Gaiplik karari alinmasindaki hukuki yarar (miras, bosanma vb.)", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Arastirma sonuclari (kolluk, konsolosluk yazilari)", zorunlu: true, nereden: "Emniyet/Jandarma" },
    { belge: "Tanik listesi", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "basit",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Cekismesiz yargi isi olup arabuluculuga tabi degildir.",
  },
  zamanasimi: {
    sure: "Olum tehlikesi: 1 yil / Uzun sureden beri haber alinamama: 5 yil",
    yasalDayanak: "TMK m.32-33",
    aciklama: "Olum tehlikesi icinde kaybolan kisi icin tehlikeden 1 yil sonra; uzun suredir haber alinamamis kisi icin son haber tarihinden 5 yil sonra gaiplik istenebilir.",
    baslangic: "Son haber tarihi veya tehlike tarihi",
  },
  pratikNot:
    "Gaiplik karari icin en az 6 ay araliklarla 2 kez ilan yapilmalidir (TMK m.33). Gaiplik, olum karinesi degildir; miras hakki ancak gaiplik karari kesinlestikten sonra teminat karsiliginda kullanilabilir (TMK m.584-585).",
  hmkMaddeleri: ["HMK m.2", "HMK m.316", "HMK m.382-388"],
  ozelKanunlar: ["TMK m.32-35", "TMK m.584-585"],
};

const olumKarinesi: DavaTuru = {
  id: "olum-karinesi",
  maddeNo: 61,
  ad: "Olum Karinesi ile Ilgili Kararlar",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Olen kisinin son yerlesim yeri mahkemesi",
    kesinYetkiMi: false,
    yasalDayanak: "TMK m.31, HMK m.6",
    aciklama: "Olum karinesi davasi olen kisinin bilinen son yerlesim yeri mahkemesinde acilir.",
  },
  harclar: maktuHarc,
  masraflar: standartMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Olumu kesin olan kisinin kimlik bilgileri", zorunlu: true },
    { bilgi: "Olum olayinin tarih ve kosullari", zorunlu: true },
    { bilgi: "Olum tutanagi alinamamasinin nedeni", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Olayi gosteren resmi tutanaklar (itfaiye, kolluk, AFAD)", zorunlu: true, nereden: "Resmi kurum" },
    { belge: "Tanik listesi", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "basit",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Cekismesiz yargi isi olup arabuluculuga tabi degildir.",
  },
  pratikNot:
    "TMK m.31: Cesedi bulunamayan ancak olumu kesin olan kisi, olum karinesine tabi tutulur. Gaiplik islemine gerek yoktur. Karar kesinlesince nufus kaydi kapanir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.316", "HMK m.382-388"],
  ozelKanunlar: ["TMK m.31"],
};

const derneklerVakiflar: DavaTuru = {
  id: "dernekler-vakiflar",
  maddeNo: 62,
  ad: "Dernekler ve Vakiflar Hukukundan Dogan Davalar",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Dernegin veya vakfin merkezinin bulundugu yer mahkemesi",
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, m.14",
    aciklama: "Dernek veya vakif aleyhine acilan davalarda tuzel kisinin merkez adresi yetkili mahkemeyi belirler.",
  },
  harclar: maktuHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Dernek/vakif unvani ve merkez adresi", zorunlu: true },
    { bilgi: "Uyusmazligin konusu (uyelik, genel kurul, tuzel kisilgin sona ermesi vb.)", zorunlu: true },
    { bilgi: "Ilgili organkararinin tarihi ve icerigi", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Dernek/vakif tuzugu veya senedi", zorunlu: true, nereden: "Dernekler Il Mudurlugu / Vakiflar Genel Mudurlugu" },
    { belge: "Genel kurul/yonetim kurulu karar tutanagi", zorunlu: false, nereden: "Dernek/Vakif" },
    { belge: "Uyelik belgesi", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "Kararin ogrenilmesinden itibaren 1 ay, her halde karar tarihinden itibaren 1 yil (genel kurul karari iptali icin)",
    yasalDayanak: "TMK m.83",
    aciklama: "Dernek genel kurul kararlarinin iptali icin ozel sureler vardir.",
  },
  pratikNot:
    "Dernek kapatma davalari C. Savciligi tarafindan re'sen acilir. Vakif senetinin degistirilmesi mahkeme kararini gerektirir (TMK m.113).",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.14"],
  ozelKanunlar: ["TMK m.56-117", "5253 sy. Dernekler Kanunu"],
};

const basinKisilikIhlali: DavaTuru = {
  id: "basin-kisilik-ihlali",
  maddeNo: 63,
  ad: "Basin Yoluyla Kisilik Hakki Ihlali Davalari",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
    ozelYetki: [
      "Yayinin dagitildigi/yayinlandigi yer mahkemesi (HMK m.16)",
      "Davacinin yerlesim yeri mahkemesi (HMK m.16)",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, m.16",
    aciklama: "Basin yoluyla kisilik ihlali haksiz fiil niteliginde oldugundan secimlik yetki uygulanir.",
  },
  harclar: nispiHarc,
  masraflar: standartMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Ihlal iceren yayinin tarihi, yeri ve icerigi", zorunlu: true },
    { bilgi: "Talep edilen maddi/manevi tazminat miktari", zorunlu: true },
    { bilgi: "Cevap ve duzeltme hakki kullanildi mi?", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Ihlal iceren yayinin ornegi (gazete kupuru, dergi sayfasi)", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Yayinin tarih ve sayfasini gosteren belge", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Zarari gosteren belgeler", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Cevap ve duzeltme talebi yapildiysa belgesi", zorunlu: false, nereden: "Muvekkil/Noter" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "2 yil (ogrenme) / 10 yil (fiil)",
    yasalDayanak: "TBK m.72",
    aciklama: "Haksiz fiilden dogan tazminat davasinin zamanasimisureleri uygulanir.",
    baslangic: "Yayinin ogrenildigi tarih",
  },
  pratikNot:
    "5187 sy. Basin Kanunu m.14 uyarinca cevap ve duzeltme hakki kullanilabilir (3 gun icinde talep, 3 gun icinde yayin). Tazminat davasi bu hakkin kullanilmasindan bagimsizdir. Basin iscisi sorumlu yazi isleri mudurudur, yayin sahibi de teselsul sorumludur.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16"],
  ozelKanunlar: ["5187 sy. Basin Kanunu", "TMK m.24-25", "TBK m.49-58"],
};

const internetKisilikIhlali: DavaTuru = {
  id: "internet-kisilik-ihlali",
  maddeNo: 64,
  ad: "Internet (Sosyal Medya) Yoluyla Kisilik Hakki Ihlali Davalari",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
    ozelYetki: [
      "Davacinin yerlesim yeri mahkemesi (HMK m.16)",
      "Zararin meydana geldigi yer mahkemesi (HMK m.16)",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, m.16",
    aciklama: "Internet yoluyla kisilik ihlali haksiz fiil olarak degerlendirilir, secimlik yetki uygulanir.",
  },
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Ihlal iceren icerik (URL, ekran goruntusu)", zorunlu: true },
    { bilgi: "Talep edilen tazminat miktari", zorunlu: true },
    { bilgi: "Ihlali gerceklestiren kisinin bilgileri (biliniyorsa)", zorunlu: true },
    { bilgi: "Icerik kaldirilmasi ve/veya erisim engellenmesi talebi", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Ekran goruntuleri ve URL bilgileri (noter tasdikli)", zorunlu: true, nereden: "Muvekkil/Noter" },
    { belge: "IP tespiti icin savciliguaulunan sirket bilgileri", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Zarari gosteren belgeler", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "2 yil (ogrenme) / 10 yil (fiil)",
    yasalDayanak: "TBK m.72",
    aciklama: "Haksiz fiilden dogan tazminat davasinin zamanasimisureleri uygulanir.",
    baslangic: "Icerigin ogrenildigi tarih",
  },
  pratikNot:
    "5651 sy. Kanun m.9 uyarinca icerik kaldirma ve erisim engelleme icin sulh ceza hakimligine basvuru yapilabilir. Tazminat davasi ayri acilir. Delil tespiti icin noter tasdikli ekran goruntusu onemlidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16"],
  ozelKanunlar: ["TMK m.24-25", "TBK m.49-58", "5651 sy. Internet Kanunu"],
};

const erisimEngelleme: DavaTuru = {
  id: "erisim-engelleme",
  maddeNo: 65,
  ad: "Erisim Engelleme ve Icerik Kaldirma Davalari",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: {
    mahkeme: "Sulh Ceza Hakimligi (erisim engelleme) / Asliye Hukuk Mahkemesi (tazminat)",
    yasalDayanak: "5651 sy. Kanun m.9, HMK m.2",
    aciklama: "Erisim engelleme ve icerik kaldirma karari sulh ceza hakimliginden alinir. Bunun yaninda kisilik hakkinin ihlali nedeniyle tazminat davasi asliye hukuk mahkemesinde acilir.",
    ozelDurum: "Salt erisim engelleme talepleri sulh ceza hakimliginin gorev alanindadir.",
  },
  yetkiliMahkeme: {
    genelYetki: "Davacinin yerlesim yeri mahkemesi",
    ozelYetki: [
      "Icerigin erisime sunuldugu yer mahkemesi",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "5651 sy. Kanun m.9, HMK m.6, m.16",
    aciklama: "Erisim engelleme istemi davacinin yerlesmiyerindeki sulh ceza hakimligine yapilir.",
  },
  harclar: maktuHarc,
  masraflar: standartMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Ihlal iceren URL adresleri", zorunlu: true },
    { bilgi: "Kisilik hakkinin nasil ihlal edildigi", zorunlu: true },
    { bilgi: "Icerik saglayici/yer saglayici bilgileri (biliniyorsa)", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Ekran goruntuleri (noter tasdikli tercih edilir)", zorunlu: true, nereden: "Muvekkil/Noter" },
    { belge: "URL listesi", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Icerik saglayiciya yaplan bildirim belgesi (varsa)", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "basit",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Erisim engelleme kararlari icin arabuluculuk uygulanmaz.",
  },
  pratikNot:
    "5651 sy. Kanun m.9'a gore icerik saglayiciya basvuru → yer saglayiciya basvuru → sulh ceza hakimligi sirasi izlenir. 24 saat icinde karar verilir. BTK araciligiyla erisim engellenir. Unutulma hakki (5651 m.9/A) ayri bir basvuru yoludur.",
  hmkMaddeleri: ["HMK m.2", "HMK m.316"],
  ozelKanunlar: ["5651 sy. Internet Kanunu m.8, m.9, m.9/A"],
};

// ---------------------------------------------------------------------------
// 1.5. Miras Hukuku Davalari — Asliye Hukuk Gorevindekiler (madde 66-75)
// ---------------------------------------------------------------------------

const mirasSebebiyleIstihkak: DavaTuru = {
  id: "miras-sebebiyle-istihkak",
  maddeNo: 66,
  ad: "Miras Sebebiyle Istihkak Davasi",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: mirasKesinYetki,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Miras sebebiyle istihkak davasi miras hakkina dayanan ozel nitelikli bir davadir.",
    yasalDayanak: "HMK m.74",
    icerik: [
      "Miras sebebiyle istihkak davasi acma ve takip etme",
      "Terekeye ait mallari talep etme",
    ],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Mirascilik sifatini gosteren belge", zorunlu: true },
    { bilgi: "Talep edilen tereke mallarinin listesi", zorunlu: true },
    { bilgi: "Terekeyi isgal eden kisinin bilgileri", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami (mirascilik belgesi)", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Olum belgesi", zorunlu: true, nereden: "Nufus mudurlugu / e-Devlet" },
    { belge: "Tereke mallarini gosteren belgeler (tapu, ruhsat vb.)", zorunlu: true, nereden: "Tapu / Trafik tescil" },
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "1 yil (ogrenme) / 10 yil (olum)",
    yasalDayanak: "TMK m.638",
    aciklama: "Miras sebebiyle istihkak davasi, davacinin kendisinin mirascioldugunuveistihkak davasi acabilecegini ogrendigi tarihten itibaren 1, her halde mirasbirakanin olumunden itibaren 10 yil icinde acilmalidir.",
    baslangic: "Mirascilik ve elde tutma durumunun ogrenildigi tarih",
  },
  pratikNot:
    "TMK m.637 uyarinca ustun hakka sahip mirascinin terekeyi veya tereke mallarini elinde bulunduran kimseye karsi actigi davadir. Ayni hakka dayanan elatmanin onlenmesinden farki: miras hukukuna dayanmasidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.11"],
  ozelKanunlar: ["TMK m.637-639"],
};

const vasiyetnameninIptali: DavaTuru = {
  id: "vasiyetnamenin-iptali",
  maddeNo: 67,
  ad: "Vasiyetnamenin Iptali Davasi",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: mirasKesinYetki,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Vasiyetnamenin iptali davasi miras hukukuna ozgu ozel bir davadir.",
    yasalDayanak: "HMK m.74",
    icerik: [
      "Vasiyetnamenin iptali davasi acma ve takip etme",
    ],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Iptal nedeni (ehliyetsizlik, sekil, irade, hukuka aykirilik)", zorunlu: true },
    { bilgi: "Vasiyetnamenin icerigi hakkinda bilgi", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami (mirascilik belgesi)", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Vasiyetname sureti", zorunlu: true, nereden: "Sulh hukuk mahkemesi (acilma)" },
    { belge: "Olum belgesi", zorunlu: true, nereden: "Nufus mudurlugu / e-Devlet" },
    { belge: "Ehliyetsizlik iddiasi varsa saglik raporlari", zorunlu: false, nereden: "Hastane" },
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "1 yil (ogrenme) / 10 yil (acilma) / 20 yil (kotuniyetli elde tutma)",
    yasalDayanak: "TMK m.559",
    aciklama: "Davaci, iptal sebebini ve kendisinin hak sahibi oldugunu ogrendigi tarihten itibaren 1 yil, her halde vasiyetnamenin acilma tarihinden itibaren 10 yil icinde acmalidir. Kotuniyet varsa 20 yil.",
    baslangic: "Iptal sebebinin ve hak sahipliginin ogrenildigi tarih",
  },
  pratikNot:
    "TMK m.557 iptal sebepleri: (1) Ehliyetsizlik, (2) Irade sakatligi (hile, korkutma, yanilma), (3) Tasarrufun icerigi/kosullarinin hukuka/ahlaka aykiriligi, (4) Sekle uygunsuzluk. Iptal davasi yalnizca yasal ve atanmis mirascilar ile vasiyet alacaklilari tarafindan acilabilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.11"],
  ozelKanunlar: ["TMK m.557-559"],
};

const tenkisDavasi: DavaTuru = {
  id: "tenkis-davasi",
  maddeNo: 68,
  ad: "Tenkis Davasi (Sakli Payin Ihlali)",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: mirasKesinYetki,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Tenkis davasi sakli pay mirascilarinin ozel hakki olup ozel yetki gerektirir.",
    yasalDayanak: "HMK m.74",
    icerik: [
      "Tenkis davasi acma ve takip etme",
      "Sakli payin iadesini talep etme",
    ],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Sakli paya tecavuz eden tasarruf (vasiyet, bagis vb.)", zorunlu: true },
    { bilgi: "Terekenin tahmini degeri", zorunlu: true },
    { bilgi: "Diger mirascilar ve paylari", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Olum belgesi", zorunlu: true, nereden: "Nufus mudurlugu / e-Devlet" },
    { belge: "Tenkise konu tasarrufa iliskin belgeler (vasiyetname, bagis senedi, tapu vb.)", zorunlu: true, nereden: "Muvekkil / Tapu" },
    { belge: "Tereke malvarligi listesi", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "1 yil (ogrenme) / 10 yil (olum)",
    yasalDayanak: "TMK m.571",
    aciklama: "Tenkis davasi, mirascilarinsakli paylarinin zedelendigini ogrendikleri tarihten itibaren 1 yil, her halde vasiyetnamelerde acilma tarihinden, diger islemlerde mirasbirakanin olumunden itibaren 10 yil icinde acilmalidir.",
    baslangic: "Sakli pay ihlalinin ogrenildigi tarih",
  },
  pratikNot:
    "Sakli pay oranlari (TMK m.506): altsoy 1/2, ana-baba 1/4, es altsoy ile birlikte 1/4, ana-baba ile birlikte 1/2, yalniz ise 3/4. Tenkis sirasinda once olume bagli tasarruflar, yetmezse sagsatararasikzlar tenkise tabi tutulur (TMK m.570).",
  hmkMaddeleri: ["HMK m.2", "HMK m.11"],
  ozelKanunlar: ["TMK m.505-512", "TMK m.560-571"],
};

const murisMuvazaasi: DavaTuru = {
  id: "muris-muvazaasi",
  maddeNo: 69,
  ad: "Muris Muvazaasi Davasi",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Tasinmazin bulundugu yer mahkemesi (HMK m.12) — KESIN YETKI",
    kesinYetki: "Tasinmazin bulundugu yer mahkemesi (HMK m.12)",
    kesinYetkiMi: true,
    yasalDayanak: "HMK m.12",
    aciklama:
      "Muris muvazaasi davasi tapu iptali ve tescil niteliginde oldugundan tasinmazin bulundugu yer mahkemesi kesin yetkilidir. Birden fazla tasinmaz varsa herbirinin bulundugu yer mahkemesinde ayri ayri acilmalidir.",
  },
  harclar: nispiHarc,
  masraflar: kesfiBilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Tapu iptali ve tescil talebi iceren dava oldugundan ozel yetki gerekir.",
    yasalDayanak: "HMK m.74",
    icerik: [
      "Muris muvazaasi nedeniyle tapu iptali ve tescil davasi acma",
      "Tenkis davasi acma",
    ],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Muvazaali islemin konusu (hangi tasinmaz, kime devredildigi)", zorunlu: true },
    { bilgi: "Gercek bedel ve tapu bedelinin farki", zorunlu: true },
    { bilgi: "Mirasbirakanin mal kacirma amacini gosteren olgular", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Tapu kaydi ve tasinmaz bilgileri", zorunlu: true, nereden: "Tapu mudurlugu / e-Devlet" },
    { belge: "Satis senedi veya devir islem belgesi", zorunlu: true, nereden: "Tapu mudurlugu" },
    { belge: "Emlak deger tespiti (rayic bedel)", zorunlu: false, nereden: "Belediye / Ekspertiz" },
    { belge: "Olum belgesi ve nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "Zamanasiminatabi degil (mulkiyet hakkina dayanan dava)",
    yasalDayanak: "01.04.1974 tarihli 1/2 sy. YİBK",
    aciklama: "Muris muvazaasi davasi, muvazaali islemin gecersizligi nedeniyle mulkiyet hakkina dayanir. TMK m.683 uyarinca mulkiyet hakkina dayanan dava zamanasiminaya da hak dusurucusureyetabidir.",
  },
  pratikNot:
    "01.04.1974 tarihli 1/2 sy. Yargitay Ictihadirlestirme Karari bu dava turununn temelini olusturur. Mirasbirakanin diger mirascilardan mal kacirmak amaciyla tasinmazini tapuda satis gosterip gercekte bagisladigi iddia edilir. Davaci miras payi oraninda tapu iptali ve tescil talep eder.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12"],
  ozelKanunlar: ["TMK m.6", "TMK m.683", "TBK m.19", "01.04.1974 tarih 1/2 sy. YIBK"],
};

const mirasDenklestirme: DavaTuru = {
  id: "miras-denklestirme",
  maddeNo: 70,
  ad: "Mirasta Denklestirme (Iade) Davasi",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: mirasKesinYetki,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Miras hukukundan dogan ozel nitelikli dava.",
    yasalDayanak: "HMK m.74",
    icerik: ["Mirasta denklestirme davasi acma ve takip etme"],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Denklestirmeye tabi kazandirma (ceyiz, mal verme vb.)", zorunlu: true },
    { bilgi: "Kazandirmanin degeri ve tarihi", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Olum belgesi", zorunlu: true, nereden: "Nufus mudurlugu / e-Devlet" },
    { belge: "Kazandirmayi gosteren belgeler", zorunlu: true, nereden: "Muvekkil / Tapu / Banka" },
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "10 yil (mirasbirakanin olumunden itibaren)",
    yasalDayanak: "TBK m.146 kiyas yoluyla",
    aciklama: "Denklestirme davasi icin ozel zamanasimiduezenlenmesi bulunmamakta olup genel zamanasimiuygulanir.",
    baslangic: "Mirasbirakanin olum tarihi",
  },
  pratikNot:
    "TMK m.669-675 hukumleri uygulanir. Altsoyun esite ceyiz, kurulussmukayesinde veya borcun odenmesi seklinde mirasbirakanin sagliginda aldigi degerler denklestirmeye tabidir. Mirasbirakanmuaftutumusda haricdir (TMK m.671).",
  hmkMaddeleri: ["HMK m.2", "HMK m.11"],
  ozelKanunlar: ["TMK m.669-675"],
};

const mirascilikIptal: DavaTuru = {
  id: "mirasciliktan-cikarma-iptali",
  maddeNo: 71,
  ad: "Mirasciliktan Cikarmanin Iptali Davasi",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: mirasKesinYetki,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Miras hakki ile ilgili ozel nitelikli dava.",
    yasalDayanak: "HMK m.74",
    icerik: ["Mirasciliktan cikarmanin iptali davasi acma ve takip etme"],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Cikarma sebebinin gercege dayanmadigi iddiasi", zorunlu: true },
    { bilgi: "Cikarma tasarrufu (vasiyetname veya miras sozlesmesi)", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Cikarmayi iceren vasiyetname/miras sozlesmesi sureti", zorunlu: true, nereden: "Sulh hukuk mahkemesi" },
    { belge: "Cikarma sebebinin asilsizligini gosteren deliller", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Olum belgesi ve nufus kaydi", zorunlu: true, nereden: "e-Devlet" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "1 yil (ogrenme) / 10 yil (acilma)",
    yasalDayanak: "TMK m.559 kiyas yoluyla",
    aciklama: "Vasiyetnamenin iptali davasina iliskin sureler uygulanir.",
    baslangic: "Cikarma isleminin ogrenildigi tarih",
  },
  pratikNot:
    "TMK m.510 uyarinca mirasciliktan cikarma (iskat) sakli pay mirascisinin: (1) mirasbirakanveya yakinlarina agir suc islemesi, (2) aile hukukundan dogan yukumluluklerini agir bicimde ihlal etmesi hallerinde yapilabilir. Cikarma sebebi ispat edilemezse cikarma iptal olur. Ispat yuku cikarmayi savunana aittir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.11"],
  ozelKanunlar: ["TMK m.510-513", "TMK m.559"],
};

const olumeBagliTasarrufIptali: DavaTuru = {
  id: "olume-bagli-tasarruf-iptali",
  maddeNo: 72,
  ad: "Olume Bagli Tasarrufun Iptali Davasi",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: mirasKesinYetki,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Miras hukukuna iliskin ozel nitelikli dava.",
    yasalDayanak: "HMK m.74",
    icerik: ["Olume bagli tasarrufun iptali davasi acma ve takip etme"],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Iptali istenen tasarrufun turu ve icerigi", zorunlu: true },
    { bilgi: "Iptal nedeni (ehliyetsizlik, sekil, irade, hukuka aykirilik)", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Olume bagli tasarruf belgesi sureti", zorunlu: true, nereden: "Sulh hukuk mahkemesi" },
    { belge: "Olum belgesi", zorunlu: true, nereden: "e-Devlet" },
    { belge: "Iptal nedenine iliskin deliller (saglik raporlari vb.)", zorunlu: false, nereden: "Hastane / Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "1 yil (ogrenme) / 10 yil (acilma) / 20 yil (kotuniyetli)",
    yasalDayanak: "TMK m.559",
    aciklama: "Davaci, iptal sebebini ve hak sahibi oldugunu ogrendigi tarihten itibaren 1 yil, her halde acilma tarihinden itibaren 10 yil, kotuniyetli elde tutanlara karsi 20 yil icinde dava acmalidir.",
    baslangic: "Iptal sebebi ve hak sahipliginin ogrenildigi tarih",
  },
  pratikNot:
    "Olume bagli tasarruf: vasiyetname ve miras sozlesmesini kapsar. Iptal sebepleri TMK m.557'de belirtilmistir. Miras sozlesmesi icin de ayni iptal sebepleri gecerlidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.11"],
  ozelKanunlar: ["TMK m.557-559", "TMK m.545-556"],
};

const mirasOrtakligiTemsilci: DavaTuru = {
  id: "miras-ortakligi-temsilci",
  maddeNo: 73,
  ad: "Miras Ortakligina Temsilci Atanmasi Davasi",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: {
    mahkeme: "Sulh Hukuk Mahkemesi",
    yasalDayanak: "TMK m.640/3, HMK m.4",
    aciklama: "Miras ortakligina temsilci atanmasi talebi sulh hukuk mahkemesinin gorevine girer. Ancak cekismeli hale gelirse asliye hukuk mahkemesi gorevlidir.",
    ozelDurum: "Cekismesiz yargi isi olarak sulh hukuk mahkemesince karara baglanir.",
  },
  yetkiliMahkeme: mirasKesinYetki,
  harclar: maktuHarc,
  masraflar: standartMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Tum mirascilar ve iletisim bilgileri", zorunlu: true },
    { bilgi: "Temsilci atanmasinin gerekceleri", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Olum belgesi", zorunlu: true, nereden: "e-Devlet" },
    { belge: "Tereke malvarligi listesi", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "basit",
  arabuluculuk: arabuluculukYok,
  pratikNot:
    "TMK m.640 uyarinca mirascilardanbiri, terekeye dahil malvarligi degerlerinin korunmasi icin gerekli onlemlerin alinmasini sulh hakiminden isteyebilir. Temsilci, terekenin yonetimi icin atanir.",
  hmkMaddeleri: ["HMK m.4", "HMK m.316", "HMK m.382"],
  ozelKanunlar: ["TMK m.640"],
};

const mirasPayiTasarruf: DavaTuru = {
  id: "miras-payi-tasarruf",
  maddeNo: 74,
  ad: "Miras Payi Uzerinde Tasarruf Davalari",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: mirasKesinYetki,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Miras payi devri ozel yetki gerektiren islemlerdendir.",
    yasalDayanak: "HMK m.74",
    icerik: ["Miras payi uzerinde tasarruf davasi acma ve takip etme"],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Devredilen miras payinin orani ve konusu", zorunlu: true },
    { bilgi: "Devir isleminin gecersizlik sebebi", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Miras payi devir sozlesmesi", zorunlu: true, nereden: "Muvekkil / Noter" },
    { belge: "Olum belgesi", zorunlu: true, nereden: "e-Devlet" },
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "10 yil",
    yasalDayanak: "TBK m.146",
    aciklama: "Genel zamanasimisuersine tabidir.",
    baslangic: "Devir isleminin yapildigi tarih",
  },
  pratikNot:
    "Miras payinin ucuncukisilere devri noter senedi ile yapilmalidir (TMK m.677). Mirascilar arasinda devir adi yazili sekille yapilabilir. Paylasilmamis tereke uzerinde tasarruf islemleri ancak tum mirascilarinin rizasiyla mumkundur (TMK m.702).",
  hmkMaddeleri: ["HMK m.2", "HMK m.11"],
  ozelKanunlar: ["TMK m.677-678", "TMK m.702"],
};

const mirasSirketiKayyim: DavaTuru = {
  id: "miras-sirketi-kayyim",
  maddeNo: 75,
  ad: "Miras Sirketine Kayyim Atanmasi Davasi",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: {
    mahkeme: "Sulh Hukuk Mahkemesi",
    yasalDayanak: "TMK m.427, HMK m.4",
    aciklama: "Kayyim atanmasi vesayet hukuku kapsaminda sulh hukuk mahkemesinin gorevine girer.",
    ozelDurum: "Cekismeli hallerde asliye hukuk mahkemesi gorevlidir.",
  },
  yetkiliMahkeme: mirasKesinYetki,
  harclar: maktuHarc,
  masraflar: standartMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Tum mirascilar listesi", zorunlu: true },
    { bilgi: "Kayyim atanmasinin gerekceleri (anlasamama, yokluk vb.)", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Olum belgesi", zorunlu: true, nereden: "e-Devlet" },
    { belge: "Tereke malvarligi listesi", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "basit",
  arabuluculuk: arabuluculukYok,
  pratikNot:
    "TMK m.427 uyarinca belirli bir isin gorulemesi veya malvarliginin yonetimi icin kayyim atanabilir. Miras sirketinin (elbirligi mulkiyeti) yonetilemedigit hallerde sulh hakiminden kayyim atanmasi istenebilir.",
  hmkMaddeleri: ["HMK m.4", "HMK m.316", "HMK m.382"],
  ozelKanunlar: ["TMK m.427", "TMK m.640"],
};

// ---------------------------------------------------------------------------
// 1.6. Soybagi Davalari — Aile Mahkemesi Olmayan Yerlerde (madde 76-79)
// ---------------------------------------------------------------------------

const soybagininReddi: DavaTuru = {
  id: "soybaginin-reddi",
  maddeNo: 76,
  ad: "Soybaginin Reddi (Nesebin Reddi) Davasi",
  kategori: "asliye-hukuk",
  altKategori: "soybagi",
  gorevliMahkeme: asliyeHukukSoybagGorev,
  yetkiliMahkeme: soybagYetkisi,
  harclar: maktuHarc,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
    bilirkisiUcreti: BILIRKISI_UCRETI,
    toplamTahmini: 5000,
    aciklama: "DNA testi ucreti ve tebligat masraflari dahil tahmini tutar.",
  },
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Soybagi davalari sahsa sikiya sikiya bagli haklardandir.",
    yasalDayanak: "HMK m.74",
    icerik: [
      "Soybaginin reddi davasi acma ve takip etme",
    ],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Cocugun kimlik bilgileri ve dogum tarihi", zorunlu: true },
    { bilgi: "Evlilik tarihi ve baba olarak gosterilen kisinin bilgileri", zorunlu: true },
    { bilgi: "Red sebebi (baska erkekten olma iddiasi vb.)", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi (aile)", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Dogum belgesi", zorunlu: true, nereden: "Hastane / Nufus mudurlugu" },
    { belge: "Evlenme belgesi", zorunlu: true, nereden: "Nufus mudurlugu / e-Devlet" },
    { belge: "DNA testi raporu (yapildiysa)", zorunlu: false, nereden: "Adli Tip / Hastane" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Sahsa sikiya sikiya bagli haklar arabuluculuga elverislidegildir.",
  },
  zamanasimi: {
    sure: "1 yil (koca icin: dogumu veya baska baba olma ihtimalini ogrenme) / Cocuk icin: ergin olma + 1 yil",
    yasalDayanak: "TMK m.289",
    aciklama:
      "Kocanin dava hakki, dogum ve baska birinin baba olma ihtimalini ogrendigiti tarihten itibaren 1 yil icinde duser. Cocugun dava hakki, ergin oldugu tarihten baslayarak 1 yildir.",
    baslangic: "Kocanin dogumu ogrendigi tarih / Cocugun ergin oldugu tarih",
  },
  pratikNot:
    "Babalik karinesi: evlilik icinde dogan veya evlenmeden once ana rahmine dusup de evlilik icinde dogan cocugun babasi kocadir (TMK m.285). Koca dava acmazsa miras dileri de dava acabilir (TMK m.291). Ana, cocugu dogumdan once ve evlenme sirasinda aldatildigini ispat etmis sayilir (TMK m.288).",
  hmkMaddeleri: ["HMK m.2"],
  ozelKanunlar: ["TMK m.285-291", "4787 sy. Kanun m.4"],
};

const babalikDavasi: DavaTuru = {
  id: "babalik-davasi",
  maddeNo: 77,
  ad: "Babalik Davasi",
  kategori: "asliye-hukuk",
  altKategori: "soybagi",
  gorevliMahkeme: asliyeHukukSoybagGorev,
  yetkiliMahkeme: soybagYetkisi,
  harclar: maktuHarc,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
    bilirkisiUcreti: BILIRKISI_UCRETI,
    toplamTahmini: 5000,
    aciklama: "DNA testi ucreti ve tebligat masraflari dahil tahmini tutar.",
  },
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Soybagi davalari sahsa sikiya sikiya bagli haklardandir.",
    yasalDayanak: "HMK m.74",
    icerik: [
      "Babalik davasi acma ve takip etme",
      "Cocuk icin nafaka ve tazminat talep etme",
    ],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Cocugun kimlik bilgileri ve dogum tarihi", zorunlu: true },
    { bilgi: "Baba oldugu iddia edilen kisinin kimlik bilgileri", zorunlu: true },
    { bilgi: "Ana ile davalinin iliskisini gosteren olgular", zorunlu: true },
    { bilgi: "Nafaka ve tazminat talebi (varsa)", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi (ana ve cocuk)", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Dogum belgesi", zorunlu: true, nereden: "Hastane" },
    { belge: "DNA testi raporu (yapildiysa)", zorunlu: false, nereden: "Adli Tip / Hastane" },
    { belge: "Iliskiyi gosteren deliller (mesaj, fotograf vb.)", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Sahsa sikiya sikiya bagli haklar arabuluculuga elverislidegildir.",
  },
  zamanasimi: {
    sure: "Ana icin: dogumdan itibaren 1 yil / Cocuk icin: hak dusurucusuereye tabi degil",
    yasalDayanak: "TMK m.303",
    aciklama:
      "Babalik davasi, ananin dogumdan itibaren 1 yil icinde acmasi gerekir. Cocugun dava acma hakki suersiz yani hak dusurucusuereye tabi degildir.",
    baslangic: "Dogum tarihi (ana icin)",
  },
  pratikNot:
    "TMK m.302: davalinin, cocugun ana rahmine dusmu oldugu donemde anayla cinsel iliskide bulundugu ispat edilmisse babalik karinesi isler. Dava ana ve/veya cocuk tarafindan babaya, baba olmuse mirascilarinaveyaona kari acilir. C. Savcisina ve Hazineye bildirilir (TMK m.301).",
  hmkMaddeleri: ["HMK m.2"],
  ozelKanunlar: ["TMK m.301-304", "4787 sy. Kanun m.4"],
};

const tanımaninIptali: DavaTuru = {
  id: "tanimanin-iptali",
  maddeNo: 78,
  ad: "Tanimanin Iptali Davasi",
  kategori: "asliye-hukuk",
  altKategori: "soybagi",
  gorevliMahkeme: asliyeHukukSoybagGorev,
  yetkiliMahkeme: soybagYetkisi,
  harclar: maktuHarc,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
    bilirkisiUcreti: BILIRKISI_UCRETI,
    toplamTahmini: 5000,
    aciklama: "DNA testi ucreti ve tebligat masraflari dahil tahmini tutar.",
  },
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Soybagi davalari sahsa sikiya sikiya bagli haklardandir.",
    yasalDayanak: "HMK m.74",
    icerik: ["Tanimanin iptali davasi acma ve takip etme"],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tanima isleminin tarihi ve nufus mudurlugu kaydi", zorunlu: true },
    { bilgi: "Tanimanin iptali sebebi (yanilma, aldatma, gercek disi vb.)", zorunlu: true },
    { bilgi: "Cocugun ve ananin kimlik bilgileri", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Tanima belgesi sureti", zorunlu: true, nereden: "Nufus mudurlugu" },
    { belge: "DNA testi raporu (yapildiysa)", zorunlu: false, nereden: "Adli Tip / Hastane" },
    { belge: "Iptal nedenini gosteren deliller", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Sahsa sikiya sikiya bagli haklar arabuluculuga elverislidegildir.",
  },
  zamanasimi: {
    sure: "Taniyankisi: ogrenme + 1 yil, herhalde tanima + 5 yil / Ana, cocuk, C. Savcisi: sueresiniz",
    yasalDayanak: "TMK m.300",
    aciklama:
      "Taniyankisi yanilma, aldatma veya korkutmayi ogrendikten itibaren 1 yil, her halde tanima tarihinden itibaren 5 yil icinde iptal davasi acabilir. Ana, cocuk ve C. Savcisi icin sure yoktur.",
    baslangic: "Irade sakatligi halinin ogrenildigi tarih",
  },
  pratikNot:
    "Tanima, nufus memuruna veya mahkemeye yazili basvuru ya da resmi senetle yapilir (TMK m.295). Irade sakatligi nedeniyle taniyanin kendisi; tanimanin gercek olmadigi iddiasi ile ana, cocuk ve C. Savcisi iptal davasi acabilir (TMK m.297-298).",
  hmkMaddeleri: ["HMK m.2"],
  ozelKanunlar: ["TMK m.295-300", "4787 sy. Kanun m.4"],
};

const soybagininDuzeltilmesi: DavaTuru = {
  id: "soybaginin-duzeltilmesi",
  maddeNo: 79,
  ad: "Soybaginin Duzeltilmesi Davasi",
  kategori: "asliye-hukuk",
  altKategori: "soybagi",
  gorevliMahkeme: asliyeHukukSoybagGorev,
  yetkiliMahkeme: soybagYetkisi,
  harclar: maktuHarc,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
    bilirkisiUcreti: BILIRKISI_UCRETI,
    toplamTahmini: 5000,
    aciklama: "DNA testi ucreti ve tebligat masraflari dahil tahmini tutar.",
  },
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Soybagi davalari sahsa sikiya sikiya bagli haklardandir.",
    yasalDayanak: "HMK m.74",
    icerik: ["Soybaginin duzeltilmesi davasi acma ve takip etme"],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Cocugun ve nufusa kayitli anne-babanin kimlik bilgileri", zorunlu: true },
    { bilgi: "Gercek soybag iliskisi iddiasi ve deliller", zorunlu: true },
    { bilgi: "Nufus kaydindaki hatali kaydinyazilartarihi", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi (aile)", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Dogum belgesi", zorunlu: true, nereden: "Hastane" },
    { belge: "DNA testi raporu (yapildiysa)", zorunlu: false, nereden: "Adli Tip / Hastane" },
    { belge: "Duzeltmeyi destekleyen diger belgeler", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Sahsa sikiya sikiya bagli haklar arabuluculuga elverislidegildir.",
  },
  zamanasimi: {
    sure: "Hak dusurucusuereye tabi degil (TMK ve 5490 sy. Kanun)",
    yasalDayanak: "5490 sy. Kanun m.36",
    aciklama: "Nufus kayitlarinin duzeltilmesi davalari kural olarak suereye tabi degildir.",
  },
  pratikNot:
    "Soybaginin duzeltilmesi, nufus kaydindaki anne ve/veya baba bilgisinin gercek duruma uygun hale getirilmesini amaclar. Bu dava bazen soybaginin reddi + babalik + nufus kaydi duzeltme taleplerini birlikte icerebilir. Nufus mudurlugu davaliolarak gosterilir, C. Savcisi da davaya katilir.",
  hmkMaddeleri: ["HMK m.2"],
  ozelKanunlar: ["TMK m.282-284", "5490 sy. Nufus Hizmetleri Kanunu m.36", "4787 sy. Kanun m.4"],
};

// ---------------------------------------------------------------------------
// EXPORT
// ---------------------------------------------------------------------------

export const bolum01AsliyeHukuk: DavaTuru[] = [
  // 1.1. Tasinmaz (Gayrimenkul) Davalari
  tapuIptaliVeTescil,
  murisMuvazaasiMiras,
  vekaletKotuyeKullanma,
  sahteVekaletnameTapu,
  elatmaninOnlenmesi,
  ecrimisil,
  gecitHakki,
  mecraHakki,
  ustHakki,
  kaynakHakki,
  intifaHakki,
  suknaHakki,
  sufaHakki,
  muhdesatAidiyeti,
  tapuyaSerhDavasi,
  komsulukHukuku,
  sinirTespiti,
  kamulastirmaBedel,
  kamulastirmasizElAtma,
  kamulastirmaIptali,
  aceleKamulastirmaItiraz,
  taskinYapi,
  katKarsiligiInsaat,
  // 1.2. Tazminat Davalari
  maddiTazminat,
  maneviTazminat,
  destektenYoksunKalma,
  isGoremezlikTazminati,
  haksizFiilTazminat,
  vekaletsizIsGorme,
  sebepsizZenginlesme,
  adamCalistiranSorumluluk,
  yapiMalikiSorumluluk,
  hayvanSahibiSorumluluk,
  tehlikeSorumlulugu,
  motorluAracKazaTazminat,
  trafikKazasiTazminat,
  degerKaybiTazminati,
  malpraktisTazminat,
  avukatHatasiTazminat,
  hekimSorumlulukTazminat,
  hastaneKusursuzSorumluluk,

  // 1.3. Borclar Hukuku / Sozlesme Davalari
  // 1.3. Borclar Hukuku / Sozlesme Davalari (42-54)
    alacakDavasi,
    itirazinIptaliDavasi,
    menfiTespitDavasi,
    istirdatDavasi,
    sozlesmeninFeshiDavasi,
    sozlesmeninUyarlanmasi,
    kiraDisTahliye,
    eserSozlesmesi,
    vekaletSozlesmesi,
    ariyetSozlesmesi,
    bagislamaVaadindenDonme,
    culpaInContrahendo,
    cezaiSartDavasi,
  
    // 1.4. Kisilik Haklari ve Nufus Davalari (55-65)
    kisilikHaklariTazminat,
    adSoyadDegistirme,
    yasDuzeltme,
    cinsiyetDegistirme,
    nufusKaydiDuzeltme,
    gaiplikKarari,
    olumKarinesi,
    derneklerVakiflar,
    basinKisilikIhlali,
    internetKisilikIhlali,
    erisimEngelleme,
  
    // 1.5. Miras Hukuku Davalari (66-75)
    mirasSebebiyleIstihkak,
    vasiyetnameninIptali,
    tenkisDavasi,
    murisMuvazaasi,
    mirasDenklestirme,
    mirascilikIptal,
    olumeBagliTasarrufIptali,
    mirasOrtakligiTemsilci,
    mirasPayiTasarruf,
    mirasSirketiKayyim,
  
    // 1.6. Soybagi Davalari (76-79)
    soybagininReddi,
    babalikDavasi,
    tanımaninIptali,
    soybagininDuzeltilmesi,
];
