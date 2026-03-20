// Bolum 16: Noter Islemleri, Ihtarnameler ve Diger - Madde 434-436

import type { DavaTuru } from "@/lib/types";
import { BASVURMA_HARCI, TEBLIGAT_MASRAFI } from "./harclar";

const ihtarnameler: DavaTuru = {
  id: "noter-ihtarnameler",
  maddeNo: 434,
  ad: "Ihtarnameler (Kira, tahliye, temerrut, fesih, ayip, ise iade, terk)",
  kategori: "noter-diger",
  altKategori: "ihtarnameler",
  gorevliMahkeme: {
    mahkeme: "Noterlik",
    yasalDayanak: "1512 sy. Noterlik K., 7201 sy. Tebligat K.",
    aciklama:
      "Ihtarname, ileride acilacak dava veya takipler icin temerrut, fesih, tahliye veya ihbar iradesinin resmi kanaldan karsi tarafa bildirilmesini saglar.",
    ozelDurum:
      "Bazi dava ve takiplerde on ihtar zorunlu veya fiilen cok onemlidir; sure hesabina esas tarih dogru kurulmalidir.",
  },
  yetkiliMahkeme: {
    genelYetki: "Herhangi bir noterlik; teblig muhatabin bilinen adresine yoneltilir",
    kesinYetkiMi: false,
    yasalDayanak: "1512 sy. Noterlik K.",
    aciklama:
      "Ihtarname noterlikte duzenlenir, ancak hukuki sonuc muhataba ulasmasi ve icerigin ispatlanabilir olmasi ile dogar.",
  },
  harclar: {
    basvuruHarci: 0,
    kararIlamHarci: "maktu",
    aciklama:
      "Yargi harci yoktur. Noterlik ucreti, sayfa sayisi ve teblig giderine gore noterlik tarifesi uyarinca hesaplanir.",
  },
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI,
    diger: [{ ad: "Noterlik duzenleme/ucret kalemleri", tutar: 1200 }],
    toplamTahmini: 1400,
    aciklama:
      "Metin uzunlugu, ek sayisi ve teblig sekline gore noterlik bedeli degisir.",
  },
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Ihtarname gonderimi icin genel vekaletname yeterlidir.",
    yasalDayanak: "HMK m.74",
  },
  muvekkilBilgileri: [
    { bilgi: "Kimlik veya vergi/ticaret sicil bilgileri", zorunlu: true },
    { bilgi: "Muhatabin acik adresi", zorunlu: true },
    { bilgi: "Ihtar konusu ve talep sonucu", zorunlu: true },
    { bilgi: "Sure verilmesi gereken hallerde istenen bitis tarihi", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Kimlik veya imza sirkuleri", zorunlu: true },
    { belge: "Dayanak sozlesme/fatura/tutanak", zorunlu: false },
    { belge: "Vekaletname (vekil ile islem yapiliyorsa)", zorunlu: false },
  ],
  yargilamaUsulu: "ozel",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Ihtarname bir on islem veya delil guclendirme aracidir; arabuluculuk sureci degildir.",
  },
  pratikNot:
    "Ihtarname metninde talep sonucu, odeme veya ifa icin verilen sure ve hukuki sonuclar acik yazilmalidir. Yanlis adres veya muhatap secimi, sonradan sure ve temerrut tartismasi yaratir.",
  hmkMaddeleri: [],
  ozelKanunlar: ["1512 sy. Noterlik K.", "7201 sy. Tebligat K."],
};

const sozlesmeler: DavaTuru = {
  id: "sozlesme-duzenleme-inceleme",
  maddeNo: 435,
  ad: "Sozlesmeler (Kira, is, ticari, hisse devir, insaat, sulh/ibra, NDA, bosanma/miras protokolleri)",
  kategori: "noter-diger",
  altKategori: "sozlesmeler",
  gorevliMahkeme: {
    mahkeme: "Noterlik / Avukatlik Hizmeti",
    yasalDayanak: "TBK, TTK, TMK, 1512 sy. Noterlik K.",
    aciklama:
      "Sozlesme hazirlama ve inceleme sureci bir dava degil, ileride dogabilecek uyusmazliklari azaltan kurucu hukuki islem hizmetidir.",
    ozelDurum:
      "Pay devri, gayrimenkul, miras ve aile hukukuna iliskin bazi sozlesmelerde resmi sekil veya mahkeme onayi aranabilir.",
  },
  yetkiliMahkeme: {
    genelYetki: "Taraflarin tercih ettigi noterlik veya hukuki danismanlik sureci",
    kesinYetkiMi: false,
    yasalDayanak: "1512 sy. Noterlik K.",
    aciklama:
      "Sozlesme duzenleme surecinde yargi yeri degil, islem guvenligi ve sekil sartlari on plandadir.",
  },
  harclar: {
    basvuruHarci: 0,
    kararIlamHarci: "maktu",
    aciklama:
      "Yargi harci yoktur. Noterlik ucreti ve avukatlik hizmet bedeli sozlesmenin turune ve resmi sekil zorunluluguna gore degisir.",
  },
  masraflar: {
    tebligatMasrafi: 0,
    diger: [
      { ad: "Sozlesme inceleme ve taslak gideri", tutar: 2500 },
      { ad: "Noterlik ve imza onayi", tutar: 1500 },
    ],
    toplamTahmini: 4000,
    aciklama:
      "Masraf, sozlesmenin karmasikligi ve resmi sekil gerekip gerekmedigine gore degisir.",
  },
  ozelVekaletname: {
    gerekliMi: false,
    neden:
      "Sozlesme duzenleme icin genel vekaletname yeterli olabilir; tasarruf islemine bagli ozel yetkiler ayrica eklenmelidir.",
    yasalDayanak: "HMK m.74",
  },
  muvekkilBilgileri: [
    { bilgi: "Taraflarin kimlik/unvan bilgileri", zorunlu: true },
    { bilgi: "Sozlesmenin ticari ve hukuki amaci", zorunlu: true },
    { bilgi: "Bedel, sure, cezai sart ve fesih yapisi", zorunlu: true },
    { bilgi: "Resmi sekil veya noter onayi ihtiyaci", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Kimlik, imza sirkuleri, sirket karar organi belgeleri", zorunlu: true },
    { belge: "Tapu, ruhsat, teknik sartname veya finansal ekler", zorunlu: false },
    { belge: "Taslak metin veya onceki sozlesmeler", zorunlu: false },
  ],
  yargilamaUsulu: "ozel",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Sozlesme kurulumu asamasinda arabuluculuk dava sarti gundemde degildir.",
  },
  pratikNot:
    "Sozlesme dili, uyusmazlik cozumu, yetkili mahkeme/tahkim, cezai sart ve delil sozlesmesi maddeleri sonradan cikacak ihtilafin kaderini belirler. Sekil zorunlulugu olan metinler sade ama kesin kurulmalidir.",
  hmkMaddeleri: [],
  ozelKanunlar: ["TBK", "TTK", "TMK", "1512 sy. Noterlik K."],
};

const digerHazirlikVeKorumaIslemleri: DavaTuru = {
  id: "diger-hazirlik-ve-koruma-islemleri",
  maddeNo: 436,
  ad: "Diger islemler (Vekaletname, vasiyetname, delil tespiti, ihtiyati tedbir/haciz, konkordato on projesi)",
  kategori: "noter-diger",
  altKategori: "diger-islemler",
  gorevliMahkeme: {
    mahkeme: "Noterlik / Sulh Hukuk / Asliye Hukuk / Asliye Ticaret / Icra Dairesi",
    yasalDayanak: "HMK m.389-400, IIK m.257 vd., IIK m.285 vd.",
    aciklama:
      "Bu baslik altinda, davadan once veya dava disinda kullanilan koruma, delil ve hazirlik islemleri toplanmistir. Gorevli merci islem turune gore degisir.",
    ozelDurum:
      "Delil tespiti ve ihtiyati tedbir taleplerinde aciliyet ve zarar riski somut belgelerle ispatlanmalidir. Konkordatoda mali veri seti eksiksiz kurulmalidir.",
  },
  yetkiliMahkeme: {
    genelYetki: "Islemin niteligine gore degisen yetkili merci",
    ozelYetki: [
      "Delil tespitinde delilin bulundugu yer veya esas davaya bakacak mahkeme",
      "Ihtiyati tedbirde esas davaya bakacak mahkeme veya acil hallerde talep yeri mahkemesi",
      "Ihtiyati hacizde borclunun yerlesim yeri veya malvarliginin bulundugu yer",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.390, HMK m.400, IIK m.258",
    aciklama:
      "Tek bir yetki kurali yoktur; once islem tipi belirlenmeli sonra dogru merciye gidilmelidir.",
  },
  harclar: {
    basvuruHarci: BASVURMA_HARCI,
    kararIlamHarci: "maktu",
    aciklama:
      "Noterlik islemlerinde yargi harci yoktur; mahkemeden talep edilen koruma ve tespit islemlerinde maktu harc ve gider avansi gerekir.",
  },
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 2,
    diger: [
      { ad: "Bilirkisi veya uzman incelemesi", tutar: 3000 },
      { ad: "Noterlik/vekaletname/vasiyetname gideri", tutar: 1500 },
    ],
    toplamTahmini: 4900,
    aciklama:
      "Masraf kalemleri secilen isleme gore ciddi farklilik gosterir; bilirkisi ve teminat gideri eklenebilir.",
  },
  ozelVekaletname: {
    gerekliMi: true,
    neden:
      "Vekaletname duzenleme, sulh, feragat, tahsil ve tasarruf etkili islemler icin ozel yetki gerekip gerekmedigi metne gore kontrol edilmelidir.",
    yasalDayanak: "HMK m.74",
  },
  muvekkilBilgileri: [
    { bilgi: "Talep edilen islem turu", zorunlu: true },
    { bilgi: "Aciliyet, zarar riski veya delil kaybi gerekcesi", zorunlu: false },
    { bilgi: "Karsi taraf ve olay ozeti", zorunlu: false },
    { bilgi: "Mali durum ve borc tablosu (konkordato ise)", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Vekaletname veya kimlik belgeleri", zorunlu: true },
    { belge: "Delil tespitine esas teknik belgeler, foto, tutanak", zorunlu: false },
    { belge: "Ihtiyati tedbir/haciz icin alacak ve risk belgeleri", zorunlu: false },
    { belge: "Konkordato on projesi ve finansal tablolar", zorunlu: false },
    { belge: "Vasiyetname veya noterlik duzenleme formu", zorunlu: false },
  ],
  yargilamaUsulu: "ozel",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Bu islemler koruma veya hazirlik niteligindedir; genel bir arabuluculuk sarti yoktur.",
  },
  pratikNot:
    "Bu baslik bilincli olarak karmasik tutuldu; cunku pratikte ayni dosyada noterlik islemi, delil tespiti ve gecici hukuki koruma adimlari birlikte planlanir. Islem secimi yanlis kuruldugunda sure, teminat ve yetki sorunlari cikar.",
  hmkMaddeleri: ["HMK m.389", "HMK m.390", "HMK m.400"],
  ozelKanunlar: ["IIK m.257 vd.", "IIK m.285 vd.", "1512 sy. Noterlik K."],
};

export const bolum16NoterDiger: DavaTuru[] = [
  ihtarnameler,
  sozlesmeler,
  digerHazirlikVeKorumaIslemleri,
];
