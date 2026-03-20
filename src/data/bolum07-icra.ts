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
import { BASVURMA_HARCI, BILIRKISI_UCRETI, TEBLIGAT_MASRAFI } from "./harclar";

interface Config {
  id: string;
  maddeNo: number;
  ad: string;
  altKategori: string;
  gorevliMahkeme: GorevliMahkeme;
  yetkiliMahkeme: YetkiliMahkeme;
  masraflar: MasrafBilgisi;
  pratikNot: string;
  ozelKanunlar: string[];
  muvekkilBilgileri: MuvekkilBilgi[];
  gerekliBelgeler: GerekiliBelge[];
}

type Seed = readonly [string, number, string, string, string[]];

const GOREV: Record<string, GorevliMahkeme> = {
  takip: {
    mahkeme: "Icra Dairesi",
    yasalDayanak: "IIK ilgili takip hukumleri",
    aciklama: "Ilamli ve ilamsiz takip yollarinin baslangic mercii icra dairesidir.",
  },
  mahkeme: {
    mahkeme: "Icra Mahkemesi",
    yasalDayanak: "IIK m.4",
    aciklama: "Icra dairesi islemlerine karsi sikayet ve icra hukukuna ozgu itirazlar icra mahkemesinde gorulur.",
  },
  ceza: {
    mahkeme: "Icra Ceza Mahkemesi",
    yasalDayanak: "IIK icra ceza hukumleri",
    aciklama: "Icra iflas hukukundan dogan ceza niteligindeki surecler icra ceza mahkemesinde yurur.",
  },
};

const YETKI: Record<string, YetkiliMahkeme> = {
  takip: {
    genelYetki: "Borclunun yerlesim yeri icra dairesi",
    ozelYetki: ["Sozlesmenin ifa yeri", "Rehnin veya tasinmazin bulundugu yer"],
    kesinYetkiMi: false,
    yasalDayanak: "IIK ilgili takip hukumleri, HMK m.6, HMK m.10",
    aciklama: "Takip turune gore odeme yeri ve malvarligi baglantisi da yetki dogurabilir.",
  },
  mahkeme: {
    genelYetki: "Takibin yapildigi yer icra mahkemesi",
    kesinYetkiMi: false,
    yasalDayanak: "IIK m.4",
    aciklama: "Icra mahkemesine yoneltilen basvurular kural olarak takibin bulundugu yerde gorulur.",
  },
};

const MAKTU: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "maktu",
  aciklama: "Icra hukukuna ozgu sikayet ve itirazlarda maktu harc bilgisi esas alinmistir.",
};

const MASRAF: Record<string, MasrafBilgisi> = {
  takip: { tebligatMasrafi: TEBLIGAT_MASRAFI * 3, toplamTahmini: 1500, aciklama: "Takip acilisinda tebligat ve posta giderleri temel kalemdir." },
  mahkeme: { tebligatMasrafi: TEBLIGAT_MASRAFI * 3, bilirkisiUcreti: BILIRKISI_UCRETI, toplamTahmini: 4200, aciklama: "Istihkak, ihale feshi ve kiymet takdiri gibi dosyalarda uzman incelemesi gerekebilir." },
  ceza: { tebligatMasrafi: TEBLIGAT_MASRAFI * 2, toplamTahmini: 1200, aciklama: "Ceza niteligindeki sureclerde temel gider tebligat ve durusma davetleridir." },
};

const ARABULUCULUK: ArabuluculukBilgisi = {
  davaSarti: false,
  ihtiyari: false,
  aciklama: "Icra ve icra ceza sureclerinde arabuluculuk dava sarti olarak uygulanmaz.",
};

const VEKALET: OzelVekaletnameBilgisi = {
  gerekliMi: false,
  neden: "Genel takip ve dava vekaletnamesi kural olarak yeterlidir.",
  yasalDayanak: "HMK m.74",
};

const BILGI: Record<string, MuvekkilBilgi[]> = {
  takip: [
    { bilgi: "Alacakli ve borclu kimlik/unvan bilgileri", zorunlu: true },
    { bilgi: "Takip konusu alacagin dayanagi", zorunlu: true },
    { bilgi: "Talep edilen ana para ve feriler", zorunlu: true },
  ],
  mahkeme: [
    { bilgi: "Takip dosya numarasi", zorunlu: true },
    { bilgi: "Itiraz veya sikayetin dayandigi olay", zorunlu: true },
    { bilgi: "Talep edilen sonuc", zorunlu: true },
  ],
  ceza: [
    { bilgi: "Takip ve karar tarihleri", zorunlu: true },
    { bilgi: "Ihlal edilen yukumluluk veya taahhut", zorunlu: true },
    { bilgi: "Teblig ve ogrenme kronolojisi", zorunlu: true },
  ],
};

const BELGE: Record<string, GerekiliBelge[]> = {
  takip: [
    { belge: "Senet, ilam veya sozlesme", zorunlu: false },
    { belge: "Borc hesap cetveli", zorunlu: false },
    { belge: "Adres ve kimlik bilgileri", zorunlu: true },
  ],
  mahkeme: [
    { belge: "Icra dosyasi evraki", zorunlu: true, nereden: "Icra Dairesi / UYAP" },
    { belge: "Tebligat mazbatalari", zorunlu: false },
    { belge: "Delil niteligindeki ek belge ve tutanaklar", zorunlu: false },
  ],
  ceza: [
    { belge: "Icra dosyasi evraki", zorunlu: true, nereden: "Icra Dairesi / UYAP" },
    { belge: "Taahhut tutanagi veya nafaka ilami", zorunlu: false },
    { belge: "Tebligat belgeleri", zorunlu: true },
  ],
};

function dava(config: Config): DavaTuru {
  return {
    kategori: "icra-mahkemesi",
    harclar: MAKTU,
    arabuluculuk: ARABULUCULUK,
    ozelVekaletname: VEKALET,
    yargilamaUsulu: "ozel",
    hmkMaddeleri: ["HMK m.316"],
    ...config,
  };
}

function mapSeeds(
  seeds: Seed[],
  altKategori: string,
  gorevKey: keyof typeof GOREV,
  bilgiKey: keyof typeof BILGI,
  masrafKey: keyof typeof MASRAF,
): DavaTuru[] {
  return seeds.map(([id, maddeNo, ad, pratikNot, ozelKanunlar]) =>
    dava({
      id,
      maddeNo,
      ad,
      altKategori,
      gorevliMahkeme: GOREV[gorevKey],
      yetkiliMahkeme: gorevKey === "takip" ? YETKI.takip : YETKI.mahkeme,
      masraflar: MASRAF[masrafKey],
      pratikNot,
      ozelKanunlar,
      muvekkilBilgileri: BILGI[bilgiKey],
      gerekliBelgeler: BELGE[bilgiKey],
    }),
  );
}

const takipSeeds: Seed[] = [
  ["ilamsiz-icra-genel-haciz", 334, "Ilamsiz icra takibi (genel haciz yolu)", "Alacak kalemleri ve faiz baslangici takip talebinde acik yazilmalidir.", ["IIK m.42 vd."]],
  ["kambiyo-haciz-takibi", 335, "Kambiyo senetlerine mahsus haciz yoluyla takip", "Senedin kambiyo vasfi ve ibraz/protesto kosullari once denetlenmelidir.", ["IIK m.167 vd."]],
  ["ilamli-icra", 336, "Ilamli icra takibi", "Kesinlesme gerekip gerekmedigi ilam turune gore ayiklanmalidir.", ["IIK m.32 vd."]],
  ["ipotek-paraya-cevirme", 337, "Ipotegin paraya cevrilmesi yoluyla takip", "Ipotek kaydi, limit ve muacceliyet kosullari birlikte incelenmelidir.", ["IIK m.149 vd."]],
  ["rehnin-paraya-cevrilmesi", 338, "Rehnin paraya cevrilmesi yoluyla takip", "Rehinli mal, borc ve temerrut iliskisi dosyada net kurulmalidir.", ["IIK m.145 vd."]],
  ["kiralanan-tasinmaz-tahliye", 339, "Kiralanan tasinmazlarin ilamsiz tahliyesi takibi", "Kira iliskisi ve tahliye sebebinin takip yolu ile uyumu kontrol edilmelidir.", ["IIK m.269 vd."]],
  ["tahliye-talepli-ilamsiz-icra", 340, "Tahliye talepli ilamsiz icra takibi", "Kira alacagi ve tahliye talebinin birlikte kurulmasi sure hesaplarini etkiler.", ["IIK ilgili kira takip hukumleri"]],
];

const mahkemeSeeds: Seed[] = [
  ["odeme-emrine-itiraz", 341, "Icra emrine/odeme emrine itiraz davalari", "Teblig tarihi ve itiraz suresi her seyden once netlestirilmelidir.", ["IIK ilgili takip hukumleri"]],
  ["itirazin-kaldirilmasi", 342, "Itirazin kaldirilmasi davasi", "Imzaya itiraz ve belge kuvveti ayrimi dogru kurulmalidir.", ["IIK m.68-68/a"]],
  ["istihkak", 343, "Istihkak davasi", "Malin zilyetligi ile mulkiyet iddiasi ayni anda ispatlanmalidir.", ["IIK m.96-99"]],
  ["sikayet-icra-islemi", 344, "Sikayet (icra mudurlugu islemlerine) davasi", "Sikayet suresine tabi islemler ile kamu duzenine iliskin sikayetler ayrilmalidir.", ["IIK m.16"]],
  ["ihalenin-feshi", 345, "Ihalenin feshi davasi", "Ihale usulsuzlugu somut ihlal ve menfaat kosulu ile birlikte gosterilmelidir.", ["IIK m.134"]],
  ["hacizde-tertip-itirazi", 346, "Hacizde tertip (sira) itirazi davasi", "Alacakli sirasini etkileyen hukuki dayanaklar net kurulmalidir.", ["IIK ilgili haciz hukumleri"]],
  ["borcun-itfa-itirazi", 347, "Borcun itfa edildigine iliskin itiraz davalari", "Odeme ve mahsup belgeleriyle borcun sona erdigi ispatlanmalidir.", ["IIK m.33"]],
  ["takibin-taliki-iptali", 348, "Takibin taliki ve iptali davasi", "Takibi durduran veya sona erdiren neden resmi belgeye dayanmalidir.", ["IIK m.33-33/a"]],
  ["kiymet-takdirine-itiraz", 349, "Kiymet takdirine itiraz davalari", "Rayic deger savunmasi emsal ve uzman raporuyla desteklenmelidir.", ["IIK m.128/a"]],
  ["haczedilmezlik-sikayeti", 350, "Haczedilmezlik sikayeti davasi", "Malin kanuni haczedilmezlik kapsaminda oldugu ispatlanmalidir.", ["IIK m.82-83"]],
  ["maas-haczi-itiraz", 351, "Maas haczi oranina itiraz davasi", "Gelir niteligine ve haciz sinirina uygunluk kontrol edilmelidir.", ["IIK m.83"]],
  ["sira-cetveline-itiraz", 352, "Sira cetveline itiraz davasi", "Kayit ve paylastirma sirasinin hukuka uygun olup olmadigi ayrintili incelenmelidir.", ["IIK m.142"]],
  ["tasarrufun-iptali", 353, "Tasarrufun iptali davasi", "Tasarruf tarihi, aciz ve alacakli zararinin dogrudan baglantisi kurulmalidir.", ["IIK m.277 vd."]],
];

const cezaSeeds: Seed[] = [
  ["nafaka-borcunu-odememe", 354, "Nafaka borcunu odememe (tazyik hapsi) davalari", "Kesinlesen nafaka ilami ve ogrenme tarihi suresinde takip edilmelidir.", ["IIK m.344"]],
  ["taahhudu-ihlal", 355, "Taahhudu ihlal davalari", "Gecerli taahhut tutanagi ve kusurlu ihlal birlikte ispatlanmalidir.", ["IIK m.340"]],
  ["mal-beyaninda-bulunmama", 356, "Mal beyaninda bulunmama davalari", "Odeme emri tebligi ve yasal sure hesabi kritik onemdedir.", ["IIK m.337"]],
  ["gercege-aykiri-mal-beyani", 357, "Gercege aykiri mal beyani davalari", "Beyan ile gercek malvarligi arasindaki fark resmi kayitlarla gosterilmelidir.", ["IIK m.338"]],
  ["mevcudu-eksiltme", 358, "Alacakliyi zarara ugratmak kastiyla mevcudu eksiltme davalari", "Kast unsuru ve mal kacirma islemleri kronolojik olarak kurulmalidir.", ["IIK m.331"]],
];

export const bolum07Icra: DavaTuru[] = [
  ...mapSeeds(takipSeeds, "takip-turleri", "takip", "takip", "takip"),
  ...mapSeeds(mahkemeSeeds, "icra-davalari", "mahkeme", "mahkeme", "mahkeme"),
  ...mapSeeds(cezaSeeds, "icra-ceza", "ceza", "ceza", "ceza"),
];
