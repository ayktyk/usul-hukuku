import type {
  DavaTuru,
  GorevliMahkeme,
  YetkiliMahkeme,
  HarcBilgisi,
  MasrafBilgisi,
  ArabuluculukBilgisi,
} from "@/lib/types";
import {
  BASVURMA_HARCI,
  NISPI_HARC_ORANI,
  TEBLIGAT_MASRAFI,
  BILIRKISI_UCRETI,
  KESF_UCRETI,
  TANIK_UCRETI,
} from "./harclar";

// ---------------------------------------------------------------------------
// Ortak tanimlar — Bolum 1 Part 2: Asliye Hukuk (madde 42-79)
// ---------------------------------------------------------------------------

/** Asliye Hukuk Mahkemesi gorev bilgisi (HMK m.2) */
const asliyeHukukGorev: GorevliMahkeme = {
  mahkeme: "Asliye Hukuk Mahkemesi",
  yasalDayanak: "HMK m.2",
  aciklama:
    "Dava konusunun deger veya tutarina bakilmaksizin malvarligina iliskin davalarda ve sahis varligina iliskin davalarda gorevli mahkeme, aksine bir duzenleme bulunmadikca asliye hukuk mahkemesidir.",
};

/** Asliye Hukuk — soybagi davalari icin ozel gorev (Aile Mahkemesi olmayan yerlerde) */
const asliyeHukukSoybagGorev: GorevliMahkeme = {
  mahkeme: "Asliye Hukuk Mahkemesi (Aile Mahkemesi sifatiyla)",
  yasalDayanak: "4787 sy. Kanun m.4, HMK m.2",
  aciklama:
    "Soybagi davalari kural olarak aile mahkemesinin gorevine girer. Aile mahkemesi kurulmamis yerlerde asliye hukuk mahkemesi aile mahkemesi sifatiyla bakar.",
  ozelDurum:
    "Aile mahkemesi bulunan yerlerde gorevli mahkeme aile mahkemesidir.",
};

/** Genel yetki — davalinin yerlesim yeri (HMK m.6) */
const genelYetki: YetkiliMahkeme = {
  genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
  kesinYetkiMi: false,
  yasalDayanak: "HMK m.6",
  aciklama:
    "Genel yetkili mahkeme, davalinin dava tarihindeki yerlesim yeri mahkemesidir.",
};

/** Sozlesme davalari yetkisi — ifa yeri + genel yetki */
const sozlesmeYetkisi: YetkiliMahkeme = {
  genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
  ozelYetki: ["Sozlesmenin ifa yeri mahkemesi (HMK m.10)"],
  kesinYetkiMi: false,
  yasalDayanak: "HMK m.6, m.10",
  aciklama:
    "Sozlesmeden dogan davalarda, sozlesmenin ifa edilecegi yer mahkemesinde de dava acilabilir.",
};

/** Miras davalari yetkisi — kesin yetki */
const mirasKesinYetki: YetkiliMahkeme = {
  genelYetki: "Mirasbirakanin son yerlesim yeri mahkemesi (HMK m.11)",
  kesinYetki:
    "Mirasbirakanin son yerlesim yeri — KESIN YETKI (HMK m.11/1)",
  kesinYetkiMi: true,
  yasalDayanak: "HMK m.11",
  aciklama:
    "Miras hukukundan dogan davalarda kesin yetkili mahkeme, mirasbirakanin olumundeki son yerlesim yeri mahkemesidir. Taraflar anlasmayla degistiremez.",
};

/** Soybagi davalari yetkisi */
const soybagYetkisi: YetkiliMahkeme = {
  genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
  ozelYetki: [
    "Davacinin yerlesim yeri mahkemesi (TMK m.283, m.284)",
    "Cocugun oturma yeri mahkemesi",
  ],
  kesinYetkiMi: false,
  yasalDayanak: "HMK m.6, TMK m.283, m.284",
  aciklama:
    "Soybagi davalarinda davalinin veya davacinin yerlesim yeri mahkemesi yetkilidir.",
};

/** Nispi harcli davalar icin harc bilgisi */
const nispiHarc: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "nispi",
  nispiOran: NISPI_HARC_ORANI * 1000, // binde cinsinden
  pesinHarcOran: 0.25,
  aciklama:
    "Nispi harca tabi dava. Dava degerinin binde 68,31'i oraninda harc hesaplanir. Pesinharcolarakbunun 1/4'u dava acilirken odenir.",
};

/** Maktu harcli davalar icin harc bilgisi */
const maktuHarc: HarcBilgisi = {
  basvuruHarci: BASVURMA_HARCI,
  kararIlamHarci: "maktu",
  aciklama:
    "Maktu harca tabi dava. Basvurma harci ve maktu karar ilam harci odenir.",
};

/** Standart masraf bilgisi (tebligat + tanik) */
const standartMasraf: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  tanikUcreti: TANIK_UCRETI * 3,
  toplamTahmini: 1500,
  aciklama: "Tebligat, gider avansi ve tanik masraflari dahil tahmini tutar.",
};

/** Bilirkisi gerektiren davalar icin masraf */
const bilirkisiMasraf: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  bilirkisiUcreti: BILIRKISI_UCRETI,
  tanikUcreti: TANIK_UCRETI * 3,
  toplamTahmini: 5000,
  aciklama:
    "Tebligat, bilirkisi ucreti, gider avansi ve tanik masraflari dahil tahmini tutar.",
};

/** Kesif + bilirkisi gerektiren davalar icin masraf */
const kesfiBilirkisiMasraf: MasrafBilgisi = {
  tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
  bilirkisiUcreti: BILIRKISI_UCRETI,
  kesfUcreti: KESF_UCRETI,
  tanikUcreti: TANIK_UCRETI * 3,
  toplamTahmini: 9000,
  aciklama:
    "Tebligat, bilirkisi, kesif, gider avansi ve tanik masraflari dahil tahmini tutar.",
};

/** Arabuluculuk — zorunlu degil */
const arabuluculukYok: ArabuluculukBilgisi = {
  davaSarti: false,
  ihtiyari: true,
  aciklama: "Dava sarti olarak arabuluculuk zorunlu degildir. Ihtiyari arabuluculuga basvurulabilir.",
};

// ---------------------------------------------------------------------------
// 1.3. Borclar Hukuku / Sozlesme Davalari (madde 42-54)
// ---------------------------------------------------------------------------

const alacakDavasi: DavaTuru = {
  id: "alacak-davasi-genel",
  maddeNo: 42,
  ad: "Alacak Davasi (Genel Borc Iliskileri)",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: sozlesmeYetkisi,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Yerlesim yeri adresi", zorunlu: true },
    { bilgi: "Alacagin miktar ve kaynagi (sozlesme, fatura vb.)", zorunlu: true },
    { bilgi: "Davalinin kimlik ve adres bilgileri", zorunlu: true },
    { bilgi: "Odeme yapilip yapilmadigi ve kalan bakiye", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Sozlesme veya borc belgesi", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Fatura veya odeme belgeleri", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Ihtarname (cekilmisse)", zorunlu: false, nereden: "Noter" },
    { belge: "Banka hesap dokumleri", zorunlu: false, nereden: "Banka" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "10 yil",
    yasalDayanak: "TBK m.146",
    aciklama: "Kanunda aksine bir hukum bulunmadikca her alacak 10 yillik zamanasimisuresine tabidir.",
    baslangic: "Alacagin muaccel oldugu tarih",
  },
  pratikNot:
    "Belirsiz alacak davasi (HMK m.107) olarak da acilabilir. Likit alacaklarda icra takibi yoluyla itirazin iptali daha avantajli olabilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.10", "HMK m.107", "HMK m.119"],
  ozelKanunlar: ["TBK m.83-98", "TBK m.146"],
};

const itirazinIptaliDavasi: DavaTuru = {
  id: "itirazin-iptali",
  maddeNo: 43,
  ad: "Itirazin Iptali Davasi",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
    ozelYetki: [
      "Icra takibinin yapildigi yer mahkemesi (IIK m.67)",
      "Sozlesmenin ifa yeri mahkemesi (HMK m.10)",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, m.10, IIK m.67",
    aciklama:
      "Itirazin iptali davasi genel yetkili mahkemede veya icra takibinin yapildigi yer mahkemesinde acilabilir.",
  },
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Icra dosya numarasi ve icra dairesi", zorunlu: true },
    { bilgi: "Alacagin miktar ve kaynagi", zorunlu: true },
    { bilgi: "Borckunun itiraz dilekcesininyazilartarihi", zorunlu: true },
    { bilgi: "Davalinin kimlik ve adres bilgileri", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Icra dosyasi sureti (odeme emri ve itiraz dilekces)", zorunlu: true, nereden: "Icra dairesi" },
    { belge: "Alacaga dayanak belgeler (sozlesme, fatura vb.)", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Ihtarname (varsa)", zorunlu: false, nereden: "Noter" },
    { belge: "Banka hesap dokumleri", zorunlu: false, nereden: "Banka" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "1 yil (itirazin tebliginden itibaren)",
    yasalDayanak: "IIK m.67/1",
    aciklama:
      "Alacakli, itirazin tebliginden itibaren 1 yil icinde itirazin iptali davasi acmak zorundadir. Bu sure hak dusurucudur.",
    baslangic: "Itirazin alacakliya teblig edildigi tarih",
  },
  pratikNot:
    "Icra inkar tazminati (%20) talep edilebilir. 1 yillik hak dusurucusureicindetakip sirasindaki alacak tutari uzerinden dava acilmalidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.10"],
  ozelKanunlar: ["IIK m.67", "IIK m.68"],
};

const menfiTespitDavasi: DavaTuru = {
  id: "menfi-tespit",
  maddeNo: 44,
  ad: "Menfi Tespit Davasi (Borclu Olmadiginin Tespiti)",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
    ozelYetki: [
      "Icra takibinin yapildigi yer mahkemesi (IIK m.72)",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, IIK m.72",
    aciklama:
      "Menfi tespit davasi icra takibinden once veya sonra acilabilir. Icra takibinden sonra acilirsa takibin yapildigi icra dairesinin bulundugu yer mahkemesinde de acilabilir.",
  },
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Borclu olunmadigi iddia edilen miktar", zorunlu: true },
    { bilgi: "Borcun kaynagi ve neden borclu olunmadigi", zorunlu: true },
    { bilgi: "Icra takibi varsa dosya numarasi", zorunlu: false },
    { bilgi: "Davalinin kimlik ve adres bilgileri", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Borclu olunmadigini gosteren belgeler", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Icra dosyasi sureti (takip varsa)", zorunlu: false, nereden: "Icra dairesi" },
    { belge: "Odeme belgeleri (dekont, makbuz vb.)", zorunlu: false, nereden: "Muvekkil/Banka" },
    { belge: "Sozlesme veya senet sureti", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "Takipten once: genel zamanasiminatabidir. Takipten sonra: icra takibi kesinlesene kadar.",
    yasalDayanak: "IIK m.72, TBK m.146",
    aciklama:
      "Menfi tespit davasi icra takibinden once veya sonra acilabilir. Borcun odenmesindensonra istirdat davasina donusur.",
  },
  pratikNot:
    "Icra takibinden sonra acilirsa %15 teminat yatirilmasi ile icranin durdurulmasi talep edilebilir (IIK m.72/3). Takipten once acilirsa ihtiyati tedbir ile takibin engellenmesi istenebilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.106"],
  ozelKanunlar: ["IIK m.72"],
};

const istirdatDavasi: DavaTuru = {
  id: "istirdat-davasi",
  maddeNo: 45,
  ad: "Istirdat (Geri Alma) Davasi",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
    ozelYetki: [
      "Icra takibinin yapildigi yer mahkemesi (IIK m.72/7)",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, IIK m.72/7",
    aciklama:
      "Istirdat davasi, paranin odendigi veya icra takibinin yapildigi yer mahkemesinde acilabilir.",
  },
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Geri alinmak istenen tutar", zorunlu: true },
    { bilgi: "Odemenin yapildigi tarih ve sekli", zorunlu: true },
    { bilgi: "Borcun mevcut olmadigina dair gerekce", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Odeme belgesi (dekont, makbuz)", zorunlu: true, nereden: "Muvekkil/Banka" },
    { belge: "Icra dosyasi sureti (icra yoluyla odenmisse)", zorunlu: false, nereden: "Icra dairesi" },
    { belge: "Borcun olmadigini kanitlayan belgeler", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Sozlesme sureti (varsa)", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "1 yil (paranin odenmesinden itibaren)",
    yasalDayanak: "IIK m.72/7",
    aciklama:
      "Istirdat davasi, paranin tamamen odendigi tarihten itibaren 1 yil icinde acilmalidir.",
    baslangic: "Paranin odendigi tarih",
  },
  pratikNot:
    "Menfi tespit davasi sirasinda borc odenmisse dava istirdat davasina donusur (IIK m.72/6). Sebepsiz zenginlesme hukumlerinden farklidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6"],
  ozelKanunlar: ["IIK m.72"],
};

const sozlesmeninFeshiDavasi: DavaTuru = {
  id: "sozlesmenin-feshi",
  maddeNo: 46,
  ad: "Sozlesmenin Feshi Davasi",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: sozlesmeYetkisi,
  harclar: maktuHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Sozlesmenin tarihi, turu ve taraflari", zorunlu: true },
    { bilgi: "Fesih gerekceleri ve ihlal edilen hukumler", zorunlu: true },
    { bilgi: "Karsitarafa ihtar cekilip cekilmedigi", zorunlu: true },
    { bilgi: "Ugranilanmaddi zarar (varsa)", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Sozlesme asliveya sureti", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Ihtarname (cekilmisse)", zorunlu: false, nereden: "Noter" },
    { belge: "Ihlali gosteren belgeler (tutanak, yazisma vb.)", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "10 yil",
    yasalDayanak: "TBK m.146",
    aciklama: "Sozlesmesel haklar 10 yillik genel zamanasimisuresine tabidir.",
    baslangic: "Fesih hakkinin dogdugu tarih",
  },
  pratikNot:
    "Donme (TBK m.123-125) veya fesih (TBK m.126) ayrimi yapilmalidir. Donme gecehalide etki eder, fesih ileriye donuktur. Tazminat talebi varsa nispi harc alinir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.10"],
  ozelKanunlar: ["TBK m.117-126", "TBK m.146"],
};

const sozlesmeninUyarlanmasi: DavaTuru = {
  id: "sozlesmenin-uyarlanmasi",
  maddeNo: 47,
  ad: "Sozlesmenin Uyarlanmasi Davasi (Asiri Ifa Guclugu)",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: sozlesmeYetkisi,
  harclar: maktuHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Sozlesme bilgileri (tarih, tur, taraflar)", zorunlu: true },
    { bilgi: "Asiri ifa guclugune yol acan olagin ustuluk olay", zorunlu: true },
    { bilgi: "Mevcut edim dengesindeki bozulmanin boyutu", zorunlu: true },
    { bilgi: "Talep edilen uyarlama icerik", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Sozlesme asli veya sureti", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Asiri ifa guclugunu kanitlayan belgeler (piyasa verileri, enflasyon vb.)", zorunlu: true, nereden: "Muvekkil/Resmi kurumlar" },
    { belge: "Taraflararasi yazismalar", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Bilirkisi raporu (onceden yaptirildiysa)", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "10 yil",
    yasalDayanak: "TBK m.146",
    aciklama: "Sozlesmesel haklar genel zamanasimisuresine tabidir.",
    baslangic: "Asiri ifa guclugu kosullarinin olustu tarih",
  },
  pratikNot:
    "TBK m.138 kosullari: (1) Sozlesme yapildiktan sonra taraflarin ongorsemedigi olaganustu hal, (2) Borcludan kaynaklanmayan neden, (3) Edim dengesinin asiri bozulmasi, (4) Borclu henuz edimini ifa etmemis veya ifanin asiri guclesmesinden dogan haklarini sakli tutarak ifa etmis olmalidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.10"],
  ozelKanunlar: ["TBK m.138"],
};

const kiraDisTahliye: DavaTuru = {
  id: "kira-disi-tahliye",
  maddeNo: 48,
  ad: "Kira Disi Tahliye Davalari (Haksiz Isgal)",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
    ozelYetki: [
      "Tasinmazin bulundugu yer mahkemesi (HMK m.12)",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, m.12",
    aciklama:
      "Kira iliskisi olmaksizin haksiz isgale dayanan tahliye davalarinda tasinmazin bulundugu yer mahkemesi de yetkilidir. Ayni hakka dayaniyorsa kesin yetkidir.",
  },
  harclar: maktuHarc,
  masraflar: kesfiBilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tasinmazin adresi ve tapu bilgileri", zorunlu: true },
    { bilgi: "Haksiz isgalin baslangic tarihi ve durumu", zorunlu: true },
    { bilgi: "Ecrimisil (haksiz isgal tazminati) talebi", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Tapu senedi veya kaydi", zorunlu: true, nereden: "Tapu mudurlugu / e-Devlet" },
    { belge: "Ihtarname (cekilmisse)", zorunlu: false, nereden: "Noter" },
    { belge: "Haksiz isgali gosteren fotograflar, tutanaklar", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "Mulkiyet hakkina dayanildigi surece zamanasimiislemez",
    yasalDayanak: "TMK m.683",
    aciklama: "Mulkiyet hakkina dayanan elatmanin onlenmesi davalari zamanasimina tabi degildir. Ecrimisil icin 5 yillik zamanasimivardir.",
  },
  pratikNot:
    "Kira iliskisine dayanan tahliye davalari sulh hukuk mahkemesinin gorevindedir. Bu dava turu kira sozlesmesi bulunmayan haksiz isgal hallerini kapsar.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.12"],
  ozelKanunlar: ["TMK m.683", "TBK m.77"],
};

const eserSozlesmesi: DavaTuru = {
  id: "eser-sozlesmesi",
  maddeNo: 49,
  ad: "Eser Sozlesmesinden Dogan Uyusmazliklar",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: sozlesmeYetkisi,
  harclar: nispiHarc,
  masraflar: kesfiBilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Sozlesme bilgileri (taraflar, tarih, bedel)", zorunlu: true },
    { bilgi: "Eserdeki ayip veya eksiklikler", zorunlu: true },
    { bilgi: "Odenen ve kalan bedel miktari", zorunlu: true },
    { bilgi: "Teslim tarihi ve fiili teslim durumu", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Eser sozlesmesi", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Odeme belgeleri (dekont, makbuz)", zorunlu: true, nereden: "Muvekkil/Banka" },
    { belge: "Ayip ihbar bildirimi (ihtarname)", zorunlu: false, nereden: "Noter" },
    { belge: "Fotograflar, teknik raporlar", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Taraflar arasi yazismalar", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "5 yil (tasinmazlar icin); 2 yil (tasinirlar icin) — ayip halinde",
    yasalDayanak: "TBK m.478",
    aciklama: "Eser sozlesmesinde ayip nedeniyle haklarin dusme suresi: tasinirlarda 2, tasinmazlarda 5 yildir. Isverenhakkinin kotuniyet olmasi halinde 20 yildir.",
    baslangic: "Eserin teslim tarihi",
  },
  pratikNot:
    "Ayip ihbari TBK m.474 uyarinca makul sure icinde yapilmalidir. Eserin kabulunden sonra gizli ayiplar icin sureler farklidir. Tuketiciye yonelik eserlerde tuketici mahkemesi gorevli olabilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.10"],
  ozelKanunlar: ["TBK m.470-486"],
};

const vekaletSozlesmesi: DavaTuru = {
  id: "vekalet-sozlesmesi",
  maddeNo: 50,
  ad: "Vekalet Sozlesmesinden Dogan Davalar",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: sozlesmeYetkisi,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Vekalet sozlesmesinin konusu ve taraflari", zorunlu: true },
    { bilgi: "Vekilin yukumluluklerini ihlal ettigi iddiasi", zorunlu: true },
    { bilgi: "Ugranilanmaddi zarar miktari", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Vekalet sozlesmesi veya vekaletname", zorunlu: true, nereden: "Muvekkil/Noter" },
    { belge: "Zarari gosteren belgeler", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Yazismalar ve talimatlar", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Hesap dokumu (alinan/odenen paralar)", zorunlu: false, nereden: "Banka" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "5 yil",
    yasalDayanak: "TBK m.147/5",
    aciklama: "Vekalet sozlesmesinden dogan alacaklar 5 yillik zamanasimisuresine tabidir.",
    baslangic: "Zararin ogrenildigi veya sozlesmenin sona erdigi tarih",
  },
  pratikNot:
    "Vekilin ozen yuekuemluelueue TBK m.506 uyarinca vardir. Avukat hatasi nedeniyle acilan davalarda 1136 sy. Avukatlik Kanunu hukumleri de dikkate alinir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.10"],
  ozelKanunlar: ["TBK m.502-514", "TBK m.147/5"],
};

const ariyetSozlesmesi: DavaTuru = {
  id: "ariyet-sozlesmesi",
  maddeNo: 51,
  ad: "Ariyet (Odunc) Sozlesmesinden Dogan Davalar",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: sozlesmeYetkisi,
  harclar: nispiHarc,
  masraflar: standartMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Odunc verilen sey (tasinir/tasinmaz)", zorunlu: true },
    { bilgi: "Odunc verilme tarihi ve iade suresi", zorunlu: true },
    { bilgi: "Davalinin kimlik ve adres bilgileri", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Ariyet sozlesmesi (varsa)", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Odunc verilen seyin degerini gosteren belgeler", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Ihtarname (iade talep edilmisse)", zorunlu: false, nereden: "Noter" },
    { belge: "Tanik listesi", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "10 yil",
    yasalDayanak: "TBK m.146",
    aciklama: "Ariyet sozlesmesinden dogan iade borcu genel zamanasimisuersine tabidir.",
    baslangic: "Iade talebinin yapildigi tarih",
  },
  pratikNot:
    "Ariyet kullanim oduncudur ve bedelsizdir (TBK m.379). Tuketim oduncu (karz) ile karistirilmamalidir. Karz da paranin odunc verilmesidir (TBK m.386).",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.10"],
  ozelKanunlar: ["TBK m.379-385"],
};

const bagislamaVaadindenDonme: DavaTuru = {
  id: "bagislama-vaadinden-donme",
  maddeNo: 52,
  ad: "Bagislama Vaadinden Donme Davasi",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: genelYetki,
  harclar: nispiHarc,
  masraflar: standartMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Bagislama vaadi konusu ve bedeli", zorunlu: true },
    { bilgi: "Donme nedeni (TBK m.295)", zorunlu: true },
    { bilgi: "Bagis alanin kimlik bilgileri", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Bagislama sozlesmesi/vaadi (yazili)", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Donme nedenini kanitlayan belgeler", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Ihtarname (cekilmisse)", zorunlu: false, nereden: "Noter" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "1 yil (donme nedeninin ogrenilmesinden itibaren)",
    yasalDayanak: "TBK m.297",
    aciklama: "Bagislamadan donme hakki, donme sebebinin ogrenilmesinden itibaren 1 yil icinde kullanilmalidir.",
    baslangic: "Donme sebebinin ogrenildigi tarih",
  },
  pratikNot:
    "Bagislama vaadi yazili sekle tabidir (TBK m.289). Bagislamadan donme sebepleri: agir nankorluk, yardim yukumlulugunun yerine getirilmemesi, sozlesme kosullarinin ihlali (TBK m.295).",
  hmkMaddeleri: ["HMK m.2", "HMK m.6"],
  ozelKanunlar: ["TBK m.285-298"],
};

const culpaInContrahendo: DavaTuru = {
  id: "culpa-in-contrahendo",
  maddeNo: 53,
  ad: "Sozlesme Oncesi (Culpa in Contrahendo) Sorumluluk Davalari",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: genelYetki,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Sozlesme gorusmeleri sureci ve taraflar", zorunlu: true },
    { bilgi: "Karsi tarafin kusurlu davranisi", zorunlu: true },
    { bilgi: "Ugranilanmaddi zarar (olumsuz/menfi zarar)", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Sozlesme gorusmelerine iliskin yazismalar", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Yapilan masraflari gosteren belgeler", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Kusurlu davranisi kanitlayan deliller", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Tanik bilgileri", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "10 yil",
    yasalDayanak: "TBK m.146",
    aciklama: "Sozlesme oncesi sorumlulukta genel zamanasimiuygulanir.",
    baslangic: "Zararin ogrenildigi tarih",
  },
  pratikNot:
    "Culpa in contrahendo haksiz fiile degil guven ilkesine dayanan bir sorumluluk turudur. Ispatlanacak zarar menfi zararin (olumsuz zarar: sozlesmenin kurulacagina guvenilerek yapilan masraflar ve kacirilan firsatlar) dir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6"],
  ozelKanunlar: ["TBK m.114", "TMK m.2"],
};

const cezaiSartDavasi: DavaTuru = {
  id: "cezai-sart-indirilmesi",
  maddeNo: 54,
  ad: "Cezai Sartin Indirilmesi/Iptali Talebi Davalari",
  kategori: "asliye-hukuk",
  altKategori: "borclar-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: sozlesmeYetkisi,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Sozlesme bilgileri ve cezai sart maddesi", zorunlu: true },
    { bilgi: "Cezai sartin asiri olduguna dair gerekce", zorunlu: true },
    { bilgi: "Fiili zarar miktari (karsilastirma icin)", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Sozlesme asli (cezai sart maddesi gorunecek)", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Karsi tarafin zarar miktarini gosteren belgeler", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Emsal sozlesmeler (asirilik karsilastirmasi icin)", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "10 yil",
    yasalDayanak: "TBK m.146",
    aciklama: "Sozlesmesel iliskiden dogan talepler genel zamanasimisuersine tabidir.",
  },
  pratikNot:
    "Hakim asiri gordugu cezai sarti re'sen indirir (TBK m.182/3). Tacirler arasinda cezai sart indirimi talep edilemez (TTK m.22). Ticari davalarda bu kural dikkate alinmalidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.10"],
  ozelKanunlar: ["TBK m.179-182", "TTK m.22"],
};

// ---------------------------------------------------------------------------
// 1.4. Kisilik Haklari ve Nufus Davalari (madde 55-65)
// ---------------------------------------------------------------------------

const kisilikHaklariTazminat: DavaTuru = {
  id: "kisilik-haklari-tazminat",
  maddeNo: 55,
  ad: "Kisilik Haklarina Saldiri Nedeniyle Tazminat Davalari",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
    ozelYetki: [
      "Haksiz fiilin islendigiveya zararin meydana geldigi yer (HMK m.16)",
      "Davacinin yerlesim yeri mahkemesi (HMK m.16)",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, m.16",
    aciklama:
      "Kisilik haklarina saldiri haksiz fiil niteliginde oldugundan HMK m.16 uyarinca secimlik yetki kurallari uygulanir.",
  },
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir. Ancak sulh ve feragat icin ozel yetki gerekir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Kisilik hakkina yapilan saldirinin niteligi ve tarihi", zorunlu: true },
    { bilgi: "Talep edilen maddi ve manevi tazminat miktari", zorunlu: true },
    { bilgi: "Saldiriyi gerceklestiren kisinin bilgileri", zorunlu: true },
    { bilgi: "Taniklar", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Saldiriyi kanitlayan deliller (yayin, goruntu, mesaj vb.)", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Zarari kanitlayan belgeler (saglik raporu, gelir kaybi vb.)", zorunlu: false, nereden: "Muvekkil/Hastane" },
    { belge: "Ihtarname (gonderilmisse)", zorunlu: false, nereden: "Noter" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "2 yil (ogrenme) / 10 yil (fiil)",
    yasalDayanak: "TBK m.72",
    aciklama:
      "Haksiz fiilden dogan tazminat davasi, zarari ve tazminat yukumlusunun ogrenildigi tarihten itibaren 2, her halde fiilin islendigitarihten itibaren 10 yil icinde zamanasiminaugar.",
    baslangic: "Zararin ve sorumlunun ogrenildigi tarih",
  },
  pratikNot:
    "TMK m.24-25 uyarinca saldirinin durdurulmasi, onlenmesi ve tespit davalari da acilabilir. Manevi tazminat istenmese bile saldirinin tespiti istenebilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16"],
  ozelKanunlar: ["TMK m.24-25", "TBK m.49-58", "TBK m.72"],
};

const adSoyadDegistirme: DavaTuru = {
  id: "ad-soyad-degistirme",
  maddeNo: 56,
  ad: "Ad ve Soyadi Degistirme/Duzeltme Davasi",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davacinin yerlesim yeri mahkemesi",
    kesinYetkiMi: false,
    yasalDayanak: "5490 sy. Kanun m.36",
    aciklama:
      "Nufus kayitlarina iliskin davalarda davacinin yerlesim yeri mahkemesi yetkilidir.",
  },
  harclar: maktuHarc,
  masraflar: standartMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mevcut ad/soyad", zorunlu: true },
    { bilgi: "Talep edilen yeni ad/soyad", zorunlu: true },
    { bilgi: "Degistirme nedeni (hakli sebep)", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Degistirme nedenini destekleyen belgeler", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Tanik listesi (sosyal cevre tarafindan yeni ad ile tanindigi)", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "basit",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Nufus davalari arabuluculuga elverissiz degildir.",
  },
  pratikNot:
    "TMK m.27 uyarinca hakli sebep varsa ad degistirme talep edilebilir. Karar kesinlestikten sonra nufus mudurluune bildirilir. Gazete ilani kaldirildiri (7 Subat 2024).",
  hmkMaddeleri: ["HMK m.2", "HMK m.316", "HMK m.382-388"],
  ozelKanunlar: ["TMK m.27", "5490 sy. Nufus Hizmetleri Kanunu m.36"],
};

const yasDuzeltme: DavaTuru = {
  id: "yas-duzeltme",
  maddeNo: 57,
  ad: "Yas Duzeltme (Kucultme/Buyultme) Davasi",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davacinin yerlesim yeri mahkemesi",
    kesinYetkiMi: false,
    yasalDayanak: "5490 sy. Kanun m.36",
    aciklama: "Nufus kayitlarina iliskin davalarda davacinin yerlesim yeri mahkemesi yetkilidir.",
  },
  harclar: maktuHarc,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
    bilirkisiUcreti: BILIRKISI_UCRETI,
    toplamTahmini: 4500,
    aciklama: "Kemik yasi tespiti icin Adli Tip bilirkisisi ucreti dahil tahmini tutar.",
  },
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mevcut dogum tarihi (nufus kaydindaki)", zorunlu: true },
    { bilgi: "Gercek dogum tarihi iddiasi", zorunlu: true },
    { bilgi: "Duzeltme nedeni ve deliller", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Hastane dogum kaydi (varsa)", zorunlu: false, nereden: "Hastane/Saglik bakanligi" },
    { belge: "Okul kayitlari", zorunlu: false, nereden: "Okul" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "basit",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Nufus davalari arabuluculuga elverissiz degildir.",
  },
  pratikNot:
    "Yas duzeltme davasi bir kez acilabilir (5490 sy. K. m.36/1-b). Kemik yasi tespitiicin Adli Tip Kurumuna sevk yapilir. Nufus mudurlugu davada taraf olarak yer alir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.316", "HMK m.382-388"],
  ozelKanunlar: ["5490 sy. Nufus Hizmetleri Kanunu m.36"],
};

const cinsiyetDegistirme: DavaTuru = {
  id: "cinsiyet-degistirme-izni",
  maddeNo: 58,
  ad: "Cinsiyet Degistirme Izni Davasi",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davacinin yerlesim yeri mahkemesi",
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, TMK m.40",
    aciklama: "Cinsiyet degistirme izni davasinda davacinin yerlesim yeri mahkemesi yetkilidir.",
  },
  harclar: maktuHarc,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 2,
    bilirkisiUcreti: BILIRKISI_UCRETI,
    toplamTahmini: 4000,
    aciklama: "Saglik kurulu raporu ve bilirkisi ucreti dahil tahmini tutar.",
  },
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Yerlesim yeri adresi", zorunlu: true },
    { bilgi: "Transseksuel yapiya sahip olduguna dair beyan", zorunlu: true },
    { bilgi: "Medeni hal (evli ise evlilik bosanma ile sonlanmis olmali)", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Resmi saglik kurulu raporu (transseksuel yapi)", zorunlu: true, nereden: "Egitim ve arastirma hastanesi" },
    { belge: "Psikiyatri raporu", zorunlu: true, nereden: "Hastane" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "basit",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Kisilik haklarina iliskin dava, arabuluculuga elverissiz degildir.",
  },
  pratikNot:
    "TMK m.40 kosullari: 18 yasini doldurmus, evli olmamak, transseksuel yapida oldugunu resmi saglik kurulu raporuyla belgelemek, ureme yeteneginden surekli olarak yoksun bulunmak. Once izin karari, sonra ameliyat, sonra nufus duzeltme karari.",
  hmkMaddeleri: ["HMK m.2", "HMK m.316", "HMK m.382-388"],
  ozelKanunlar: ["TMK m.40"],
};

const nufusKaydiDuzeltme: DavaTuru = {
  id: "nufus-kaydi-duzeltme",
  maddeNo: 59,
  ad: "Nufus Kaydinin Duzeltilmesi Davasi",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davacinin yerlesim yeri mahkemesi",
    kesinYetkiMi: false,
    yasalDayanak: "5490 sy. Kanun m.36",
    aciklama: "Nufus kayitlarina iliskin davalarda davacinin yerlesim yeri mahkemesi yetkilidir.",
  },
  harclar: maktuHarc,
  masraflar: standartMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Duzeltilmesi istenen kayit (ad, soyad, dogum yeri, anne-baba adi vb.)", zorunlu: true },
    { bilgi: "Dogru bilgi ve kaynagi", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Duzeltmeyi destekleyen belgeler (hastane kaydi, okul kaydi vb.)", zorunlu: true, nereden: "Ilgili kurum" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "basit",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Nufus davalari arabuluculuga elverissiz degildir.",
  },
  pratikNot:
    "Nufus mudurlugu hasim (davali) olarak gosterilir. C. Savcisinin davaya katilimi zorunludur (5490 m.36/1-a).",
  hmkMaddeleri: ["HMK m.2", "HMK m.316", "HMK m.382-388"],
  ozelKanunlar: ["5490 sy. Nufus Hizmetleri Kanunu m.35-36"],
};

const gaiplikKarari: DavaTuru = {
  id: "gaiplik-karari",
  maddeNo: 60,
  ad: "Gaiplik Karari Verilmesi Davasi",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Gaip hakkinda bilinen son yerlesim yeri mahkemesi",
    kesinYetkiMi: false,
    yasalDayanak: "TMK m.32, HMK m.6",
    aciklama: "Gaiplik karari, gaip hakkinda bilinen son yerlesim yeri mahkemesinden istenir.",
  },
  harclar: maktuHarc,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 2,
    diger: [{ ad: "Gazete ilan masrafi", tutar: 3000 }],
    toplamTahmini: 4500,
    aciklama: "Tebligat, gazete ilani (en az 2 ilan 6 aylik araliklarla) masraflari dahil.",
  },
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Gaip kisinin kimlik bilgileri", zorunlu: true },
    { bilgi: "Son haber alinma tarihi ve yeri", zorunlu: true },
    { bilgi: "Gaiplik karari alinmasindaki hukuki yarar (miras, bosanma vb.)", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Arastirma sonuclari (kolluk, konsolosluk yazilari)", zorunlu: true, nereden: "Emniyet/Jandarma" },
    { belge: "Tanik listesi", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "basit",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Cekismesiz yargi isi olup arabuluculuga tabi degildir.",
  },
  zamanasimi: {
    sure: "Olum tehlikesi: 1 yil / Uzun sureden beri haber alinamama: 5 yil",
    yasalDayanak: "TMK m.32-33",
    aciklama: "Olum tehlikesi icinde kaybolan kisi icin tehlikeden 1 yil sonra; uzun suredir haber alinamamis kisi icin son haber tarihinden 5 yil sonra gaiplik istenebilir.",
    baslangic: "Son haber tarihi veya tehlike tarihi",
  },
  pratikNot:
    "Gaiplik karari icin en az 6 ay araliklarla 2 kez ilan yapilmalidir (TMK m.33). Gaiplik, olum karinesi degildir; miras hakki ancak gaiplik karari kesinlestikten sonra teminat karsiliginda kullanilabilir (TMK m.584-585).",
  hmkMaddeleri: ["HMK m.2", "HMK m.316", "HMK m.382-388"],
  ozelKanunlar: ["TMK m.32-35", "TMK m.584-585"],
};

const olumKarinesi: DavaTuru = {
  id: "olum-karinesi",
  maddeNo: 61,
  ad: "Olum Karinesi ile Ilgili Kararlar",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Olen kisinin son yerlesim yeri mahkemesi",
    kesinYetkiMi: false,
    yasalDayanak: "TMK m.31, HMK m.6",
    aciklama: "Olum karinesi davasi olen kisinin bilinen son yerlesim yeri mahkemesinde acilir.",
  },
  harclar: maktuHarc,
  masraflar: standartMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Olumu kesin olan kisinin kimlik bilgileri", zorunlu: true },
    { bilgi: "Olum olayinin tarih ve kosullari", zorunlu: true },
    { bilgi: "Olum tutanagi alinamamasinin nedeni", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Olayi gosteren resmi tutanaklar (itfaiye, kolluk, AFAD)", zorunlu: true, nereden: "Resmi kurum" },
    { belge: "Tanik listesi", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "basit",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Cekismesiz yargi isi olup arabuluculuga tabi degildir.",
  },
  pratikNot:
    "TMK m.31: Cesedi bulunamayan ancak olumu kesin olan kisi, olum karinesine tabi tutulur. Gaiplik islemine gerek yoktur. Karar kesinlesince nufus kaydi kapanir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.316", "HMK m.382-388"],
  ozelKanunlar: ["TMK m.31"],
};

const derneklerVakiflar: DavaTuru = {
  id: "dernekler-vakiflar",
  maddeNo: 62,
  ad: "Dernekler ve Vakiflar Hukukundan Dogan Davalar",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Dernegin veya vakfin merkezinin bulundugu yer mahkemesi",
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, m.14",
    aciklama: "Dernek veya vakif aleyhine acilan davalarda tuzel kisinin merkez adresi yetkili mahkemeyi belirler.",
  },
  harclar: maktuHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Dernek/vakif unvani ve merkez adresi", zorunlu: true },
    { bilgi: "Uyusmazligin konusu (uyelik, genel kurul, tuzel kisilgin sona ermesi vb.)", zorunlu: true },
    { bilgi: "Ilgili organkararinin tarihi ve icerigi", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Dernek/vakif tuzugu veya senedi", zorunlu: true, nereden: "Dernekler Il Mudurlugu / Vakiflar Genel Mudurlugu" },
    { belge: "Genel kurul/yonetim kurulu karar tutanagi", zorunlu: false, nereden: "Dernek/Vakif" },
    { belge: "Uyelik belgesi", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "Kararin ogrenilmesinden itibaren 1 ay, her halde karar tarihinden itibaren 1 yil (genel kurul karari iptali icin)",
    yasalDayanak: "TMK m.83",
    aciklama: "Dernek genel kurul kararlarinin iptali icin ozel sureler vardir.",
  },
  pratikNot:
    "Dernek kapatma davalari C. Savciligi tarafindan re'sen acilir. Vakif senetinin degistirilmesi mahkeme kararini gerektirir (TMK m.113).",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.14"],
  ozelKanunlar: ["TMK m.56-117", "5253 sy. Dernekler Kanunu"],
};

const basinKisilikIhlali: DavaTuru = {
  id: "basin-kisilik-ihlali",
  maddeNo: 63,
  ad: "Basin Yoluyla Kisilik Hakki Ihlali Davalari",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
    ozelYetki: [
      "Yayinin dagitildigi/yayinlandigi yer mahkemesi (HMK m.16)",
      "Davacinin yerlesim yeri mahkemesi (HMK m.16)",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, m.16",
    aciklama: "Basin yoluyla kisilik ihlali haksiz fiil niteliginde oldugundan secimlik yetki uygulanir.",
  },
  harclar: nispiHarc,
  masraflar: standartMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Ihlal iceren yayinin tarihi, yeri ve icerigi", zorunlu: true },
    { bilgi: "Talep edilen maddi/manevi tazminat miktari", zorunlu: true },
    { bilgi: "Cevap ve duzeltme hakki kullanildi mi?", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Ihlal iceren yayinin ornegi (gazete kupuru, dergi sayfasi)", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Yayinin tarih ve sayfasini gosteren belge", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Zarari gosteren belgeler", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Cevap ve duzeltme talebi yapildiysa belgesi", zorunlu: false, nereden: "Muvekkil/Noter" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "2 yil (ogrenme) / 10 yil (fiil)",
    yasalDayanak: "TBK m.72",
    aciklama: "Haksiz fiilden dogan tazminat davasinin zamanasimisureleri uygulanir.",
    baslangic: "Yayinin ogrenildigi tarih",
  },
  pratikNot:
    "5187 sy. Basin Kanunu m.14 uyarinca cevap ve duzeltme hakki kullanilabilir (3 gun icinde talep, 3 gun icinde yayin). Tazminat davasi bu hakkin kullanilmasindan bagimsizdir. Basin iscisi sorumlu yazi isleri mudurudur, yayin sahibi de teselsul sorumludur.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16"],
  ozelKanunlar: ["5187 sy. Basin Kanunu", "TMK m.24-25", "TBK m.49-58"],
};

const internetKisilikIhlali: DavaTuru = {
  id: "internet-kisilik-ihlali",
  maddeNo: 64,
  ad: "Internet (Sosyal Medya) Yoluyla Kisilik Hakki Ihlali Davalari",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Davalinin yerlesim yeri mahkemesi (HMK m.6)",
    ozelYetki: [
      "Davacinin yerlesim yeri mahkemesi (HMK m.16)",
      "Zararin meydana geldigi yer mahkemesi (HMK m.16)",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "HMK m.6, m.16",
    aciklama: "Internet yoluyla kisilik ihlali haksiz fiil olarak degerlendirilir, secimlik yetki uygulanir.",
  },
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Ihlal iceren icerik (URL, ekran goruntusu)", zorunlu: true },
    { bilgi: "Talep edilen tazminat miktari", zorunlu: true },
    { bilgi: "Ihlali gerceklestiren kisinin bilgileri (biliniyorsa)", zorunlu: true },
    { bilgi: "Icerik kaldirilmasi ve/veya erisim engellenmesi talebi", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Ekran goruntuleri ve URL bilgileri (noter tasdikli)", zorunlu: true, nereden: "Muvekkil/Noter" },
    { belge: "IP tespiti icin savciliguaulunan sirket bilgileri", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Zarari gosteren belgeler", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "2 yil (ogrenme) / 10 yil (fiil)",
    yasalDayanak: "TBK m.72",
    aciklama: "Haksiz fiilden dogan tazminat davasinin zamanasimisureleri uygulanir.",
    baslangic: "Icerigin ogrenildigi tarih",
  },
  pratikNot:
    "5651 sy. Kanun m.9 uyarinca icerik kaldirma ve erisim engelleme icin sulh ceza hakimligine basvuru yapilabilir. Tazminat davasi ayri acilir. Delil tespiti icin noter tasdikli ekran goruntusu onemlidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.6", "HMK m.16"],
  ozelKanunlar: ["TMK m.24-25", "TBK m.49-58", "5651 sy. Internet Kanunu"],
};

const erisimEngelleme: DavaTuru = {
  id: "erisim-engelleme",
  maddeNo: 65,
  ad: "Erisim Engelleme ve Icerik Kaldirma Davalari",
  kategori: "asliye-hukuk",
  altKategori: "kisilik-haklari",
  gorevliMahkeme: {
    mahkeme: "Sulh Ceza Hakimligi (erisim engelleme) / Asliye Hukuk Mahkemesi (tazminat)",
    yasalDayanak: "5651 sy. Kanun m.9, HMK m.2",
    aciklama: "Erisim engelleme ve icerik kaldirma karari sulh ceza hakimliginden alinir. Bunun yaninda kisilik hakkinin ihlali nedeniyle tazminat davasi asliye hukuk mahkemesinde acilir.",
    ozelDurum: "Salt erisim engelleme talepleri sulh ceza hakimliginin gorev alanindadir.",
  },
  yetkiliMahkeme: {
    genelYetki: "Davacinin yerlesim yeri mahkemesi",
    ozelYetki: [
      "Icerigin erisime sunuldugu yer mahkemesi",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "5651 sy. Kanun m.9, HMK m.6, m.16",
    aciklama: "Erisim engelleme istemi davacinin yerlesmiyerindeki sulh ceza hakimligine yapilir.",
  },
  harclar: maktuHarc,
  masraflar: standartMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Ihlal iceren URL adresleri", zorunlu: true },
    { bilgi: "Kisilik hakkinin nasil ihlal edildigi", zorunlu: true },
    { bilgi: "Icerik saglayici/yer saglayici bilgileri (biliniyorsa)", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Ekran goruntuleri (noter tasdikli tercih edilir)", zorunlu: true, nereden: "Muvekkil/Noter" },
    { belge: "URL listesi", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Icerik saglayiciya yaplan bildirim belgesi (varsa)", zorunlu: false, nereden: "Muvekkil" },
    { belge: "Kimlik fotokopisi", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "basit",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Erisim engelleme kararlari icin arabuluculuk uygulanmaz.",
  },
  pratikNot:
    "5651 sy. Kanun m.9'a gore icerik saglayiciya basvuru → yer saglayiciya basvuru → sulh ceza hakimligi sirasi izlenir. 24 saat icinde karar verilir. BTK araciligiyla erisim engellenir. Unutulma hakki (5651 m.9/A) ayri bir basvuru yoludur.",
  hmkMaddeleri: ["HMK m.2", "HMK m.316"],
  ozelKanunlar: ["5651 sy. Internet Kanunu m.8, m.9, m.9/A"],
};

// ---------------------------------------------------------------------------
// 1.5. Miras Hukuku Davalari — Asliye Hukuk Gorevindekiler (madde 66-75)
// ---------------------------------------------------------------------------

const mirasSebebiyleIstihkak: DavaTuru = {
  id: "miras-sebebiyle-istihkak",
  maddeNo: 66,
  ad: "Miras Sebebiyle Istihkak Davasi",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: mirasKesinYetki,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Miras sebebiyle istihkak davasi miras hakkina dayanan ozel nitelikli bir davadir.",
    yasalDayanak: "HMK m.74",
    icerik: [
      "Miras sebebiyle istihkak davasi acma ve takip etme",
      "Terekeye ait mallari talep etme",
    ],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Mirascilik sifatini gosteren belge", zorunlu: true },
    { bilgi: "Talep edilen tereke mallarinin listesi", zorunlu: true },
    { bilgi: "Terekeyi isgal eden kisinin bilgileri", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami (mirascilik belgesi)", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Olum belgesi", zorunlu: true, nereden: "Nufus mudurlugu / e-Devlet" },
    { belge: "Tereke mallarini gosteren belgeler (tapu, ruhsat vb.)", zorunlu: true, nereden: "Tapu / Trafik tescil" },
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "1 yil (ogrenme) / 10 yil (olum)",
    yasalDayanak: "TMK m.638",
    aciklama: "Miras sebebiyle istihkak davasi, davacinin kendisinin mirascioldugunuveistihkak davasi acabilecegini ogrendigi tarihten itibaren 1, her halde mirasbirakanin olumunden itibaren 10 yil icinde acilmalidir.",
    baslangic: "Mirascilik ve elde tutma durumunun ogrenildigi tarih",
  },
  pratikNot:
    "TMK m.637 uyarinca ustun hakka sahip mirascinin terekeyi veya tereke mallarini elinde bulunduran kimseye karsi actigi davadir. Ayni hakka dayanan elatmanin onlenmesinden farki: miras hukukuna dayanmasidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.11"],
  ozelKanunlar: ["TMK m.637-639"],
};

const vasiyetnameninIptali: DavaTuru = {
  id: "vasiyetnamenin-iptali",
  maddeNo: 67,
  ad: "Vasiyetnamenin Iptali Davasi",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: mirasKesinYetki,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Vasiyetnamenin iptali davasi miras hukukuna ozgu ozel bir davadir.",
    yasalDayanak: "HMK m.74",
    icerik: [
      "Vasiyetnamenin iptali davasi acma ve takip etme",
    ],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Iptal nedeni (ehliyetsizlik, sekil, irade, hukuka aykirilik)", zorunlu: true },
    { bilgi: "Vasiyetnamenin icerigi hakkinda bilgi", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami (mirascilik belgesi)", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Vasiyetname sureti", zorunlu: true, nereden: "Sulh hukuk mahkemesi (acilma)" },
    { belge: "Olum belgesi", zorunlu: true, nereden: "Nufus mudurlugu / e-Devlet" },
    { belge: "Ehliyetsizlik iddiasi varsa saglik raporlari", zorunlu: false, nereden: "Hastane" },
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "1 yil (ogrenme) / 10 yil (acilma) / 20 yil (kotuniyetli elde tutma)",
    yasalDayanak: "TMK m.559",
    aciklama: "Davaci, iptal sebebini ve kendisinin hak sahibi oldugunu ogrendigi tarihten itibaren 1 yil, her halde vasiyetnamenin acilma tarihinden itibaren 10 yil icinde acmalidir. Kotuniyet varsa 20 yil.",
    baslangic: "Iptal sebebinin ve hak sahipliginin ogrenildigi tarih",
  },
  pratikNot:
    "TMK m.557 iptal sebepleri: (1) Ehliyetsizlik, (2) Irade sakatligi (hile, korkutma, yanilma), (3) Tasarrufun icerigi/kosullarinin hukuka/ahlaka aykiriligi, (4) Sekle uygunsuzluk. Iptal davasi yalnizca yasal ve atanmis mirascilar ile vasiyet alacaklilari tarafindan acilabilir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.11"],
  ozelKanunlar: ["TMK m.557-559"],
};

const tenkisDavasi: DavaTuru = {
  id: "tenkis-davasi",
  maddeNo: 68,
  ad: "Tenkis Davasi (Sakli Payin Ihlali)",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: mirasKesinYetki,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Tenkis davasi sakli pay mirascilarinin ozel hakki olup ozel yetki gerektirir.",
    yasalDayanak: "HMK m.74",
    icerik: [
      "Tenkis davasi acma ve takip etme",
      "Sakli payin iadesini talep etme",
    ],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Sakli paya tecavuz eden tasarruf (vasiyet, bagis vb.)", zorunlu: true },
    { bilgi: "Terekenin tahmini degeri", zorunlu: true },
    { bilgi: "Diger mirascilar ve paylari", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Olum belgesi", zorunlu: true, nereden: "Nufus mudurlugu / e-Devlet" },
    { belge: "Tenkise konu tasarrufa iliskin belgeler (vasiyetname, bagis senedi, tapu vb.)", zorunlu: true, nereden: "Muvekkil / Tapu" },
    { belge: "Tereke malvarligi listesi", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "1 yil (ogrenme) / 10 yil (olum)",
    yasalDayanak: "TMK m.571",
    aciklama: "Tenkis davasi, mirascilarinsakli paylarinin zedelendigini ogrendikleri tarihten itibaren 1 yil, her halde vasiyetnamelerde acilma tarihinden, diger islemlerde mirasbirakanin olumunden itibaren 10 yil icinde acilmalidir.",
    baslangic: "Sakli pay ihlalinin ogrenildigi tarih",
  },
  pratikNot:
    "Sakli pay oranlari (TMK m.506): altsoy 1/2, ana-baba 1/4, es altsoy ile birlikte 1/4, ana-baba ile birlikte 1/2, yalniz ise 3/4. Tenkis sirasinda once olume bagli tasarruflar, yetmezse sagsatararasikzlar tenkise tabi tutulur (TMK m.570).",
  hmkMaddeleri: ["HMK m.2", "HMK m.11"],
  ozelKanunlar: ["TMK m.505-512", "TMK m.560-571"],
};

const murisMuvazaasi: DavaTuru = {
  id: "muris-muvazaasi",
  maddeNo: 69,
  ad: "Muris Muvazaasi Davasi",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: {
    genelYetki: "Tasinmazin bulundugu yer mahkemesi (HMK m.12) — KESIN YETKI",
    kesinYetki: "Tasinmazin bulundugu yer mahkemesi (HMK m.12)",
    kesinYetkiMi: true,
    yasalDayanak: "HMK m.12",
    aciklama:
      "Muris muvazaasi davasi tapu iptali ve tescil niteliginde oldugundan tasinmazin bulundugu yer mahkemesi kesin yetkilidir. Birden fazla tasinmaz varsa herbirinin bulundugu yer mahkemesinde ayri ayri acilmalidir.",
  },
  harclar: nispiHarc,
  masraflar: kesfiBilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Tapu iptali ve tescil talebi iceren dava oldugundan ozel yetki gerekir.",
    yasalDayanak: "HMK m.74",
    icerik: [
      "Muris muvazaasi nedeniyle tapu iptali ve tescil davasi acma",
      "Tenkis davasi acma",
    ],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Muvazaali islemin konusu (hangi tasinmaz, kime devredildigi)", zorunlu: true },
    { bilgi: "Gercek bedel ve tapu bedelinin farki", zorunlu: true },
    { bilgi: "Mirasbirakanin mal kacirma amacini gosteren olgular", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Tapu kaydi ve tasinmaz bilgileri", zorunlu: true, nereden: "Tapu mudurlugu / e-Devlet" },
    { belge: "Satis senedi veya devir islem belgesi", zorunlu: true, nereden: "Tapu mudurlugu" },
    { belge: "Emlak deger tespiti (rayic bedel)", zorunlu: false, nereden: "Belediye / Ekspertiz" },
    { belge: "Olum belgesi ve nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "Zamanasiminatabi degil (mulkiyet hakkina dayanan dava)",
    yasalDayanak: "01.04.1974 tarihli 1/2 sy. YİBK",
    aciklama: "Muris muvazaasi davasi, muvazaali islemin gecersizligi nedeniyle mulkiyet hakkina dayanir. TMK m.683 uyarinca mulkiyet hakkina dayanan dava zamanasiminaya da hak dusurucusureyetabidir.",
  },
  pratikNot:
    "01.04.1974 tarihli 1/2 sy. Yargitay Ictihadirlestirme Karari bu dava turununn temelini olusturur. Mirasbirakanin diger mirascilardan mal kacirmak amaciyla tasinmazini tapuda satis gosterip gercekte bagisladigi iddia edilir. Davaci miras payi oraninda tapu iptali ve tescil talep eder.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12"],
  ozelKanunlar: ["TMK m.6", "TMK m.683", "TBK m.19", "01.04.1974 tarih 1/2 sy. YIBK"],
};

const mirasDenklestirme: DavaTuru = {
  id: "miras-denklestirme",
  maddeNo: 70,
  ad: "Mirasta Denklestirme (Iade) Davasi",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: mirasKesinYetki,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Miras hukukundan dogan ozel nitelikli dava.",
    yasalDayanak: "HMK m.74",
    icerik: ["Mirasta denklestirme davasi acma ve takip etme"],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Denklestirmeye tabi kazandirma (ceyiz, mal verme vb.)", zorunlu: true },
    { bilgi: "Kazandirmanin degeri ve tarihi", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Olum belgesi", zorunlu: true, nereden: "Nufus mudurlugu / e-Devlet" },
    { belge: "Kazandirmayi gosteren belgeler", zorunlu: true, nereden: "Muvekkil / Tapu / Banka" },
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "10 yil (mirasbirakanin olumunden itibaren)",
    yasalDayanak: "TBK m.146 kiyas yoluyla",
    aciklama: "Denklestirme davasi icin ozel zamanasimiduezenlenmesi bulunmamakta olup genel zamanasimiuygulanir.",
    baslangic: "Mirasbirakanin olum tarihi",
  },
  pratikNot:
    "TMK m.669-675 hukumleri uygulanir. Altsoyun esite ceyiz, kurulussmukayesinde veya borcun odenmesi seklinde mirasbirakanin sagliginda aldigi degerler denklestirmeye tabidir. Mirasbirakanmuaftutumusda haricdir (TMK m.671).",
  hmkMaddeleri: ["HMK m.2", "HMK m.11"],
  ozelKanunlar: ["TMK m.669-675"],
};

const mirascilikIptal: DavaTuru = {
  id: "mirasciliktan-cikarma-iptali",
  maddeNo: 71,
  ad: "Mirasciliktan Cikarmanin Iptali Davasi",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: mirasKesinYetki,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Miras hakki ile ilgili ozel nitelikli dava.",
    yasalDayanak: "HMK m.74",
    icerik: ["Mirasciliktan cikarmanin iptali davasi acma ve takip etme"],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Cikarma sebebinin gercege dayanmadigi iddiasi", zorunlu: true },
    { bilgi: "Cikarma tasarrufu (vasiyetname veya miras sozlesmesi)", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Cikarmayi iceren vasiyetname/miras sozlesmesi sureti", zorunlu: true, nereden: "Sulh hukuk mahkemesi" },
    { belge: "Cikarma sebebinin asilsizligini gosteren deliller", zorunlu: true, nereden: "Muvekkil" },
    { belge: "Olum belgesi ve nufus kaydi", zorunlu: true, nereden: "e-Devlet" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "1 yil (ogrenme) / 10 yil (acilma)",
    yasalDayanak: "TMK m.559 kiyas yoluyla",
    aciklama: "Vasiyetnamenin iptali davasina iliskin sureler uygulanir.",
    baslangic: "Cikarma isleminin ogrenildigi tarih",
  },
  pratikNot:
    "TMK m.510 uyarinca mirasciliktan cikarma (iskat) sakli pay mirascisinin: (1) mirasbirakanveya yakinlarina agir suc islemesi, (2) aile hukukundan dogan yukumluluklerini agir bicimde ihlal etmesi hallerinde yapilabilir. Cikarma sebebi ispat edilemezse cikarma iptal olur. Ispat yuku cikarmayi savunana aittir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.11"],
  ozelKanunlar: ["TMK m.510-513", "TMK m.559"],
};

const olumeBagliTasarrufIptali: DavaTuru = {
  id: "olume-bagli-tasarruf-iptali",
  maddeNo: 72,
  ad: "Olume Bagli Tasarrufun Iptali Davasi",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: mirasKesinYetki,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Miras hukukuna iliskin ozel nitelikli dava.",
    yasalDayanak: "HMK m.74",
    icerik: ["Olume bagli tasarrufun iptali davasi acma ve takip etme"],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Iptali istenen tasarrufun turu ve icerigi", zorunlu: true },
    { bilgi: "Iptal nedeni (ehliyetsizlik, sekil, irade, hukuka aykirilik)", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Olume bagli tasarruf belgesi sureti", zorunlu: true, nereden: "Sulh hukuk mahkemesi" },
    { belge: "Olum belgesi", zorunlu: true, nereden: "e-Devlet" },
    { belge: "Iptal nedenine iliskin deliller (saglik raporlari vb.)", zorunlu: false, nereden: "Hastane / Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "1 yil (ogrenme) / 10 yil (acilma) / 20 yil (kotuniyetli)",
    yasalDayanak: "TMK m.559",
    aciklama: "Davaci, iptal sebebini ve hak sahibi oldugunu ogrendigi tarihten itibaren 1 yil, her halde acilma tarihinden itibaren 10 yil, kotuniyetli elde tutanlara karsi 20 yil icinde dava acmalidir.",
    baslangic: "Iptal sebebi ve hak sahipliginin ogrenildigi tarih",
  },
  pratikNot:
    "Olume bagli tasarruf: vasiyetname ve miras sozlesmesini kapsar. Iptal sebepleri TMK m.557'de belirtilmistir. Miras sozlesmesi icin de ayni iptal sebepleri gecerlidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.11"],
  ozelKanunlar: ["TMK m.557-559", "TMK m.545-556"],
};

const mirasOrtakligiTemsilci: DavaTuru = {
  id: "miras-ortakligi-temsilci",
  maddeNo: 73,
  ad: "Miras Ortakligina Temsilci Atanmasi Davasi",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: {
    mahkeme: "Sulh Hukuk Mahkemesi",
    yasalDayanak: "TMK m.640/3, HMK m.4",
    aciklama: "Miras ortakligina temsilci atanmasi talebi sulh hukuk mahkemesinin gorevine girer. Ancak cekismeli hale gelirse asliye hukuk mahkemesi gorevlidir.",
    ozelDurum: "Cekismesiz yargi isi olarak sulh hukuk mahkemesince karara baglanir.",
  },
  yetkiliMahkeme: mirasKesinYetki,
  harclar: maktuHarc,
  masraflar: standartMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Tum mirascilar ve iletisim bilgileri", zorunlu: true },
    { bilgi: "Temsilci atanmasinin gerekceleri", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Olum belgesi", zorunlu: true, nereden: "e-Devlet" },
    { belge: "Tereke malvarligi listesi", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "basit",
  arabuluculuk: arabuluculukYok,
  pratikNot:
    "TMK m.640 uyarinca mirascilardanbiri, terekeye dahil malvarligi degerlerinin korunmasi icin gerekli onlemlerin alinmasini sulh hakiminden isteyebilir. Temsilci, terekenin yonetimi icin atanir.",
  hmkMaddeleri: ["HMK m.4", "HMK m.316", "HMK m.382"],
  ozelKanunlar: ["TMK m.640"],
};

const mirasPayiTasarruf: DavaTuru = {
  id: "miras-payi-tasarruf",
  maddeNo: 74,
  ad: "Miras Payi Uzerinde Tasarruf Davalari",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: asliyeHukukGorev,
  yetkiliMahkeme: mirasKesinYetki,
  harclar: nispiHarc,
  masraflar: bilirkisiMasraf,
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Miras payi devri ozel yetki gerektiren islemlerdendir.",
    yasalDayanak: "HMK m.74",
    icerik: ["Miras payi uzerinde tasarruf davasi acma ve takip etme"],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Devredilen miras payinin orani ve konusu", zorunlu: true },
    { bilgi: "Devir isleminin gecersizlik sebebi", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Miras payi devir sozlesmesi", zorunlu: true, nereden: "Muvekkil / Noter" },
    { belge: "Olum belgesi", zorunlu: true, nereden: "e-Devlet" },
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: arabuluculukYok,
  zamanasimi: {
    sure: "10 yil",
    yasalDayanak: "TBK m.146",
    aciklama: "Genel zamanasimisuersine tabidir.",
    baslangic: "Devir isleminin yapildigi tarih",
  },
  pratikNot:
    "Miras payinin ucuncukisilere devri noter senedi ile yapilmalidir (TMK m.677). Mirascilar arasinda devir adi yazili sekille yapilabilir. Paylasilmamis tereke uzerinde tasarruf islemleri ancak tum mirascilarinin rizasiyla mumkundur (TMK m.702).",
  hmkMaddeleri: ["HMK m.2", "HMK m.11"],
  ozelKanunlar: ["TMK m.677-678", "TMK m.702"],
};

const mirasSirketiKayyim: DavaTuru = {
  id: "miras-sirketi-kayyim",
  maddeNo: 75,
  ad: "Miras Sirketine Kayyim Atanmasi Davasi",
  kategori: "asliye-hukuk",
  altKategori: "miras-hukuku",
  gorevliMahkeme: {
    mahkeme: "Sulh Hukuk Mahkemesi",
    yasalDayanak: "TMK m.427, HMK m.4",
    aciklama: "Kayyim atanmasi vesayet hukuku kapsaminda sulh hukuk mahkemesinin gorevine girer.",
    ozelDurum: "Cekismeli hallerde asliye hukuk mahkemesi gorevlidir.",
  },
  yetkiliMahkeme: mirasKesinYetki,
  harclar: maktuHarc,
  masraflar: standartMasraf,
  ozelVekaletname: {
    gerekliMi: false,
    neden: "Genel vekaletname yeterlidir.",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Mirasbirakanin kimlik bilgileri ve olum tarihi", zorunlu: true },
    { bilgi: "Tum mirascilar listesi", zorunlu: true },
    { bilgi: "Kayyim atanmasinin gerekceleri (anlasamama, yokluk vb.)", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Veraset ilami", zorunlu: true, nereden: "Sulh hukuk mahkemesi / noter" },
    { belge: "Olum belgesi", zorunlu: true, nereden: "e-Devlet" },
    { belge: "Tereke malvarligi listesi", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "basit",
  arabuluculuk: arabuluculukYok,
  pratikNot:
    "TMK m.427 uyarinca belirli bir isin gorulemesi veya malvarliginin yonetimi icin kayyim atanabilir. Miras sirketinin (elbirligi mulkiyeti) yonetilemedigit hallerde sulh hakiminden kayyim atanmasi istenebilir.",
  hmkMaddeleri: ["HMK m.4", "HMK m.316", "HMK m.382"],
  ozelKanunlar: ["TMK m.427", "TMK m.640"],
};

// ---------------------------------------------------------------------------
// 1.6. Soybagi Davalari — Aile Mahkemesi Olmayan Yerlerde (madde 76-79)
// ---------------------------------------------------------------------------

const soybagininReddi: DavaTuru = {
  id: "soybaginin-reddi",
  maddeNo: 76,
  ad: "Soybaginin Reddi (Nesebin Reddi) Davasi",
  kategori: "asliye-hukuk",
  altKategori: "soybagi",
  gorevliMahkeme: asliyeHukukSoybagGorev,
  yetkiliMahkeme: soybagYetkisi,
  harclar: maktuHarc,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
    bilirkisiUcreti: BILIRKISI_UCRETI,
    toplamTahmini: 5000,
    aciklama: "DNA testi ucreti ve tebligat masraflari dahil tahmini tutar.",
  },
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Soybagi davalari sahsa sikiya sikiya bagli haklardandir.",
    yasalDayanak: "HMK m.74",
    icerik: [
      "Soybaginin reddi davasi acma ve takip etme",
    ],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Cocugun kimlik bilgileri ve dogum tarihi", zorunlu: true },
    { bilgi: "Evlilik tarihi ve baba olarak gosterilen kisinin bilgileri", zorunlu: true },
    { bilgi: "Red sebebi (baska erkekten olma iddiasi vb.)", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi (aile)", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Dogum belgesi", zorunlu: true, nereden: "Hastane / Nufus mudurlugu" },
    { belge: "Evlenme belgesi", zorunlu: true, nereden: "Nufus mudurlugu / e-Devlet" },
    { belge: "DNA testi raporu (yapildiysa)", zorunlu: false, nereden: "Adli Tip / Hastane" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Sahsa sikiya sikiya bagli haklar arabuluculuga elverislidegildir.",
  },
  zamanasimi: {
    sure: "1 yil (koca icin: dogumu veya baska baba olma ihtimalini ogrenme) / Cocuk icin: ergin olma + 1 yil",
    yasalDayanak: "TMK m.289",
    aciklama:
      "Kocanin dava hakki, dogum ve baska birinin baba olma ihtimalini ogrendigiti tarihten itibaren 1 yil icinde duser. Cocugun dava hakki, ergin oldugu tarihten baslayarak 1 yildir.",
    baslangic: "Kocanin dogumu ogrendigi tarih / Cocugun ergin oldugu tarih",
  },
  pratikNot:
    "Babalik karinesi: evlilik icinde dogan veya evlenmeden once ana rahmine dusup de evlilik icinde dogan cocugun babasi kocadir (TMK m.285). Koca dava acmazsa miras dileri de dava acabilir (TMK m.291). Ana, cocugu dogumdan once ve evlenme sirasinda aldatildigini ispat etmis sayilir (TMK m.288).",
  hmkMaddeleri: ["HMK m.2"],
  ozelKanunlar: ["TMK m.285-291", "4787 sy. Kanun m.4"],
};

const babalikDavasi: DavaTuru = {
  id: "babalik-davasi",
  maddeNo: 77,
  ad: "Babalik Davasi",
  kategori: "asliye-hukuk",
  altKategori: "soybagi",
  gorevliMahkeme: asliyeHukukSoybagGorev,
  yetkiliMahkeme: soybagYetkisi,
  harclar: maktuHarc,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
    bilirkisiUcreti: BILIRKISI_UCRETI,
    toplamTahmini: 5000,
    aciklama: "DNA testi ucreti ve tebligat masraflari dahil tahmini tutar.",
  },
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Soybagi davalari sahsa sikiya sikiya bagli haklardandir.",
    yasalDayanak: "HMK m.74",
    icerik: [
      "Babalik davasi acma ve takip etme",
      "Cocuk icin nafaka ve tazminat talep etme",
    ],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Cocugun kimlik bilgileri ve dogum tarihi", zorunlu: true },
    { bilgi: "Baba oldugu iddia edilen kisinin kimlik bilgileri", zorunlu: true },
    { bilgi: "Ana ile davalinin iliskisini gosteren olgular", zorunlu: true },
    { bilgi: "Nafaka ve tazminat talebi (varsa)", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi (ana ve cocuk)", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Dogum belgesi", zorunlu: true, nereden: "Hastane" },
    { belge: "DNA testi raporu (yapildiysa)", zorunlu: false, nereden: "Adli Tip / Hastane" },
    { belge: "Iliskiyi gosteren deliller (mesaj, fotograf vb.)", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Sahsa sikiya sikiya bagli haklar arabuluculuga elverislidegildir.",
  },
  zamanasimi: {
    sure: "Ana icin: dogumdan itibaren 1 yil / Cocuk icin: hak dusurucusuereye tabi degil",
    yasalDayanak: "TMK m.303",
    aciklama:
      "Babalik davasi, ananin dogumdan itibaren 1 yil icinde acmasi gerekir. Cocugun dava acma hakki suersiz yani hak dusurucusuereye tabi degildir.",
    baslangic: "Dogum tarihi (ana icin)",
  },
  pratikNot:
    "TMK m.302: davalinin, cocugun ana rahmine dusmu oldugu donemde anayla cinsel iliskide bulundugu ispat edilmisse babalik karinesi isler. Dava ana ve/veya cocuk tarafindan babaya, baba olmuse mirascilarinaveyaona kari acilir. C. Savcisina ve Hazineye bildirilir (TMK m.301).",
  hmkMaddeleri: ["HMK m.2"],
  ozelKanunlar: ["TMK m.301-304", "4787 sy. Kanun m.4"],
};

const tanımaninIptali: DavaTuru = {
  id: "tanimanin-iptali",
  maddeNo: 78,
  ad: "Tanimanin Iptali Davasi",
  kategori: "asliye-hukuk",
  altKategori: "soybagi",
  gorevliMahkeme: asliyeHukukSoybagGorev,
  yetkiliMahkeme: soybagYetkisi,
  harclar: maktuHarc,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
    bilirkisiUcreti: BILIRKISI_UCRETI,
    toplamTahmini: 5000,
    aciklama: "DNA testi ucreti ve tebligat masraflari dahil tahmini tutar.",
  },
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Soybagi davalari sahsa sikiya sikiya bagli haklardandir.",
    yasalDayanak: "HMK m.74",
    icerik: ["Tanimanin iptali davasi acma ve takip etme"],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Tanima isleminin tarihi ve nufus mudurlugu kaydi", zorunlu: true },
    { bilgi: "Tanimanin iptali sebebi (yanilma, aldatma, gercek disi vb.)", zorunlu: true },
    { bilgi: "Cocugun ve ananin kimlik bilgileri", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Tanima belgesi sureti", zorunlu: true, nereden: "Nufus mudurlugu" },
    { belge: "DNA testi raporu (yapildiysa)", zorunlu: false, nereden: "Adli Tip / Hastane" },
    { belge: "Iptal nedenini gosteren deliller", zorunlu: true, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Sahsa sikiya sikiya bagli haklar arabuluculuga elverislidegildir.",
  },
  zamanasimi: {
    sure: "Taniyankisi: ogrenme + 1 yil, herhalde tanima + 5 yil / Ana, cocuk, C. Savcisi: sueresiniz",
    yasalDayanak: "TMK m.300",
    aciklama:
      "Taniyankisi yanilma, aldatma veya korkutmayi ogrendikten itibaren 1 yil, her halde tanima tarihinden itibaren 5 yil icinde iptal davasi acabilir. Ana, cocuk ve C. Savcisi icin sure yoktur.",
    baslangic: "Irade sakatligi halinin ogrenildigi tarih",
  },
  pratikNot:
    "Tanima, nufus memuruna veya mahkemeye yazili basvuru ya da resmi senetle yapilir (TMK m.295). Irade sakatligi nedeniyle taniyanin kendisi; tanimanin gercek olmadigi iddiasi ile ana, cocuk ve C. Savcisi iptal davasi acabilir (TMK m.297-298).",
  hmkMaddeleri: ["HMK m.2"],
  ozelKanunlar: ["TMK m.295-300", "4787 sy. Kanun m.4"],
};

const soybagininDuzeltilmesi: DavaTuru = {
  id: "soybaginin-duzeltilmesi",
  maddeNo: 79,
  ad: "Soybaginin Duzeltilmesi Davasi",
  kategori: "asliye-hukuk",
  altKategori: "soybagi",
  gorevliMahkeme: asliyeHukukSoybagGorev,
  yetkiliMahkeme: soybagYetkisi,
  harclar: maktuHarc,
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 3,
    bilirkisiUcreti: BILIRKISI_UCRETI,
    toplamTahmini: 5000,
    aciklama: "DNA testi ucreti ve tebligat masraflari dahil tahmini tutar.",
  },
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Soybagi davalari sahsa sikiya sikiya bagli haklardandir.",
    yasalDayanak: "HMK m.74",
    icerik: ["Soybaginin duzeltilmesi davasi acma ve takip etme"],
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi", zorunlu: true },
    { bilgi: "Cocugun ve nufusa kayitli anne-babanin kimlik bilgileri", zorunlu: true },
    { bilgi: "Gercek soybag iliskisi iddiasi ve deliller", zorunlu: true },
    { bilgi: "Nufus kaydindaki hatali kaydinyazilartarihi", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "Nufus kayit ornegi (aile)", zorunlu: true, nereden: "e-Devlet / Nufus mudurlugu" },
    { belge: "Dogum belgesi", zorunlu: true, nereden: "Hastane" },
    { belge: "DNA testi raporu (yapildiysa)", zorunlu: false, nereden: "Adli Tip / Hastane" },
    { belge: "Duzeltmeyi destekleyen diger belgeler", zorunlu: false, nereden: "Muvekkil" },
  ],
  yargilamaUsulu: "yazili",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Sahsa sikiya sikiya bagli haklar arabuluculuga elverislidegildir.",
  },
  zamanasimi: {
    sure: "Hak dusurucusuereye tabi degil (TMK ve 5490 sy. Kanun)",
    yasalDayanak: "5490 sy. Kanun m.36",
    aciklama: "Nufus kayitlarinin duzeltilmesi davalari kural olarak suereye tabi degildir.",
  },
  pratikNot:
    "Soybaginin duzeltilmesi, nufus kaydindaki anne ve/veya baba bilgisinin gercek duruma uygun hale getirilmesini amaclar. Bu dava bazen soybaginin reddi + babalik + nufus kaydi duzeltme taleplerini birlikte icerebilir. Nufus mudurlugu davaliolarak gosterilir, C. Savcisi da davaya katilir.",
  hmkMaddeleri: ["HMK m.2"],
  ozelKanunlar: ["TMK m.282-284", "5490 sy. Nufus Hizmetleri Kanunu m.36", "4787 sy. Kanun m.4"],
};

// ---------------------------------------------------------------------------
// EXPORT
// ---------------------------------------------------------------------------

export const bolum01Part2: DavaTuru[] = [
  // 1.3. Borclar Hukuku / Sozlesme Davalari (42-54)
  alacakDavasi,
  itirazinIptaliDavasi,
  menfiTespitDavasi,
  istirdatDavasi,
  sozlesmeninFeshiDavasi,
  sozlesmeninUyarlanmasi,
  kiraDisTahliye,
  eserSozlesmesi,
  vekaletSozlesmesi,
  ariyetSozlesmesi,
  bagislamaVaadindenDonme,
  culpaInContrahendo,
  cezaiSartDavasi,

  // 1.4. Kisilik Haklari ve Nufus Davalari (55-65)
  kisilikHaklariTazminat,
  adSoyadDegistirme,
  yasDuzeltme,
  cinsiyetDegistirme,
  nufusKaydiDuzeltme,
  gaiplikKarari,
  olumKarinesi,
  derneklerVakiflar,
  basinKisilikIhlali,
  internetKisilikIhlali,
  erisimEngelleme,

  // 1.5. Miras Hukuku Davalari (66-75)
  mirasSebebiyleIstihkak,
  vasiyetnameninIptali,
  tenkisDavasi,
  murisMuvazaasi,
  mirasDenklestirme,
  mirascilikIptal,
  olumeBagliTasarrufIptali,
  mirasOrtakligiTemsilci,
  mirasPayiTasarruf,
  mirasSirketiKayyim,

  // 1.6. Soybagi Davalari (76-79)
  soybagininReddi,
  babalikDavasi,
  tanımaninIptali,
  soybagininDuzeltilmesi,
];
