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
  yetkiliMahkeme: YetkiliMahkeme;
  harclar: HarcBilgisi;
  pratikNot: string;
  ozelKanunlar: string[];
}

type Seed = readonly [string, number, string, string, string[]];

const GOREV: GorevliMahkeme = {
  mahkeme: "Fikri ve Sinai Haklar Hukuk Mahkemesi",
  yasalDayanak: "5846 sy. K., 6769 sy. K.",
  aciklama: "Marka, patent, tasarim, telif ve baglantili fikri mulkiyet uyusmazliklari uzmanlasmis mahkemede gorulur.",
  ozelDurum: "Uzman mahkeme bulunmayan yerlerde belirlenen asliye hukuk veya asliye ticaret mahkemeleri gorev yapabilir.",
};

const YETKI: Record<string, YetkiliMahkeme> = {
  genel: {
    genelYetki: "Davalinin yerlesim yeri mahkemesi",
    ozelYetki: ["Ihlalin gerceklestigi yer", "Zararin dogdugu yer"],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, HMK m.16, 6769 sy. K.",
    aciklama: "Fikri mulkiyet ihlalinde failin merkezi ve ihlalin etkisini dogurdugu yer baglanti noktasi olabilir.",
  },
  turkpatent: {
    genelYetki: "Ankara Fikri ve Sinai Haklar Hukuk Mahkemesi",
    kesinYetkiMi: false,
    yasalDayanak: "6769 sy. K. ilgili hukumleri",
    aciklama: "TURKPATENT kararlarina karsi acilan iptal davalarinda Ankara baglantisi agirlik kazanir.",
  },
};

const MAKTU: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "maktu",
  aciklama: "Hukumsuzluk, iptal ve tespit taleplerinde maktu harc bilgisi esas alinmistir.",
};

const NISPI: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "nispi",
  nispiOran: NISPI_HARC_ORANI * 1000,
  pesinHarcOran: 0.25,
  aciklama: "Tazminat ve lisans bedeli niteligindeki taleplerde nispi harc bilgisi uygulanir.",
};

const MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  bilirkisiUcreti: BILIRKISI_UCRETI,
  toplamTahmini: 5200,
  aciklama: "Teknik uzmanlik, benzerlik incelemesi ve hesap bilirkisi ihtiyaci yaygindir.",
};

const ARABULUCULUK: ArabuluculukBilgisi = {
  davaSarti: false,
  ihtiyari: true,
  aciklama: "Fikri mulkiyet davalarinda genel dava sarti arabuluculuk bulunmaz; ihtiyari basvuru mumkundur.",
};

const VEKALET: OzelVekaletnameBilgisi = {
  gerekliMi: false,
  neden: "Genel dava vekaletnamesi kural olarak yeterlidir.",
  yasalDayanak: "HMK m.74",
};

const BILGI: MuvekkilBilgi[] = [
  { bilgi: "Hak sahibi veya lisans alan bilgileri", zorunlu: true },
  { bilgi: "Tescil numarasi veya eser bilgisi", zorunlu: false },
  { bilgi: "Ihlalin ne zaman ve nasil gerceklestigi", zorunlu: true },
];

const BELGE: GerekiliBelge[] = [
  { belge: "Tescil belgesi, basvuru evraki veya eser kaydi", zorunlu: false },
  { belge: "Ihlali gosteren numune, ekran goruntusu veya satis belgeleri", zorunlu: true },
  { belge: "Varsa noter tespiti veya uzman raporu", zorunlu: false },
];

function dava(config: Config): DavaTuru {
  return {
    kategori: "fikri-sinai",
    gorevliMahkeme: GOREV,
    masraflar: MASRAF,
    arabuluculuk: ARABULUCULUK,
    ozelVekaletname: VEKALET,
    muvekkilBilgileri: BILGI,
    gerekliBelgeler: BELGE,
    yargilamaUsulu: "yazili",
    hmkMaddeleri: ["HMK m.107", "HMK m.316", "HMK m.389"],
    ...config,
  };
}

function mapSeeds(
  seeds: Seed[],
  altKategori: string,
  yetki: YetkiliMahkeme,
  opts?: { maktuNos?: number[]; turkpatentNos?: number[] },
): DavaTuru[] {
  return seeds.map(([id, maddeNo, ad, pratikNot, ozelKanunlar]) =>
    dava({
      id,
      maddeNo,
      ad,
      altKategori,
      yetkiliMahkeme: opts?.turkpatentNos?.includes(maddeNo) ? YETKI.turkpatent : yetki,
      harclar: opts?.maktuNos?.includes(maddeNo) ? MAKTU : NISPI,
      pratikNot,
      ozelKanunlar,
    }),
  );
}

const markaSeeds: Seed[] = [
  ["marka-red-itiraz", 384, "Marka tescil basvurusunun reddi kararina itiraz", "Ayirt edicilik ve benzerlik analizi sinif bazinda kurulmalidir.", ["6769 sy. SMK"]],
  ["marka-hukumsuzluk", 385, "Marka hukumsuzlugu davasi", "Mutlak veya nispi ret sebebinin hangi tarihte dogdugu netlestirilmelidir.", ["6769 sy. SMK"]],
  ["marka-tecavuz-tespit-meni", 386, "Marka tecavuzunun tespiti, meni ve giderilmesi davasi", "Karistirilma ihtimali urun ve isaret karsilastirmasiyla ortaya konulmalidir.", ["6769 sy. SMK"]],
  ["marka-tecavuz-tazminat", 387, "Marka tecavuzu nedeniyle tazminat davasi", "Yoksun kalinan kazanc ve failin elde ettigi menfaat ayri ayri hesaplanmalidir.", ["6769 sy. SMK"]],
  ["turkpatent-yidk-iptal", 388, "TURKPATENT YIDK kararinin iptali davasi", "Idari dosya ve benzer markalar karar gerekcesiyle birlikte incelenmelidir.", ["6769 sy. SMK"]],
  ["marka-kullanmama-iptal", 389, "Markanin kullanilmamasi nedeniyle iptali davasi", "Kesintisiz kullanmama donemi ve ciddi kullanimin varligi somut delille test edilir.", ["6769 sy. SMK"]],
];

const patentSeeds: Seed[] = [
  ["patent-hukumsuzluk", 390, "Patent hukumsuzlugu davasi", "Yenilik ve bulus basamagi savunmasi teknik uzmanlik gerektirir.", ["6769 sy. SMK"]],
  ["patent-tecavuz-tespit-meni", 391, "Patent tecavuzunun tespiti ve meni davasi", "Koruma kapsami istemlerle sinirlidir; urun/proses karsilastirmasi dikkatle yapilmalidir.", ["6769 sy. SMK"]],
  ["patent-tecavuz-tazminat", 392, "Patent tecavuzu nedeniyle tazminat davasi", "Teknik tecavuz tespiti olmadan zarar hesabina gecilmemelidir.", ["6769 sy. SMK"]],
  ["faydali-model", 393, "Faydali model belgesine iliskin davalar", "Belge kapsami ve yenilik degerlendirmesi teknik raporla kurulmalidir.", ["6769 sy. SMK"]],
  ["zorunlu-lisans", 394, "Zorunlu lisans davalari", "Pazar ihtiyaci ve lisans verilmemesinin etkileri ayrintili gosterilmelidir.", ["6769 sy. SMK"]],
];

const tasarimSeeds: Seed[] = [
  ["endustriyel-tasarim-hukumsuzluk", 395, "Endustriyel tasarim hukumsuzlugu davasi", "Ayirt edicilik ve bilgilenmis kullanici algisi uzerinden analiz yapilmalidir.", ["6769 sy. SMK"]],
  ["tasarim-tecavuz", 396, "Tasarim tecavuzu davalari", "Genel izlenim ve urun benzerligi gorsel delillerle kurulmalidir.", ["6769 sy. SMK"]],
  ["telif-hakki-ihlali", 397, "Telif hakki (FSEK) ihlali davalari", "Eser niteligi ve yetkisiz kullanim olgusu ayrica ispatlanmalidir.", ["5846 sy. FSEK"]],
  ["eser-sahipligi-tespiti", 398, "Eser sahipliginin tespiti davasi", "Yaratici emek zinciri ve ilk olusturma delilleri kritik onemdedir.", ["5846 sy. FSEK"]],
  ["mali-hak-devri", 399, "Mali haklarin devrine iliskin uyusmazliklar", "Devir kapsami ve sure sinirlari sozlesme metniyle degerlendirilmelidir.", ["5846 sy. FSEK"]],
  ["internet-telif-ihlali", 400, "Internet ortaminda telif ihlali davalari", "URL, ekran kaydi ve erisim kayitlari hizla toplanmalidir.", ["5846 sy. FSEK", "5651 sy. K."]],
];

const digerSeeds: Seed[] = [
  ["ticaret-unvani-tecavuz", 401, "Ticaret unvani tecavuzu davalari", "Karistirilma ihtimali sicil ve piyasa kullanimi uzerinden olculmelidir.", ["TTK m.52-54"]],
  ["domain-name-uyusmazligi", 402, "Alan adi (domain name) uyusmazliklari", "Alan adi tahsisi, fiili kullanim ve markasal haklar birlikte degerlendirilmelidir.", ["6769 sy. SMK", "TTK m.54-63"]],
  ["haksiz-rekabet-fikri", 403, "Haksiz rekabet davalari (fikri mulkiyet boyutu)", "Pazar etkisi ve ayirt ediciligi zedeleyen kullanim somut delille gosterilmelidir.", ["TTK m.54-63"]],
];

export const bolum09FikriSinai: DavaTuru[] = [
  ...mapSeeds(markaSeeds, "marka-hukuku", YETKI.genel, { maktuNos: [384, 385, 386, 388, 389], turkpatentNos: [388] }),
  ...mapSeeds(patentSeeds, "patent-faydali-model", YETKI.genel, { maktuNos: [390, 391, 393, 394] }),
  ...mapSeeds(tasarimSeeds, "tasarim-telif", YETKI.genel, { maktuNos: [395, 396, 397, 398, 400] }),
  ...mapSeeds(digerSeeds, "ticaret-unvani-haksiz-rekabet", YETKI.genel, { maktuNos: [401, 402, 403] }),
];
