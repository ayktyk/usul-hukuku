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
  ZamanasimiBilgisi,
} from "@/lib/types";
import {
  BASVURMA_HARCI,
  BILIRKISI_UCRETI,
  NISPI_HARC_ORANI,
  TANIK_UCRETI,
  TEBLIGAT_MASRAFI,
} from "./harclar";

interface AileConfig {
  id: string;
  maddeNo: number;
  ad: string;
  altKategori: string;
  yetkiliMahkeme: YetkiliMahkeme;
  harclar: HarcBilgisi;
  masraflar: MasrafBilgisi;
  arabuluculuk: ArabuluculukBilgisi;
  pratikNot: string;
  hmkMaddeleri: string[];
  ozelKanunlar: string[];
  muvekkilBilgileri?: MuvekkilBilgi[];
  gerekliBelgeler?: GerekiliBelge[];
  ozelVekaletname?: OzelVekaletnameBilgisi;
  zamanasimi?: ZamanasimiBilgisi;
  yargilamaUsulu?: "yazili" | "basit" | "ozel";
}

type Seed = readonly [string, number, string, string, string[]];
type SeedWithTime = readonly [string, number, string, string, string[], ZamanasimiBilgisi];
type DigerSeed = readonly [
  string,
  number,
  string,
  string,
  string[],
  HarcBilgisi,
  YetkiliMahkeme | undefined,
  MasrafBilgisi | undefined,
  "yazili" | "basit" | "ozel" | undefined,
];

const AILE_GOREV: GorevliMahkeme = {
  mahkeme: "Aile Mahkemesi",
  yasalDayanak: "4787 sy. K. m.4",
  aciklama:
    "Aile hukukundan dogan dava ve isler ile aile mahkemesine birakilan koruyucu-onleyici tedbirler bu mahkemede gorulur.",
};

const BOSANMA_YETKI: YetkiliMahkeme = {
  genelYetki: "Eslerden birinin yerlesim yeri mahkemesi",
  ozelYetki: ["Davadan once son alti aydir birlikte oturulan yer mahkemesi"],
  kesinYetkiMi: false,
  yasalDayanak: "TMK m.168",
  aciklama:
    "Bosanma ve ayrilik davalarinda eslerden birinin yerlesim yeri veya son ortak mesken yetkilidir.",
};

const NAFAKA_YETKI: YetkiliMahkeme = {
  genelYetki: "Davalinin yerlesim yeri mahkemesi",
  ozelYetki: ["Nafaka alacaklisinin yerlesim yeri mahkemesi"],
  kesinYetkiMi: false,
  yasalDayanak: "TMK m.177, HMK m.6",
  aciklama:
    "Nafaka uyusmazliklarinda alacaklinin yerlesim yeri de kuvvetli baglanti merkezi kabul edilir.",
};

const COCUK_YETKI: YetkiliMahkeme = {
  genelYetki: "Davalinin yerlesim yeri mahkemesi",
  ozelYetki: ["Cocugun mutat meskeninin bulundugu yer mahkemesi"],
  kesinYetkiMi: false,
  yasalDayanak: "HMK m.6, TMK m.182",
  aciklama:
    "Velayet ve kisisel iliski dosyalarinda cocugun fiilen yasadigi yer delillere erisim acisindan on plandadir.",
};

const MAL_REJIMI_YETKI: YetkiliMahkeme = {
  genelYetki: "Davalinin yerlesim yeri mahkemesi",
  ozelYetki: ["Bosanma davasina bakan mahkeme", "Eslerin son ortak yerlesim yeri mahkemesi"],
  kesinYetkiMi: false,
  yasalDayanak: "HMK m.6, HMK m.10",
  aciklama:
    "Mal rejimi tasfiyesinde bosanma dosyasi ile bag kuruldugunda ayni mahkemede gorulmesi usul ekonomisi saglar.",
};

const SOYBAGI_YETKI: YetkiliMahkeme = {
  genelYetki: "Davalinin yerlesim yeri mahkemesi",
  ozelYetki: ["Anne, cocuk veya ilgili kisinin yerlesim yeri mahkemesi"],
  kesinYetkiMi: false,
  yasalDayanak: "HMK m.6, TMK m.283",
  aciklama:
    "Soybagi davalarinda cocugun ustun yarari nedeniyle cocugun veya annenin yerlesim yeriyle bag kurulur.",
};

const AILE_GENEL_YETKI: YetkiliMahkeme = {
  genelYetki: "Davalinin yerlesim yeri mahkemesi",
  ozelYetki: ["Uyusmazligin aile birligiyle yakin bag kurdugu yer mahkemesi"],
  kesinYetkiMi: false,
  yasalDayanak: "HMK m.6",
  aciklama: "Aile hukukunun diger uyusmazliklarinda genel yetki kurali esas alinmistir.",
};

const KORUMA_YETKI: YetkiliMahkeme = {
  genelYetki: "Korunan kisinin bulundugu yer aile mahkemesi",
  ozelYetki: ["Siddetin gerceklestigi veya tehlikenin dogdugu yer mahkemesi"],
  kesinYetkiMi: false,
  yasalDayanak: "6284 sy. K. m.8",
  aciklama:
    "Koruma tedbirlerinde hiz ve erisilebilirlik esastir; magdurun bulundugu yer mahkemesi hemen tedbir kurabilir.",
};

const TANIMA_TENFIZ_YETKI: YetkiliMahkeme = {
  genelYetki: "Karsi tarafin Turkiye'deki yerlesim yeri mahkemesi",
  ozelYetki: ["Yerlesim yeri yoksa sakin oldugu yer", "Bunlar da yoksa Ankara, Istanbul veya Izmir mahkemeleri"],
  kesinYetkiMi: false,
  yasalDayanak: "5718 sy. K. m.51",
  aciklama:
    "Yabanci mahkeme kararlarinin tanima ve tenfizinde 5718 sayili Kanun'daki ozel yetki kurali uygulanir.",
};

const MAKTU_HARC: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "maktu",
  aciklama: "Aile hukukunun kisisel durum agirlikli davalarinda maktu harc bilgisi esas alinmistir.",
};

const NISPI_HARC: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "nispi",
  nispiOran: NISPI_HARC_ORANI * 1000,
  pesinHarcOran: 0.25,
  aciklama: "Parasal aile hukuku taleplerinde nispi harc bilgisi uygulanir.",
};

const BOSANMA_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  tanikUcreti: TANIK_UCRETI * 4,
  toplamTahmini: 2200,
  aciklama: "Bosanma dosyalarinda tebligat ve tanik giderleri temel kalemdir.",
};

const COCUK_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  bilirkisiUcreti: BILIRKISI_UCRETI,
  toplamTahmini: 4300,
  aciklama: "Pedagog veya sosyal inceleme raporu gereksinimi sik gorulur.",
};

const MAL_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 4,
  bilirkisiUcreti: BILIRKISI_UCRETI,
  toplamTahmini: 5200,
  aciklama: "Mal rejimi ve ziynet dosyalarinda hesap-degerleme bilirkiyisi on plandadir.",
};

const KORUMA_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 2,
  toplamTahmini: 900,
  aciklama: "Koruma tedbirlerinde ilk asama giderleri sinirlidir.",
};

const GENEL_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  tanikUcreti: TANIK_UCRETI * 2,
  toplamTahmini: 1800,
  aciklama: "Aile hukukunun diger dosyalarinda temel gider kalemi tebligat ve taniktir.",
};

const ARABULUCULUK_YOK: ArabuluculukBilgisi = {
  davaSarti: false,
  ihtiyari: true,
  aciklama: "Aile hukukunun cekirdek uyusmazliklarinda zorunlu arabuluculuk uygulanmaz.",
};

const VEKALET: OzelVekaletnameBilgisi = {
  gerekliMi: false,
  neden: "Genel dava vekaletnamesi aile hukukunun cogu davasinda yeterlidir.",
  yasalDayanak: "HMK m.74",
};

const BOSANMA_VEKALET: OzelVekaletnameBilgisi = {
  gerekliMi: true,
  neden:
    "Bosanma, ayrilik ve evliligin iptali gibi kisilik durumunu dogrudan etkileyen davalarda ozel vekalet aranir.",
  yasalDayanak: "HMK m.74",
  icerik: [
    "Bosanma veya ayrilik davasi acma ve takip etme",
    "Sulh, feragat ve kabulde bulunma",
    "Anlasmali bosanma protokolunu imzalama",
  ],
};

const BOSANMA_BILGI: MuvekkilBilgi[] = [
  { bilgi: "Evlilik tarihi ve taraf kimlik bilgileri", zorunlu: true },
  { bilgi: "Bosanma sebebini olusturan olaylarin kronolojisi", zorunlu: true },
  { bilgi: "Cocuk, nafaka ve tazminat talepleri", zorunlu: false },
];

const BOSANMA_BELGE: GerekiliBelge[] = [
  { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet / Nufus" },
  { belge: "Varsa protokol veya ihtarlar", zorunlu: false, nereden: "Muvekkil / Noter" },
  { belge: "Tanik listesi ve diger deliller", zorunlu: false },
];

const NAFAKA_BILGI: MuvekkilBilgi[] = [
  { bilgi: "Taraflarin gelir ve gider durumu", zorunlu: true },
  { bilgi: "Nafaka ihtiyacini doguran olgular", zorunlu: true },
  { bilgi: "Varsa onceki mahkeme karar numaralari", zorunlu: false },
];

const NAFAKA_BELGE: GerekiliBelge[] = [
  { belge: "Gelir belgeleri ve SGK kayitlari", zorunlu: false, nereden: "e-Devlet / Isveren" },
  { belge: "Nufus kayit ornegi veya onceki ilam", zorunlu: true, nereden: "e-Devlet / UYAP" },
  { belge: "Banka hareketleri ve gider belgeleri", zorunlu: false },
];

const COCUK_BILGI: MuvekkilBilgi[] = [
  { bilgi: "Cocugun kimlik, yas ve okul bilgileri", zorunlu: true },
  { bilgi: "Fiili bakim duzeni ve mevcut yasam kosullari", zorunlu: true },
  { bilgi: "Talep edilen velayet veya kisisel iliski modeli", zorunlu: true },
];

const COCUK_BELGE: GerekiliBelge[] = [
  { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet" },
  { belge: "Okul, saglik veya sosyal inceleme belgeleri", zorunlu: false, nereden: "Okul / Hastane / Sosyal hizmet" },
  { belge: "Varsa onceki velayet veya koruma kararleri", zorunlu: false, nereden: "UYAP / Muvekkil" },
];

const MAL_BILGI: MuvekkilBilgi[] = [
  { bilgi: "Evlilik ve ayrilik tarihleri", zorunlu: true },
  { bilgi: "Tasfiye konusu malvarligi kalemleri", zorunlu: true },
  { bilgi: "Edinme tarihi ve finansman kaynagi", zorunlu: true },
];

const MAL_BELGE: GerekiliBelge[] = [
  { belge: "Tapu, ruhsat, banka ve sirket kayitlari", zorunlu: false, nereden: "Tapu / Banka / Resmi kurum" },
  { belge: "Bosanma ilami veya derdest dosya bilgisi", zorunlu: false, nereden: "UYAP" },
  { belge: "Fatura, kredi ve odeme belgeleri", zorunlu: false },
];

const SOYBAGI_BILGI: MuvekkilBilgi[] = [
  { bilgi: "Anne, cocuk ve davalinin kimlik bilgileri", zorunlu: true },
  { bilgi: "Dogum tarihi ve aile iliskisine dair kronoloji", zorunlu: true },
  { bilgi: "DNA incelemesi veya tanima beyanina dair bilgi", zorunlu: false },
];

const SOYBAGI_BELGE: GerekiliBelge[] = [
  { belge: "Nufus kayit ornekleri", zorunlu: true, nereden: "e-Devlet / Nufus" },
  { belge: "Dogum raporu ve hastane kayitlari", zorunlu: false, nereden: "Hastane" },
  { belge: "Varsa tanima senedi veya onceki kararlar", zorunlu: false, nereden: "Noter / UYAP" },
];

const DIGER_BILGI: MuvekkilBilgi[] = [
  { bilgi: "Uyusmazliga neden olan aile hukuku olayi", zorunlu: true },
  { bilgi: "Taraflarin kimlik ve adres bilgileri", zorunlu: true },
  { bilgi: "Talep edilen sonuc ve gerekce", zorunlu: true },
];

const DIGER_BELGE: GerekiliBelge[] = [
  { belge: "Nufus kayit ornegi veya resmi belge", zorunlu: false, nereden: "e-Devlet / Resmi kurum" },
  { belge: "Varsa onceki mahkeme kararlari", zorunlu: false, nereden: "UYAP" },
  { belge: "Yazisma, ihtar veya diger destekleyici belgeler", zorunlu: false },
];

function aileDavasi(config: AileConfig): DavaTuru {
  return {
    kategori: "aile-mahkemesi",
    gorevliMahkeme: AILE_GOREV,
    ozelVekaletname: config.ozelVekaletname ?? VEKALET,
    yargilamaUsulu: config.yargilamaUsulu ?? "basit",
    muvekkilBilgileri: config.muvekkilBilgileri ?? [],
    gerekliBelgeler: config.gerekliBelgeler ?? [],
    ...config,
  };
}

const bosanmaSeeds: Array<Seed | SeedWithTime> = [
  ["anlasmali-bosanma", 181, "Anlasmali bosanma davasi", "Protokolun velayet, nafaka ve mal paylasimi basliklari acik kurulmalidir.", ["TMK m.166/3"]],
  ["cekismeli-bosanma-genel", 182, "Cekismeli bosanma davasi (genel sebep)", "Evlilik birliginin sarsildigi olaylar somut kronolojiyle sunulmalidir.", ["TMK m.166/1-2"]],
  ["zina-nedeniyle-bosanma", 183, "Zina nedeniyle bosanma davasi", "Affetme ve hak dusurucu surelerin kacirilip kacirilmadigi once incelenir.", ["TMK m.161"], { sure: "Ogrenmeden itibaren 6 ay, her halde fiilden itibaren 5 yil", yasalDayanak: "TMK m.161/2" }],
  ["hayata-kast-kotu-muamele", 184, "Hayata kast, pek kotu muamele nedeniyle bosanma davasi", "Siddet ve agir muamele iddialari rapor ve kolluk kaydiyla desteklenmelidir.", ["TMK m.162"], { sure: "Ogrenmeden itibaren 6 ay, her halde fiilden itibaren 5 yil", yasalDayanak: "TMK m.162/2" }],
  ["suc-isleme-haysiyetsiz-hayat", 185, "Suc isleme ve haysiyetsiz hayat surme nedeniyle bosanma davasi", "Davranisin ortak hayati cekilmez hale getirdigi gosterilmelidir.", ["TMK m.163"]],
  ["terk-nedeniyle-bosanma", 186, "Terk nedeniyle bosanma davasi", "Terk ihtari usule uygun gonderilmeden dava temeli kurulamaz.", ["TMK m.164"]],
  ["akil-hastaligi-nedeniyle-bosanma", 187, "Akil hastaligi nedeniyle bosanma davasi", "Resmi saglik kurulu raporu ile iyilesme ihtimalinin dusuk oldugu ortaya konulmalidir.", ["TMK m.165"]],
  ["ayrilik-davasi", 188, "Ayrilik davasi", "Ayrilikla evlilik birliginin korunup korunamayacagi tartisilmalidir.", ["TMK m.167"]],
  ["evliligin-iptali-mutlak-butlan", 189, "Evliligin iptali (butlan) davasi - mutlak butlan", "Kesin evlenme engelinin bulundugu tarih resmi kayitlarla gosterilmelidir.", ["TMK m.145-147"]],
  ["evliligin-iptali-nispi-butlan", 190, "Evliligin iptali - nispi butlan", "Hata, hile veya korkutmanin evlilik iradesine etkisi kurulmalidir.", ["TMK m.148-151"]],
  ["evlenmenin-yoklugunun-tespiti", 191, "Evlenmenin yoklugunun tespiti davasi", "Kurucu resmi sekil unsurlarinin hic dogmamis sayilacak olcude eksikligi gosterilmelidir.", ["TMK m.142-143"]],
];

const nafakaSeeds: Seed[] = [
  ["tedbir-nafakasi", 192, "Tedbir nafakasi davasi", "Acil ihtiyac ve karsi tarafin odeme gucu ilk asamada ortaya konulmalidir.", ["TMK m.169"]],
  ["yoksulluk-nafakasi", 193, "Yoksulluk nafakasi davasi", "Bosanma yuzunden yoksulluga dusme ve kusur durumu birlikte degerlendirilir.", ["TMK m.175"]],
  ["istirak-nafakasi", 194, "Istirak nafakasi davasi", "Cocugun yasi ve ebeveynlerin ekonomik gucu nafaka miktarini belirler.", ["TMK m.182/2", "TMK m.328"]],
  ["yardim-nafakasi", 195, "Yardim nafakasi davasi", "Yardim yukumlulugu doguran yakinlik derecesi ve ihtiyac hali delillendirilmelidir.", ["TMK m.364-366"]],
  ["nafaka-artirim", 196, "Nafaka artirim davasi", "Ekonomik degisim ve gider artisi rakamsal olarak gosterilmelidir.", ["TMK m.176/4"]],
  ["nafaka-azaltim", 197, "Nafaka azaltim (indirim) davasi", "Odeme gucundeki azalma gecici degil surekli nitelikte belgelenmelidir.", ["TMK m.176/4"]],
  ["nafaka-kaldirilmasi", 198, "Nafaka kaldirilmasi davasi", "Yeni evlilik, fiili birliktelik veya ihtiyacin ortadan kalkmasi somut delille ispatlanmalidir.", ["TMK m.176/3-4", "TMK m.331"]],
];

const velayetSeeds: Seed[] = [
  ["velayetin-duzenlenmesi", 199, "Velayetin duzenlenmesi davasi", "Cocugun ustun yarari sosyal inceleme verileriyle doldurulmalidir.", ["TMK m.182", "TMK m.336"]],
  ["velayetin-degistirilmesi", 200, "Velayetin degistirilmesi davasi", "Onceki karardan sonra ortaya cikan esasli degisiklikler gosterilmelidir.", ["TMK m.183"]],
  ["velayetin-kaldirilmasi", 201, "Velayetin kaldirilmasi (nezi) davasi", "Cocugun gelisimi icin agir risk uzman raporuyla desteklenmelidir.", ["TMK m.348"]],
  ["kisisel-iliski-duzenlenmesi", 202, "Kisisel iliski (cocukla gorusme) duzenlenmesi davasi", "Gorusme plani uygulanabilir saat ve teslim kurallariyla kurulmalidir.", ["TMK m.182", "TMK m.323"]],
  ["cocugun-ust-soya-teslimi", 203, "Cocugun ust soya (dede/nine) teslimi davasi", "Ust soyla iliskinin cocugun yararina oldugu gosterilmelidir.", ["TMK m.325"]],
  ["cocugun-yurtdisina-cikisi-izin", 204, "Cocugun yurtdisina cikisina izin davasi", "Seyahatin amaci, suresi ve geri donus guvenceleri takvimle sunulmalidir.", ["TMK m.339", "TMK m.346"]],
  ["uluslararasi-cocuk-kacirma", 205, "Uluslararasi cocuk kacirma davalari", "Mutat mesken, haksiz goturme tarihi ve iade engelleri dar cercevede incelenir.", ["5717 sy. K.", "Lahey Cocuk Kacirma Sozlesmesi"]],
];

const malSeeds: Seed[] = [
  ["edinilmis-mallara-katilma-tasfiye", 206, "Edinilmis mallara katilma rejimi tasfiyesi", "Tasfiye anindaki surum degeri ve edinme kaynagi ayri ayri ortaya konulmalidir.", ["TMK m.202", "TMK m.218-241"]],
  ["katilma-alacagi", 207, "Katilma alacagi davasi", "Artik deger hesabinda kisisel mal istisnalari titizlikle ayrilmalidir.", ["TMK m.231-236"]],
  ["deger-artis-payi", 208, "Deger artis payi davasi", "Katki orani belgeyle ispatlanmali ve tasfiye tarihine gore hesaplanmalidir.", ["TMK m.227"]],
  ["katki-payi-alacagi", 209, "Katki payi alacagi davasi", "Eski-yeni rejim ayrimi icin katkilarin hangi donemde yapildigi gosterilmelidir.", ["TMK m.202", "TMK m.227"]],
  ["mal-ayriligina-gecis", 210, "Mal ayriligina gecis davasi", "Borcluluk veya kotu yonetim gibi sebepler somutlastirilmalidir.", ["TMK m.206"]],
  ["aile-konutu-serhi", 211, "Aile konutu serhi konulmasi/kaldirilmasi davalari", "Tasinmazin aile konutu niteligini fiili yerlesim delilleriyle gostermek gerekir.", ["TMK m.194"]],
  ["aile-konutu-tasarrufun-iptali", 212, "Aile konutu uzerinde tasarrufun iptali davasi", "Es riza eksikliginin tasarruf aninda mevcut oldugu delillendirilmelidir.", ["TMK m.194"]],
];

const soybagiSeeds: Seed[] = [
  ["babalik-davasi", 213, "Babalik davasi", "DNA incelemesi ve dava suresi birlikte degerlendirilir.", ["TMK m.301-304"]],
  ["soybagi-reddi", 214, "Soybaginin (nesebin) reddi davasi", "Babalik karinesinin curutulmesi icin sureler ve genetik inceleme birlikte takip edilmelidir.", ["TMK m.286-291"]],
  ["tanimanin-iptali", 215, "Tanimanin iptali davasi", "Tanima beyanina itiraz hakki olan kisilerin sirasi ayiklanmalidir.", ["TMK m.297-300"]],
  ["evlat-edinme", 216, "Evlat edinme davasi", "Bakim suresi, riza kosullari ve sosyal inceleme raporu belirleyicidir.", ["TMK m.305-320"]],
  ["evlat-edinmenin-kaldirilmasi", 217, "Evlat edinmenin kaldirilmasi davasi", "Iptal sebepleri dar yorumlandigindan sureler ozellikle kontrol edilmelidir.", ["TMK m.317-319"]],
];

const digerSeeds: DigerSeed[] = [
  ["nisanin-bozulmasi-tazminat", 218, "Nisanin bozulmasindan dogan tazminat davasi", "Nisan olgusu ve bozma sebebinin kusur dagilimini nasil etkiledigi kurulmalidir.", ["TMK m.120-121"], NISPI_HARC, undefined, undefined, undefined],
  ["hediyelerin-geri-verilmesi", 219, "Hediyelerin geri verilmesi davasi", "Mutat disi hediye niteligindeki esyalarin mevcut olup olmadigi tespit edilmelidir.", ["TMK m.122"], NISPI_HARC, undefined, undefined, undefined],
  ["ziynet-esyasi-alacagi", 220, "Ziynet (taki) esyasi alacagi davasi", "Ziynetlerin kimde kaldigi tanik ve delil zinciriyle kurulmalidir.", ["TMK m.220", "TMK m.226"], NISPI_HARC, undefined, MAL_MASRAF, undefined],
  ["bosanma-nedeniyle-maddi-tazminat", 221, "Maddi tazminat davasi (bosanma nedeniyle)", "Beklenen menfaat kaybi ile karsi tarafin kusuru arasindaki bag kurulmalidir.", ["TMK m.174/1"], NISPI_HARC, undefined, undefined, undefined],
  ["bosanma-nedeniyle-manevi-tazminat", 222, "Manevi tazminat davasi (bosanma nedeniyle)", "Kisilik haklarina saldiri boyutuna ulasan davranislar somutlastirilmalidir.", ["TMK m.174/2"], NISPI_HARC, undefined, undefined, undefined],
  ["evlenen-kadinin-bekarlik-soyadi", 223, "Evlenen kadinin bekarlik soyadini kullanma davasi", "Guncel anayasal ve insan haklari ictihatlarinin birlikte kullanilmasi fayda saglar.", ["TMK m.187", "AYM bireysel basvuru ictihatlari"], MAKTU_HARC, undefined, undefined, undefined],
  ["bosanan-kadinin-eski-es-soyadi", 224, "Bosanan kadinin kocasinin soyadini kullanmaya devam etmesi davasi", "Kullanimin menfaat dogurdugu ve eski es icin zarar vermeyecegi gosterilmelidir.", ["TMK m.173"], MAKTU_HARC, undefined, undefined, undefined],
  ["iddet-suresinin-kaldirilmasi", 225, "Iddet (bekleme) suresinin kaldirilmasi davasi", "Gebe olunmadigi resmi saglik raporuyla ortaya konulmalidir.", ["TMK m.132"], MAKTU_HARC, undefined, GENEL_MASRAF, "ozel"],
  ["terk-ihtari-gonderilmesi", 226, "Terk ihtarinin gonderilmesi islemleri", "Ihtarda donus adresi ve sonuc bolumu usule uygun kurulmalidir.", ["TMK m.164"], MAKTU_HARC, undefined, GENEL_MASRAF, "ozel"],
  ["koruma-karari-6284", 227, "6284 sayili Kanun kapsaminda koruma karari davalari", "Riskin aciliyeti kisa ve belgeye dayali anlatimla sunulmalidir.", ["6284 sy. K. m.5", "6284 sy. K. m.8"], MAKTU_HARC, KORUMA_YETKI, KORUMA_MASRAF, "ozel"],
  ["yabanci-bosanma-karari-tanima-tenfiz", 228, "Yabanci mahkeme bosanma kararinin taninmasi ve tenfizi davalari", "Kesinlesme serhi, apostil ve tercume zinciri eksiksiz kurulmalidir.", ["5718 sy. K. m.50-59"], MAKTU_HARC, TANIMA_TENFIZ_YETKI, GENEL_MASRAF, "ozel"],
];

function seedToDava(
  seed: Seed,
  altKategori: string,
  yetkiliMahkeme: YetkiliMahkeme,
  harclar: HarcBilgisi,
  masraflar: MasrafBilgisi,
  muvekkilBilgileri: MuvekkilBilgi[],
  gerekliBelgeler: GerekiliBelge[],
  hmkMaddeleri: string[],
  ozelVekaletname?: OzelVekaletnameBilgisi,
  yargilamaUsulu?: "yazili" | "basit" | "ozel",
): DavaTuru {
  const [id, maddeNo, ad, pratikNot, ozelKanunlar] = seed;
  return aileDavasi({
    id,
    maddeNo,
    ad,
    altKategori,
    yetkiliMahkeme,
    harclar,
    masraflar,
    arabuluculuk: ARABULUCULUK_YOK,
    pratikNot,
    hmkMaddeleri,
    ozelKanunlar,
    muvekkilBilgileri,
    gerekliBelgeler,
    ozelVekaletname,
    yargilamaUsulu,
  });
}

function seedToTimedDava(
  seed: SeedWithTime,
  altKategori: string,
  yetkiliMahkeme: YetkiliMahkeme,
  harclar: HarcBilgisi,
  masraflar: MasrafBilgisi,
  muvekkilBilgileri: MuvekkilBilgi[],
  gerekliBelgeler: GerekiliBelge[],
  hmkMaddeleri: string[],
  ozelVekaletname?: OzelVekaletnameBilgisi,
): DavaTuru {
  const [id, maddeNo, ad, pratikNot, ozelKanunlar, zamanasimi] = seed;
  return aileDavasi({
    id,
    maddeNo,
    ad,
    altKategori,
    yetkiliMahkeme,
    harclar,
    masraflar,
    arabuluculuk: ARABULUCULUK_YOK,
    pratikNot,
    hmkMaddeleri,
    ozelKanunlar,
    muvekkilBilgileri,
    gerekliBelgeler,
    ozelVekaletname,
    zamanasimi,
  });
}

const bosanmaDavalar = bosanmaSeeds.map((seed) =>
  seed.length === 6
    ? seedToTimedDava(seed as SeedWithTime, "bosanma", BOSANMA_YETKI, MAKTU_HARC, BOSANMA_MASRAF, BOSANMA_BILGI, BOSANMA_BELGE, ["HMK m.119", "HMK m.316"], BOSANMA_VEKALET)
    : seedToDava(seed as Seed, "bosanma", BOSANMA_YETKI, MAKTU_HARC, BOSANMA_MASRAF, BOSANMA_BILGI, BOSANMA_BELGE, ["HMK m.119", "HMK m.316"], BOSANMA_VEKALET),
);

const nafakaDavalar = nafakaSeeds.map((seed) =>
  seedToDava(seed, "nafaka", NAFAKA_YETKI, NISPI_HARC, GENEL_MASRAF, NAFAKA_BILGI, NAFAKA_BELGE, ["HMK m.107", "HMK m.316"]),
);

const velayetDavalar = velayetSeeds.map((seed) =>
  seedToDava(
    seed,
    "velayet-cocuk",
    COCUK_YETKI,
    MAKTU_HARC,
    COCUK_MASRAF,
    COCUK_BILGI,
    COCUK_BELGE,
    ["HMK m.316", "HMK m.389"],
    undefined,
    seed[1] === 205 ? "ozel" : "basit",
  ),
);

const malDavalar = malSeeds.map((seed) =>
  seedToDava(
    seed,
    "mal-rejimi",
    MAL_REJIMI_YETKI,
    seed[1] === 211 ? MAKTU_HARC : NISPI_HARC,
    MAL_MASRAF,
    MAL_BILGI,
    MAL_BELGE,
    ["HMK m.107", "HMK m.316"],
  ),
);

const soybagiDavalar = soybagiSeeds.map((seed) =>
  seedToDava(
    seed,
    "soybagi-evlat-edinme",
    SOYBAGI_YETKI,
    MAKTU_HARC,
    COCUK_MASRAF,
    SOYBAGI_BILGI,
    SOYBAGI_BELGE,
    ["HMK m.316", "HMK m.384"],
    undefined,
    seed[1] === 216 ? "ozel" : "basit",
  ),
);

const digerDavalar = digerSeeds.map(
  ([id, maddeNo, ad, pratikNot, ozelKanunlar, harclar, yetkiliMahkeme, masraflar, yargilamaUsulu]) =>
    aileDavasi({
      id,
      maddeNo,
      ad,
      altKategori: "diger-aile",
      yetkiliMahkeme: yetkiliMahkeme ?? AILE_GENEL_YETKI,
      harclar,
      masraflar: masraflar ?? GENEL_MASRAF,
      arabuluculuk: ARABULUCULUK_YOK,
      pratikNot,
      hmkMaddeleri: ["HMK m.119", "HMK m.316"],
      ozelKanunlar,
      muvekkilBilgileri: DIGER_BILGI,
      gerekliBelgeler: DIGER_BELGE,
      yargilamaUsulu,
    }),
);

export const bolum04AileMahkemesi: DavaTuru[] = [
  ...bosanmaDavalar,
  ...nafakaDavalar,
  ...velayetDavalar,
  ...malDavalar,
  ...soybagiDavalar,
  ...digerDavalar,
];
