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
import { BASVURMA_HARCI, BILIRKISI_UCRETI, TEBLIGAT_MASRAFI } from "./harclar";

interface Config {
  id: string;
  maddeNo: number;
  ad: string;
  altKategori: string;
  gorevliMahkeme: GorevliMahkeme;
  yetkiliMahkeme: YetkiliMahkeme;
  pratikNot: string;
  ozelKanunlar: string[];
  muvekkilBilgileri: MuvekkilBilgi[];
  gerekliBelgeler: GerekiliBelge[];
  zamanasimi: ZamanasimiBilgisi;
}

type Seed = readonly [string, number, string, string, string[]];

const GOREV: Record<string, GorevliMahkeme> = {
  idare: {
    mahkeme: "Idare Mahkemesi",
    yasalDayanak: "2576 sy. K., 2577 sy. K.",
    aciklama: "Idari islem ve eylemlerden dogan iptal ve tam yargi davalari kural olarak idare mahkemesinde gorulur.",
  },
  vergi: {
    mahkeme: "Vergi Mahkemesi",
    yasalDayanak: "2576 sy. K., 2577 sy. K.",
    aciklama: "Vergi, resim, harc ve benzeri mali yukumluluklardan dogan davalar vergi mahkemesinde gorulur.",
  },
};

const YETKI: Record<string, YetkiliMahkeme> = {
  idare: {
    genelYetki: "Idari islemi yapan merciin bulundugu yer idare mahkemesi",
    ozelYetki: ["Islemin etkisini dogurdugu yer idare mahkemesi"],
    kesinYetkiMi: false,
    yasalDayanak: "2577 sy. K. m.32, m.36",
    aciklama: "Yetki, dava turune gore islemi yapan idare veya ifa yeri esas alinarak belirlenir.",
  },
  vergi: {
    genelYetki: "Tarh veya tahsil islemini yapan vergi dairesinin bulundugu yer vergi mahkemesi",
    kesinYetkiMi: false,
    yasalDayanak: "2577 sy. K. m.37",
    aciklama: "Vergi uyusmazliklarinda tarh ve tahsil merciisi ana baglanti noktasi olarak esas alinir.",
  },
};

const MAKTU: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "maktu",
  aciklama: "Idari yargi dosyalarinda maktu harc ve posta gideri esas alinmistir.",
};

const MASRAF: Record<string, MasrafBilgisi> = {
  idare: { tebligatMasrafi: TEBLIGAT_MASRAFI * 3, bilirkisiUcreti: BILIRKISI_UCRETI, toplamTahmini: 3600, aciklama: "Yurutmeyi durdurma, bilirkisi ve posta giderleri birlikte degerlendirilir." },
  vergi: { tebligatMasrafi: TEBLIGAT_MASRAFI * 3, bilirkisiUcreti: BILIRKISI_UCRETI, toplamTahmini: 3400, aciklama: "Tarhiyata esas belgeler ve uzman hesaplamasi on plana cikar." },
};

const ARABULUCULUK: ArabuluculukBilgisi = {
  davaSarti: false,
  ihtiyari: false,
  aciklama: "Idari ve vergi yargi sureclerinde arabuluculuk dava sarti uygulanmaz.",
};

const VEKALET: OzelVekaletnameBilgisi = {
  gerekliMi: false,
  neden: "Genel dava vekaletnamesi idari ve vergi yargi dosyalarinda yeterlidir.",
  yasalDayanak: "HMK m.74",
};

const BILGI: Record<string, MuvekkilBilgi[]> = {
  idare: [
    { bilgi: "Idari islemi tesis eden kurum", zorunlu: true },
    { bilgi: "Islemin tarih ve sayisi", zorunlu: true },
    { bilgi: "Talep edilen iptal veya tazminat sonucu", zorunlu: true },
  ],
  vergi: [
    { bilgi: "Vergi dairesi ve vergi turu", zorunlu: true },
    { bilgi: "Tarhiyat veya odeme emri bilgileri", zorunlu: true },
    { bilgi: "Uyusmazlik konusu matrah veya ceza kalemi", zorunlu: true },
  ],
};

const BELGE: Record<string, GerekiliBelge[]> = {
  idare: [
    { belge: "Dava konusu islem veya tebligat belgesi", zorunlu: true },
    { belge: "Idari basvuru ve cevap evraki", zorunlu: false },
    { belge: "Destekleyici teknik rapor ve resmi kayitlar", zorunlu: false },
  ],
  vergi: [
    { belge: "Ihbarname, odeme emri veya haciz evraki", zorunlu: true },
    { belge: "Vergi inceleme raporu veya tarhiyata esas cetveller", zorunlu: false },
    { belge: "Muhasebe kayitlari ve beyannameler", zorunlu: false },
  ],
};

const SURE: Record<string, ZamanasimiBilgisi> = {
  idare: { sure: "Genel olarak 60 gun", yasalDayanak: "2577 sy. K. m.7", aciklama: "Ozel kanunlarda daha kisa sureler olabilir.", baslangic: "Islemin yazili bildirim tarihi" },
  vergi: { sure: "Genel olarak 30 gun", yasalDayanak: "2577 sy. K. m.7", aciklama: "Vergi yargisinda ozel sureler islem turune gore degisebilir.", baslangic: "Ihbarname veya odeme emrinin teblig tarihi" },
};

function dava(config: Config): DavaTuru {
  return {
    kategori: "idari-yargi",
    harclar: MAKTU,
    masraflar: config.altKategori === "vergi-davalari" ? MASRAF.vergi : MASRAF.idare,
    arabuluculuk: ARABULUCULUK,
    ozelVekaletname: VEKALET,
    yargilamaUsulu: "ozel",
    hmkMaddeleri: [],
    ...config,
  };
}

function mapSeeds(seeds: Seed[], altKategori: string, key: "idare" | "vergi"): DavaTuru[] {
  return seeds.map(([id, maddeNo, ad, pratikNot, ozelKanunlar]) =>
    dava({
      id,
      maddeNo,
      ad,
      altKategori,
      gorevliMahkeme: GOREV[key],
      yetkiliMahkeme: YETKI[key],
      pratikNot,
      ozelKanunlar,
      muvekkilBilgileri: BILGI[key],
      gerekliBelgeler: BELGE[key],
      zamanasimi: SURE[key],
    }),
  );
}

const idareSeeds: Seed[] = [
  ["idari-islem-iptali", 359, "Idari islemin iptali davasi", "Dava suresi ve menfaat ihlali ilk asamada eksiksiz kurulmalidir.", ["2577 sy. K. m.2"]],
  ["tam-yargi", 360, "Tam yargi (tazminat) davasi", "Zarar ve idari eylem arasindaki illiyet somut veriyle ortaya konulmalidir.", ["2577 sy. K. m.2"]],
  ["imar-plani-iptali", 361, "Imar plani iptali davasi", "Plan notlari, ust olcek plan ve teknik rapor birlikte okunmalidir.", ["3194 sy. K.", "2577 sy. K."]],
  ["ruhsat-yikim-iptali", 362, "Yapi ruhsati/yikim karari iptali davasi", "Ruhsat kosullari ile yikim gerekcesi teknik verilerle test edilmelidir.", ["3194 sy. K."]],
  ["cevre-sehircilik", 363, "Cevre ve sehircilik uyusmazliklari davalari", "Cevresel etki ve planlama ilkeleri uzman raporuyla desteklenmelidir.", ["2872 sy. K.", "3194 sy. K."]],
  ["idari-para-cezasi", 364, "Idari para cezalarina itiraz davalari", "Ceza karar tutanagi ve teblig tarihi savunmanin temelidir.", ["Kabahatler K.", "2577 sy. K."]],
  ["ruhsat-iptali-verilmemesi", 365, "Ruhsat iptali/verilmemesi davalari", "Basvuru kosullari tam ise idarenin ret gerekcesi somut olarak sorgulanmalidir.", ["2577 sy. K."]],
  ["atama-nakil-gorevden-alma", 366, "Atama, nakil, gorevden alma islemlerine karsi davalar", "Kamu yarari ve hizmet gerekleri savunmasi somut olayla test edilir.", ["657 sy. K.", "2577 sy. K."]],
  ["disiplin-cezasi", 367, "Disiplin cezalarina itiraz davalari", "Savunma hakki ve usul kurallari dikkatle kontrol edilmelidir.", ["657 sy. K.", "2547 sy. K."]],
  ["encumen-karari-iptali", 368, "Belediye encumen kararlarinin iptali davalari", "Yetki, sekil ve sebep unsurlari belediye dosyasi uzerinden ayiklanmalidir.", ["5393 sy. K.", "2577 sy. K."]],
  ["pasaport-silah-ruhsati", 369, "Pasaport/silah ruhsati iptali davalari", "Guvenlik gerekcesi ile temel hak dengesi birlikte degerlendirilmelidir.", ["5682 sy. K.", "6136 sy. K."]],
  ["ogrenci-disiplin", 370, "Universite ogrenci disiplin kararlarina itiraz davalari", "Savunma hakki ve isnat edilen fiilin delil durumu net kurulmalidir.", ["2547 sy. K."]],
  ["saglik-kurulu-raporu", 371, "Saglik kurulu raporlarina itiraz davalari", "Celiskili raporlar varsa ust kurul veya adli tip ihtiyaci dogabilir.", ["3359 sy. K.", "2577 sy. K."]],
  ["khk-ihrac", 372, "KHK ile ihrac islemlerine karsi davalar", "Ozel basvuru yollarinin tuketilip tuketilmedigi ayri kontrol edilmelidir.", ["7075 sy. K.", "2577 sy. K."]],
  ["idari-sozlesme", 373, "Idari sozlesmelerden dogan davalar", "Sozlesmenin idari niteligi ile genel mahkeme alanina kayip kaymadigi ayiklanmalidir.", ["2577 sy. K.", "4734 sy. K."]],
];

const vergiSeeds: Seed[] = [
  ["vergi-tarhiyati-iptali", 374, "Vergi tarhiyatinin iptali davasi", "Tarhiyatin hukuki ve maddi dayanaklari tek tablo halinde test edilmelidir.", ["213 sy. VUK", "2577 sy. K."]],
  ["vergi-cezasi-iptali", 375, "Vergi cezalarinin iptali davasi", "Fiil, kusur ve usul hatalari ayrintili ayiklanmalidir.", ["213 sy. VUK"]],
  ["odeme-emrine-itiraz-vergi", 376, "Odeme emrine itiraz davalari", "Kesinlesme ve tahsil asamasi birbirine karistirilmamalidir.", ["6183 sy. K."]],
  ["haciz-islemine-karsi-vergi", 377, "Haciz islemlerine karsi dava", "Haczin dayagi kamu alacagi ve usul sartlari birlikte denetlenir.", ["6183 sy. K."]],
  ["vergi-hatasi-duzeltme", 378, "Vergi hatalarinin duzeltilmesi davalari", "Acik hesap veya vergilendirme hatasi resmi kayitlarla gosterilmelidir.", ["213 sy. VUK m.116 vd."]],
  ["uzlasma-uyusmazligi", 379, "Uzlasma surecine iliskin uyusmazliklar", "Uzlasma zabti ve uzlasma kosullari dosya temelidir.", ["213 sy. VUK uzlasma hukumleri"]],
  ["kdv-iade", 380, "Katma deger vergisi (KDV) iade davalari", "Iade kosullari ve islem zinciri belge bazinda desteklenmelidir.", ["3065 sy. KDVK"]],
  ["gelir-kurumlar-vergisi", 381, "Gelir/kurumlar vergisi uyusmazliklari", "Matrah ve gider kabul unsurlari muhasebe kayitlariyla test edilir.", ["193 sy. GVK", "5520 sy. KVK"]],
  ["emlak-vergisi-degeri", 382, "Emlak vergisi degerine itiraz davalari", "Rayic deger ve emsal karsilastirmasi belediye kayitlariyla kurulmalidir.", ["1319 sy. K."]],
  ["damga-vergisi", 383, "Damga vergisi uyusmazliklari", "Belgenin vergiyi doguran niteligi kazanip kazanmadigi tartisilmalidir.", ["488 sy. Damga Vergisi K."]],
];

export const bolum08IdariYargi: DavaTuru[] = [
  ...mapSeeds(idareSeeds, "idare-davalari", "idare"),
  ...mapSeeds(vergiSeeds, "vergi-davalari", "vergi"),
];
