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
} from "@/lib/types";
import { BASVURMA_HARCI, BILIRKISI_UCRETI, NISPI_HARC_ORANI, TEBLIGAT_MASRAFI } from "./harclar";

interface Config {
  id: string;
  maddeNo: number;
  ad: string;
  altKategori: string;
  harclar: HarcBilgisi;
  masraflar: MasrafBilgisi;
  arabuluculuk: ArabuluculukBilgisi;
  pratikNot: string;
  ozelKanunlar: string[];
  muvekkilBilgileri: MuvekkilBilgi[];
  gerekliBelgeler: GerekiliBelge[];
}

type Seed = readonly [string, number, string, string, string[]];

const GOREV: GorevliMahkeme = {
  mahkeme: "Tuketici Mahkemesi",
  yasalDayanak: "6502 sy. K. m.73",
  aciklama: "Tuketici islemi ve tuketiciye yonelik uygulamalardan dogan uyusmazliklar bu mahkemede gorulur.",
  ozelDurum: "Parasal sinir altindaki bazi dosyalarda once tuketici hakem heyeti yolu zorunludur.",
};

const YETKI: YetkiliMahkeme = {
  genelYetki: "Tuketicinin veya davalinin yerlesim yeri mahkemesi",
  ozelYetki: ["Islemin yapildigi yer mahkemesi"],
  kesinYetkiMi: false,
  yasalDayanak: "6502 sy. K. m.73/5, HMK m.6",
  aciklama: "Tuketici lehine yorum ilkesi geregi tuketicinin yerlesim yeri de yetki merkezi olabilir.",
};

const MAKTU: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "maktu",
  aciklama: "Iptal ve hakem heyeti itirazinda maktu harc esas alinmistir.",
};

const NISPI: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "nispi",
  nispiOran: NISPI_HARC_ORANI * 1000,
  pesinHarcOran: 0.25,
  aciklama: "Parasal tuketici taleplerinde nispi harc bilgisi uygulanir.",
};

const MASRAF: Record<string, MasrafBilgisi> = {
  mal: { tebligatMasrafi: TEBLIGAT_MASRAFI * 2, bilirkisiUcreti: BILIRKISI_UCRETI, toplamTahmini: 3600, aciklama: "Urun ve servis incelemesi on plandadir." },
  hizmet: { tebligatMasrafi: TEBLIGAT_MASRAFI * 2, bilirkisiUcreti: BILIRKISI_UCRETI, toplamTahmini: 3900, aciklama: "Hizmet ayibinda uzman incelemesi yaygindir." },
  finans: { tebligatMasrafi: TEBLIGAT_MASRAFI * 2, bilirkisiUcreti: BILIRKISI_UCRETI, toplamTahmini: 4200, aciklama: "Banka ve komisyon hesaplari incelenir." },
  sigorta: { tebligatMasrafi: TEBLIGAT_MASRAFI * 2, bilirkisiUcreti: BILIRKISI_UCRETI, toplamTahmini: 4400, aciklama: "Police ve hasar kapsami teknik raporla test edilir." },
  diger: { tebligatMasrafi: TEBLIGAT_MASRAFI * 2, toplamTahmini: 1800, aciklama: "Tebligat ve temel gider avansi agirliklidir." },
};

const ARAB: Record<string, ArabuluculukBilgisi> = {
  zorunlu: { davaSarti: true, ihtiyari: false, yasalDayanak: "6502 sy. K. m.73/A", aciklama: "Tuketici mahkemesinde gorulen cogu uyusmazlikta dava oncesi arabuluculuk zorunludur." },
  muaf: { davaSarti: false, ihtiyari: true, yasalDayanak: "6502 sy. K. m.73/A", aciklama: "Hakem heyeti ve bazi istisna hallerde dava sarti arabuluculuk uygulanmaz." },
};

const VEKALET: OzelVekaletnameBilgisi = {
  gerekliMi: false,
  neden: "Genel dava vekaletnamesi tuketici uyusmazliklarinda yeterlidir.",
  yasalDayanak: "HMK m.74",
};

const BILGI: Record<string, MuvekkilBilgi[]> = {
  mal: [
    { bilgi: "Urun ve satin alma tarihi", zorunlu: true },
    { bilgi: "Ayibin ne zaman ortaya ciktigi", zorunlu: true },
    { bilgi: "Secimlik hak tercihi", zorunlu: true },
  ],
  hizmet: [
    { bilgi: "Hizmetin turu ve bedeli", zorunlu: true },
    { bilgi: "Ayipli veya eksik ifa edilen kisim", zorunlu: true },
    { bilgi: "Basvuru/sikayet gecmisi", zorunlu: false },
  ],
  finans: [
    { bilgi: "Kredi veya kart sozlesmesinin tarihi", zorunlu: true },
    { bilgi: "Kesilen masraf veya komisyon kalemi", zorunlu: true },
    { bilgi: "Banka cevabi", zorunlu: false },
  ],
  sigorta: [
    { bilgi: "Police bilgileri ve riziko tarihi", zorunlu: true },
    { bilgi: "Sigortaciya yapilan basvuru", zorunlu: true },
    { bilgi: "Hasar ve zarar kalemleri", zorunlu: true },
  ],
  diger: [
    { bilgi: "Satici veya saglayici bilgileri", zorunlu: true },
    { bilgi: "Uyusmazligin konusu", zorunlu: true },
    { bilgi: "Talep sonucu", zorunlu: true },
  ],
};

const BELGE: Record<string, GerekiliBelge[]> = {
  mal: [
    { belge: "Fatura veya satis sozlesmesi", zorunlu: true, nereden: "Satici / e-Arsiv" },
    { belge: "Servis, ekspertiz veya garanti belgeleri", zorunlu: false },
    { belge: "Arabuluculuk son tutanagi", zorunlu: false, nereden: "Arabuluculuk dosyasi" },
  ],
  hizmet: [
    { belge: "Hizmet sozlesmesi veya rezervasyon kaydi", zorunlu: true },
    { belge: "Mesajlar, e-postalar ve servis fisleri", zorunlu: false },
    { belge: "Arabuluculuk son tutanagi", zorunlu: false, nereden: "Arabuluculuk dosyasi" },
  ],
  finans: [
    { belge: "Kredi veya kart sozlesmesi", zorunlu: true, nereden: "Banka" },
    { belge: "Hesap ozeti ve dekontlar", zorunlu: true, nereden: "Banka" },
    { belge: "Arabuluculuk son tutanagi", zorunlu: false, nereden: "Arabuluculuk dosyasi" },
  ],
  sigorta: [
    { belge: "Sigorta policesi", zorunlu: true, nereden: "Sigorta sirketi" },
    { belge: "Ekspertiz veya hasar dosyasi", zorunlu: false, nereden: "Sigorta sirketi" },
    { belge: "Arabuluculuk son tutanagi", zorunlu: false, nereden: "Arabuluculuk dosyasi" },
  ],
  diger: [
    { belge: "Sozlesme veya isleme dair belge", zorunlu: true },
    { belge: "Ihtarname, e-posta veya cayma bildirimi", zorunlu: false },
    { belge: "Hakem heyeti karari veya arabuluculuk tutanagi", zorunlu: false, nereden: "Resmi dosya" },
  ],
};

function dava(config: Config): DavaTuru {
  return {
    kategori: "tuketici-mahkemesi",
    gorevliMahkeme: GOREV,
    yetkiliMahkeme: YETKI,
    ozelVekaletname: VEKALET,
    yargilamaUsulu: "basit",
    hmkMaddeleri: ["HMK m.107", "HMK m.316"],
    ...config,
  };
}

function mapSeeds(
  seeds: Seed[],
  altKategori: string,
  bilgiKey: keyof typeof BILGI,
  masrafKey: keyof typeof MASRAF,
  opts?: { maktuNos?: number[]; muafNos?: number[] },
): DavaTuru[] {
  return seeds.map(([id, maddeNo, ad, pratikNot, ozelKanunlar]) =>
    dava({
      id,
      maddeNo,
      ad,
      altKategori,
      harclar: opts?.maktuNos?.includes(maddeNo) ? MAKTU : NISPI,
      masraflar: MASRAF[masrafKey],
      arabuluculuk: opts?.muafNos?.includes(maddeNo) ? ARAB.muaf : ARAB.zorunlu,
      pratikNot,
      ozelKanunlar,
      muvekkilBilgileri: BILGI[bilgiKey],
      gerekliBelgeler: BELGE[bilgiKey],
    }),
  );
}

const ayipliMalSeeds: Seed[] = [
  ["ayipli-mal-donme", 229, "Ayipli mal nedeniyle sozlesmeden donme davasi", "Teslim tarihi, ayip bildirimi ve secimlik hak kronolojisi net kurulmalidir.", ["6502 sy. K. m.8-12"]],
  ["ayipli-mal-degisim", 230, "Ayipli mal nedeniyle malin degistirilmesi davasi", "Ayni modelin temin edilebilirligi ve ayibin esasa etkisi birlikte tartisilmalidir.", ["6502 sy. K. m.11"]],
  ["ayipli-mal-bedel-indirimi", 231, "Ayipli mal nedeniyle bedel indirimi davasi", "Ayibin mal bedeline etkisi teknik raporla desteklenmelidir.", ["6502 sy. K. m.11"]],
  ["ayipli-mal-ucretsiz-onarim", 232, "Ayipli mal nedeniyle ucretsiz onarim davasi", "Yetkili servis surecleri ve onarim suresinin asilip asilamadigi onemlidir.", ["6502 sy. K. m.11", "6502 sy. K. m.56"]],
  ["gizli-ayip", 233, "Gizli ayip davalari", "Ayibin teslim aninda mevcut oldugu uzman incelemesiyle kurulmalidir.", ["6502 sy. K. m.10-12"]],
  ["ayipli-arac", 234, "Ayipli arac davalari", "Aracin kullanim guvenligi ve servis gecmisi dosyanin agirlik merkezidir.", ["6502 sy. K. m.8-12"]],
  ["ayipli-konut", 235, "Ayipli konut davalari", "Ayni hak boyutu doguyorsa arabuluculuk istisnasi ayri degerlendirilmelidir.", ["6502 sy. K. m.40-43"]],
  ["garanti-uyusmazligi", 236, "Garanti kapsamindaki uyusmazliklara iliskin davalar", "Garanti belgesi kapsami ile kullanici hatasi savunmasi somut veriyle test edilmelidir.", ["6502 sy. K. m.56-58"]],
];

const ayipliHizmetSeeds: Seed[] = [
  ["hatali-tamir-onarim", 237, "Hatali tamir/onarim hizmetine iliskin davalar", "Onarim oncesi-sonrasi durum ve teslim tutanaklari kritik delildir.", ["6502 sy. K. m.13-16"]],
  ["saglik-hizmeti-ayibi", 238, "Saglik hizmeti ayibi davalari", "Tibbi kayitlar ve kusur incelemesi birlikte ele alinmalidir.", ["6502 sy. K. m.13-16"]],
  ["egitim-hizmeti-ayibi", 239, "Egitim hizmeti ayibi davalari", "Vaadedilen icerik ile sunulan hizmet arasindaki fark somutlastirilmalidir.", ["6502 sy. K. m.13-16"]],
  ["telekom-uyusmazligi", 240, "Telekomunikasyon hizmeti uyusmazliklari", "Abonelik kosullari ve kesinti kayitlari birlikte incelenir.", ["6502 sy. K. m.52", "5809 sy. K."]],
  ["ulasim-hizmet-ayibi", 241, "Ulasim (havayolu, otobus) hizmet ayibi davalari", "Gecikme, iptal ve bagaj sorunlari ilgili tasima belgeleriyle kurulmalidir.", ["6502 sy. K. m.13-16"]],
  ["paket-tur", 242, "Paket tur sozlesmesinden dogan davalar", "Tur programi, degisiklikler ve ayipli ifa unsurlari karsilastirmali sunulmalidir.", ["6502 sy. K. m.51"]],
  ["turizm-otelcilik-ayibi", 243, "Turizm ve otelcilik hizmeti ayibi davalari", "Foto, rezervasyon ve tesis vaadi arasindaki fark acik gosterilmelidir.", ["6502 sy. K. m.13-16"]],
];

const finansSeeds: Seed[] = [
  ["kredi-dosya-masrafi", 244, "Kredi dosya masrafi/komisyon iadesi davasi", "Masrafin zorunlu ve belgeli olup olmadigi banka kayitlariyla test edilmelidir.", ["6502 sy. K. m.4-5"]],
  ["kredi-karti-yillik-ucret", 245, "Kredi karti yillik uyelik ucreti iadesi davasi", "Ucretin haksiz sart niteliginde olup olmadigi sozlesme metniyle degerlendirilir.", ["6502 sy. K. m.4-5"]],
  ["sigorta-primi-iadesi", 246, "Haksiz kesilen sigorta primi iadesi davasi", "Krediye bagli sigortanin zorunlu olup olmadigi aciklastirilmalidir.", ["6502 sy. K. m.4-5"]],
  ["erken-odeme-komisyonu", 247, "Yapilandirma/erken odeme komisyonu uyusmazliklari", "Erken odeme limitleri ve banka hesaplamasi mevzuatla karsilastirilmalidir.", ["6502 sy. K. m.4-5"]],
  ["konut-kredisi", 248, "Konut kredisi uyusmazliklari", "Faiz yapisi ve sigorta/komisyon kalemleri sozlesmeyle birlikte okunmalidir.", ["6502 sy. K. m.4-5"]],
  ["tasit-kredisi", 249, "Tasit kredisi uyusmazliklari", "Bagli kredi iliskisi ve arac satis evraki birlikte incelenmelidir.", ["6502 sy. K. m.30"]],
  ["ihtiyac-kredisi", 250, "Ihtiyac kredisi uyusmazliklari", "Temerrut, yeniden yapilandirma ve masraf kalemleri ayrilmalidir.", ["6502 sy. K. m.22-31"]],
  ["haksiz-sart-iptali", 251, "Haksiz sart niteligindeki sozlesme maddelerinin iptali davalari", "Standart islem kosulunun tuketici aleyhine dengesiz sonuc dogurup dogurmadigi test edilir.", ["6502 sy. K. m.5"]],
  ["kredi-karti-yapilandirma", 252, "Kredi karti borcu yeniden yapilandirma ihtilaflari", "Yapilandirma plani ile fiili tahsilatlar karsilastirilmalidir.", ["6502 sy. K. m.4-5"]],
  ["atm-internet-bankaciligi", 253, "ATM dolandiriciligi / internet bankaciligi hirsizligi davalari", "Musteri kusuru savunmasi islem loglari ve guvenlik adimlariyla sinanmalidir.", ["6502 sy. K. m.4-5", "5464 sy. K."]],
];

const sigortaSeeds: Seed[] = [
  ["kasko-tazminat", 254, "Kasko sigorta tazminat davasi", "Hasar ihbari ve ekspertiz raporu kapsama uygunluk yonunden incelenmelidir.", ["6502 sy. K. m.83"]],
  ["trafik-zmss", 255, "Trafik (ZMSS) sigorta tazminat davasi", "Basvuru sartlari ve zarar hesabinin sigortaciya yoneltilmesi ayri ayri kontrol edilir.", ["2918 sy. K.", "6502 sy. K."]],
  ["konut-sigortasi", 256, "Konut sigortasi tazminat davasi", "Rizikonun police teminatina girip girmedigi teknik raporla kurulmalidir.", ["6502 sy. K. m.83"]],
  ["saglik-sigortasi", 257, "Saglik sigortasi uyusmazliklari davalari", "Teminat disi istisnalar ile onay sureci belgelenmelidir.", ["6502 sy. K. m.83"]],
  ["hayat-sigortasi", 258, "Hayat sigortasi tazminat davasi", "Beyan yukumlulugu ve lehtar durumu birlikte degerlendirilmelidir.", ["6502 sy. K. m.83"]],
  ["ferdi-kaza", 259, "Ferdi kaza sigortasi davalari", "Kaza tanimi ile maluliyet orani police kapsami icinde ayiklanmalidir.", ["6502 sy. K. m.83"]],
  ["riziko-odeme-kacinma", 260, "Sigorta sirketinin riziko gerceklesmesinde tazminat odemekten kacinmasi davasi", "Reddin gerekcesi somut police maddeleriyle karsilastirilmalidir.", ["6502 sy. K. m.83"]],
  ["deger-kaybi-sigorta", 261, "Trafik kazasi deger kaybi (sigorta sirketine karsi) davasi", "Hasar gecmisi ve emsal piyasa verileriyle deger kaybi hesabi kurulmalidir.", ["2918 sy. K.", "6502 sy. K."]],
];

const digerSeeds: Seed[] = [
  ["abonelik-uyusmazligi", 262, "Abonelik sozlesmesi uyusmazliklari", "Iptal, cayma ve cezai sart hesaplari ayrintili kontrol edilmelidir.", ["6502 sy. K. m.52"]],
  ["mesafeli-satis", 263, "Mesafeli satis sozlesmesi uyusmazliklari", "On bilgilendirme ve teslim kayitlari ispatta belirleyicidir.", ["6502 sy. K. m.48"]],
  ["cayma-hakki", 264, "Cayma hakkinin kullanilmasina iliskin davalar", "Cayma bildiriminin suresinde ve ispatlanabilir sekilde yapildigi gosterilmelidir.", ["6502 sy. K. m.48"]],
  ["kapidan-satis", 265, "Kapidan satis sozlesmesi uyusmazliklari", "Saha satisi kosullari ve cayma bildirimi birlikte degerlendirilmelidir.", ["6502 sy. K. m.47"]],
  ["devre-tatil", 266, "Devre tatil/devre mulk sozlesmesi uyusmazliklari", "On bilgilendirme ve cayma suresi dosyanin cekirdegi olmalidir.", ["6502 sy. K. m.50"]],
  ["on-odemeli-konut", 267, "On odemeli konut satis sozlesmesi davalari", "Teslim takvimi ve proje vaadi ile fiili durum karsilastirilmalidir.", ["6502 sy. K. m.40-46"]],
  ["hakem-heyeti-itiraz", 268, "Tuketici hakem heyeti kararina itiraz davasi", "Kararin tebligi ve itiraz suresi kacirilmadan dosya kurulmalidir.", ["6502 sy. K. m.70"]],
  ["seri-ayipli-mal-toplatma", 269, "Seri uretilen ayipli malin toplatilmasi davasi", "Kamu guvenligi boyutu varsa teknik rapor ve idari bildirimler birlikte kullanilmalidir.", ["6502 sy. K. m.74"]],
  ["haksiz-ticari-uygulama", 270, "Haksiz ticari uygulama davalari", "Reklam ve yaniltici yonlendirme unsurlari ekran kaydi ve kampanya belgeleriyle gosterilmelidir.", ["6502 sy. K. m.61-63"]],
];

export const bolum05Tuketici: DavaTuru[] = [
  ...mapSeeds(ayipliMalSeeds, "ayipli-mal", "mal", "mal", { maktuNos: [235], muafNos: [235] }),
  ...mapSeeds(ayipliHizmetSeeds, "ayipli-hizmet", "hizmet", "hizmet"),
  ...mapSeeds(finansSeeds, "bankacilik-finans", "finans", "finans"),
  ...mapSeeds(sigortaSeeds, "sigorta", "sigorta", "sigorta"),
  ...mapSeeds(digerSeeds, "diger-tuketici", "diger", "diger", { maktuNos: [268, 269, 270], muafNos: [268] }),
];
