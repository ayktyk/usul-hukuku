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
import { BASVURMA_HARCI, BILIRKISI_UCRETI, KESF_UCRETI, NISPI_HARC_ORANI, TEBLIGAT_MASRAFI } from "./harclar";

interface Config {
  id: string;
  maddeNo: number;
  ad: string;
  altKategori: string;
  yetkiliMahkeme: YetkiliMahkeme;
  harclar: HarcBilgisi;
  masraflar: MasrafBilgisi;
  arabuluculuk: ArabuluculukBilgisi;
  pratikNot: string;
  ozelKanunlar: string[];
  muvekkilBilgileri: MuvekkilBilgi[];
  gerekliBelgeler: GerekiliBelge[];
  yargilamaUsulu?: "yazili" | "basit" | "ozel";
}

type Seed = readonly [string, number, string, string, string[]];

const GOREV: GorevliMahkeme = {
  mahkeme: "Asliye Ticaret Mahkemesi",
  yasalDayanak: "TTK m.4-5",
  aciklama: "Ticari davalar ve ticari nitelikteki cekismesiz yargi isleri asliye ticaret mahkemesinde gorulur.",
  ozelDurum: "Uzman mahkeme yoksa asliye hukuk mahkemesi ticaret mahkemesi sifatiyla gorev yapar.",
};

const YETKI: Record<string, YetkiliMahkeme> = {
  genel: {
    genelYetki: "Davalinin merkez veya yerlesim yeri mahkemesi",
    ozelYetki: ["Sozlesmenin ifa yeri", "Sube islemlerinde subenin bulundugu yer"],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, HMK m.10",
    aciklama: "Ticari iliskide genel ve sozlesmesel yetki kurallari birlikte degerlendirilir.",
  },
  sirket: {
    genelYetki: "Sirket merkezinin bulundugu yer mahkemesi",
    ozelYetki: ["Genel kurulun toplandigi yer mahkemesi"],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.14, TTK ilgili hukumleri",
    aciklama: "Sirketin ic iliskisine dair davalarda merkez kaydi ana baglanti noktasidir.",
  },
  evrak: {
    genelYetki: "Borclunun yerlesim yeri veya odeme yeri mahkemesi",
    ozelYetki: ["Muhatap bankanin bulundugu yer"],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, TTK kiymetli evrak hukumleri",
    aciklama: "Senedin odeme yeri ve takip baglantisi birlikte degerlendirilir.",
  },
  iflas: {
    genelYetki: "Borclunun is merkezinin bulundugu yer mahkemesi",
    kesinYetkiMi: false,
    yasalDayanak: "IIK ilgili hukumleri",
    aciklama: "Iflas ve konkordato dosyalarinda ticari merkezin bulundugu yer esas alinir.",
  },
  deniz: {
    genelYetki: "Davalinin merkezinin bulundugu yer mahkemesi",
    ozelYetki: ["Geminin baglama limani", "Rizikonun dogdugu liman baglantisi"],
    kesinYetkiMi: false,
    yasalDayanak: "TTK deniz ticareti hukumleri",
    aciklama: "Deniz ticareti dosyalarinda liman ve sefer baglantisi on plandadir.",
  },
};

const MAKTU: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "maktu",
  aciklama: "Iptal, tespit ve kurumsal karar uyusmazliklarinda maktu harc esas alinmistir.",
};

const NISPI: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "nispi",
  nispiOran: NISPI_HARC_ORANI * 1000,
  pesinHarcOran: 0.25,
  aciklama: "Parasal ticari taleplerde nispi harc bilgisi uygulanir.",
};

const MASRAF: Record<string, MasrafBilgisi> = {
  sirket: { tebligatMasrafi: TEBLIGAT_MASRAFI * 3, bilirkisiUcreti: BILIRKISI_UCRETI, toplamTahmini: 4700, aciklama: "Ticaret sicil ve finansal kayit incelemesi belirleyicidir." },
  alacak: { tebligatMasrafi: TEBLIGAT_MASRAFI * 3, bilirkisiUcreti: BILIRKISI_UCRETI, toplamTahmini: 4300, aciklama: "Cari hesap ve fatura incelemesi on plandadir." },
  evrak: { tebligatMasrafi: TEBLIGAT_MASRAFI * 2, bilirkisiUcreti: BILIRKISI_UCRETI, toplamTahmini: 3900, aciklama: "Senet ve banka kayitlari birlikte incelenir." },
  sigorta: { tebligatMasrafi: TEBLIGAT_MASRAFI * 3, bilirkisiUcreti: BILIRKISI_UCRETI, toplamTahmini: 4800, aciklama: "Police kapsami ve hasar iliskisi teknik raporla kurulur." },
  iflas: { tebligatMasrafi: TEBLIGAT_MASRAFI * 4, bilirkisiUcreti: BILIRKISI_UCRETI, kesfUcreti: KESF_UCRETI, toplamTahmini: 6500, aciklama: "Mali tablolar ve proje denetimi ek masraf dogurur." },
  deniz: { tebligatMasrafi: TEBLIGAT_MASRAFI * 3, bilirkisiUcreti: BILIRKISI_UCRETI, kesfUcreti: KESF_UCRETI, toplamTahmini: 7000, aciklama: "Deniz uzmanligi gerektiren teknik incelemeler nedeniyle gider yuksektir." },
};

const ARAB: Record<string, ArabuluculukBilgisi> = {
  yok: { davaSarti: false, ihtiyari: true, aciklama: "Parasal niteligine gore zorunluluk degisebileceginden dosya bazli kontrol gerekir." },
  zorunlu: { davaSarti: true, ihtiyari: false, yasalDayanak: "TTK m.5/A", aciklama: "Konusu para olan alacak ve tazminat taleplerinde dava oncesi ticari arabuluculuk zorunludur." },
};

const VEKALET: OzelVekaletnameBilgisi = {
  gerekliMi: false,
  neden: "Genel dava vekaletnamesi kural olarak yeterlidir; tasarruf ve sulh yetkileri ayri yazilmalidir.",
  yasalDayanak: "HMK m.74",
};

const BILGI: Record<string, MuvekkilBilgi[]> = {
  sirket: [
    { bilgi: "Sirket unvani, sicil no ve pay yapisi", zorunlu: true },
    { bilgi: "Uyusmazliga konu karar veya islem tarihi", zorunlu: true },
    { bilgi: "Talep edilen sonuc", zorunlu: true },
  ],
  genel: [
    { bilgi: "Taraf sirketlerin unvan ve adres bilgileri", zorunlu: true },
    { bilgi: "Sozlesme veya iliski kronolojisi", zorunlu: true },
    { bilgi: "Talep edilen alacak veya tazminat kalemleri", zorunlu: true },
  ],
  iflas: [
    { bilgi: "Borclu sirketin mali durumu ve merkez bilgisi", zorunlu: true },
    { bilgi: "Takip veya konkordato sureci kronolojisi", zorunlu: true },
    { bilgi: "Talep edilen koruma veya tasfiye sonucu", zorunlu: true },
  ],
  deniz: [
    { bilgi: "Gemi, yuk veya sigorta bilgileri", zorunlu: true },
    { bilgi: "Kaza veya sefer kronolojisi", zorunlu: true },
    { bilgi: "Zarar kalemleri ve talep sonucu", zorunlu: true },
  ],
};

const BELGE: Record<string, GerekiliBelge[]> = {
  sirket: [
    { belge: "Ticaret sicil kayitlari", zorunlu: true, nereden: "Ticaret Sicil Mudurlugu / MERSIS" },
    { belge: "Genel kurul veya yonetim kurulu kararlari", zorunlu: true },
    { belge: "Pay defteri ve hazirun cetveli", zorunlu: false },
  ],
  genel: [
    { belge: "Sozlesme, siparis veya fatura dosyasi", zorunlu: true },
    { belge: "Cari hesap ekstresi veya teslim belgeleri", zorunlu: false },
    { belge: "Arabuluculuk son tutanagi", zorunlu: false, nereden: "Arabuluculuk dosyasi" },
  ],
  iflas: [
    { belge: "Bilanco, gelir tablosu ve mali tablolar", zorunlu: true },
    { belge: "Icra takip dosyalari veya borca batiklik raporu", zorunlu: false },
    { belge: "Konkordato on projesi ve denetim evraki", zorunlu: false },
  ],
  deniz: [
    { belge: "Konsimento, charterparty veya navlun sozlesmesi", zorunlu: false },
    { belge: "Kaza raporu, survey veya liman kayitlari", zorunlu: false },
    { belge: "Police ve ekspertiz belgeleri", zorunlu: false },
  ],
};

function dava(config: Config): DavaTuru {
  return {
    kategori: "ticaret-mahkemesi",
    gorevliMahkeme: GOREV,
    ozelVekaletname: VEKALET,
    yargilamaUsulu: config.yargilamaUsulu ?? "yazili",
    hmkMaddeleri: ["HMK m.107", "HMK m.316"],
    ...config,
  };
}

function mapSeeds(
  seeds: Seed[],
  altKategori: string,
  yetki: YetkiliMahkeme,
  bilgiKey: keyof typeof BILGI,
  belgeKey: keyof typeof BELGE,
  masrafKey: keyof typeof MASRAF,
  opts?: { maktuNos?: number[]; zorunluNos?: number[]; yargilamaUsulu?: "yazili" | "basit" | "ozel" },
): DavaTuru[] {
  return seeds.map(([id, maddeNo, ad, pratikNot, ozelKanunlar]) =>
    dava({
      id,
      maddeNo,
      ad,
      altKategori,
      yetkiliMahkeme: yetki,
      harclar: opts?.maktuNos?.includes(maddeNo) ? MAKTU : NISPI,
      masraflar: MASRAF[masrafKey],
      arabuluculuk: opts?.zorunluNos?.includes(maddeNo) ? ARAB.zorunlu : ARAB.yok,
      pratikNot,
      ozelKanunlar,
      muvekkilBilgileri: BILGI[bilgiKey],
      gerekliBelgeler: BELGE[belgeKey],
      yargilamaUsulu: opts?.yargilamaUsulu,
    }),
  );
}

const sirketSeeds: Seed[] = [
  ["genel-kurul-karari-iptali", 271, "Genel kurul kararinin iptali davasi", "Toplanti cagrisi, gundem ve muhalefet serhi birlikte kontrol edilmelidir.", ["TTK m.445-446"]],
  ["genel-kurul-karari-butlani", 272, "Genel kurul kararinin butlani davasi", "Butlan sebepleri ve agir aykirilik acik gosterilmelidir.", ["TTK m.447"]],
  ["yonetim-kurulu-sorumluluk", 273, "Yonetim kurulu uyeleri aleyhine sorumluluk davasi", "Zarar, kusur ve illiyet iliskisi sirket kayitlariyla somutlastirilmalidir.", ["TTK m.553-555"]],
  ["denetci-sorumluluk", 274, "Denetci aleyhine sorumluluk davasi", "Denetim kusurunun zarara etkisi teknik raporla kurulmalidir.", ["TTK m.554"]],
  ["ortakliktan-cikarma", 275, "Ortakliktan cikarma davasi", "Hakli sebep ve sirket duzeni uzerindeki etkiler birlikte degerlendirilmelidir.", ["TTK ilgili hukumleri"]],
  ["ortakliktan-cikma", 276, "Ortakliktan cikma davasi", "Cikma hakkini doguran nedenler esas sozlesme ve kanun cercevesinde test edilmelidir.", ["TTK ilgili hukumleri"]],
  ["sirketin-feshi", 277, "Sirketin feshi davasi", "Hakli sebep bulunup bulunmadigi ve alternatif cozumler birlikte tartisilmalidir.", ["TTK m.531"]],
  ["sirket-tasfiye", 278, "Sirket tasfiyesine iliskin davalar", "Tasfiye memuru islemleri ve malvarligi dagilimi kayitlarla denetlenmelidir.", ["TTK tasfiye hukumleri"]],
  ["sermaye-degisikligi-iptali", 279, "Sermaye artiriminin/azaltiminin iptali davalari", "Usul ve alacakli koruma yukumlulukleri ayrica incelenmelidir.", ["TTK sermaye hukumleri"]],
  ["pay-devri-uyusmazligi", 280, "Pay devri uyusmazliklari", "Devir sekli, onay ve pay defteri kaydi birlikte okunmalidir.", ["TTK pay devri hukumleri"]],
  ["pay-sahipligi-tespiti", 281, "Anonim sirket pay sahipliginin tespiti davasi", "Pay sahipligini gosteren zincir ve kayitlar eksiksiz kurulmalidir.", ["TTK m.489 vd."]],
  ["limited-mudur-azli-atanmasi", 282, "Limited sirket mudur azli/atanmasi davalari", "Mudurun yetki ve gorev ihmali somut olaylarla gosterilmelidir.", ["TTK limited sirket hukumleri"]],
  ["birlesme-bolunme", 283, "Sirket birlesme ve bolunmelerine iliskin davalar", "Birlesme planlari ve alacakli/pay sahibi koruma mekanizmalari denetlenmelidir.", ["TTK birlesme-bolunme hukumleri"]],
  ["organ-gecici-atanma", 284, "Organin gecici olarak atanmasi davalari", "Yonetim boslugu ve acil ihtiyac gecici koruma mantigiyla ortaya konulmalidir.", ["TTK m.530"]],
];

const alacakSeeds: Seed[] = [
  ["ticari-alacak", 285, "Ticari alacak davalari", "Fatura, teslim ve cari hesap iliskisi tek tablo halinde sunulmalidir.", ["TTK m.4", "TTK m.5/A"]],
  ["itirazin-iptali-ticari", 286, "Itirazin iptali davasi (ticari alacak)", "Takip dosyasi ile temel ticari iliski birlikte kurulmalidir.", ["TTK m.5/A", "IIK m.67"]],
  ["menfi-tespit-ticari", 287, "Menfi tespit davasi (ticari borc)", "Borcun dogmadigi veya sona erdigi olgular hesap belgeleriyle desteklenmelidir.", ["TTK m.5/A", "IIK m.72"]],
  ["fatura-alacagi", 288, "Fatura alacagina dayali takip/davalar", "Ticari defter, teslim ve ihtiraz kaydi savunmalari birlikte incelenir.", ["TTK m.21"]],
  ["cari-hesap-alacagi", 289, "Cari hesap alacagi davasi", "Cari hesap mutabakati ve kapatma tarihi netlestirilmelidir.", ["TTK cari hesap hukumleri"]],
  ["haksiz-rekabet", 290, "Haksiz rekabet davalari", "Ticari davranisin durust rekabeti bozucu etkisi pazar verileriyle aciklanmalidir.", ["TTK m.54-63"]],
  ["haksiz-rekabet-meni", 291, "Haksiz rekabetin tespiti, meni ve giderilmesi davasi", "Ihlalin devam eden etkileri durdurma talebiyle baglantili kurulmalidir.", ["TTK m.56"]],
  ["ticaret-unvani-tecavuz", 292, "Ticaret unvanina tecavuzun onlenmesi davasi", "Karistirilma ihtimali sicil ve piyasa kullanimi uzerinden ispatlanir.", ["TTK m.52-54"]],
  ["isletme-devri", 293, "Isletme devrine iliskin davalar", "Devir kapsamindaki malvarligi ve borclarin sinirlari sozlesme ile ayiklanmalidir.", ["TBK m.202-203", "TTK m.11"]],
  ["franchise", 294, "Franchise sozlesmesinden dogan davalar", "Marka kullanimi, know-how ve ciro hedefleri ayri basliklarda okunmalidir.", ["TBK genel hukumler", "TTK m.4"]],
  ["acentelik", 295, "Acentelik sozlesmesinden dogan davalar", "Portfoy tazminati ve komisyon hakki birbiriyle karistirilmamalidir.", ["TTK m.102-123"]],
  ["distributorluk-bayilik", 296, "Distributorluk/bayilik sozlesmesi uyusmazliklari", "Bolge korumasi ve tek saticilik savunmalari sozlesme metniyle test edilir.", ["TBK genel hukumler", "TTK m.4"]],
  ["komisyon-sozlesmesi", 297, "Komisyon sozlesmesi davalari", "Komisyoncunun vekil mi bagimsiz tacir mi oldugu sonuc uzerinde etkilidir.", ["TBK m.532-546"]],
];

const evrakSeeds: Seed[] = [
  ["cek-iptali", 298, "Cek iptali davasi", "Kayip veya ziya olgusu ilan ve hamil ihtimaliyle birlikte degerlendirilmelidir.", ["TTK cek hukumleri"]],
  ["kambiyo-alacagi", 299, "Bono/police/cek alacagina dayali davalar", "Senet metni ve temel iliski savunmasi birbirinden ayrilmalidir.", ["TTK kiymetli evrak hukumleri"]],
  ["menfi-tespit-kambiyo", 300, "Kambiyo senetlerine iliskin menfi tespit davasi", "Imza, bedelsizlik veya ciranta zinciri savunmasi net kurulmalidir.", ["IIK m.72", "TTK kiymetli evrak hukumleri"]],
  ["karsiliksiz-cek-tazminati", 301, "Karsiliksiz cek tazminati davasi", "Ibraz suresi ve banka islem kaydi somut olarak dosyaya konulmalidir.", ["5941 sy. Cek K."]],
  ["senet-iptali", 302, "Senet (bono) iptali davasi", "Zayi veya haksiz elde bulundurma iddiasi ilan sureciyle desteklenmelidir.", ["TTK kiymetli evrak hukumleri"]],
  ["kiymetli-evrak-ziyai", 303, "Kiymetli evrakin zayii nedeniyle iptali davasi", "Ziya olgusunun inandirici ve hizli sekilde ortaya konulmasi gerekir.", ["TTK kiymetli evrak hukumleri"]],
  ["hamiline-yazili-pay-senedi-iptali", 304, "Hamiline yazili pay senetlerinin iptali davasi", "Sirket kayitlari ve ziya olgusu birlikte degerlendirilmelidir.", ["TTK pay senetleri hukumleri"]],
  ["cekte-ibraz-zamanasimi", 305, "Cekte ibraz sureleri ve zamanasimi uyusmazliklari", "Ibraz gunu ve ciranta zinciri zamanasimi sonucunu belirler.", ["TTK cek hukumleri"]],
];

const sigortaSeeds: Seed[] = [
  ["trafik-kazasi-zmss-ticari", 306, "Trafik kazasi tazminat davasi (sigorta sirketi davali - ticari ZMSS)", "Basvuru on sarti ve zarar hesabinin teknik raporla kurulmasi gerekir.", ["2918 sy. K.", "TTK sigorta hukumleri"]],
  ["kasko-ticari", 307, "Kasko sigortasindan kaynakli ticari davalar", "Aracin ticari kullanimi kapsami etkiliyorsa police ayrintili okunmalidir.", ["TTK sigorta hukumleri"]],
  ["nakliyat-sigortasi", 308, "Nakliyat sigortasi uyusmazliklari", "Yukleme-bosaltma ve tasima zinciri rizikonun yerini belirler.", ["TTK sigorta hukumleri"]],
  ["sorumluluk-sigortasi", 309, "Sorumluluk sigortasi davalari", "Teminat limiti ve rizikonun kapsama girip girmedigi teknik olarak ayiklanmalidir.", ["TTK sigorta hukumleri"]],
  ["reasurans", 310, "Reasurans uyusmazliklari", "Asil sigorta ve reasurans sozlesmelerinin birbirine etkisi ayri incelenmelidir.", ["TTK sigorta hukumleri"]],
  ["sigorta-ettiren-uyusmazligi", 311, "Sigorta ettiren-sigortaci arasindaki ticari uyusmazliklar", "Ihbar yukumlulugu ve prim/teminat dengesi dosya temelidir.", ["TTK sigorta hukumleri"]],
  ["rucuen-tazminat", 312, "Rucuen tazminat davasi", "Odeme yapan ticari tarafin rucu kosullari ve zarar zinciri birlikte kurulmalidir.", ["TTK sigorta hukumleri", "TBK rucu ilkeleri"]],
];

const iflasSeeds: Seed[] = [
  ["iflas-davasi", 313, "Iflas davasi", "Aciz ve odeme gucsuzlugu olgusu takip evraklariyla desteklenmelidir.", ["IIK iflas hukumleri"]],
  ["iflasin-ertelenmesi", 314, "Iflasin ertelenmesi davalari", "Uygulanabilirlik ve guncel mevzuat etkisi ayri kontrol edilmelidir.", ["IIK gecici/donusmus hukumler"]],
  ["konkordato-talebi", 315, "Konkordato talebi ve muhleti davalari", "Proje gercekciligi ve mali veriler arasindaki tutarlilik en kritik alandir.", ["IIK m.285 vd."]],
  ["konkordato-tasdiki", 316, "Konkordato projesinin tasdiki davasi", "Alacakli oy dagilimi ve denetim raporu birlikte okunmalidir.", ["IIK m.305 vd."]],
  ["iflasin-kaldirilmasi", 317, "Iflasin kaldirilmasi davasi", "Borclarin karsilanma durumu ve masaya etkisi ispatlanmalidir.", ["IIK iflas hukumleri"]],
  ["sira-cetveline-itiraz-iflas", 318, "Sira cetveline itiraz davasi", "Kayit ve siralama gerekceleri alacak turune gore ayiklanmalidir.", ["IIK m.235"]],
  ["tasarrufun-iptali-iflas", 319, "Tasarrufun iptali davasi (iflas halinde)", "Tasarruf tarihi ve alacakli zararina etkisi teknik olarak kurgulanmalidir.", ["IIK m.277 vd."]],
  ["kayit-kabul", 320, "Iflas masasina kayit kabul davasi", "Alacagin hukuki sebebi ve miktari net belge zinciriyle sunulmalidir.", ["IIK m.235"]],
  ["yeniden-yapilandirma", 321, "Yeniden yapilandirma davalari", "Kurumsal yeniden yapilandirma planinin uygulanabilirligi temel tartisma konusudur.", ["IIK ve ilgili yeniden yapilandirma hukumleri"]],
];

const denizSeeds: Seed[] = [
  ["deniz-kazasi", 322, "Deniz kazasi tazminat davalari", "Kaza raporu, kaptan beyanlari ve survey belgeleri birlikte okunmalidir.", ["TTK deniz ticareti hukumleri"]],
  ["navlun-sozlesmesi", 323, "Navlun sozlesmesi uyusmazliklari", "Yukleme, teslim ve navlun hesaplamasi sefer belgeleriyle kurulmalidir.", ["TTK deniz ticareti hukumleri"]],
  ["gemi-ipotegi", 324, "Gemi ipotegi ve gemi alacaklisi haklari davalari", "Teminat yapisi ve gemi kaydi teknik belgelerle desteklenmelidir.", ["TTK gemi ipotegi hukumleri"]],
  ["genel-avarya", 325, "Musterek (genel) avarya davalari", "Dispas raporu olmadan zarar dagilimi saglikli kurulamaz.", ["TTK genel avarya hukumleri"]],
  ["kurtarma-yardim", 326, "Kurtarma ve yardim ucretine iliskin davalar", "Kurtarma faaliyeti ve saglanan menfaat ayrintili ortaya konulmalidir.", ["TTK kurtarma hukumleri"]],
  ["catma", 327, "Catma (gemi carpismasi) davalari", "Kusur dagilimi seyir ve uzman raporlariyla belirlenir.", ["TTK catma hukumleri"]],
];

const finansSeeds: Seed[] = [
  ["genel-kredi-sozlesmesi", 328, "Genel kredi sozlesmesi uyusmazliklari", "Temerrut, faiz ve teminat yapisi hesap cetveliyle kurulmalidir.", ["TTK m.4", "TTK m.5/A"]],
  ["teminat-mektubu", 329, "Teminat mektubu uyusmazliklari", "Ilk talepte odeme ve kotuye kullanma siniri birlikte degerlendirilmelidir.", ["TTK m.4", "TTK m.5/A"]],
  ["akreditif", 330, "Akreditif davalari", "Belgeli kredi mantigi nedeniyle temel iliski ile belge uyumu ayri incelenir.", ["TTK m.4"]],
  ["faktoring", 331, "Faktoring sozlesmesi uyusmazliklari", "Temlik zinciri ve tahsil yetkisi netlestirilmelidir.", ["6361 sy. K.", "TTK m.5/A"]],
  ["leasing", 332, "Finansal kiralama (leasing) davalari", "Mulkiyet, zilyetlik ve odeme takvimi tek dosyada toplanmalidir.", ["6361 sy. K.", "TTK m.5/A"]],
  ["banka-teminatlari", 333, "Banka teminatlarindan dogan davalar", "Teminatin soyutlugu ve temel borc iliskisi savunmasi birlikte ele alinmalidir.", ["TTK m.4", "TTK m.5/A"]],
];

export const bolum06Ticaret: DavaTuru[] = [
  ...mapSeeds(sirketSeeds, "sirketler-hukuku", YETKI.sirket, "sirket", "sirket", "sirket", { maktuNos: sirketSeeds.map(([, n]) => n) }),
  ...mapSeeds(alacakSeeds, "ticari-alacak", YETKI.genel, "genel", "genel", "alacak", { maktuNos: [290, 291, 292], zorunluNos: [285, 286, 287, 288, 289], yargilamaUsulu: "yazili" }),
  ...mapSeeds(evrakSeeds, "kiymetli-evrak", YETKI.evrak, "genel", "genel", "evrak", { maktuNos: [298, 300, 302, 303, 304, 305], zorunluNos: [299, 301], yargilamaUsulu: "yazili" }),
  ...mapSeeds(sigortaSeeds, "sigorta-hukuku", YETKI.genel, "genel", "genel", "sigorta", { zorunluNos: sigortaSeeds.map(([, n]) => n), yargilamaUsulu: "yazili" }),
  ...mapSeeds(iflasSeeds, "iflas-konkordato", YETKI.iflas, "iflas", "iflas", "iflas", { maktuNos: iflasSeeds.map(([, n]) => n), yargilamaUsulu: "ozel" }),
  ...mapSeeds(denizSeeds, "deniz-ticareti", YETKI.deniz, "deniz", "deniz", "deniz", { yargilamaUsulu: "yazili" }),
  ...mapSeeds(finansSeeds, "bankacilik-finans", YETKI.genel, "genel", "genel", "alacak", { zorunluNos: [328, 329, 331, 332, 333], yargilamaUsulu: "yazili" }),
];
