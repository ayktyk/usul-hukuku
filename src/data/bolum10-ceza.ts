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
import { TEBLIGAT_MASRAFI } from "./harclar";

type Seed = readonly [string, number, string, string, string[]];

const YETKI: YetkiliMahkeme = {
  genelYetki: "Sucun islendigi yer ceza mahkemesi veya Cumhuriyet Bassavciligi",
  ozelYetki: ["Suphelinin yakalandigi yer", "Magdurun bulundugu yerle baglantili koruma merciileri"],
  kesinYetkiMi: false,
  yasalDayanak: "CMK yetki hukumleri",
  aciklama: "Sorusturma ve kovusturma merciisi suca ve ozel usule gore degisir; ilk referans suc yeri baglantisidir.",
};

const HARCSIZ: HarcBilgisi = {
  basvuruHarci: 0,
  kararIlamHarci: "maktu",
  aciklama: "Ceza yargilamasinda kamu davasi bakimindan harc aranmaz.",
};

const MASRAF: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 2,
  toplamTahmini: 900,
  aciklama: "Temel gider kalemi tebligat ve temsil giderleridir.",
};

const ARABULUCULUK: ArabuluculukBilgisi = {
  davaSarti: false,
  ihtiyari: false,
  aciklama: "Ceza yargisinda bu alan ayrica uzlastirma kurumundan farklidir; genel arabuluculuk uygulanmaz.",
};

const VEKALET: OzelVekaletnameBilgisi = {
  gerekliMi: false,
  neden: "Sikayet ve katilan vekilligi icin genel ceza vekaletnamesi yeterlidir.",
  yasalDayanak: "CMK, HMK m.74",
};

const BILGI: MuvekkilBilgi[] = [
  { bilgi: "Magdur/supheli kimlik bilgileri", zorunlu: true },
  { bilgi: "Olay tarihi, yeri ve kronolojisi", zorunlu: true },
  { bilgi: "Varsa sikayet, uzlastirma veya kovusturma asamasi", zorunlu: false },
];

const BELGE: GerekiliBelge[] = [
  { belge: "Tutanak, kamera kaydi veya mesaj gibi deliller", zorunlu: false },
  { belge: "Saglik raporu veya adli tip evraki", zorunlu: false },
  { belge: "Sikayet dilekcesi veya ifade tutanaklari", zorunlu: false },
];

const GOREV: Record<string, GorevliMahkeme> = {
  asliye: {
    mahkeme: "Asliye Ceza Mahkemesi / Cumhuriyet Bassavciligi",
    yasalDayanak: "5235 sy. K., CMK",
    aciklama: "Daha hafif yaptirimli suc tiplerinin buyuk bolumu asliye ceza yargilamasinda gorulur.",
  },
  agir: {
    mahkeme: "Agir Ceza Mahkemesi / Cumhuriyet Bassavciligi",
    yasalDayanak: "5235 sy. K., CMK",
    aciklama: "Agir yaptirim gerektiren ve ozel gorevli sayilan suclar agir ceza mahkemesinin gorev alanina girer.",
  },
  ozel: {
    mahkeme: "Cumhuriyet Bassavciligi / Ilgili Ceza Mahkemesi",
    yasalDayanak: "CMK, uzlastirma ve seri muhakeme hukumleri",
    aciklama: "Uzlastirma, seri muhakeme, basit yargilama ve HAGB gibi surecler savcilik ve ilgili mahkeme onunde yurur.",
  },
};

function dava(seed: Seed, altKategori: string, gorevliMahkeme: GorevliMahkeme): DavaTuru {
  return {
    id: seed[0],
    maddeNo: seed[1],
    ad: seed[2],
    kategori: "ceza-mahkemesi",
    altKategori,
    gorevliMahkeme,
    yetkiliMahkeme: YETKI,
    harclar: HARCSIZ,
    masraflar: MASRAF,
    ozelVekaletname: VEKALET,
    muvekkilBilgileri: BILGI,
    gerekliBelgeler: BELGE,
    yargilamaUsulu: "ozel",
    arabuluculuk: ARABULUCULUK,
    pratikNot: seed[3],
    hmkMaddeleri: [],
    ozelKanunlar: seed[4],
  };
}

const kisilereKarsiSeeds: Seed[] = [
  ["yaralama", 404, "Kasten/taksirle yaralama suclari davalari", "Adli rapor, kast-taksir ayrimi ve savunma kronolojisi birlikte degerlendirilmelidir.", ["TCK m.86-89"]],
  ["oldurme", 405, "Kasten/taksirle oldurme suclari davalari", "Olum nedeni, kusur ve olayin olus sekli adli tip bulgulariyla kurulmalidir.", ["TCK m.81-85"]],
  ["tehdit", 406, "Tehdit suclari davalari", "Tehdidin ciddiyeti ve muhatapta korku yaratma etkisi somut delille gosterilmelidir.", ["TCK m.106"]],
  ["hakaret", 407, "Hakaret suclari davalari", "Soz veya yazi iceriginin onur ve sayginlik etkisi baglam icinde ele alinmalidir.", ["TCK m.125"]],
  ["huzur-sukun-bozma", 408, "Kisilerin huzur ve sukununu bozma suclari", "Israr unsuru ve sureklilik kayitlarla desteklenmelidir.", ["TCK m.123"]],
  ["cinsel-saldiri-istismar-taciz", 409, "Cinsel saldiri / istismar / taciz davalari", "Magdur beyani, adli tip bulgulari ve destekleyici deliller hassasiyetle degerlendirilmelidir.", ["TCK m.102-105"]],
  ["hurriyetten-yoksun-kilma", 410, "Kisiyi hurriyetinden yoksun kilma davalari", "Hareket ozgurlugunun fiilen ne sekilde sinirlandigi net kurulmalidir.", ["TCK m.109"]],
  ["konut-dokunulmazligi", 411, "Konut dokunulmazligini ihlal davalari", "Riza bulunup bulunmadigi ve konut niteligindeki mahal tartisilmalidir.", ["TCK m.116"]],
  ["is-calisma-hurriyeti", 412, "Is ve calisma hurriyetinin ihlali davalari", "Tehdit, cebir veya hukuka aykiri engelleme unsuru somut olayla gosterilmelidir.", ["TCK m.117"]],
];

const malvarligiSeeds: Seed[] = [
  ["hirsizlik", 413, "Hirsizlik davalari", "Zilyetlik, alma fiili ve kast unsuru teknik delillerle desteklenmelidir.", ["TCK m.141-142"]],
  ["yagma", 414, "Yagma (gasp) davalari", "Cebir veya tehditle mal alma unsuru net sekilde kurulmalidir.", ["TCK m.148-149"]],
  ["dolandiricilik", 415, "Dolandiricilik ve nitelikli dolandiricilik davalari", "Hileli davranis ile zarar arasindaki nedensellik ayrintili ortaya konulmalidir.", ["TCK m.157-158"]],
  ["guveni-kotuye-kullanma", 416, "Guveni kotuye kullanma davalari", "Teslim edilen mal veya yetkinin amaca aykiri kullanimi ispatlanmalidir.", ["TCK m.155"]],
  ["bedelsiz-senedi-kullanma", 417, "Bedelsiz senedi kullanma davalari", "Temel iliski ve senedin bedelsiz kaldigi olgu belge zinciriyle kurulmalidir.", ["TCK m.156"]],
  ["mala-zarar-verme", 418, "Mala zarar verme davalari", "Zararin faili ve hasarin kapsami bilirkisi veya foto ile desteklenmelidir.", ["TCK m.151-152"]],
  ["haksiz-yere-tecavuz-karsiliksiz-yararlanma", 419, "Hakki olmayan yere tecavuz ve karsiliksiz yararlanma", "Isgal veya hizmetten bedelsiz yararlanma olgusu teknik kayitlarla gosterilmelidir.", ["TCK m.154", "TCK m.163"]],
];

const ozelUsulSeeds: Seed[] = [
  ["bilisim-bahis-sahtecilik-cevre", 420, "Bilisim suclari, yasadisi bahis, sahtecilik ve cevre suclari davalari", "Her alt suc tipinde teknik log, sahte belge veya uzman raporu kritik rol oynar.", ["TCK ilgili hukumleri", "5651 sy. K."]],
  ["uyusturucu", 421, "Uyusturucu madde kullanma/ticareti davalari", "Kullanma ile ticaret ayrimi miktar, paketleme ve iletisim kayitlariyla test edilir.", ["TCK m.188-191"]],
  ["vergi-kacakciligi-rusvet-zimmet", 422, "Vergi kacakciligi, rusvet, irtikap, zimmet ve ihale suclari", "Mali kayitlar ve kamu gorevi baglantisi dosyanin merkezini olusturur.", ["213 sy. VUK", "TCK ilgili hukumleri"]],
  ["aile-koruma-cocuk-kacirma", 423, "Ailenin korunmasi (6284 s.K.) ve cocuk kacirma suclari davalari", "Koruma kararlarinin ihlali ve velayet durumu birlikte incelenmelidir.", ["6284 sy. K.", "TCK ilgili hukumleri"]],
  ["uzlastirma-seri-basit-hagb", 424, "Uzlastirma, seri/basit muhakeme, on odeme ve HAGB surecleri", "Bu surecler ana dava kadar onemlidir; kabul-ret stratejisi dosya bazli belirlenmelidir.", ["CMK ilgili hukumleri"]],
];

export const bolum10Ceza: DavaTuru[] = [
  ...kisilereKarsiSeeds.map((seed) => dava(seed, "kisilere-karsi-suclar", seed[1] === 405 || seed[1] === 409 ? GOREV.agir : GOREV.asliye)),
  ...malvarligiSeeds.map((seed) => dava(seed, "malvarligina-karsi-suclar", seed[1] === 414 ? GOREV.agir : GOREV.asliye)),
  ...ozelUsulSeeds.map((seed) => dava(seed, "topluma-karsi-suclar-ozel-usuller", seed[1] === 421 || seed[1] === 422 ? GOREV.agir : GOREV.ozel)),
];
