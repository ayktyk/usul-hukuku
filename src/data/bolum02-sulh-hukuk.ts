import type {
  ArabuluculukBilgisi,
  DavaTuru,
  GerekiliBelge,
  GorevliMahkeme,
  HarcBilgisi,
  MasrafBilgisi,
  MuvekkilBilgi,
  OzelVekaletnameBilgisi,
  YetkiliMahkeme,
  YargilamaUsulu,
  ZamanasimiBilgisi,
} from "@/lib/types";
import {
  BASVURMA_HARCI,
  BILIRKISI_UCRETI,
  KESF_UCRETI,
  NISPI_HARC_ORANI,
  TEBLIGAT_MASRAFI,
  TANIK_UCRETI,
} from "./harclar";

interface SulhConfig {
  id: string;
  maddeNo: number;
  ad: string;
  altKategori: string;
  gorevliMahkeme?: GorevliMahkeme;
  yetkiliMahkeme: YetkiliMahkeme;
  harclar: HarcBilgisi;
  masraflar: MasrafBilgisi;
  arabuluculuk: ArabuluculukBilgisi;
  muvekkilBilgileri?: MuvekkilBilgi[];
  gerekliBelgeler?: GerekiliBelge[];
  ozelVekaletname?: OzelVekaletnameBilgisi;
  yargilamaUsulu?: YargilamaUsulu;
  zamanasimi?: ZamanasimiBilgisi;
  pratikNot: string;
  hmkMaddeleri: string[];
  ozelKanunlar?: string[];
}

const SULH_HUKUK_GOREV: GorevliMahkeme = {
  mahkeme: "Sulh Hukuk Mahkemesi",
  yasalDayanak: "HMK m.4",
  aciklama:
    "Kira iliskisinden dogan davalar, ortakligin giderilmesi, HMK m.382 kapsamindaki cekismesiz yargi isleri ve kanunla sulh hukuk mahkemesine birakilan isler sulh hukuk mahkemesinde gorulur.",
};

const VESAYET_GOREV: GorevliMahkeme = {
  mahkeme: "Sulh Hukuk Mahkemesi (vesayet makami)",
  yasalDayanak: "TMK m.397, HMK m.4",
  aciklama:
    "Kisitlama, vasi, kayyim ve yasal danismanlik isleri vesayet makami olarak sulh hukuk mahkemesinde karara baglanir.",
};

const MIRAS_GOREV: GorevliMahkeme = {
  mahkeme: "Sulh Hukuk Mahkemesi",
  yasalDayanak: "HMK m.4",
  aciklama:
    "Veraset ilami, mirasin reddi, vasiyetnamenin acilmasi ve terekenin korunmasi gibi sulh hukuk gorev alanindaki miras isleri bu mahkemede gorulur.",
};

const CEKISMESIZ_GOREV: GorevliMahkeme = {
  mahkeme: "Sulh Hukuk Mahkemesi (cekismesiz yargi)",
  yasalDayanak: "HMK m.382-383",
  aciklama:
    "Kanunda aksine duzenleme bulunmayan cekismesiz yargi isleri sulh hukuk mahkemesinde gorulur.",
};

const KIRA_YETKI: YetkiliMahkeme = {
  genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
  ozelYetki: [
    "Sozlesmenin ifa yeri mahkemesi (HMK m.10)",
    "Kiralanan tasinmazin bulundugu yer mahkemesi",
  ],
  kesinYetkiMi: false,
  yasalDayanak: "HMK m.6, HMK m.10",
  aciklama:
    "Kira iliskisinden dogan davalarda ifa yeri ve kiralananin bulundugu yer de dava merkezi olarak kullanilir.",
};

const ORTAKLIK_TASINIR_YETKI: YetkiliMahkeme = {
  genelYetki: "Davalilarin yerlesim yeri mahkemesi (HMK m.6)",
  ozelYetki: ["Tasinirin bulundugu yer mahkemesi"],
  kesinYetkiMi: false,
  yasalDayanak: "HMK m.6",
  aciklama:
    "Tasinir mallarda ortakligin giderilmesinde malin fiilen bulundugu yer mahkemesi baglanti merkezi olarak degerlendirilir.",
};

const ORTAKLIK_TASINMAZ_YETKI: YetkiliMahkeme = {
  genelYetki: "Tasinmazin bulundugu yer mahkemesi",
  kesinYetki: "Tasinmazin bulundugu yer (HMK m.12)",
  kesinYetkiMi: true,
  yasalDayanak: "HMK m.12",
  aciklama:
    "Tasinmaza iliskin ortakligin giderilmesi davalarinda tasinmazin bulundugu yer mahkemesi kesin yetkilidir.",
};

const HAK_YETKI: YetkiliMahkeme = {
  genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
  ozelYetki: ["Uyusmazlik konusu hakkin bagli oldugu ifa veya kayit merkezi"],
  kesinYetkiMi: false,
  yasalDayanak: "HMK m.6, HMK m.10",
  aciklama:
    "Hak uzerindeki ortaklik ve benzeri taleplerde hakkin niteligine gore baglanti kurulan yer mahkemeleri de dikkate alinir.",
};

const ZILYETLIK_YETKI: YetkiliMahkeme = {
  genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
  ozelYetki: ["Mudahalenin gerceklestigi yer mahkemesi (HMK m.16)"],
  kesinYetkiMi: false,
  yasalDayanak: "HMK m.6, HMK m.16",
  aciklama:
    "Zilyetligin korunmasi davalari, mudahalenin oldugu yerde de acilabilir.",
};

const VESAYET_YETKI: YetkiliMahkeme = {
  genelYetki: "Kisitlinin veya kucugun yerlesim yeri mahkemesi",
  kesinYetki: "Ilgilinin yerlesim yeri",
  kesinYetkiMi: true,
  yasalDayanak: "TMK m.411, TMK m.430",
  aciklama:
    "Vesayet ve kayyimlik islerinde ilgili kisinin yerlesim yeri vesayet dairesi yetkilidir.",
};

const MIRAS_YETKI: YetkiliMahkeme = {
  genelYetki: "Mirasbirakanin son yerlesim yeri mahkemesi",
  kesinYetki: "Mirasbirakanin son yerlesim yeri (HMK m.11)",
  kesinYetkiMi: true,
  yasalDayanak: "HMK m.11",
  aciklama:
    "Sulh hukuk gorev alanindaki miras islerinde temel yetki merkezi mirasbirakanin son yerlesim yeridir.",
};

const CEKISMESIZ_YETKI: YetkiliMahkeme = {
  genelYetki: "Ilgilinin yerlesim yeri mahkemesi",
  ozelYetki: ["Isin hukuki sonuc doguracagi yer mahkemesi"],
  kesinYetkiMi: false,
  yasalDayanak: "HMK m.384",
  aciklama:
    "Cekismesiz yargi islerinde kanunda aksine duzenleme yoksa ilgilinin yerlesim yeri mahkemesi yetkilidir.",
};

const KAT_YETKI: YetkiliMahkeme = {
  genelYetki: "Ana tasinmazin bulundugu yer mahkemesi",
  ozelYetki: ["Davalinin yerlesim yeri mahkemesi (genel yetki)"],
  kesinYetkiMi: false,
  yasalDayanak: "KMK m.33, HMK m.6",
  aciklama:
    "Kat mulkiyetinden dogan davalarda ana tasinmazin bulundugu yer mahkemesi uygulamada ana yetki merkezidir.",
};

const MAKTU_HARC: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "maktu",
  aciklama: "Maktu harca tabi sulh hukuk isi.",
};

const NISPI_HARC: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "nispi",
  nispiOran: NISPI_HARC_ORANI * 1000,
  pesinHarcOran: 0.25,
  aciklama: "Nispi harca tabi parasal istem veya alacak davasi.",
};

const KIRA_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  tanikUcreti: TANIK_UCRETI * 2,
  toplamTahmini: 1800,
  aciklama: "Kira dosyalarinda tipik tebligat ve tanik giderleri.",
};

const KIRA_BILIRKISI_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  bilirkisiUcreti: BILIRKISI_UCRETI,
  tanikUcreti: TANIK_UCRETI * 2,
  toplamTahmini: 4200,
  aciklama: "Kira bedeli, uyarlama ve hesap ihtilaflarinda bilirkisi incelemesi sik gorulur.",
};

const ORTAKLIK_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 4,
  bilirkisiUcreti: BILIRKISI_UCRETI,
  kesfUcreti: KESF_UCRETI,
  toplamTahmini: 8200,
  aciklama: "Ortakligin giderilmesinde kesif, degerleme ve paydas tebligatlari yuksektir.",
};

const ZILYETLIK_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  kesfUcreti: KESF_UCRETI,
  tanikUcreti: TANIK_UCRETI * 3,
  toplamTahmini: 5200,
  aciklama: "Zilyetlik davalarinda yerinde inceleme ve tanik delili on plandadir.",
};

const VESAYET_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  bilirkisiUcreti: BILIRKISI_UCRETI,
  toplamTahmini: 3600,
  aciklama: "Saglik raporu, sosyal inceleme ve tebligat giderleri dikkate alinmistir.",
};

const MIRAS_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  toplamTahmini: 1600,
  aciklama: "Sulh hukuk gorev alanindaki miras islerinde temel masraf tebligat ve gider avansidir.",
};

const CEKISMESIZ_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 2,
  toplamTahmini: 1200,
  aciklama: "Cekismesiz yargi islerinde sinirli tebligat ve gider avansi yeterli olur.",
};

const KAT_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  bilirkisiUcreti: BILIRKISI_UCRETI,
  toplamTahmini: 4300,
  aciklama: "Kat mulkiyeti dosyalarinda yonetim plani ve aidat hesaplari icin bilirkisi sik kullanilir.",
};

const ARABULUCULUK_YOK: ArabuluculukBilgisi = {
  davaSarti: false,
  ihtiyari: true,
  aciklama: "Dava sarti arabuluculuk uygulanmaz.",
};

const KIRA_ARABULUCULUK: ArabuluculukBilgisi = {
  davaSarti: true,
  ihtiyari: false,
  yasalDayanak: "6325 sy. K. m.18/B",
  aciklama: "Kira iliskisinden dogan uyusmazliklarda dava oncesi arabuluculuk zorunludur.",
};

const ORTAKLIK_ARABULUCULUK: ArabuluculukBilgisi = {
  davaSarti: true,
  ihtiyari: false,
  yasalDayanak: "6325 sy. K. m.18/B",
  aciklama: "Ortakligin giderilmesi davalarinda dava sarti arabuluculuk uygulanir.",
};

const KAT_ARABULUCULUK: ArabuluculukBilgisi = {
  davaSarti: true,
  ihtiyari: false,
  yasalDayanak: "6325 sy. K. m.18/B",
  aciklama: "Kat mulkiyetinden dogan davalarda arabuluculuk dava sartidir.",
};

const GENEL_VEKALET: OzelVekaletnameBilgisi = {
  gerekliMi: false,
  neden: "Genel dava vekaletnamesi kural olarak yeterlidir.",
  yasalDayanak: "HMK m.74",
};

const MIRAS_OZEL_VEKALET: OzelVekaletnameBilgisi = {
  gerekliMi: true,
  neden: "Mirasi reddetme ve tereke hakkinda dogrudan sonuc doguran beyanlar icin ozel yetki bulunmasi guvenli yaklasimdir.",
  yasalDayanak: "HMK m.74",
  icerik: ["Mirasi reddetme beyaninda bulunma", "Tereke islerinde beyan ve kabulde bulunma"],
};

const KIRA_BILGI: MuvekkilBilgi[] = [
  { bilgi: "Taraflarin kimlik ve iletisim bilgileri", zorunlu: true },
  { bilgi: "Kira sozlesmesinin tarihi ve turu", zorunlu: true },
  { bilgi: "Uyusmazlik yaratan kira donemi ve talep", zorunlu: true },
];

const KIRA_BELGE: GerekiliBelge[] = [
  { belge: "Kira sozlesmesi", zorunlu: true, nereden: "Muvekkil" },
  { belge: "Odeme dekontlari veya hesap hareketleri", zorunlu: false, nereden: "Banka" },
  { belge: "Ihtarname veya arabuluculuk son tutanagi", zorunlu: false, nereden: "Noter / Arabuluculuk dosyasi" },
];

const ORTAKLIK_BILGI: MuvekkilBilgi[] = [
  { bilgi: "Tum paydaslarin kimlik ve adres bilgileri", zorunlu: true },
  { bilgi: "Ortakliga konu mal veya hakkin tanimi", zorunlu: true },
  { bilgi: "Aynen taksim veya satis tercihi", zorunlu: true },
];

const ORTAKLIK_BELGE: GerekiliBelge[] = [
  { belge: "Tapu kaydi veya mulkiyeti gosteren resmi belge", zorunlu: true, nereden: "Tapu / Resmi kurum" },
  { belge: "Veraset ilami (miras ortakligi varsa)", zorunlu: false, nereden: "Sulh Hukuk / Noter" },
  { belge: "Arabuluculuk son tutanagi", zorunlu: true, nereden: "Arabuluculuk dosyasi" },
];

const ZILYETLIK_BILGI: MuvekkilBilgi[] = [
  { bilgi: "Zilyet olunan mal veya yerin tanimi", zorunlu: true },
  { bilgi: "Mudahale veya saldirinin tarihi ve sekli", zorunlu: true },
  { bilgi: "Fiili hakimiyetin ne zamandan beri mevcut oldugu", zorunlu: true },
];

const ZILYETLIK_BELGE: GerekiliBelge[] = [
  { belge: "Zilyetligi gosteren tutanak, fotograf veya benzeri deliller", zorunlu: false },
  { belge: "Tanik listesi", zorunlu: false },
  { belge: "Kolluk veya ihtar belgeleri", zorunlu: false, nereden: "Emniyet / Noter" },
];

function sulhDavasi(config: SulhConfig): DavaTuru {
  return {
    kategori: "sulh-hukuk",
    gorevliMahkeme: config.gorevliMahkeme ?? SULH_HUKUK_GOREV,
    ozelVekaletname: config.ozelVekaletname ?? GENEL_VEKALET,
    yargilamaUsulu: config.yargilamaUsulu ?? "basit",
    muvekkilBilgileri: config.muvekkilBilgileri ?? [],
    gerekliBelgeler: config.gerekliBelgeler ?? [],
    ...config,
  };
}

const kiraDavalar: DavaTuru[] = [
  sulhDavasi({ id: "kira-bedelinin-tespiti", maddeNo: 80, ad: "Kira bedelinin tespiti davasi", altKategori: "kira-hukuku", yetkiliMahkeme: KIRA_YETKI, harclar: NISPI_HARC, masraflar: KIRA_BILIRKISI_MASRAF, arabuluculuk: KIRA_ARABULUCULUK, muvekkilBilgileri: KIRA_BILGI, gerekliBelgeler: KIRA_BELGE, pratikNot: "Tespit hukmu yeni kira doneminde sonuc dogurur; bes yillik sure ve emsal kira degerleri birlikte incelenir.", hmkMaddeleri: ["HMK m.4", "HMK m.10", "HMK m.316"], ozelKanunlar: ["TBK m.344-345", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "kira-bedelinin-uyarlanmasi", maddeNo: 81, ad: "Kira bedelinin uyarlanmasi davasi", altKategori: "kira-hukuku", yetkiliMahkeme: KIRA_YETKI, harclar: NISPI_HARC, masraflar: KIRA_BILIRKISI_MASRAF, arabuluculuk: KIRA_ARABULUCULUK, muvekkilBilgileri: KIRA_BILGI, gerekliBelgeler: KIRA_BELGE, pratikNot: "Uyarlama davasi icin asiri ifa guclugu veya dengedeki bozulma somut verilerle ispatlanmalidir.", hmkMaddeleri: ["HMK m.4", "HMK m.10", "HMK m.316"], ozelKanunlar: ["TBK m.138", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "ihtiyac-nedeniyle-tahliye", maddeNo: 82, ad: "Ihtiyac (konut/isyeri) nedeniyle tahliye davasi", altKategori: "kira-hukuku", yetkiliMahkeme: KIRA_YETKI, harclar: MAKTU_HARC, masraflar: KIRA_MASRAF, arabuluculuk: KIRA_ARABULUCULUK, muvekkilBilgileri: KIRA_BILGI, gerekliBelgeler: KIRA_BELGE, pratikNot: "Ihtiyacin gercek, samimi ve zorunlu oldugu ayrintili delillerle gosterilmelidir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["TBK m.350", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "yeni-malikin-ihtiyaci-nedeniyle-tahliye", maddeNo: 83, ad: "Yeni malikin ihtiyaci nedeniyle tahliye davasi", altKategori: "kira-hukuku", yetkiliMahkeme: KIRA_YETKI, harclar: MAKTU_HARC, masraflar: KIRA_MASRAF, arabuluculuk: KIRA_ARABULUCULUK, muvekkilBilgileri: KIRA_BILGI, gerekliBelgeler: KIRA_BELGE, pratikNot: "Yeni malik edinimden sonra bir aylik bildirim kosuluna uymali ve sureyi kacirmamalidir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["TBK m.351", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "tadilat-yeniden-insa-nedeniyle-tahliye", maddeNo: 84, ad: "Tadilat/yeniden insa nedeniyle tahliye davasi", altKategori: "kira-hukuku", yetkiliMahkeme: KIRA_YETKI, harclar: MAKTU_HARC, masraflar: KIRA_BILIRKISI_MASRAF, arabuluculuk: KIRA_ARABULUCULUK, muvekkilBilgileri: KIRA_BILGI, gerekliBelgeler: KIRA_BELGE, pratikNot: "Tahliye ihtiyaci doguran projenin esasli nitelikte oldugu proje ve ruhsat belgeleriyle desteklenmelidir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["TBK m.350/2", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "temerrut-nedeniyle-tahliye", maddeNo: 85, ad: "Temerrut (kira borcunu odememe) nedeniyle tahliye davasi", altKategori: "kira-hukuku", yetkiliMahkeme: KIRA_YETKI, harclar: MAKTU_HARC, masraflar: KIRA_BILIRKISI_MASRAF, arabuluculuk: KIRA_ARABULUCULUK, muvekkilBilgileri: KIRA_BILGI, gerekliBelgeler: KIRA_BELGE, pratikNot: "Konut ve catili isyeri kiralarinda temerrut ihtari ve taninan sure TBK m.315'e uygun olmalidir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["TBK m.315", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "iki-hakli-ihtar-nedeniyle-tahliye", maddeNo: 86, ad: "Iki hakli ihtar nedeniyle tahliye davasi", altKategori: "kira-hukuku", yetkiliMahkeme: KIRA_YETKI, harclar: MAKTU_HARC, masraflar: KIRA_MASRAF, arabuluculuk: KIRA_ARABULUCULUK, muvekkilBilgileri: KIRA_BILGI, gerekliBelgeler: KIRA_BELGE, pratikNot: "Iki ihtarin ayni kira yilinda hakli olmasi ve dava suresinin kacinilmadan kullanilmasi gerekir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["TBK m.352/2", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "oturmama-taahhudune-aykirilik-tahliye", maddeNo: 87, ad: "Oturmama (kullanmama) taahhudune aykirilik nedeniyle tahliye davasi", altKategori: "kira-hukuku", yetkiliMahkeme: KIRA_YETKI, harclar: MAKTU_HARC, masraflar: KIRA_MASRAF, arabuluculuk: KIRA_ARABULUCULUK, muvekkilBilgileri: KIRA_BILGI, gerekliBelgeler: KIRA_BELGE, pratikNot: "Taahhutnamenin tarih ve icerigi ile ihlalin varligi birlikte ispatlanmalidir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["TBK m.352", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "tahliye-taahhudune-dayali-tahliye", maddeNo: 88, ad: "Tahliye taahhudune dayali tahliye davasi", altKategori: "kira-hukuku", yetkiliMahkeme: KIRA_YETKI, harclar: MAKTU_HARC, masraflar: KIRA_MASRAF, arabuluculuk: KIRA_ARABULUCULUK, muvekkilBilgileri: KIRA_BILGI, gerekliBelgeler: KIRA_BELGE, pratikNot: "Yazili tahliye taahhudunun teslimden sonra alinmis olmasi ve takibin bir ay icinde baslatilmasi gerekir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["TBK m.352/1", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "on-yillik-uzama-suresi-nedeniyle-tahliye", maddeNo: 89, ad: "On yillik uzama suresi dolmasi nedeniyle tahliye davasi", altKategori: "kira-hukuku", yetkiliMahkeme: KIRA_YETKI, harclar: MAKTU_HARC, masraflar: KIRA_MASRAF, arabuluculuk: KIRA_ARABULUCULUK, muvekkilBilgileri: KIRA_BILGI, gerekliBelgeler: KIRA_BELGE, pratikNot: "Kiraya verenin uzama suresi sonundaki fesih bildirimini en az uc ay once yapmasi gerekir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["TBK m.347", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "fuzuli-isgal-nedeniyle-tahliye-sulh", maddeNo: 90, ad: "Fuzuli isgal nedeniyle tahliye davasi", altKategori: "kira-hukuku", yetkiliMahkeme: KIRA_YETKI, harclar: MAKTU_HARC, masraflar: KIRA_MASRAF, arabuluculuk: KIRA_ARABULUCULUK, muvekkilBilgileri: KIRA_BILGI, gerekliBelgeler: KIRA_BELGE, pratikNot: "Kira iliskisi cercevesinde dogan haksiz kullanim sulh hukukta, saf mulkiyet ihtilafi ise asliye hukukta degerlendirilir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["TBK m.299 vd.", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "akde-aykirilik-nedeniyle-tahliye", maddeNo: 91, ad: "Akde aykirilik (sozlesmeye aykiri kullanim) nedeniyle tahliye davasi", altKategori: "kira-hukuku", yetkiliMahkeme: KIRA_YETKI, harclar: MAKTU_HARC, masraflar: KIRA_MASRAF, arabuluculuk: KIRA_ARABULUCULUK, muvekkilBilgileri: KIRA_BILGI, gerekliBelgeler: KIRA_BELGE, pratikNot: "Aykirilik nedeniyle tahliyede verilen sure ve ihtarin dosyada acik bicimde yer almasi gerekir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["TBK m.316", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "kira-sozlesmesinden-dogan-alacak", maddeNo: 92, ad: "Kira sozlesmesinden dogan alacak davalari (birikmis kira, aidat)", altKategori: "kira-hukuku", yetkiliMahkeme: KIRA_YETKI, harclar: NISPI_HARC, masraflar: KIRA_BILIRKISI_MASRAF, arabuluculuk: KIRA_ARABULUCULUK, muvekkilBilgileri: KIRA_BILGI, gerekliBelgeler: KIRA_BELGE, pratikNot: "Aidat ve kira alacagi birlikte isteniyorsa hangi kalemin kimden talep edildigi acik yazilmalidir.", hmkMaddeleri: ["HMK m.4", "HMK m.107", "HMK m.316"], ozelKanunlar: ["TBK m.313-314", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "kiracinin-takas-ve-mahsup-talepleri", maddeNo: 93, ad: "Kiracinin takas ve mahsup taleplerine iliskin davalar", altKategori: "kira-hukuku", yetkiliMahkeme: KIRA_YETKI, harclar: NISPI_HARC, masraflar: KIRA_BILIRKISI_MASRAF, arabuluculuk: KIRA_ARABULUCULUK, muvekkilBilgileri: KIRA_BILGI, gerekliBelgeler: KIRA_BELGE, pratikNot: "Mahsup savunmasinda karsi alacagin muaccel ve belgeli oldugu ortaya konulmalidir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["TBK m.139-145", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "kira-sozlesmesinin-feshi", maddeNo: 94, ad: "Kira sozlesmesinin feshi davasi", altKategori: "kira-hukuku", yetkiliMahkeme: KIRA_YETKI, harclar: MAKTU_HARC, masraflar: KIRA_MASRAF, arabuluculuk: KIRA_ARABULUCULUK, muvekkilBilgileri: KIRA_BILGI, gerekliBelgeler: KIRA_BELGE, pratikNot: "Belirli ve belirsiz sureli kira iliskileri icin farkli fesih rejimi uygulanir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["TBK m.327-331", "TBK m.347", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "anahtar-teslim-tespit", maddeNo: 95, ad: "Anahtar teslim (kira iliskisinin sona ermesi) tespit davasi", altKategori: "kira-hukuku", yetkiliMahkeme: KIRA_YETKI, harclar: MAKTU_HARC, masraflar: KIRA_MASRAF, arabuluculuk: KIRA_ARABULUCULUK, muvekkilBilgileri: KIRA_BILGI, gerekliBelgeler: KIRA_BELGE, pratikNot: "Anahtar tesliminin tarihi, kira ve yan giderlerin hangi gune kadar isleyecegini belirler.", hmkMaddeleri: ["HMK m.4", "HMK m.106", "HMK m.316"], ozelKanunlar: ["TBK m.334", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "depozito-iade", maddeNo: 96, ad: "Depozito (guvence bedeli) iade davasi", altKategori: "kira-hukuku", yetkiliMahkeme: KIRA_YETKI, harclar: NISPI_HARC, masraflar: KIRA_BILIRKISI_MASRAF, arabuluculuk: KIRA_ARABULUCULUK, muvekkilBilgileri: KIRA_BILGI, gerekliBelgeler: KIRA_BELGE, pratikNot: "Guvence bedelinden mahsup edilen zararlar belgeli ve hesaplanabilir olmalidir.", hmkMaddeleri: ["HMK m.4", "HMK m.107", "HMK m.316"], ozelKanunlar: ["TBK m.342", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "kira-artis-oranina-itiraz", maddeNo: 97, ad: "Kira artis oranina itiraz davalari", altKategori: "kira-hukuku", yetkiliMahkeme: KIRA_YETKI, harclar: NISPI_HARC, masraflar: KIRA_BILIRKISI_MASRAF, arabuluculuk: KIRA_ARABULUCULUK, muvekkilBilgileri: KIRA_BILGI, gerekliBelgeler: KIRA_BELGE, pratikNot: "Artis orani uyusmazliginda sozlesme kaydi, TUFE siniri ve donem hesabı birlikte incelenir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["TBK m.344", "6325 sy. K. m.18/B"] }),
];

const ortaklikDavalar: DavaTuru[] = [
  sulhDavasi({ id: "tasinirda-ortakligin-giderilmesi", maddeNo: 98, ad: "Tasinir mallarda ortakligin giderilmesi davasi", altKategori: "ortakligin-giderilmesi", yetkiliMahkeme: ORTAKLIK_TASINIR_YETKI, harclar: MAKTU_HARC, masraflar: ORTAKLIK_MASRAF, arabuluculuk: ORTAKLIK_ARABULUCULUK, muvekkilBilgileri: ORTAKLIK_BILGI, gerekliBelgeler: ORTAKLIK_BELGE, pratikNot: "Aynen taksim mumkun degilse satis surecine gidilir ve tum paydaslar davada yer almalidir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["TMK m.698", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "tasinmazda-ortakligin-giderilmesi", maddeNo: 99, ad: "Tasinmaz mallarda ortakligin giderilmesi davasi", altKategori: "ortakligin-giderilmesi", yetkiliMahkeme: ORTAKLIK_TASINMAZ_YETKI, harclar: MAKTU_HARC, masraflar: ORTAKLIK_MASRAF, arabuluculuk: ORTAKLIK_ARABULUCULUK, muvekkilBilgileri: ORTAKLIK_BILGI, gerekliBelgeler: ORTAKLIK_BELGE, pratikNot: "Kesif, degerleme ve satis usulunun dogru kurulmasi tasinmaz ortakligin giderilmesi dosyasinin cekirdeginidir.", hmkMaddeleri: ["HMK m.4", "HMK m.12", "HMK m.316"], ozelKanunlar: ["TMK m.698-699", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "elbirligi-mulkiyetinin-payliya-cevrilmesi", maddeNo: 100, ad: "Elbirligi mulkiyetinin payli mulkiyete cevrilmesi davasi", altKategori: "ortakligin-giderilmesi", yetkiliMahkeme: HAK_YETKI, harclar: MAKTU_HARC, masraflar: ORTAKLIK_MASRAF, arabuluculuk: ORTAKLIK_ARABULUCULUK, muvekkilBilgileri: ORTAKLIK_BILGI, gerekliBelgeler: ORTAKLIK_BELGE, pratikNot: "Paylasim oncesi elbirligi iliskisinin payli mulkiyete donusturulmesi talep edilebilir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["TMK m.644", "TMK m.701", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "hak-uzerinde-ortakligin-giderilmesi", maddeNo: 101, ad: "Hak uzerinde ortakligin giderilmesi davasi", altKategori: "ortakligin-giderilmesi", yetkiliMahkeme: HAK_YETKI, harclar: MAKTU_HARC, masraflar: ORTAKLIK_MASRAF, arabuluculuk: ORTAKLIK_ARABULUCULUK, muvekkilBilgileri: ORTAKLIK_BILGI, gerekliBelgeler: ORTAKLIK_BELGE, pratikNot: "Hakka bagli devir ve paraya cevirme imkanlari dava stratejisini belirler.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["TMK m.698", "6325 sy. K. m.18/B"] }),
];

const zilyetlikDavalar: DavaTuru[] = [
  sulhDavasi({ id: "zilyetligin-korunmasi", maddeNo: 102, ad: "Zilyetligin korunmasi davasi", altKategori: "zilyetlik", yetkiliMahkeme: ZILYETLIK_YETKI, harclar: MAKTU_HARC, masraflar: ZILYETLIK_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: ZILYETLIK_BILGI, gerekliBelgeler: ZILYETLIK_BELGE, pratikNot: "Bu dava ayni hakka degil, fiili hakimiyetin korunmasina yoneliktir.", hmkMaddeleri: ["HMK m.4", "HMK m.16", "HMK m.316"], ozelKanunlar: ["TMK m.981-983"] }),
  sulhDavasi({ id: "zilyetlige-saldirinin-onlenmesi", maddeNo: 103, ad: "Zilyetlige yapilan saldirinin onlenmesi davasi", altKategori: "zilyetlik", yetkiliMahkeme: ZILYETLIK_YETKI, harclar: MAKTU_HARC, masraflar: ZILYETLIK_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: ZILYETLIK_BILGI, gerekliBelgeler: ZILYETLIK_BELGE, pratikNot: "Devam eden saldirinin durdurulmasi icin mudahalenin somut ve guncel oldugu gosterilmelidir.", hmkMaddeleri: ["HMK m.4", "HMK m.16", "HMK m.316"], ozelKanunlar: ["TMK m.981-982"] }),
  sulhDavasi({ id: "zilyetligin-iadesi", maddeNo: 104, ad: "Zilyetligin iadesi davasi", altKategori: "zilyetlik", yetkiliMahkeme: ZILYETLIK_YETKI, harclar: MAKTU_HARC, masraflar: ZILYETLIK_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: ZILYETLIK_BILGI, gerekliBelgeler: ZILYETLIK_BELGE, pratikNot: "Zilyetlik kaybedildikten sonra fiili hakimiyetin geri verilmesi talep edilir.", hmkMaddeleri: ["HMK m.4", "HMK m.16", "HMK m.316"], ozelKanunlar: ["TMK m.983"] }),
];

const vesayetBilgi: MuvekkilBilgi[] = [
  { bilgi: "Ilgilinin kimlik ve yerlesim yeri bilgileri", zorunlu: true },
  { bilgi: "Talebi gerektiren vesayet veya kayyimlik nedeni", zorunlu: true },
  { bilgi: "Yakin akrabalar ve sosyal cevre bilgileri", zorunlu: false },
];

const vesayetBelge: GerekiliBelge[] = [
  { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet / Nufus Mudurlugu" },
  { belge: "Saglik kurulu raporu", zorunlu: false, nereden: "Hastane" },
  { belge: "Sosyal inceleme veya kolluk yazilari", zorunlu: false },
];

const mirasBilgi: MuvekkilBilgi[] = [
  { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
  { bilgi: "Mirascilarin veya basvuran ilgilinin bilgileri", zorunlu: true },
  { bilgi: "Terekeye iliskin temel aciklama", zorunlu: false },
];

const mirasBelge: GerekiliBelge[] = [
  { belge: "Olum belgesi", zorunlu: true, nereden: "e-Devlet" },
  { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet" },
  { belge: "Mirascilik belgesi veya vasiyetname", zorunlu: false, nereden: "Mahkeme / Noter" },
];

const cekismesizBilgi: MuvekkilBilgi[] = [
  { bilgi: "Ilgilinin kimlik ve yerlesim yeri bilgileri", zorunlu: true },
  { bilgi: "Talebin hukuki ve fiili nedeni", zorunlu: true },
];

const cekismesizBelge: GerekiliBelge[] = [
  { belge: "Talebi destekleyen resmi belge veya kayit", zorunlu: true, nereden: "Muvekkil / Resmi kurum" },
  { belge: "Diger destekleyici evrak", zorunlu: false },
];

const katBilgi: MuvekkilBilgi[] = [
  { bilgi: "Ana tasinmaz ve bagimsiz bolum bilgileri", zorunlu: true },
  { bilgi: "Yonetim veya malik bilgileri", zorunlu: true },
  { bilgi: "Uyusmazlik yaratan karar veya eylem", zorunlu: true },
];

const katBelge: GerekiliBelge[] = [
  { belge: "Yonetim plani veya kurul karari", zorunlu: true, nereden: "Yonetim / Tapu" },
  { belge: "Hesap dokumu, tutanak veya proje", zorunlu: false },
  { belge: "Arabuluculuk son tutanagi", zorunlu: true, nereden: "Arabuluculuk dosyasi" },
];

const vesayetDavalar: DavaTuru[] = [
  sulhDavasi({ id: "vasi-tayini", maddeNo: 105, ad: "Vasi tayini davasi", altKategori: "vesayet-kayyim", gorevliMahkeme: VESAYET_GOREV, yetkiliMahkeme: VESAYET_YETKI, harclar: MAKTU_HARC, masraflar: VESAYET_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: vesayetBilgi, gerekliBelgeler: vesayetBelge, yargilamaUsulu: "ozel", pratikNot: "Vasi seciminde kisinin menfaati, akrabalik iliskisi ve gorevi yurutme ehliyeti birlikte degerlendirilir.", hmkMaddeleri: ["HMK m.4", "HMK m.382"], ozelKanunlar: ["TMK m.403-413"] }),
  sulhDavasi({ id: "vasi-degistirilmesi", maddeNo: 106, ad: "Vasi degistirilmesi davasi", altKategori: "vesayet-kayyim", gorevliMahkeme: VESAYET_GOREV, yetkiliMahkeme: VESAYET_YETKI, harclar: MAKTU_HARC, masraflar: VESAYET_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: vesayetBilgi, gerekliBelgeler: vesayetBelge, yargilamaUsulu: "ozel", pratikNot: "Gorevi ihmal, menfaat catismasi veya yetersizlik halinde vasinin degistirilmesi istenebilir.", hmkMaddeleri: ["HMK m.4", "HMK m.382"], ozelKanunlar: ["TMK m.483-484"] }),
  sulhDavasi({ id: "vesayetin-kaldirilmasi", maddeNo: 107, ad: "Vesayetin kaldirilmasi davasi", altKategori: "vesayet-kayyim", gorevliMahkeme: VESAYET_GOREV, yetkiliMahkeme: VESAYET_YETKI, harclar: MAKTU_HARC, masraflar: VESAYET_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: vesayetBilgi, gerekliBelgeler: vesayetBelge, yargilamaUsulu: "ozel", pratikNot: "Kisitlama sebebi ortadan kalktiginda yeni rapor ve fiili durumla birlikte vesayetin kaldirilmasi talep edilir.", hmkMaddeleri: ["HMK m.4", "HMK m.382"], ozelKanunlar: ["TMK m.472"] }),
  sulhDavasi({ id: "kisitlama-karari", maddeNo: 108, ad: "Kisitlama (hacir) karari verilmesi", altKategori: "vesayet-kayyim", gorevliMahkeme: VESAYET_GOREV, yetkiliMahkeme: VESAYET_YETKI, harclar: MAKTU_HARC, masraflar: VESAYET_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: vesayetBilgi, gerekliBelgeler: vesayetBelge, yargilamaUsulu: "ozel", pratikNot: "Akil hastaligi, bagimlilik veya savurganlik sebeplerinde resmi rapor ve yakin dinlenmesi belirleyicidir.", hmkMaddeleri: ["HMK m.4", "HMK m.382"], ozelKanunlar: ["TMK m.405-408"] }),
  sulhDavasi({ id: "kayyim-atanmasi", maddeNo: 109, ad: "Kayyim atanmasi islemi", altKategori: "vesayet-kayyim", gorevliMahkeme: VESAYET_GOREV, yetkiliMahkeme: VESAYET_YETKI, harclar: MAKTU_HARC, masraflar: VESAYET_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: vesayetBilgi, gerekliBelgeler: vesayetBelge, yargilamaUsulu: "ozel", pratikNot: "Kayyim belirli bir is veya malvarligi icin atanir; tam vesayetten daha dar kapsamli bir koruma yoludur.", hmkMaddeleri: ["HMK m.4", "HMK m.382"], ozelKanunlar: ["TMK m.426-431"] }),
  sulhDavasi({ id: "yasal-danisman-atanmasi", maddeNo: 110, ad: "Yasal danisman atanmasi davasi", altKategori: "vesayet-kayyim", gorevliMahkeme: VESAYET_GOREV, yetkiliMahkeme: VESAYET_YETKI, harclar: MAKTU_HARC, masraflar: VESAYET_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: vesayetBilgi, gerekliBelgeler: vesayetBelge, yargilamaUsulu: "ozel", pratikNot: "Tam kisitlama yerine belirli islemler icin danisman atanmasi yeterli gorulebilir.", hmkMaddeleri: ["HMK m.4", "HMK m.382"], ozelKanunlar: ["TMK m.429"] }),
  sulhDavasi({ id: "vasinin-hesap-vermesi-ve-denetimi", maddeNo: 111, ad: "Vasinin hesap vermesi ve denetimi davasi", altKategori: "vesayet-kayyim", gorevliMahkeme: VESAYET_GOREV, yetkiliMahkeme: VESAYET_YETKI, harclar: MAKTU_HARC, masraflar: VESAYET_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: vesayetBilgi, gerekliBelgeler: vesayetBelge, yargilamaUsulu: "ozel", pratikNot: "Vasi, donemsel hesap ve harcamalarini belgeli sunmakla yukumludur.", hmkMaddeleri: ["HMK m.4", "HMK m.382"], ozelKanunlar: ["TMK m.457-460"] }),
  sulhDavasi({ id: "kisitlinin-mal-ve-haklarinin-yonetimi", maddeNo: 112, ad: "Kisitlinin mal ve haklarinin yonetimi isleri", altKategori: "vesayet-kayyim", gorevliMahkeme: VESAYET_GOREV, yetkiliMahkeme: VESAYET_YETKI, harclar: MAKTU_HARC, masraflar: VESAYET_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: vesayetBilgi, gerekliBelgeler: vesayetBelge, yargilamaUsulu: "ozel", pratikNot: "Olagan yonetim islemleri ile izin gerektiren onemli islemler birbirinden ayrilmali ve dosyada aciklanmalidir.", hmkMaddeleri: ["HMK m.4", "HMK m.382"], ozelKanunlar: ["TMK m.444-449"] }),
  sulhDavasi({ id: "vesayet-makamindan-izin-alinmasi", maddeNo: 113, ad: "Vesayet makamindan onemli isler icin izin alinmasi", altKategori: "vesayet-kayyim", gorevliMahkeme: VESAYET_GOREV, yetkiliMahkeme: VESAYET_YETKI, harclar: MAKTU_HARC, masraflar: VESAYET_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: vesayetBilgi, gerekliBelgeler: vesayetBelge, yargilamaUsulu: "ozel", pratikNot: "Tasınmaz satisi, borclanma ve rehin gibi islemler icin onceden izin alinmasi gerekir.", hmkMaddeleri: ["HMK m.4", "HMK m.382"], ozelKanunlar: ["TMK m.462"] }),
  sulhDavasi({ id: "cocuk-mallarinin-korunmasi", maddeNo: 114, ad: "Cocuk mallarinin korunmasi islemleri", altKategori: "vesayet-kayyim", gorevliMahkeme: VESAYET_GOREV, yetkiliMahkeme: VESAYET_YETKI, harclar: MAKTU_HARC, masraflar: VESAYET_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: vesayetBilgi, gerekliBelgeler: vesayetBelge, yargilamaUsulu: "ozel", pratikNot: "Cocugun malvarligi tehlikedeyse mahkeme yonetim ve koruma tedbirleri alabilir.", hmkMaddeleri: ["HMK m.4", "HMK m.382"], ozelKanunlar: ["TMK m.360-361", "TMK m.427"] }),
];

const mirasDavalar: DavaTuru[] = [
  sulhDavasi({ id: "veraset-ilami-verilmesi", maddeNo: 115, ad: "Mirascilik belgesi (veraset ilami) verilmesi", altKategori: "miras-isleri", gorevliMahkeme: MIRAS_GOREV, yetkiliMahkeme: MIRAS_YETKI, harclar: MAKTU_HARC, masraflar: MIRAS_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: mirasBilgi, gerekliBelgeler: mirasBelge, yargilamaUsulu: "ozel", pratikNot: "Cekismesiz yargi niteligindedir; soybagi veya mirascilik ihtilafi varsa cekismeli yargiya gecilebilir.", hmkMaddeleri: ["HMK m.4", "HMK m.382"], ozelKanunlar: ["TMK m.598"] }),
  sulhDavasi({ id: "veraset-ilaminin-iptali", maddeNo: 116, ad: "Mirascilik belgesinin iptali davasi", altKategori: "miras-isleri", gorevliMahkeme: MIRAS_GOREV, yetkiliMahkeme: MIRAS_YETKI, harclar: MAKTU_HARC, masraflar: MIRAS_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: mirasBilgi, gerekliBelgeler: mirasBelge, yargilamaUsulu: "ozel", pratikNot: "Belgenin maddi gercege aykiri oldugu resmi kayit ve soybagi verileriyle desteklenmelidir.", hmkMaddeleri: ["HMK m.4", "HMK m.382"], ozelKanunlar: ["TMK m.598"] }),
  sulhDavasi({ id: "mirasin-reddi", maddeNo: 117, ad: "Mirasi reddi karari alinmasi", altKategori: "miras-isleri", gorevliMahkeme: MIRAS_GOREV, yetkiliMahkeme: MIRAS_YETKI, harclar: MAKTU_HARC, masraflar: MIRAS_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: mirasBilgi, gerekliBelgeler: mirasBelge, ozelVekaletname: MIRAS_OZEL_VEKALET, yargilamaUsulu: "ozel", zamanasimi: { sure: "3 ay", yasalDayanak: "TMK m.606", aciklama: "Hak dusurucu suredir.", baslangic: "Mirascinin mirasi ve olum olayini ogrendigi tarih" }, pratikNot: "Red beyaninin uc aylik sure icinde yapilmasi gerekir; terekenin borca batikligi halinde ayrica karine degerlendirilir.", hmkMaddeleri: ["HMK m.4", "HMK m.382"], ozelKanunlar: ["TMK m.605-609"] }),
  sulhDavasi({ id: "mirasin-resmi-tasfiyesi", maddeNo: 118, ad: "Mirasin resmi tasfiyesi", altKategori: "miras-isleri", gorevliMahkeme: MIRAS_GOREV, yetkiliMahkeme: MIRAS_YETKI, harclar: MAKTU_HARC, masraflar: MIRAS_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: mirasBilgi, gerekliBelgeler: mirasBelge, yargilamaUsulu: "ozel", pratikNot: "Resmi tasfiyede alacakli cagrisi ve tereke envanteri sureci eksiksiz kurulmalidir.", hmkMaddeleri: ["HMK m.4", "HMK m.382"], ozelKanunlar: ["TMK m.632-636"] }),
  sulhDavasi({ id: "terekenin-tespiti-ve-korunmasi", maddeNo: 119, ad: "Terekenin tespiti ve korunmasi", altKategori: "miras-isleri", gorevliMahkeme: MIRAS_GOREV, yetkiliMahkeme: MIRAS_YETKI, harclar: MAKTU_HARC, masraflar: MIRAS_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: mirasBilgi, gerekliBelgeler: mirasBelge, yargilamaUsulu: "ozel", pratikNot: "Muhafaza, defter tutulmasi ve muhurlenme gibi tedbirler acil korunma ihtiyacina gore istenir.", hmkMaddeleri: ["HMK m.4", "HMK m.382"], ozelKanunlar: ["TMK m.589-591"] }),
  sulhDavasi({ id: "tereke-temsilcisi-atanmasi", maddeNo: 120, ad: "Tereke temsilcisi atanmasi", altKategori: "miras-isleri", gorevliMahkeme: MIRAS_GOREV, yetkiliMahkeme: MIRAS_YETKI, harclar: MAKTU_HARC, masraflar: MIRAS_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: mirasBilgi, gerekliBelgeler: mirasBelge, yargilamaUsulu: "ozel", pratikNot: "Mirascilar arasindaki catisma veya terekenin temsil zorunlulugu halinde temsilci atanir.", hmkMaddeleri: ["HMK m.4", "HMK m.382"], ozelKanunlar: ["TMK m.640", "TMK m.589"] }),
  sulhDavasi({ id: "vasiyetnamenin-acilmasi", maddeNo: 121, ad: "Vasiyetnamenin acilmasi", altKategori: "miras-isleri", gorevliMahkeme: MIRAS_GOREV, yetkiliMahkeme: MIRAS_YETKI, harclar: MAKTU_HARC, masraflar: MIRAS_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: mirasBilgi, gerekliBelgeler: mirasBelge, yargilamaUsulu: "ozel", pratikNot: "Sulh hukuk mahkemesi vasiyetnameyi acip ilgililere teblig eder; bu asama cekismesiz niteliktedir.", hmkMaddeleri: ["HMK m.4", "HMK m.382"], ozelKanunlar: ["TMK m.596-597"] }),
  sulhDavasi({ id: "terekenin-borca-batikliginin-tespiti", maddeNo: 122, ad: "Terekenin borca batikliginin tespiti", altKategori: "miras-isleri", gorevliMahkeme: MIRAS_GOREV, yetkiliMahkeme: MIRAS_YETKI, harclar: MAKTU_HARC, masraflar: MIRAS_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: mirasBilgi, gerekliBelgeler: mirasBelge, yargilamaUsulu: "ozel", pratikNot: "Borca batiklik tespiti, red karinesi ve resmi tasfiye talepleri bakimindan onemli delildir.", hmkMaddeleri: ["HMK m.4", "HMK m.382"], ozelKanunlar: ["TMK m.605/2", "TMK m.610"] }),
  sulhDavasi({ id: "miras-ortakligina-temsilci-atanmasi-sulh", maddeNo: 123, ad: "Miras ortakligina temsilci atanmasi", altKategori: "miras-isleri", gorevliMahkeme: MIRAS_GOREV, yetkiliMahkeme: MIRAS_YETKI, harclar: MAKTU_HARC, masraflar: MIRAS_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: mirasBilgi, gerekliBelgeler: mirasBelge, yargilamaUsulu: "ozel", pratikNot: "Ortakligin yonetimi ve dis temsilinde dogan aksakliklar icin gecici temsilci atanabilir.", hmkMaddeleri: ["HMK m.4", "HMK m.382"], ozelKanunlar: ["TMK m.640"] }),
];

const cekismesizDavalar: DavaTuru[] = [
  sulhDavasi({ id: "evlat-edinmeye-izin", maddeNo: 124, ad: "Evlat edinmeye izin verilmesi", altKategori: "cekismesiz-yargi", gorevliMahkeme: CEKISMESIZ_GOREV, yetkiliMahkeme: CEKISMESIZ_YETKI, harclar: MAKTU_HARC, masraflar: CEKISMESIZ_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: cekismesizBilgi, gerekliBelgeler: cekismesizBelge, yargilamaUsulu: "ozel", pratikNot: "Evlat edinmeye iliskin izin ve onay surecinde sosyal inceleme ve cocugun ustun yarari esastir.", hmkMaddeleri: ["HMK m.382", "HMK m.383"], ozelKanunlar: ["TMK m.305-320"] }),
  sulhDavasi({ id: "gaiplik-karari-cekismesiz", maddeNo: 125, ad: "Gaiplik karari", altKategori: "cekismesiz-yargi", gorevliMahkeme: CEKISMESIZ_GOREV, yetkiliMahkeme: CEKISMESIZ_YETKI, harclar: MAKTU_HARC, masraflar: CEKISMESIZ_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: cekismesizBilgi, gerekliBelgeler: cekismesizBelge, yargilamaUsulu: "ozel", pratikNot: "Ilan surecleri ve kanundaki bekleme sureleri gaiplik kararinda kritik rol oynar.", hmkMaddeleri: ["HMK m.382", "HMK m.383"], ozelKanunlar: ["TMK m.32-35"] }),
  sulhDavasi({ id: "ad-ve-soyadi-degistirme-cekismesiz", maddeNo: 126, ad: "Ad ve soyadi degistirme (bazi cekismesiz hallerde)", altKategori: "cekismesiz-yargi", gorevliMahkeme: CEKISMESIZ_GOREV, yetkiliMahkeme: CEKISMESIZ_YETKI, harclar: MAKTU_HARC, masraflar: CEKISMESIZ_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: cekismesizBilgi, gerekliBelgeler: cekismesizBelge, yargilamaUsulu: "ozel", pratikNot: "Uygulamada cekismesiz nitelikte kalan isim duzeltmeleri ile ihtilafli degisiklik talepleri ayrilmalidir.", hmkMaddeleri: ["HMK m.382", "HMK m.383"], ozelKanunlar: ["TMK m.27", "5490 sy. Kanun"] }),
  sulhDavasi({ id: "tevdi-mahalli-tayini", maddeNo: 127, ad: "Tevdi mahalli tayini (odeme yerinin belirlenmesi)", altKategori: "cekismesiz-yargi", gorevliMahkeme: CEKISMESIZ_GOREV, yetkiliMahkeme: CEKISMESIZ_YETKI, harclar: MAKTU_HARC, masraflar: CEKISMESIZ_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: cekismesizBilgi, gerekliBelgeler: cekismesizBelge, yargilamaUsulu: "ozel", pratikNot: "Tevdi mahalli tayiniyle borclu, odeme teklifini uygun yerde yerine getirerek temerrut riskini azaltir.", hmkMaddeleri: ["HMK m.382", "HMK m.383"], ozelKanunlar: ["TBK m.107-109"] }),
  sulhDavasi({ id: "sozlesme-konusu-seyin-satisina-izin", maddeNo: 128, ad: "Sozlesme konusu seyin satisina izin davalari", altKategori: "cekismesiz-yargi", gorevliMahkeme: CEKISMESIZ_GOREV, yetkiliMahkeme: CEKISMESIZ_YETKI, harclar: MAKTU_HARC, masraflar: CEKISMESIZ_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: cekismesizBilgi, gerekliBelgeler: cekismesizBelge, yargilamaUsulu: "ozel", pratikNot: "Ozellikle vesayet veya tereke yonetiminde satisa cikarilacak mal icin onceden izin gerekebilir.", hmkMaddeleri: ["HMK m.382", "HMK m.383"], ozelKanunlar: ["TMK m.444", "TMK m.462"] }),
  sulhDavasi({ id: "delil-tespiti", maddeNo: 129, ad: "Delil tespiti talepleri", altKategori: "cekismesiz-yargi", gorevliMahkeme: CEKISMESIZ_GOREV, yetkiliMahkeme: CEKISMESIZ_YETKI, harclar: MAKTU_HARC, masraflar: { ...CEKISMESIZ_MASRAF, bilirkisiUcreti: BILIRKISI_UCRETI, toplamTahmini: 3600, aciklama: "Delilin niteligine gore bilirkisi veya kesif gideri eklenebilir." }, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: cekismesizBilgi, gerekliBelgeler: cekismesizBelge, yargilamaUsulu: "ozel", pratikNot: "Dava acilmadan once kaybolma veya degisme riski altindaki delilin korunmasi icin kullanilir.", hmkMaddeleri: ["HMK m.400-406"], ozelKanunlar: ["HMK m.400 vd."] }),
  sulhDavasi({ id: "ihtiyati-tedbir-talebi", maddeNo: 130, ad: "Ihtiyati tedbir talepleri (bazi durumlarda)", altKategori: "cekismesiz-yargi", gorevliMahkeme: CEKISMESIZ_GOREV, yetkiliMahkeme: CEKISMESIZ_YETKI, harclar: MAKTU_HARC, masraflar: CEKISMESIZ_MASRAF, arabuluculuk: ARABULUCULUK_YOK, muvekkilBilgileri: cekismesizBilgi, gerekliBelgeler: cekismesizBelge, yargilamaUsulu: "ozel", pratikNot: "Tedbirde yaklasik ispat ve gecikmede sakinca kosullari birlikte gosterilmelidir.", hmkMaddeleri: ["HMK m.389-399"], ozelKanunlar: ["HMK m.389 vd."] }),
];

const katMulkiyetiDavalar: DavaTuru[] = [
  sulhDavasi({ id: "ortak-gider-aidat-alacagi", maddeNo: 131, ad: "Ortak gider ve aidat alacagi davalari", altKategori: "kat-mulkiyeti", yetkiliMahkeme: KAT_YETKI, harclar: NISPI_HARC, masraflar: KAT_MASRAF, arabuluculuk: KAT_ARABULUCULUK, muvekkilBilgileri: katBilgi, gerekliBelgeler: katBelge, pratikNot: "Aidat alacaginda yonetim plani, kurul karari ve hesap dokumunun birbiriyle uyumlu olmasi gerekir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["KMK m.20", "KMK m.33", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "kat-malikleri-kurulu-kararinin-iptali", maddeNo: 132, ad: "Kat malikleri kurulu kararinin iptali davasi", altKategori: "kat-mulkiyeti", yetkiliMahkeme: KAT_YETKI, harclar: MAKTU_HARC, masraflar: KAT_MASRAF, arabuluculuk: KAT_ARABULUCULUK, muvekkilBilgileri: katBilgi, gerekliBelgeler: katBelge, pratikNot: "Toplanti usulu, cogunluk ve muhalefet kaydi iptal davasinda ilk incelenecek basliklardir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["KMK m.33-34", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "projeye-aykiri-tadilat-eski-hale-getirme", maddeNo: 133, ad: "Projeye aykiri tadilat nedeniyle eski hale getirme davasi", altKategori: "kat-mulkiyeti", yetkiliMahkeme: KAT_YETKI, harclar: MAKTU_HARC, masraflar: KAT_MASRAF, arabuluculuk: KAT_ARABULUCULUK, muvekkilBilgileri: katBilgi, gerekliBelgeler: katBelge, pratikNot: "Aykiriligin onayli projeye ve ortak yerlere etkisi genellikle teknik bilirkişiyle belirlenir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["KMK m.19", "KMK m.33", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "rahatsiz-edici-kullanim-son-verilmesi", maddeNo: 134, ad: "Rahatsiz edici kullanima son verilmesi davasi", altKategori: "kat-mulkiyeti", yetkiliMahkeme: KAT_YETKI, harclar: MAKTU_HARC, masraflar: KAT_MASRAF, arabuluculuk: KAT_ARABULUCULUK, muvekkilBilgileri: katBilgi, gerekliBelgeler: katBelge, pratikNot: "Sureklilik gosteren rahatsizliklar icin tutanak, yazi ve komsu beyanlari dosyada toplanmalidir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["KMK m.18", "KMK m.25", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "bagimsiz-bolumun-devri-mecburiyeti", maddeNo: 135, ad: "Bagimsiz bolumun devri mecburiyeti davalari", altKategori: "kat-mulkiyeti", yetkiliMahkeme: KAT_YETKI, harclar: NISPI_HARC, masraflar: KAT_MASRAF, arabuluculuk: KAT_ARABULUCULUK, muvekkilBilgileri: katBilgi, gerekliBelgeler: katBelge, pratikNot: "Devri mecburiyeti istisnai ve agir bir yaptirim oldugundan ihlallerin yogun ve belgeli olmasi gerekir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["KMK m.25", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "yonetim-plani-degisikligine-itiraz", maddeNo: 136, ad: "Yonetim plani degisikligine itiraz davalari", altKategori: "kat-mulkiyeti", yetkiliMahkeme: KAT_YETKI, harclar: MAKTU_HARC, masraflar: KAT_MASRAF, arabuluculuk: KAT_ARABULUCULUK, muvekkilBilgileri: katBilgi, gerekliBelgeler: katBelge, pratikNot: "Yonetim plani degisikliginde gereken cogunlugun saglanip saglanmadigi esas inceleme konusudur.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["KMK m.28", "KMK m.33", "6325 sy. K. m.18/B"] }),
  sulhDavasi({ id: "yonetici-ve-denetci-atanmasi-azli", maddeNo: 137, ad: "Yonetici/denetci atanmasi ve azli davalari", altKategori: "kat-mulkiyeti", yetkiliMahkeme: KAT_YETKI, harclar: MAKTU_HARC, masraflar: KAT_MASRAF, arabuluculuk: KAT_ARABULUCULUK, muvekkilBilgileri: katBilgi, gerekliBelgeler: katBelge, pratikNot: "Toplanti yapilamayan veya yonetim organi islevsiz kalan sitelerde mahkemece atama veya azil yoluna gidilebilir.", hmkMaddeleri: ["HMK m.4", "HMK m.316"], ozelKanunlar: ["KMK m.34-41", "6325 sy. K. m.18/B"] }),
];

export const bolum02SulhHukuk: DavaTuru[] = [
  ...kiraDavalar,
  ...ortaklikDavalar,
  ...zilyetlikDavalar,
  ...vesayetDavalar,
  ...mirasDavalar,
  ...cekismesizDavalar,
  ...katMulkiyetiDavalar,
];
