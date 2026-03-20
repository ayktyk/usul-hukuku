// Bolum 11: Arabuluculuk, Uzlastirma ve Tahkim — Madde 425-428

import type { DavaTuru } from "@/lib/types";
import { BASVURMA_HARCI, TEBLIGAT_MASRAFI } from "./harclar";

const davaSartiArabuluculuk: DavaTuru = {
  id: "dava-sarti-arabuluculuk",
  maddeNo: 425,
  ad: "Dava Sarti Arabuluculuk",
  kategori: "arabuluculuk-tahkim",
  altKategori: "arabuluculuk",
  gorevliMahkeme: {
    mahkeme: "Arabuluculuk Burosu / Adliye Arabuluculuk Merkezi",
    yasalDayanak: "6325 sy. K. m.18/A, m.18/B",
    aciklama:
      "Dava sarti arabuluculukta, arabuluculuk surecine basvuru dava acilmadan once yapilir. Basvuru karsi tarafin yerlesim yerindeki veya islemin yapildigi yerdeki arabuluculuk burosuna yapilir.",
    ozelDurum:
      "Is davalari (7036 m.3), ticari davalar (TTK m.5/A), tuketici davalari (6502 m.73/A), kira ve ortakligin giderilmesi davalari (6325 m.18/B) zorunlu arabuluculuk kapsamindadir.",
  },
  yetkiliMahkeme: {
    genelYetki:
      "Karsi tarafin yerlesim yeri veya islemin yapildigi yerdeki arabuluculuk burosu",
    kesinYetkiMi: false,
    yasalDayanak: "6325 sy. K. m.18/A",
    aciklama:
      "Arabuluculuk basvurusu, karsi tarafin yerlesim yerindeki veya islemin yapildigi yerdeki adliye arabuluculuk burosuna yapilir.",
  },
  harclar: {
    basvuruHarci: 0,
    kararIlamHarci: "maktu",
    aciklama:
      "Arabuluculuk basvurusu harcsizdir. Arabuluculuk ucreti Arabuluculuk Asgari Ucret Tarifesine gore belirlenir ve taraflarca esit olarak odenir.",
  },
  masraflar: {
    tebligatMasrafi: 0,
    toplamTahmini: 0,
    aciklama:
      "Arabuluculuk ucreti taraflarca odenir. Ilk iki saat ucretsizdir (dava sarti arabuluculukta). Anlasmaya varilamazsa dava asamasinda masraflar belirlenir.",
  },
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Arabuluculuk surecinde genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Yerlesim yeri adresi", zorunlu: true },
    { bilgi: "Karsi tarafin kimlik ve iletisim bilgileri", zorunlu: true },
    {
      bilgi: "Uyusmazligin konusu ve talep edilen miktar/islem",
      zorunlu: true,
    },
    {
      bilgi: "Dava turu (is, ticari, tuketici, kira vb.)",
      zorunlu: true,
      aciklama: "Hangi alanda arabuluculuk yapilacagi belirlenmelidir",
    },
  ],
  gerekliBelgeler: [
    { belge: "Kimlik fotokopisi", zorunlu: true },
    {
      belge: "Uyusmazliga iliskin belgeler (sozlesme, fatura, ihtarname vb.)",
      zorunlu: true,
    },
    {
      belge: "Vekaletname (vekil ile basvuruluyorsa)",
      zorunlu: false,
      aciklama: "Genel vekaletname yeterlidir",
    },
    {
      belge: "Talep miktarini gosteren hesaplama",
      zorunlu: false,
      aciklama: "Parasal talepler icin",
    },
  ],
  yargilamaUsulu: "ozel",
  arabuluculuk: {
    davaSarti: true,
    ihtiyari: false,
    yasalDayanak: "6325 sy. K. m.18/A, m.18/B, 7036 m.3, TTK m.5/A, 6502 m.73/A",
    aciklama:
      "Is, ticari, tuketici, kira, ortakligin giderilmesi ve kat mulkiyeti davalarinda arabuluculuk dava sartidir. Son tutanak alinmadan dava acilamaz.",
  },
  pratikNot:
    "Arabuluculuk son tutanagi alinmadan dava acilirsa dava usulden reddedilir. Ilk toplantiya katilmayan taraf yargilama giderlerine mahkum edilir ve lehine vekalet ucretine hukmoIunmaz.",
  hmkMaddeleri: ["HMK m.114", "HMK m.115"],
  ozelKanunlar: [
    "6325 sy. Arabuluculuk K. m.18/A",
    "6325 sy. Arabuluculuk K. m.18/B",
    "7036 sy. K. m.3",
    "TTK m.5/A",
    "6502 sy. K. m.73/A",
  ],
};

const ihtiyariArabuluculuk: DavaTuru = {
  id: "ihtiyari-arabuluculuk",
  maddeNo: 426,
  ad: "Ihtiyari Arabuluculuk Surecleri",
  kategori: "arabuluculuk-tahkim",
  altKategori: "arabuluculuk",
  gorevliMahkeme: {
    mahkeme: "Arabuluculuk Burosu / Ozel Arabuluculuk Merkezi",
    yasalDayanak: "6325 sy. K. m.13-17",
    aciklama:
      "Ihtiyari arabuluculukta taraflar, uzerinde serbestce tasarruf edebilecekleri her turlu ozel hukuk uyusmazliginda arabulucuya basvurabilir.",
  },
  yetkiliMahkeme: {
    genelYetki: "Taraflarin anlasmasi ile belirlenen yer",
    kesinYetkiMi: false,
    yasalDayanak: "6325 sy. K. m.13",
    aciklama:
      "Ihtiyari arabuluculukta yer serbestce belirlenir. Taraflarin anlasamadigi hallerde arabulucu belirler.",
  },
  harclar: {
    basvuruHarci: 0,
    kararIlamHarci: "maktu",
    aciklama:
      "Ihtiyari arabuluculuk harcsizdir. Arabuluculuk ucreti serbest tarifedir.",
  },
  masraflar: {
    tebligatMasrafi: 0,
    toplamTahmini: 0,
    aciklama: "Arabuluculuk ucreti taraflarin anlasmasi ile belirlenir.",
  },
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Yerlesim yeri adresi", zorunlu: true },
    { bilgi: "Karsi tarafin iletisim bilgileri", zorunlu: true },
    { bilgi: "Uyusmazligin konusu ve beklentiler", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Kimlik fotokopisi", zorunlu: true },
    { belge: "Uyusmazliga iliskin belgeler", zorunlu: true },
    {
      belge: "Arabuluculuk daveti/basvuru formu",
      zorunlu: false,
    },
  ],
  yargilamaUsulu: "ozel",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: true,
    yasalDayanak: "6325 sy. K. m.13-17",
    aciklama:
      "Taraflarin uzerinde serbestce tasarruf edebilecegi her turlu ozel hukuk uyusmazliginda ihtiyari arabuluculuga basvurulabilir. Anlasma belgesi ilam niteligindedir (icra edilebilir sozlesme).",
  },
  pratikNot:
    "Ihtiyari arabuluculukta anlasma belgesi, mahkeme onayi ile ilam niteligini kazanir. Sulh hukuk veya asliye hukuk mahkemesinden icra edilebilirlik serhi alinabilir.",
  hmkMaddeleri: [],
  ozelKanunlar: ["6325 sy. Arabuluculuk K. m.13-17", "6325 sy. K. m.18"],
};

const tahkimDavalari: DavaTuru = {
  id: "tahkim-davalari",
  maddeNo: 427,
  ad: "Tahkim Davalari (Ic, Milletlerarasi, ISTAC, ICC Tahkimi)",
  kategori: "arabuluculuk-tahkim",
  altKategori: "tahkim",
  gorevliMahkeme: {
    mahkeme: "Hakem Heyeti / Tahkim Kurumu",
    yasalDayanak: "HMK m.407-444, 4686 sy. MTK",
    aciklama:
      "Tahkim anlasmasi bulunan uyusmazliklarda devlet mahkemesi yerine hakem veya hakem heyeti karar verir. Ic tahkim HMK'ya, milletlerarasi tahkim 4686 sy. MTK'ya tabidir.",
    ozelDurum:
      "Kurumsal tahkimde ISTAC (Istanbul Tahkim Merkezi), ICC (Milletlerarasi Ticaret Odasi) veya baska kurumlar gorevlendirilir.",
  },
  yetkiliMahkeme: {
    genelYetki: "Tahkim anlasmasi ile belirlenen yer",
    ozelYetki: ["Tahkim yeri mahkemesi (yardim ve denetim icin)"],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.410, 4686 sy. MTK m.9",
    aciklama:
      "Tahkim yeri taraflarin anlasmasi ile belirlenir. Tahkim yardimlari icin tahkim yeri asliye hukuk mahkemesi yetkilidir.",
  },
  harclar: {
    basvuruHarci: 0,
    kararIlamHarci: "maktu",
    aciklama:
      "Tahkim harci kurumsal tahkimde kurum tarifesine goredir. Ad hoc tahkimde hakem ucreti taraflarca veya hakem tarafindan belirlenir.",
  },
  masraflar: {
    tebligatMasrafi: 0,
    toplamTahmini: 0,
    aciklama:
      "Tahkim masraflari davaya ve kuruma gore degisir. ISTAC, ICC tarifeleri uygulanir.",
  },
  ozelVekaletname: {
    gerekliMi: false,
    neden:
      "Tahkim icin genel vekaletname genellikle yeterlidir, ancak tahkim sozlesmesi imzalama yetkisi ozel olarak verilmelidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi / Ticaret Sicil No", zorunlu: true },
    { bilgi: "Yerlesim yeri / sirket merkezi adresi", zorunlu: true },
    { bilgi: "Tahkim anlasmasi veya sartnamesinin icerik ve tarihi", zorunlu: true },
    { bilgi: "Uyusmazligin konusu ve talep edilen miktar", zorunlu: true },
    {
      bilgi: "Karsi tarafin kimlik ve iletisim bilgileri",
      zorunlu: true,
    },
  ],
  gerekliBelgeler: [
    {
      belge: "Tahkim anlasmasi veya tahkim sarti iceren sozlesme",
      zorunlu: true,
    },
    { belge: "Uyusmazliga iliskin belgeler (sozlesme, fatura, yazisma vb.)", zorunlu: true },
    {
      belge: "Vekaletname (tahkim sozlesmesi yetkisi dahil)",
      zorunlu: true,
    },
    {
      belge: "Tahkim kurumu basvuru formu (kurumsal tahkimde)",
      zorunlu: false,
    },
  ],
  yargilamaUsulu: "ozel",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Tahkim ayrı bir uyusmazlik cozum yoludur. Arabuluculuk dava sarti uygulanmaz.",
  },
  pratikNot:
    "Tahkim anlasmasi varsa devlet mahkemesinde dava acilamaz (yetki itirazi). Tahkim karari kesindir, temyiz yolu yoktur. Sadece iptal davasi (sinirli sebepler) acilabilir.",
  hmkMaddeleri: ["HMK m.407-444"],
  ozelKanunlar: ["4686 sy. Milletlerarasi Tahkim K.", "ISTAC Tahkim Kurallari"],
};

const tahkimKarariIptali: DavaTuru = {
  id: "tahkim-karari-iptali-tenfiz",
  maddeNo: 428,
  ad: "Tahkim Karari Iptali ile Yabanci Hakem Kararinin Taninmasi/Tenfizi",
  kategori: "arabuluculuk-tahkim",
  altKategori: "tahkim",
  gorevliMahkeme: {
    mahkeme: "Asliye Hukuk Mahkemesi / Bolge Adliye Mahkemesi",
    yasalDayanak: "HMK m.439, 5718 sy. MOHUK m.60-64, 4686 sy. MTK m.15",
    aciklama:
      "Ic tahkim karari iptali: tahkim yerindeki bolge adliye mahkemesi (HMK m.439). Yabanci hakem karari tanima/tenfiz: asliye hukuk mahkemesi (MOHUK m.60).",
    ozelDurum:
      "Milletlerarasi tahkim karari iptali: tahkim yerindeki asliye hukuk mahkemesi (4686 m.15).",
  },
  yetkiliMahkeme: {
    genelYetki: "Tahkim yerindeki mahkeme (iptal) / davalinin yerlesim yeri (tenfiz)",
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.439, MOHUK m.61",
    aciklama:
      "Iptal davasi tahkim yerindeki mahkemede, tanima/tenfiz davalinin Turkiye'deki yerlesim yerinde acilir.",
  },
  harclar: {
    basvuruHarci: BASVURMA_HARCI,
    kararIlamHarci: "maktu",
    aciklama: "Iptal ve tenfiz davalari maktu harca tabidir.",
  },
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 2,
    toplamTahmini: 2000,
    aciklama: "Tebligat ve gider avansi masraflari.",
  },
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi / Ticaret Sicil No", zorunlu: true },
    { bilgi: "Yerlesim yeri adresi", zorunlu: true },
    { bilgi: "Tahkim kararinin kunyesi (tarih, sayi)", zorunlu: true },
    { bilgi: "Iptal/tenfiz gerekceleri", zorunlu: true },
  ],
  gerekliBelgeler: [
    {
      belge: "Tahkim kararinin aslı veya onayli sureti",
      zorunlu: true,
    },
    { belge: "Tahkim anlasmasi", zorunlu: true },
    {
      belge: "Kararin kesinlestigine dair belge",
      zorunlu: true,
      aciklama: "Tenfiz icin gereklidir",
    },
    {
      belge: "Yeminli tercuman tarafindan onaylanmis Turkce tercume",
      zorunlu: true,
      aciklama: "Yabanci dilde ise",
    },
    {
      belge: "Apostil veya konsolosluk onayi",
      zorunlu: false,
      aciklama: "Yabanci hakem karari icin",
    },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Tahkim karari iptali ve tenfiz davalarinda arabuluculuk uygulanmaz.",
  },
  zamanasimi: {
    sure: "Iptal: 30 gun (kararin tebliginden itibaren)",
    yasalDayanak: "HMK m.439/4",
    aciklama:
      "Ic tahkim karari iptali icin 30 gun, milletlerarasi tahkim karari iptali icin 30 gun (4686 m.15/A). Tenfiz icin ozel zamanasimi yoktur.",
  },
  pratikNot:
    "Tahkim karari iptali sinirlı sebeplerle istenebilir (HMK m.439). New York Sozlesmesi'ne taraf ulke kararlarinda tenfiz kolaylastirilmistir.",
  hmkMaddeleri: ["HMK m.439"],
  ozelKanunlar: [
    "4686 sy. MTK m.15",
    "5718 sy. MOHUK m.60-64",
    "New York Sozlesmesi (1958)",
  ],
};

export const bolum11ArabuluculukTahkim: DavaTuru[] = [
  davaSartiArabuluculuk,
  ihtiyariArabuluculuk,
  tahkimDavalari,
  tahkimKarariIptali,
];
