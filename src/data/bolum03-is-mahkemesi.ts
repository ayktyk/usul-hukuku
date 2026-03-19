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
  IS_MAHKEMESI_ISCI_HARC_MUAF,
  NISPI_HARC_ORANI,
  SGK_HARC_MUAF,
  TANIK_UCRETI,
  TEBLIGAT_MASRAFI,
} from "./harclar";

interface IsConfig {
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
  ArabuluculukBilgisi,
];

const IS_GOREV: GorevliMahkeme = {
  mahkeme: "Is Mahkemesi",
  yasalDayanak: "7036 sy. K. m.5",
  aciklama:
    "Is iliskisinden ve is mahkemesine birakilan sosyal guvenlik uyusmazliklarindan dogan davalar bu mahkemede gorulur.",
};

const IS_YETKI: YetkiliMahkeme = {
  genelYetki: "Davalinin yerlesim yeri mahkemesi",
  ozelYetki: ["Isin yapildigi yer mahkemesi", "Isyerinin bulundugu yer mahkemesi"],
  kesinYetkiMi: false,
  yasalDayanak: "7036 sy. K. m.6, HMK m.6",
  aciklama:
    "Is davalarinda isin veya isyerinin bulundugu yer de yetki merkezi olarak kullanilabilir.",
};

const SGK_YETKI: YetkiliMahkeme = {
  genelYetki: "Davalinin yerlesim yeri mahkemesi",
  ozelYetki: [
    "Sigortalilik iliskisinin gectigi isyerinin bulundugu yer mahkemesi",
    "Islemi yapan sosyal guvenlik biriminin bulundugu yer mahkemesi",
  ],
  kesinYetkiMi: false,
  yasalDayanak: "7036 sy. K. m.6, HMK m.6",
  aciklama:
    "Sosyal guvenlik dosyalarinda kurum islemi ile isyeri arasindaki baglanti birlikte degerlendirilir.",
};

const ISCI_NISPI_HARC: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "nispi",
  nispiOran: NISPI_HARC_ORANI * 1000,
  pesinHarcOran: 0.25,
  aciklama: "Parasal iscilik taleplerinde nispi harc rejimi uygulanir.",
  muafiyet: IS_MAHKEMESI_ISCI_HARC_MUAF
    ? "Davaci iscinin harctan muaf oldugu haller ayrica kontrol edilmelidir."
    : undefined,
};

const ISCI_MAKTU_HARC: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "maktu",
  aciklama: "Tespit ve ise iade niteligindeki dosyalarda maktu harc bilgisi esas alinmistir.",
  muafiyet: IS_MAHKEMESI_ISCI_HARC_MUAF
    ? "Davaci iscinin harctan muaf oldugu haller ayrica kontrol edilmelidir."
    : undefined,
};

const SGK_MAKTU_HARC: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "maktu",
  aciklama: "Kurum islemi iptali ve tespit davalarinda maktu harc bilgisi esas alinmistir.",
  muafiyet: SGK_HARC_MUAF
    ? "Kanuni muafiyet ve istisnalar dava tipine gore ayrica kontrol edilmelidir."
    : undefined,
};

const ALACAK_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  bilirkisiUcreti: BILIRKISI_UCRETI,
  tanikUcreti: TANIK_UCRETI * 3,
  toplamTahmini: 4600,
  aciklama: "Bordro, puantaj ve hesap bilirkiyisi incelemesi bu dosyalarda sik gorulur.",
};

const ISE_IADE_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  tanikUcreti: TANIK_UCRETI * 3,
  toplamTahmini: 2100,
  aciklama: "Yazili fesih belgeleri ve tanik anlatimlari belirleyicidir.",
};

const KAZA_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 4,
  bilirkisiUcreti: BILIRKISI_UCRETI,
  tanikUcreti: TANIK_UCRETI * 4,
  toplamTahmini: 6400,
  aciklama: "Kusur ve aktuarya bilirkiyisi incelemesi neredeyse standarttir.",
};

const SGK_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  bilirkisiUcreti: BILIRKISI_UCRETI,
  toplamTahmini: 3900,
  aciklama: "Kurum kayitlari ve hizmet belgeleri odakli inceleme yapilir.",
};

const DIGER_MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  bilirkisiUcreti: BILIRKISI_UCRETI,
  tanikUcreti: TANIK_UCRETI * 2,
  toplamTahmini: 4300,
  aciklama: "Uyusmazligin niteligine gore hesap veya organizasyon incelemesi gerekebilir.",
};

const ISCI_ARABULUCULUK: ArabuluculukBilgisi = {
  davaSarti: true,
  ihtiyari: false,
  yasalDayanak: "7036 sy. K. m.3",
  aciklama:
    "Isci-isveren alacak ve tazminat taleplerinde dava oncesi arabuluculuk zorunludur.",
};

const KAZA_ARABULUCULUK_YOK: ArabuluculukBilgisi = {
  davaSarti: false,
  ihtiyari: true,
  yasalDayanak: "7036 sy. K. m.3",
  aciklama:
    "Is kazasi ve meslek hastaligindan dogan maddi-manevi tazminat davalari dava sarti arabuluculuga tabi degildir.",
};

const SGK_ARABULUCULUK_YOK: ArabuluculukBilgisi = {
  davaSarti: false,
  ihtiyari: true,
  aciklama: "Sosyal guvenlik tespit ve kurum islemi iptal davalarinda zorunlu arabuluculuk yoktur.",
};

const DIGER_ARABULUCULUK: ArabuluculukBilgisi = {
  davaSarti: false,
  ihtiyari: true,
  aciklama: "Bu grupta zorunluluk, talebin para alacagi niteligine gore degisebilir.",
};

const VEKALET: OzelVekaletnameBilgisi = {
  gerekliMi: false,
  neden: "Genel dava vekaletnamesi is davalari icin kural olarak yeterlidir.",
  yasalDayanak: "HMK m.74",
};

const ALACAK_BILGI: MuvekkilBilgi[] = [
  { bilgi: "Isveren ve isyeri bilgileri", zorunlu: true },
  { bilgi: "Ise giris-cikis tarihleri ve gorev unvani", zorunlu: true },
  { bilgi: "Ucret, ek odemeler ve calisma duzeni", zorunlu: true },
];

const ALACAK_BELGE: GerekiliBelge[] = [
  { belge: "Is sozlesmesi veya ise giris evraki", zorunlu: false, nereden: "Muvekkil / Isveren" },
  { belge: "Bordro, puantaj ve banka kayitlari", zorunlu: false, nereden: "Banka / Isveren" },
  { belge: "Arabuluculuk son tutanagi", zorunlu: true, nereden: "Arabuluculuk dosyasi" },
];

const ISE_IADE_BILGI: MuvekkilBilgi[] = [
  { bilgi: "Fesih tarihi ve bildirimin icerigi", zorunlu: true },
  { bilgi: "Kidem ve isyerindeki calisan sayisi", zorunlu: true },
  { bilgi: "Feshe karsi itiraz sebepleri", zorunlu: true },
];

const ISE_IADE_BELGE: GerekiliBelge[] = [
  { belge: "Fesih bildirimi", zorunlu: true, nereden: "Isveren / Muvekkil" },
  { belge: "SGK hizmet dokumu", zorunlu: true, nereden: "e-Devlet" },
  { belge: "Arabuluculuk son tutanagi", zorunlu: true, nereden: "Arabuluculuk dosyasi" },
];

const KAZA_BILGI: MuvekkilBilgi[] = [
  { bilgi: "Kaza veya hastalik tarihcesi", zorunlu: true },
  { bilgi: "Calisma kosullari ve gorev tanimi", zorunlu: true },
  { bilgi: "Tedavi sureci ve maluliyet bilgileri", zorunlu: true },
];

const KAZA_BELGE: GerekiliBelge[] = [
  { belge: "Is kazasi tutanagi veya SGK kaydi", zorunlu: true, nereden: "Isveren / SGK" },
  { belge: "Saglik raporlari ve epikrizler", zorunlu: true, nereden: "Hastane" },
  { belge: "Tanik listesi ve varsa kamera kayitlari", zorunlu: false },
];

const SGK_BILGI: MuvekkilBilgi[] = [
  { bilgi: "Sigortalilik sureleri ve hizmet gecmisi", zorunlu: true },
  { bilgi: "Kurum islemi veya ret yazisinin tarihi", zorunlu: true },
  { bilgi: "Prim ve kazanc verileri", zorunlu: false },
];

const SGK_BELGE: GerekiliBelge[] = [
  { belge: "SGK hizmet dokumu", zorunlu: true, nereden: "e-Devlet / SGK" },
  { belge: "Kurum cevabi veya ret yazisi", zorunlu: true, nereden: "SGK" },
  { belge: "Bordro ve bildirgeler", zorunlu: false, nereden: "Isveren / SGK" },
];

const DIGER_BILGI: MuvekkilBilgi[] = [
  { bilgi: "Taraflar arasindaki is iliskisinin niteligini gosteren bilgiler", zorunlu: true },
  { bilgi: "Uyusmazliga yol acan olaylarin kronolojisi", zorunlu: true },
  { bilgi: "Talep edilen sonuc", zorunlu: true },
];

const DIGER_BELGE: GerekiliBelge[] = [
  { belge: "Sozlesme ve ekler", zorunlu: false, nereden: "Muvekkil / Isveren" },
  { belge: "Ihtarname, e-posta ve ic yazismalar", zorunlu: false },
  { belge: "Arabuluculuk son tutanagi", zorunlu: false, nereden: "Arabuluculuk dosyasi" },
];

function isDavasi(config: IsConfig): DavaTuru {
  return {
    kategori: "is-mahkemesi",
    gorevliMahkeme: IS_GOREV,
    ozelVekaletname: config.ozelVekaletname ?? VEKALET,
    yargilamaUsulu: "basit",
    muvekkilBilgileri: config.muvekkilBilgileri ?? [],
    gerekliBelgeler: config.gerekliBelgeler ?? [],
    ...config,
  };
}

const iscilikAlacagiSeeds: Seed[] = [
  ["kidem-tazminati", 138, "Kidem tazminati davasi", "Son giydirilmis brut ucret ve fesih nedeni netlestirilmelidir.", ["1475 sy. K. m.14", "7036 sy. K. m.3"]],
  ["ihbar-tazminati", 139, "Ihbar tazminati davasi", "Bildirim surelerine uyulup uyulmadigi ayrintili kurulmalidir.", ["4857 sy. K. m.17", "7036 sy. K. m.3"]],
  ["ucret-alacagi", 140, "Ucret (maas) alacagi davasi", "Banka odemeleri ile bordrolar arasindaki uyumsuzluklar odak noktasi olmali.", ["4857 sy. K. m.32", "7036 sy. K. m.3"]],
  ["fazla-calisma-ucreti", 141, "Fazla calisma (mesai) ucreti davasi", "Fiili calisma duzeni puantaj yoksa tanikla desteklenmelidir.", ["4857 sy. K. m.41", "7036 sy. K. m.3"]],
  ["yillik-izin-alacagi", 142, "Yillik ucretli izin alacagi davasi", "Kullanilmayan izinler fesih tarihi esas alinarak hesaplanir.", ["4857 sy. K. m.53-59", "7036 sy. K. m.3"]],
  ["hafta-tatili-ucreti", 143, "Hafta tatili ucreti davasi", "Hafta tatilinde kesintisiz calisma duzeni somut delille gosterilmelidir.", ["4857 sy. K. m.46", "7036 sy. K. m.3"]],
  ["ubgt-ucreti", 144, "Ulusal bayram ve genel tatil ucreti davasi", "Resmi tatil calismasi vardiya kayitlari ve taniklarla desteklenmelidir.", ["4857 sy. K. m.47", "7036 sy. K. m.3"]],
  ["agi-alacagi", 145, "Asgari gecim indirimi (AGI) alacagi davasi", "Ihtilafli donemin AGI uygulamasina tabi oldugu once ayrilmalidir.", ["193 sy. GVK m.32", "7036 sy. K. m.3"]],
  ["ikramiye-prim-alacagi", 146, "Ikramiye/prim alacagi davasi", "Prim sisteminin yazili politika ve fiili odemeyle ispatlanmasi gerekir.", ["4857 sy. K. m.32", "TBK m.407", "7036 sy. K. m.3"]],
  ["yol-yemek-parasi-alacagi", 147, "Yol/yemek parasi alacagi davasi", "Yan haklarin nakdi mi ayni mi saglandigi aciklastirilmalidir.", ["4857 sy. K. m.32", "7036 sy. K. m.3"]],
  ["bakiye-sure-ucreti", 148, "Bakiye sure ucreti davasi", "Belirli sureli sozlesmenin kalan suresi ve fesih nedeni birlikte incelenir.", ["TBK m.438", "7036 sy. K. m.3"]],
  ["ucret-farki-davasi", 149, "Ucret farki davasi (dusuk gosterilmis ucret)", "Gercek ucret emsal ucret ve banka kayitlariyla kurulmalidir.", ["4857 sy. K. m.32", "5510 sy. K. m.80", "7036 sy. K. m.3"]],
];

const isGuvencesiSeeds: Array<Seed | SeedWithTime> = [
  ["ise-iade", 150, "Ise iade davasi", "Arabuluculuk son tutanagindan sonra iki haftalik dava suresi kacirilmamalidir.", ["4857 sy. K. m.20-21", "7036 sy. K. m.3"], { sure: "2 hafta", yasalDayanak: "7036 sy. K. m.3", aciklama: "Son tutanagin duzenlenmesinden itibaren hesaplanir." }],
  ["feshin-gecersizliginin-tespiti", 151, "Feshin gecersizliginin tespiti davasi", "Fesih gerekcesinin somut ve ispatlanabilir olup olmadigi belirleyicidir.", ["4857 sy. K. m.18-20", "7036 sy. K. m.3"]],
  ["ise-baslatmama-tazminati", 152, "Ise baslatmama tazminati davasi", "Kesinlesen ise iade karari sonrasi basvuru ve baslatmama olgusu birlikte aranir.", ["4857 sy. K. m.21", "7036 sy. K. m.3"]],
  ["bosta-gecen-sure-ucreti", 153, "Bosta gecen sure ucreti davasi", "En cok dort aylik ucret ve yan hak kapsami netlestirilmelidir.", ["4857 sy. K. m.21", "7036 sy. K. m.3"]],
  ["kotuniyet-tazminati", 154, "Kotuniyet tazminati davasi", "Fesihte kotuniyet gosteren sebep zinciri delillendirilmelidir.", ["4857 sy. K. m.17/6", "7036 sy. K. m.3"]],
  ["sendikal-tazminat", 155, "Sendikal tazminat davasi", "Sendikal neden ile fesih veya ayrimcilik arasindaki illiyet kurulmalidir.", ["6356 sy. K. m.25", "7036 sy. K. m.3"]],
];

const isKazasiSeeds: Seed[] = [
  ["is-kazasi-maddi-tazminat", 156, "Is kazasi nedeniyle maddi tazminat davasi", "Kusur, maluliyet ve gelir verileri ayni hesap cetvelinde toplanmalidir.", ["5510 sy. K. m.13", "TBK m.49", "TBK m.54"]],
  ["is-kazasi-manevi-tazminat", 157, "Is kazasi nedeniyle manevi tazminat davasi", "Agir bedensel zarar ve olay kosullari manevi tazminat miktarini etkiler.", ["5510 sy. K. m.13", "TBK m.56"]],
  ["meslek-hastaligi-tazminat", 158, "Meslek hastaligi nedeniyle tazminat davasi", "Maruziyet suresi ile saglik kurulu raporlari arasindaki bag kurulmalidir.", ["5510 sy. K. m.14", "TBK m.49", "TBK m.54"]],
  ["destekten-yoksun-kalma-is-kazasi", 159, "Destekten yoksun kalma tazminati davasi (is kazasi)", "Destek iliskisi ve bakiye omur varsayimlari hesap temelidir.", ["TBK m.53", "5510 sy. K. m.13"]],
  ["is-goremezlik-tazminati", 160, "Surekli/gecici is goremezlik tazminati davasi", "Maluliyet raporu ile fiili kazanc kaybi birlikte okunmalidir.", ["TBK m.54", "5510 sy. K. m.19"]],
  ["sgk-rucu-isverene", 161, "SGK rucu davasi (isverene rucu)", "Rucu edilebilir kisim kusur ve kacinilmazlik ilkeleriyle sinirlanir.", ["5510 sy. K. m.21"]],
  ["is-kazasinin-tespiti", 162, "Is kazasinin tespiti davasi", "Olayin is ile baglantisi tarih, yer ve gorev uzerinden kurulmalidir.", ["5510 sy. K. m.13", "7036 sy. K. m.4"]],
];

const sosyalGuvenlikSeeds: Array<Seed | SeedWithTime> = [
  ["hizmet-tespit", 163, "Hizmet tespit davasi (sigortasiz calisma tespiti)", "Bes yillik hak dusurucu sure ve ayni donemi bilen taniklar kritiktir.", ["5510 sy. K. m.86/9"], { sure: "5 yil", yasalDayanak: "5510 sy. K. m.86/9", aciklama: "Hizmetin gectigi yil sonundan itibaren hesaplanir." }],
  ["ise-giris-tarihinin-tespiti", 164, "Ise giris tarihinin tespiti davasi", "Fiili baslangic tarihi ile bildirilen tarih arasindaki fark delillendirilmelidir.", ["5510 sy. K. m.86", "7036 sy. K. m.4"]],
  ["prime-esas-kazancin-tespiti", 165, "Prime esas kazancin tespiti davasi", "Gercek ucret banka kayitlari ve emsal ucretle desteklenmelidir.", ["5510 sy. K. m.80", "5510 sy. K. m.86"]],
  ["sgk-isleminin-iptali", 166, "Kurum isleminin (SGK karari) iptali davasi", "Idari basvuru ve kurum cevabinin kapsami once ayiklanmalidir.", ["5510 sy. K. m.101"]],
  ["aylik-baglama-islemine-itiraz", 167, "Aylik baglama islemine itiraz davasi", "Gun, kazanc ve katsayi verileri kurum cetveliyle karsilastirilmalidir.", ["5510 sy. K. m.96", "5510 sy. K. m.101"]],
  ["malulluk-ayligi-baglanmasi", 168, "Malulluk ayligi baglanmasi davasi", "Calisma gucu kaybi orani ve sigortalilik kosullari birlikte saglanmalidir.", ["5510 sy. K. m.25-27"]],
  ["yaslilik-ayligi-uyusmazligi", 169, "Yaslilik (emeklilik) ayligi uyusmazliklari", "Yas, gun ve baslangic tarihi kesisimi dogru kurulmalidir.", ["5510 sy. K. m.28-30"]],
  ["is-goremezlik-oranina-itiraz", 170, "Is goremezlik oranina itiraz davasi", "Celiskili raporlarda ust kurul veya adli tip incelemesi gerekebilir.", ["5510 sy. K. m.95"]],
  ["rucuan-tazminat-sgk", 171, "Rucuan tazminat davasi", "Kurum odemesinin hangi kisimlarinin rucu edilecegi hesapla belirlenir.", ["5510 sy. K. m.21", "5510 sy. K. m.23"]],
  ["istege-bagli-sigortalilik", 172, "Istege bagli sigortaliliga iliskin davalar", "Prim odeme durumu ve kesilme sebepleri kurum kayitlariyla teyit edilmelidir.", ["5510 sy. K. m.50-52"]],
];

const digerIsSeeds: DigerSeed[] = [
  ["hakli-fesih-tespiti", 173, "Is sozlesmesinin hakli nedenle feshi tespiti davasi", "Hakli neden olusturan olaylarin zaman cizelgesi eksiksiz kurulmalidir.", ["4857 sy. K. m.24-25"], ISCI_MAKTU_HARC, DIGER_ARABULUCULUK],
  ["rekabet-yasagi-sozlesmesi-aykirilik", 174, "Rekabet yasagi sozlesmesine aykirilik davalari", "Yasagin yer, sure ve konu bakimindan makullugu denetlenir.", ["TBK m.444-447"], ISCI_NISPI_HARC, ISCI_ARABULUCULUK],
  ["esit-davranma-borcuna-aykirilik", 175, "Isverenin esit davranma borcuna aykirilik tazminati davasi", "Emsal iscilerle farkli uygulamanin objektif nedeni sorgulanir.", ["4857 sy. K. m.5", "7036 sy. K. m.3"], ISCI_NISPI_HARC, ISCI_ARABULUCULUK],
  ["mobbing-tazminati", 176, "Mobbing (psikolojik taciz) nedeniyle tazminat davasi", "Sureklilik arz eden davranis zinciri yazisma ve tanikla kurulmalidir.", ["TBK m.417", "TBK m.58", "7036 sy. K. m.3"], ISCI_NISPI_HARC, ISCI_ARABULUCULUK],
  ["isyeri-devri-iscilik-alacaklari", 177, "Isyeri devri halinde iscilik alacaklari davalari", "Devreden ve devralanin sorumluluk donemleri ayrilmalidir.", ["4857 sy. K. m.6", "7036 sy. K. m.3"], ISCI_NISPI_HARC, ISCI_ARABULUCULUK],
  ["toplu-isci-cikarma-usulsuzlugu", 178, "Toplu isci cikarma usulsuzlugu davalari", "Bildirim yukumlulukleri ile esik sayilar dikkatle kontrol edilmelidir.", ["4857 sy. K. m.29"], ISCI_MAKTU_HARC, DIGER_ARABULUCULUK],
  ["alt-isveren-iliskisi-davalari", 179, "Alt isveren (taseron) iliskisinden dogan davalar", "Muvazaa tartismasi fiili organizasyon verileriyle test edilir.", ["4857 sy. K. m.2", "7036 sy. K. m.3"], ISCI_NISPI_HARC, ISCI_ARABULUCULUK],
  ["gecici-is-iliskisi-davalari", 180, "Gecici (odunc) is iliskisinden dogan davalar", "Odunc veren ile fiili calistiranin sorumluluk dagilimi ayiklanmalidir.", ["4857 sy. K. m.7", "7036 sy. K. m.3"], ISCI_NISPI_HARC, ISCI_ARABULUCULUK],
];

function seedToDava(
  seed: Seed,
  altKategori: string,
  yetkiliMahkeme: YetkiliMahkeme,
  harclar: HarcBilgisi,
  masraflar: MasrafBilgisi,
  arabuluculuk: ArabuluculukBilgisi,
  muvekkilBilgileri: MuvekkilBilgi[],
  gerekliBelgeler: GerekiliBelge[],
  hmkMaddeleri: string[],
): DavaTuru {
  const [id, maddeNo, ad, pratikNot, ozelKanunlar] = seed;
  return isDavasi({
    id,
    maddeNo,
    ad,
    altKategori,
    yetkiliMahkeme,
    harclar,
    masraflar,
    arabuluculuk,
    pratikNot,
    hmkMaddeleri,
    ozelKanunlar,
    muvekkilBilgileri,
    gerekliBelgeler,
  });
}

function seedToTimedDava(
  seed: SeedWithTime,
  altKategori: string,
  yetkiliMahkeme: YetkiliMahkeme,
  harclar: HarcBilgisi,
  masraflar: MasrafBilgisi,
  arabuluculuk: ArabuluculukBilgisi,
  muvekkilBilgileri: MuvekkilBilgi[],
  gerekliBelgeler: GerekiliBelge[],
  hmkMaddeleri: string[],
): DavaTuru {
  const [id, maddeNo, ad, pratikNot, ozelKanunlar, zamanasimi] = seed;
  return isDavasi({
    id,
    maddeNo,
    ad,
    altKategori,
    yetkiliMahkeme,
    harclar,
    masraflar,
    arabuluculuk,
    pratikNot,
    hmkMaddeleri,
    ozelKanunlar,
    muvekkilBilgileri,
    gerekliBelgeler,
    zamanasimi,
  });
}

const iscilikAlacagiDavalar = iscilikAlacagiSeeds.map((seed) =>
  seedToDava(seed, "iscilik-alacaklari", IS_YETKI, ISCI_NISPI_HARC, ALACAK_MASRAF, ISCI_ARABULUCULUK, ALACAK_BILGI, ALACAK_BELGE, ["HMK m.107", "HMK m.316"]),
);

const isGuvencesiDavalar = isGuvencesiSeeds.map((seed) =>
  seed.length === 6
    ? seedToTimedDava(seed as SeedWithTime, "is-guvencesi", IS_YETKI, ISCI_MAKTU_HARC, ISE_IADE_MASRAF, ISCI_ARABULUCULUK, ISE_IADE_BILGI, ISE_IADE_BELGE, ["HMK m.109", "HMK m.316"])
    : seedToDava(seed as Seed, "is-guvencesi", IS_YETKI, ISCI_MAKTU_HARC, ISE_IADE_MASRAF, ISCI_ARABULUCULUK, ISE_IADE_BILGI, ISE_IADE_BELGE, ["HMK m.109", "HMK m.316"]),
);

const isKazasiDavalar = isKazasiSeeds.map((seed) =>
  seedToDava(
    seed,
    "is-kazasi",
    IS_YETKI,
    seed[1] === 162 ? ISCI_MAKTU_HARC : ISCI_NISPI_HARC,
    KAZA_MASRAF,
    KAZA_ARABULUCULUK_YOK,
    KAZA_BILGI,
    KAZA_BELGE,
    ["HMK m.107", "HMK m.316"],
  ),
);

const sosyalGuvenlikDavalar = sosyalGuvenlikSeeds.map((seed) =>
  seed.length === 6
    ? seedToTimedDava(
        seed as SeedWithTime,
        "sosyal-guvenlik",
        SGK_YETKI,
        (seed as SeedWithTime)[1] === 171 ? ISCI_NISPI_HARC : SGK_MAKTU_HARC,
        SGK_MASRAF,
        SGK_ARABULUCULUK_YOK,
        SGK_BILGI,
        SGK_BELGE,
        ["HMK m.106", "HMK m.316"],
      )
    : seedToDava(
        seed as Seed,
        "sosyal-guvenlik",
        SGK_YETKI,
        (seed as Seed)[1] === 171 ? ISCI_NISPI_HARC : SGK_MAKTU_HARC,
        SGK_MASRAF,
        SGK_ARABULUCULUK_YOK,
        SGK_BILGI,
        SGK_BELGE,
        ["HMK m.106", "HMK m.316"],
      ),
);

const digerIsDavalar = digerIsSeeds.map(
  ([id, maddeNo, ad, pratikNot, ozelKanunlar, harclar, arabuluculuk]) =>
    isDavasi({
      id,
      maddeNo,
      ad,
      altKategori: "diger-is-davalari",
      yetkiliMahkeme: IS_YETKI,
      harclar,
      masraflar: DIGER_MASRAF,
      arabuluculuk,
      pratikNot,
      hmkMaddeleri: ["HMK m.107", "HMK m.316"],
      ozelKanunlar,
      muvekkilBilgileri: DIGER_BILGI,
      gerekliBelgeler: DIGER_BELGE,
    }),
);

export const bolum03IsMahkemesi: DavaTuru[] = [
  ...iscilikAlacagiDavalar,
  ...isGuvencesiDavalar,
  ...isKazasiDavalar,
  ...sosyalGuvenlikDavalar,
  ...digerIsDavalar,
];
